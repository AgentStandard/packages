require('dotenv').config();
const { Telegraf } = require('telegraf');
const Anthropic = require('@anthropic-ai/sdk');
const fs = require('fs');
const path = require('path');
const PACKAGES = require('./packages');
const { parseRepoSlug, listFiles, readFile, writeFile, triggerDeploy, pickFiles, generateChange, formatDiff } = require('./deploy');

// ─── Config ───────────────────────────────────────────────────────────────────

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const PLATFORM_API_KEY = process.env.ANTHROPIC_API_KEY;
const MODEL = process.env.ANTHROPIC_MODEL || 'claude-haiku-4-5-20251001';
const FREE_MESSAGE_LIMIT = 30;           // setup questions don't count
const MAX_HISTORY = 20;                  // message pairs kept per user
const MAX_INPUT_CHARS = 800;             // cap input to prevent abuse
const MAX_OUTPUT_TOKENS = 500;           // cap output per response
const DATA_FILE = path.join(__dirname, 'data', 'users.json');
const GIFTS_FILE = path.join(__dirname, 'data', 'gifts.json');
const GIFT_EXPIRY_DAYS = 30;

const BASE_SYSTEM_PROMPT = `You are a personal AI assistant set up through AgentStandard (agentstandard.ai).

You help with anything: answering questions, planning, research, writing, brainstorming, advice. You remember everything from this conversation and the profile your user shared when we first met.

Your defaults: warm, direct, genuinely helpful. Not corporate. Not sycophantic. Honest when you don't know something. Responses are focused and concise unless depth is needed.

The user has set specific rules for how they want to work with you. Follow them exactly — they matter more than your defaults.`;

// Build a fully personalised system prompt from the user's profile
// If the user came via a package deep link, use that package's system prompt as the base
function buildSystemPrompt(profile, memory) {
  let prompt = BASE_SYSTEM_PROMPT;

  // If user arrived via a package deep link, layer in the package's specialised prompt
  if (profile.packageSlug && PACKAGES[profile.packageSlug]) {
    prompt = PACKAGES[profile.packageSlug].systemPrompt;
  }

  if (profile.agentName) {
    prompt += `\n\nYour name is ${profile.agentName}. Use it naturally — sign off with it occasionally, refer to yourself by name when it feels right.`;
  }
  if (profile.name) {
    prompt += `\n\nThe person you're talking to is called ${profile.name}.`;
  }
  if (profile.context) {
    prompt += `\n\nBackground: ${profile.context}`;
  }
  if (profile.challenge) {
    prompt += `\n\nBiggest current challenge: ${profile.challenge}`;
  }
  if (profile.style) {
    prompt += `\n\nCommunication style preference: ${profile.style}`;
  }
  if (profile.tenets) {
    prompt += `\n\nRules ${profile.name || 'this user'} has set — follow these always:\n${profile.tenets}`;
  }
  if (profile.goal) {
    prompt += `\n\n90-day goal: "${profile.goal}" — keep this in mind. When relevant, reference it.`;
  }

  // Inject persistent memory — facts extracted from previous conversations
  if (memory && memory.facts && Object.keys(memory.facts).length > 0) {
    const factsText = Object.entries(memory.facts)
      .map(([k, v]) => `- ${k.replace(/_/g, ' ')}: ${v}`)
      .join('\n');
    prompt += `\n\n---\nPersistent memory — things you know about ${profile.name || 'this person'} from previous conversations:\n${factsText}\nReference these naturally when relevant. Do not recite them back unprompted.\n---`;
  }

  return prompt;
}

// Package category menu for users who start without a deep link
const PACKAGE_CATEGORIES = {
  'Health': ['gp-prep', 'supplement-stack'],
  'Productivity': ['week-in-review', 'memory-architect'],
  'Lifestyle': ['wine-log', 'taste-map', 'home-stack'],
  'Social': ['relationship-graph', 'network-pulse', 'gift-curator'],
  'Learning': ['skill-tracker', 'book-brain', 'read-it-later'],
  'Career': ['salary-scout', 'job-hunt-agent', 'freelancer-guard'],
  'Food': ['pantry-chef'],
  'Real Estate': ['bid-auditor'],
};

// Seven setup questions — none count toward the free message limit
const SETUP_QUESTIONS = [
  {
    key: 'name',
    question: (firstName) =>
      `Hi${firstName ? ` ${firstName}` : ''}! I'm your AI assistant from AgentStandard.\n\nBefore we start, I want to get to know you properly — it takes two minutes and makes every conversation after this better.\n\nWhat should I call you?`,
  },
  {
    key: 'agentName',
    question: (name) =>
      `Good to meet you, ${name}. Now the important one: what should I call myself?\n\nGive me a name — anything you like.`,
  },
  {
    key: 'context',
    question: (agentName) =>
      `${agentName}. I like that.\n\nQuick picture of your life: what do you do, and where are you based?`,
  },
  {
    key: 'challenge',
    question: () =>
      `What's your biggest time drain or challenge right now? The thing taking up more headspace than it should.`,
  },
  {
    key: 'style',
    question: () =>
      `How do you like to communicate — direct and brief, or detailed and thorough?`,
  },
  {
    key: 'tenets',
    question: () =>
      `Almost there. What are one or two rules you'd want me to always follow? Things that matter to you — "brutal honesty only", "push me harder", "never use bullet points", whatever fits.\n\nSay skip if nothing comes to mind.`,
  },
  {
    key: 'goal',
    question: () =>
      `Last one: what does success look like in 90 days? What would make you say this was worth it?`,
  },
];

if (!BOT_TOKEN) {
  console.error('❌  TELEGRAM_BOT_TOKEN is not set. Copy .env.example to .env and fill in your values.');
  process.exit(1);
}
if (!PLATFORM_API_KEY) {
  console.error('❌  ANTHROPIC_API_KEY is not set. Copy .env.example to .env and fill in your values.');
  process.exit(1);
}

// ─── Storage ──────────────────────────────────────────────────────────────────

function loadUsers() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    }
  } catch (e) {
    console.warn('⚠️  Could not read users.json, starting fresh:', e.message);
  }
  return {};
}

function saveUsers(users) {
  try {
    fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
    fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2), 'utf8');
  } catch (e) {
    console.error('❌  Could not save users.json:', e.message);
  }
}

// ─── Gift Storage ─────────────────────────────────────────────────────────────

function loadGifts() {
  try {
    if (fs.existsSync(GIFTS_FILE)) return JSON.parse(fs.readFileSync(GIFTS_FILE, 'utf8'));
  } catch (e) { console.warn('Could not read gifts.json:', e.message); }
  return {};
}

function saveGifts(gifts) {
  try {
    fs.mkdirSync(path.dirname(GIFTS_FILE), { recursive: true });
    fs.writeFileSync(GIFTS_FILE, JSON.stringify(gifts, null, 2), 'utf8');
  } catch (e) { console.error('Could not save gifts.json:', e.message); }
}

function generateGiftCode() {
  const chars = 'abcdefghijkmnpqrstuvwxyz23456789';
  let code = '';
  for (let i = 0; i < 8; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

let gifts = loadGifts();

function getUser(users, userId) {
  if (!users[userId]) {
    users[userId] = {
      messageCount: 0,
      apiKey: null,
      awaitingKey: false,
      history: [],
      setupComplete: false,
      setupStep: 0,
      awaitingCategoryPick: false,
      giftFlow: null,
      profile: {},
      memory: { facts: {}, updatedAt: null },
    };
  }
  if (users[userId].setupComplete === undefined) {
    users[userId].setupComplete = true;
    users[userId].setupStep = SETUP_QUESTIONS.length;
    users[userId].profile = {};
  }
  // Migrate users without memory object
  if (!users[userId].memory) {
    users[userId].memory = { facts: {}, updatedAt: null };
  }
  return users[userId];
}



// ─── Claude ───────────────────────────────────────────────────────────────────

async function callClaude(apiKey, history, userMessage, profile, memory) {
  const client = new Anthropic({ apiKey });

  const safeMessage = userMessage.length > MAX_INPUT_CHARS
    ? userMessage.slice(0, MAX_INPUT_CHARS) + '…'
    : userMessage;

  const messages = [
    ...history,
    { role: 'user', content: safeMessage },
  ];

  const response = await client.messages.create({
    model: MODEL,
    max_tokens: MAX_OUTPUT_TOKENS,
    system: buildSystemPrompt(profile || {}, memory || {}),
    messages,
  });

  return response.content[0].text;
}

// Background memory extraction — runs after each exchange, non-blocking
async function extractMemoryFacts(apiKey, userMessage, assistantReply, user) {
  try {
    const client = new Anthropic({ apiKey });
    const extractPrompt = `Extract personal facts worth remembering from this exchange. Focus on: health conditions, medications, allergies, dietary restrictions, preferences, goals, family/work context, location, or significant life facts the user stated about themselves.

User: "${userMessage.slice(0, 400)}"
Assistant: "${assistantReply.slice(0, 300)}"

Return JSON only: {"key_name": "value", ...} using snake_case keys. Max 3 facts per exchange. Only extract explicit statements — no inferences. If nothing worth storing, return {}.`;

    const response = await client.messages.create({
      model: MODEL,  // use same model as main conversation
      max_tokens: 150,
      messages: [{ role: 'user', content: extractPrompt }],
    });

    const text = response.content[0].text.trim();
    const jsonMatch = text.match(/\{[^}]*\}/s);
    if (jsonMatch) {
      const extracted = JSON.parse(jsonMatch[0]);
      const keys = Object.keys(extracted);
      if (keys.length > 0) {
        if (!user.memory) user.memory = { facts: {}, updatedAt: null };
        Object.assign(user.memory.facts, extracted);
        user.memory.updatedAt = new Date().toISOString();
        return true;
      }
    }
  } catch (_) {
    // Silent — memory extraction is best-effort, never blocks conversation
  }
  return false;
}

async function validateApiKey(apiKey) {
  try {
    const client = new Anthropic({ apiKey });
    await client.messages.create({
      model: MODEL,
      max_tokens: 10,
      messages: [{ role: 'user', content: 'Hi' }],
    });
    return true;
  } catch {
    return false;
  }
}

// ─── Bot ──────────────────────────────────────────────────────────────────────

const bot = new Telegraf(BOT_TOKEN);
let users = loadUsers();

setInterval(() => saveUsers(users), 30_000);

// ── /start ────────────────────────────────────────────────────────────────────

bot.start(async (ctx) => {
  const userId = String(ctx.from.id);
  const user = getUser(users, userId);
  const rawFirstName = ctx.from.first_name || '';
  const firstName = /[a-zA-Z]/.test(rawFirstName) ? rawFirstName : '';

  // Detect payload type: gift link, package deep link, or generic
  const payload = ctx.startPayload || '';
  const isGift = payload.startsWith('gift_');
  const giftCode = isGift ? payload.slice(5) : null;
  const giftData = giftCode ? gifts[giftCode] : null;
  const packageSlug = !isGift ? payload : (giftData ? giftData.packageSlug : null);
  const packageData = packageSlug && PACKAGES[packageSlug] ? PACKAGES[packageSlug] : null;

  // Reset fully on /start
  user.messageCount = 0;
  user.awaitingKey = false;
  user.awaitingCategoryPick = false;
  user.history = [];
  user.setupComplete = false;
  user.setupStep = 0;
  user.profile = {};
  user.giftFlow = null;

  saveUsers(users);

  // ── Gift link ──────────────────────────────────────────────────────────────
  if (isGift && giftData) {
    const expiry = new Date(giftData.createdAt);
    expiry.setDate(expiry.getDate() + GIFT_EXPIRY_DAYS);
    if (new Date() > expiry) {
      await ctx.reply("This gift link has expired (links are valid for 30 days). Ask them to send a new one, or start fresh at agentstandard.ai");
      return;
    }

    user.profile.name = giftData.recipientName;
    user.profile.packageSlug = giftData.packageSlug;
    user.profile.packageName = packageData ? packageData.name : giftData.packageSlug;
    user.profile.giftedBy = giftData.gifterName;
    user.setupStep = 1; // skip name question — already known
    saveUsers(users);

    const pkg = packageData;
    const note = giftData.note ? `\n\n"${giftData.note}"` : '';
    await ctx.reply(
      `Hi ${giftData.recipientName}! 🎁\n\n${giftData.gifterName} set this up for you.${note}\n\nYour agent is ready — set up as your *${user.profile.packageName}* companion.\n\nOne quick question before we start: what should I call myself? Give me a name — anything you like.`,
      { parse_mode: 'Markdown' }
    );
    return;
  }

  // ── Gift creation link (?start=gift) ──────────────────────────────────────
  if (payload === 'gift') {
    user.giftFlow = { step: 'name' };
    saveUsers(users);
    await ctx.reply(
      `You're creating a gift. Nice.\n\nWho is this for? (First name is fine.)`,
      { parse_mode: 'Markdown' }
    );
    return;
  }

  // ── Package deep link ──────────────────────────────────────────────────────
  if (packageData) {
    user.profile.packageSlug = packageSlug;
    user.profile.packageName = packageData.name;
    saveUsers(users);
    await ctx.reply(
      `Hi ${firstName || 'there'}. You just opened *${packageData.name}*.\n\n_${packageData.tagline}_\n\nTwo minutes of setup — then you're in. What should I call you?`,
      { parse_mode: 'Markdown' }
    );
    return;
  }

  // ── Generic /start ─────────────────────────────────────────────────────────
  const q = SETUP_QUESTIONS[0];
  await ctx.reply(q.question(firstName || 'there'));
});

// ── /reset ────────────────────────────────────────────────────────────────────

bot.command('reset', async (ctx) => {
  const userId = String(ctx.from.id);
  const user = getUser(users, userId);
  user.history = [];
  user.awaitingKey = false;
  saveUsers(users);
  await ctx.reply('Conversation cleared. Fresh start — what\'s on your mind?');
});

// ── /memory ───────────────────────────────────────────────────────────────────

bot.command('memory', async (ctx) => {
  const userId = String(ctx.from.id);
  const user = getUser(users, userId);
  const facts = user.memory && user.memory.facts ? user.memory.facts : {};
  const keys = Object.keys(facts);

  if (keys.length === 0) {
    return ctx.reply("I haven't stored anything specific about you yet. Keep talking to me — I'll build up context over time.\n\nUse /forget to clear memory if you ever want a clean slate.");
  }

  const lines = keys.map(k => `• ${k.replace(/_/g, ' ')}: ${facts[k]}`).join('\n');
  const updated = user.memory.updatedAt ? `\nLast updated: ${new Date(user.memory.updatedAt).toLocaleDateString('en-GB')}` : '';
  await ctx.reply(`Here's what I remember about you:\n\n${lines}${updated}\n\nUse /forget to clear this.`);
});

// ── /forget ───────────────────────────────────────────────────────────────────

bot.command('forget', async (ctx) => {
  const userId = String(ctx.from.id);
  const user = getUser(users, userId);
  user.memory = { facts: {}, updatedAt: null };
  saveUsers(users);
  await ctx.reply('Memory cleared. I\'ve forgotten everything I stored about you — starting fresh.');
});

// ── /status ───────────────────────────────────────────────────────────────────

bot.command('status', async (ctx) => {
  const userId = String(ctx.from.id);
  const user = getUser(users, userId);
  const hasKey = !!user.apiKey;
  const remaining = Math.max(0, FREE_MESSAGE_LIMIT - user.messageCount);

  let msg = `📊 *Your status*\n\n`;
  if (!user.setupComplete) {
    msg += `⏳ Still getting to know you — finish setup first.`;
  } else if (hasKey) {
    msg += `✅ Using your own API key — unlimited messages.`;
  } else {
    msg += `🆓 Free messages remaining: *${remaining}/${FREE_MESSAGE_LIMIT}*`;
    if (remaining === 0) {
      msg += `\n\nYou've used your free messages. Send me your Anthropic API key to continue.`;
    }
  }
  await ctx.reply(msg, { parse_mode: 'Markdown' });
});

// ── Main message handler ───────────────────────────────────────────────────────

bot.on('text', async (ctx) => {
  const userId = String(ctx.from.id);
  const user = getUser(users, userId);
  const text = ctx.message.text.trim();

  // ── Gift flow ──────────────────────────────────────────────────────────────
  if (user.giftFlow) {
    const gf = user.giftFlow;

    if (gf.step === 'name') {
      gf.recipientName = text.trim().split(/\s+/)[0].slice(0, 20);
      gf.step = 'package';
      saveUsers(users);

      const categoryButtons = Object.keys(PACKAGE_CATEGORIES).map(cat => ([{
        text: cat,
        callback_data: `gift_cat:${cat}`
      }]));
      categoryButtons.push([{ text: 'General assistant', callback_data: 'gift_cat:general' }]);
      await ctx.reply(
        `Got it — gifting to *${gf.recipientName}*.\n\nWhich area should their agent focus on?`,
        { parse_mode: 'Markdown', reply_markup: { inline_keyboard: categoryButtons } }
      );
      return;
    }

    if (gf.step === 'note') {
      const skipNote = /^(skip|no|none|-)$/i.test(text.trim());
      gf.note = skipNote ? null : text.trim().slice(0, 200);

      // Create the gift
      const code = generateGiftCode();
      const gifterName = ctx.from.first_name || 'Someone';
      gifts[code] = {
        recipientName: gf.recipientName,
        gifterName: user.profile.name || gifterName,
        packageSlug: gf.packageSlug || null,
        note: gf.note,
        createdAt: new Date().toISOString(),
        redeemedBy: null,
      };
      saveGifts(gifts);
      user.giftFlow = null;
      saveUsers(users);

      const pkgName = gf.packageSlug && PACKAGES[gf.packageSlug] ? PACKAGES[gf.packageSlug].name : 'General assistant';
      const link = `https://t.me/AgentStandardAI_bot?start=gift_${code}`;
      await ctx.reply(
        `✅ *Gift ready for ${gf.recipientName}*\n\n*Package:* ${pkgName}\n*Link:* ${link}\n\nSend them this link. When they open it, their agent will be ready — and it'll say you set it up for them.\n\nLink expires in 30 days.`,
        { parse_mode: 'Markdown' }
      );
      return;
    }

    return;
  }

  // ── Awaiting category/package pick ────────────────────────────────────────
  if (user.awaitingCategoryPick) {
    await ctx.reply("Tap one of the options above — or say /packages to browse everything, or just type to go general.");
    return;
  }

  // ── Setup phase (doesn't count toward message limit) ──────────────────────
  if (!user.setupComplete) {
    const step = user.setupStep;
    const q = SETUP_QUESTIONS[step];

    // ── Correction detection (before saving) ─────────────────────────────────
    // Detects three patterns:
    //   1. Explicit phrase: "make it X", "actually X", "I meant X", etc.
    //   2. Asterisk suffix: "Mr Dream Coach*"  → correction of previous answer
    //   3. Fuzzy match: near-identical spelling to previous answer (Levenshtein ≤ 3)

    // Helper: Levenshtein distance
    function levenshtein(a, b) {
      const m = a.length, n = b.length;
      const dp = Array.from({ length: m + 1 }, (_, i) => [i, ...Array(n).fill(0)]);
      for (let j = 0; j <= n; j++) dp[0][j] = j;
      for (let i = 1; i <= m; i++)
        for (let j = 1; j <= n; j++)
          dp[i][j] = a[i-1] === b[j-1] ? dp[i-1][j-1]
            : 1 + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);
      return dp[m][n];
    }

    // Get previous answer for comparison
    function getPrevAnswer(prevStep) {
      if (prevStep === 0) return user.profile.name || '';
      if (prevStep === 1) return user.profile.agentName || '';
      if (prevStep === 2) return user.profile.context || '';
      if (prevStep === 3) return user.profile.challenge || '';
      return '';
    }

    if (step > 0) {
      const raw = text.trim();
      const prevStep = step - 1;
      const prevAnswer = getPrevAnswer(prevStep);

      // Pattern 1: explicit correction phrase
      const explicitMatch = raw.match(
        /^(?:make it|actually[,\s]+|change it to|i meant|no wait[,\s]*|oops[,\s]*(?:i meant)?|sorry[,\s]*(?:i meant)?|correction[:\s]+|wait[,\s]+(?:make it)?)\s*(.+)/i
      );
      // Pattern 2: asterisk suffix (e.g. "Mr Dream Coach*")
      const asteriskMatch = !explicitMatch && raw.endsWith('*') ? raw.slice(0, -1).trim() : null;
      // Pattern 3: fuzzy match — very similar to previous answer (min length 4, distance ≤ 3)
      const fuzzyTrigger = !explicitMatch && !asteriskMatch && prevAnswer.length >= 4 &&
        levenshtein(raw.toLowerCase(), prevAnswer.toLowerCase()) <= 3;

      const correctedValue = explicitMatch ? explicitMatch[1].trim()
        : asteriskMatch ? asteriskMatch
        : fuzzyTrigger ? raw
        : null;

      if (correctedValue !== null) {
        if (prevStep === 0) {
          const cleaned = correctedValue.replace(/[^a-zA-Z\s'-]/g, '').trim();
          const words = cleaned.split(/\s+/).filter(Boolean);
          user.profile.name = (words.length <= 2 ? cleaned : words[words.length - 1]).slice(0, 20);
        } else if (prevStep === 1) {
          const cleaned = correctedValue.replace(/[^a-zA-Z0-9\s'-]/g, '').trim();
          user.profile.agentName = cleaned.slice(0, 30) || 'your assistant';
        } else if (prevStep === 2) {
          user.profile.context = correctedValue.slice(0, 500);
        } else if (prevStep === 3) {
          user.profile.challenge = correctedValue.slice(0, 500);
        }
        const confirmPrefix = prevStep === 1
          ? `Got it — I'll go by *${user.profile.agentName}*.\n\n`
          : prevStep === 0
          ? `Updated — I'll call you *${user.profile.name}*.\n\n`
          : `Updated.\n\n`;
        const currQ = SETUP_QUESTIONS[step];
        const currQText = currQ.question(user.profile.agentName || user.profile.name || 'there');
        saveUsers(users);
        return ctx.reply(confirmPrefix + currQText, { parse_mode: 'Markdown' });
      }
    }

    // Save the answer
    if (step === 0) {
      // Extract a clean name — strip punctuation, cap at 20 chars
      const raw = text.trim().replace(/[^a-zA-Z\s'-]/g, '').trim();
      const words = raw.split(/\s+/).filter(Boolean);
      const extracted = words.length === 0 ? '' : words.length <= 2 ? raw : words[words.length - 1];
      user.profile.name = extracted.slice(0, 20);
    } else if (step === 1) {
      // Agent name — clean it up, cap at 20 chars
      const raw = text.trim().replace(/[^a-zA-Z0-9\s'-]/g, '').trim();
      user.profile.agentName = raw.slice(0, 20) || 'your assistant';
    } else if (step === 2) {
      user.profile.context = text.trim().slice(0, 500);
    } else if (step === 3) {
      user.profile.challenge = text.trim().slice(0, 500);
    } else if (step === 4) {
      user.profile.style = text.trim().slice(0, 200);
    } else if (step === 5) {
      // Tenets — allow skip
      const skip = /^(skip|none|no|nope|nothing|n\/a|-)$/i.test(text.trim());
      user.profile.tenets = skip ? null : text.trim().slice(0, 500);
    } else if (step === 6) {
      user.profile.goal = text.trim().slice(0, 500);
    }

    user.setupStep += 1;

    if (user.setupStep < SETUP_QUESTIONS.length) {
      // After name (step 0 → step 1): if no package deep link, offer category picker
      if (user.setupStep === 1 && !user.profile.packageSlug) {
        saveUsers(users);
        const categoryButtons = Object.keys(PACKAGE_CATEGORIES).map(cat => ([{
          text: cat,
          callback_data: `cat:${cat}`
        }]));
        // Add "General assistant" option
        categoryButtons.push([{ text: 'General assistant (no specific focus)', callback_data: 'cat:general' }]);
        await ctx.reply(
          `Good to meet you, ${user.profile.name || 'you'}.\n\nBefore I ask anything else — would you like me focused on a specific area of your life, or are you happy with a general assistant?\n\nTap an area to see what's available, or go general if you're not sure yet.`,
          {
            reply_markup: { inline_keyboard: categoryButtons }
          }
        );
        user.awaitingCategoryPick = true;
        saveUsers(users);
        return;
      }

      // Ask next question — pass the right context variable for each step
      const nextQ = SETUP_QUESTIONS[user.setupStep];
      const nextStep = user.setupStep;
      let arg;
      if (nextStep === 1) arg = user.profile.name || ctx.from.first_name || 'there';
      else if (nextStep === 2) arg = user.profile.agentName || 'I';
      else arg = '';
      const nextQuestion = nextQ.question(arg);
      saveUsers(users);
      await ctx.reply(nextQuestion);
    } else {
      // Setup complete — launch into conversation
      user.setupComplete = true;
      saveUsers(users);

      const name = user.profile.name || ctx.from.first_name || 'there';
      const agentName = user.profile.agentName || 'I';
      const tenetsAck = user.profile.tenets ? `${agentName} has your rules. ` : '';
      const goalAck = user.profile.goal ? `90-day goal noted. ` : '';
      const giftedBy = user.profile.giftedBy
        ? `${user.profile.giftedBy} gave you a good one.\n\n`
        : '';

      // If the package has a distinctive firstMessage, use it; otherwise default
      const activePkg = user.profile.packageSlug && PACKAGES[user.profile.packageSlug];
      const firstMsg = (activePkg && activePkg.firstMessage)
        ? activePkg.firstMessage.replace(/{name}/g, name)
        : `I've got everything I need. You have ${FREE_MESSAGE_LIMIT} free messages, ${name}. What do you want to start with?`;

      await ctx.reply(`${giftedBy}${tenetsAck}${goalAck}${firstMsg}`);
    }
    return;
  }

  // ── Awaiting API key ───────────────────────────────────────────────────────
  if (user.awaitingKey) {
    const candidate = text.trim();

    if (!candidate.startsWith('sk-ant-')) {
      await ctx.reply(
        "That doesn't look like an Anthropic key — they start with `sk-ant-`. Paste your key and I'll get you set up.",
        { parse_mode: 'Markdown' }
      );
      return;
    }

    await ctx.reply('Checking your key…');

    const valid = await validateApiKey(candidate);
    if (!valid) {
      await ctx.reply(
        "That key didn't work — it might be invalid or not yet active. Check it at console.anthropic.com/api-keys and try again."
      );
      return;
    }

    user.apiKey = candidate;
    user.awaitingKey = false;
    saveUsers(users);

    await ctx.reply('✅ Key saved — unlimited messages from here. What do you want to work on?');
    return;
  }

  // ── Free message limit hit ─────────────────────────────────────────────────
  if (!user.apiKey && user.messageCount >= FREE_MESSAGE_LIMIT) {
    user.awaitingKey = true;
    saveUsers(users);

    const packageName = user.profile.packageName ? ` as your ${user.profile.packageName} companion` : '';
    await ctx.reply(
      `You've used your ${FREE_MESSAGE_LIMIT} free messages${packageName} — glad it's been useful.\n\n` +
      `*Two ways to keep going:*\n\n` +
      `1️⃣ *Add your own API key* — free to get, takes 30 seconds:\n` +
      `👉 console.anthropic.com/api-keys\n` +
      `Paste it here and you're back.\n\n` +
      `2️⃣ *Know someone who'd find this useful?*\n` +
      `Share agentstandard.ai with them. The more people using it, the more free messages we can keep offering.\n\n` +
      `Paste your API key below whenever you're ready.`,
      { parse_mode: 'Markdown' }
    );
    return;
  }

  // ── Normal conversation ────────────────────────────────────────────────────
  const apiKey = user.apiKey || PLATFORM_API_KEY;
  await ctx.sendChatAction('typing');

  try {
    const reply = await callClaude(apiKey, user.history, text, user.profile, user.memory);

    user.history.push(
      { role: 'user', content: text },
      { role: 'assistant', content: reply }
    );
    if (user.history.length > MAX_HISTORY) {
      user.history = user.history.slice(user.history.length - MAX_HISTORY);
    }

    if (!user.apiKey) {
      user.messageCount += 1;
    }

    saveUsers(users);
    await ctx.reply(reply);

    // Background memory extraction — non-blocking, stores facts for future sessions
    extractMemoryFacts(apiKey, text, reply, user).then(extracted => {
      if (extracted) saveUsers(users);
    }).catch(() => {});

    // Warn at 5 remaining
    if (!user.apiKey && user.messageCount === FREE_MESSAGE_LIMIT - 5) {
      await ctx.reply(
        `_(5 free messages left — add your own API key any time to keep going)_`,
        { parse_mode: 'Markdown' }
      );
    }

  } catch (err) {
    console.error('Claude error:', err.message);

    if (err.status === 401) {
      if (user.apiKey) {
        user.apiKey = null;
        user.awaitingKey = true;
        saveUsers(users);
        await ctx.reply('Your API key seems to have been revoked. Paste a new one from console.anthropic.com/api-keys.');
      } else {
        await ctx.reply("There's an issue with the platform key right now. Try again in a moment.");
      }
    } else if (err.status === 429) {
      await ctx.reply("Rate limited — give it a few seconds and try again.");
    } else {
      await ctx.reply("Something went wrong on my end. Try again in a moment.");
    }
  }
});

// ── /gift ─────────────────────────────────────────────────────────────────────

bot.command('gift', async (ctx) => {
  const userId = String(ctx.from.id);
  const user = getUser(users, userId);

  user.giftFlow = { step: 'name' };
  saveUsers(users);

  await ctx.reply(
    `🎁 *Gift an agent*\n\nYou're setting up an agent for someone else. They'll get a link — when they open it, their agent will be ready and waiting.\n\nWhat's their name?`,
    { parse_mode: 'Markdown' }
  );
});

// ── Callback queries (inline keyboard taps) ──────────────────────────────────

bot.on('callback_query', async (ctx) => {
  const userId = String(ctx.from.id);
  const user = getUser(users, userId);
  const data = ctx.callbackQuery.data || '';

  await ctx.answerCbQuery();

  // Gift flow — category tap
  if (data.startsWith('gift_cat:')) {
    const cat = data.slice(9);
    if (!user.giftFlow) return;

    if (cat === 'general') {
      user.giftFlow.packageSlug = null;
      user.giftFlow.step = 'note';
      saveUsers(users);
      await ctx.reply(
        `General assistant — good choice for a first agent.\n\nWant to add a personal note? They'll see it when they open the link. (Say skip to leave it out.)`,
      );
      return;
    }

    const slugs = PACKAGE_CATEGORIES[cat] || [];
    const pkgButtons = slugs.map(slug => {
      const pkg = PACKAGES[slug];
      return [{ text: `${pkg.name} — ${pkg.tagline}`, callback_data: `gift_pkg:${slug}` }];
    });
    pkgButtons.push([{ text: '← Back', callback_data: `gift_cat:back` }]);
    await ctx.reply(
      `*${cat} packages:*`,
      { parse_mode: 'Markdown', reply_markup: { inline_keyboard: pkgButtons } }
    );
    return;
  }

  if (data === 'gift_cat:back') {
    if (!user.giftFlow) return;
    const categoryButtons = Object.keys(PACKAGE_CATEGORIES).map(cat => ([{
      text: cat, callback_data: `gift_cat:${cat}`
    }]));
    categoryButtons.push([{ text: 'General assistant', callback_data: 'gift_cat:general' }]);
    await ctx.reply('Which area?', { reply_markup: { inline_keyboard: categoryButtons } });
    return;
  }

  if (data.startsWith('gift_pkg:')) {
    const slug = data.slice(9);
    if (!user.giftFlow || !PACKAGES[slug]) return;
    user.giftFlow.packageSlug = slug;
    user.giftFlow.step = 'note';
    saveUsers(users);
    await ctx.reply(
      `*${PACKAGES[slug].name}* — great pick.\n\nWant to add a personal note for ${user.giftFlow.recipientName}? They'll see it when they open the link. (Say skip to leave it out.)`,
      { parse_mode: 'Markdown' }
    );
    return;
  }

  // Category tap — show packages in that category
  if (data.startsWith('cat:')) {
    const cat = data.slice(4);

    if (cat === 'general') {
      user.awaitingCategoryPick = false;
      saveUsers(users);
      // Continue with normal setup from step 1 (agent name)
      const q = SETUP_QUESTIONS[1];
      await ctx.reply(q.question(user.profile.name || 'you'));
      return;
    }

    const slugs = PACKAGE_CATEGORIES[cat] || [];
    if (slugs.length === 0) {
      await ctx.reply('Nothing in that category yet. Tap general to continue.');
      return;
    }

    const pkgButtons = slugs.map(slug => {
      const pkg = PACKAGES[slug];
      return [{ text: `${pkg.name} — ${pkg.tagline}`, callback_data: `pkg:${slug}` }];
    });
    pkgButtons.push([{ text: '← Back to categories', callback_data: 'cat:back' }]);

    await ctx.reply(
      `*${cat} packages:*\n\nTap one to use it as your starting point. You can always change direction later.`,
      { parse_mode: 'Markdown', reply_markup: { inline_keyboard: pkgButtons } }
    );
    return;
  }

  // Back to categories
  if (data === 'cat:back') {
    const categoryButtons = Object.keys(PACKAGE_CATEGORIES).map(cat => ([{
      text: cat,
      callback_data: `cat:${cat}`
    }]));
    categoryButtons.push([{ text: 'General assistant (no specific focus)', callback_data: 'cat:general' }]);
    await ctx.reply(
      'Which area would you like to focus on?',
      { reply_markup: { inline_keyboard: categoryButtons } }
    );
    return;
  }

  // Package tap — load that package's system prompt and continue setup
  if (data.startsWith('pkg:')) {
    const slug = data.slice(4);
    const pkg = PACKAGES[slug];
    if (!pkg) {
      await ctx.reply('Package not found. Try /packages to browse.');
      return;
    }

    user.profile.packageSlug = slug;
    user.profile.packageName = pkg.name;
    user.awaitingCategoryPick = false;
    saveUsers(users);

    // Continue with agent name question (step 1)
    const q = SETUP_QUESTIONS[1];
    await ctx.reply(
      `${pkg.name} it is.\n\n${q.question(user.profile.name || 'you')}`
    );
    return;
  }
});

// ── /help ─────────────────────────────────────────────────────────────────────

bot.command('help', async (ctx) => {
  await ctx.reply(
    `Here's what you can do:\n\n` +
    `💬 *Just talk* — send any message. I remember your full conversation.\n\n` +
    `📦 */packages* — browse all 30+ agent packages. Each one gives your agent a specialised set of skills for a specific area of life.\n\n` +
    `🧠 */memory* — see what I've stored about you from previous conversations.\n\n` +
    `🗑 */forget* — clear everything I've stored. Clean slate.\n\n` +
    `🔄 */reset* — clear conversation history. Your profile and memory stay intact.\n\n` +
    `📊 */status* — see your usage and message count.\n\n` +
    `You get ${FREE_MESSAGE_LIMIT} free messages. After that, add your Anthropic API key to continue: console.anthropic.com/api-keys\n\n` +
    `agentstandard.ai ✦`,
    { parse_mode: 'Markdown' }
  );
});

// ── /packages ────────────────────────────────────────────────────────────────

bot.command('packages', async (ctx) => {
  const grouped = {
    'Health': ['gp-prep', 'supplement-stack', 'sleep-coach', 'fitness-log'],
    'Productivity': ['week-in-review', 'memory-architect', 'ops-chief', 'daily-journal'],
    'Lifestyle': ['wine-log', 'taste-map', 'home-stack', 'pantry-chef', 'travel-planner'],
    'Social': ['relationship-graph', 'network-pulse', 'gift-curator'],
    'Learning': ['skill-tracker', 'book-brain', 'read-it-later', 'habit-builder'],
    'Career': ['salary-scout', 'job-hunt-agent', 'freelancer-guard'],
    'Builder': ['idea-validator', 'deep-researcher', 'content-studio', 'launch-stack', 'vibe-coder', 'data-analyst'],
    'Finance': ['bid-auditor'],
    'Trust': ['agent-transparency'],
  };

  let msg = `📦 *AgentStandard Packages*\n\nEach package shapes your agent for a specific part of your life. Tap a link to start that agent — it takes 2 minutes to set up.\n\n`;

  for (const [vertical, slugs] of Object.entries(grouped)) {
    msg += `*${vertical}*\n`;
    for (const slug of slugs) {
      const pkg = PACKAGES[slug];
      if (pkg) {
        msg += `• [${pkg.name}](https://t.me/AgentStandardAI_bot?start=${slug}) — ${pkg.tagline}\n`;
      }
    }
    msg += '\n';
  }

  msg += `Browse all packages at agentstandard.ai`;

  await ctx.reply(msg, { parse_mode: 'Markdown', disable_web_page_preview: true });
});

// ─── Deploy & GitHub commands ─────────────────────────────────────────────────

bot.command('setdeploy', async (ctx) => {
  const userId = String(ctx.from.id);
  const user = getUser(users, userId);
  if (!user.setupComplete) return ctx.reply('Finish setup first.');
  const url = ctx.message.text.split(' ').slice(1).join(' ').trim();
  if (!url || !url.startsWith('http')) {
    return ctx.reply('Paste your Vercel deploy hook URL:\n`/setdeploy https://api.vercel.com/v1/integrations/deploy/...`\n\nFind it in Vercel → Project Settings → Git → Deploy Hooks.', { parse_mode: 'Markdown' });
  }
  user.profile.deployHook = url;
  saveUsers(users);
  await ctx.reply('✅ Deploy hook saved. Use `/deploy` to trigger a redeploy anytime.', { parse_mode: 'Markdown' });
});

bot.command('deploy', async (ctx) => {
  const userId = String(ctx.from.id);
  const user = getUser(users, userId);
  if (!user.setupComplete) return ctx.reply('Finish setup first.');
  if (!user.profile.deployHook) {
    return ctx.reply('No deploy hook set yet.\n\nGo to Vercel → Project Settings → Git → Deploy Hooks, create one, then send:\n`/setdeploy <url>`', { parse_mode: 'Markdown' });
  }
  await ctx.sendChatAction('typing');
  const ok = await triggerDeploy(user.profile.deployHook).catch(() => false);
  if (ok) {
    await ctx.reply('🚀 Deploy triggered — Vercel is building. Usually live in 1-2 minutes.');
  } else {
    await ctx.reply('❌ Deploy hook failed. Check the URL is still valid in your Vercel project settings.');
  }
});

bot.command('setrepo', async (ctx) => {
  const userId = String(ctx.from.id);
  const user = getUser(users, userId);
  if (!user.setupComplete) return ctx.reply('Finish setup first.');
  const input = ctx.message.text.split(' ').slice(1).join(' ').trim();
  const slug = parseRepoSlug(input);
  if (!slug) {
    return ctx.reply('Send your GitHub repo URL:\n`/setrepo https://github.com/you/your-repo`', { parse_mode: 'Markdown' });
  }
  if (!user.profile.github) user.profile.github = {};
  user.profile.github.repo = slug;
  saveUsers(users);
  const hasPat = !!(user.profile.github && user.profile.github.pat);
  const next = hasPat
    ? 'All set — try `/edit change the button colour to blue`.'
    : 'Now add your GitHub token so I can read and edit your code:\n`/setpat ghp_your_token`\n\nGet one at github.com/settings/tokens — needs *Contents: Read & Write* on this repo.';
  await ctx.reply(`✅ Repo set to \`${slug}\`.\n\n${next}`, { parse_mode: 'Markdown' });
});

bot.command('setpat', async (ctx) => {
  const userId = String(ctx.from.id);
  const user = getUser(users, userId);
  if (!user.setupComplete) return ctx.reply('Finish setup first.');
  const token = ctx.message.text.split(' ').slice(1).join(' ').trim();
  if (!token || (!token.startsWith('ghp_') && !token.startsWith('github_pat_'))) {
    return ctx.reply('Send your GitHub personal access token:\n`/setpat ghp_your_token_here`\n\nGet one at github.com/settings/tokens → Fine-grained tokens → Contents: Read & Write.\n\n⚠️ Scope it to only this repo. Stored securely on our server.', { parse_mode: 'Markdown' });
  }
  if (!user.profile.github) user.profile.github = {};
  user.profile.github.pat = token;
  saveUsers(users);
  const hasRepo = !!(user.profile.github && user.profile.github.repo);
  const next = hasRepo
    ? 'All set — try `/edit change the hero text to say "Follow your dreams"`.'
    : 'Now add your repo:\n`/setrepo https://github.com/you/your-repo`';
  await ctx.reply(`✅ GitHub token saved.\n\n${next}`, { parse_mode: 'Markdown' });
});

bot.command('edit', async (ctx) => {
  const userId = String(ctx.from.id);
  const user = getUser(users, userId);
  if (!user.setupComplete) return ctx.reply('Finish setup first.');

  const instruction = ctx.message.text.split(' ').slice(1).join(' ').trim();
  if (!instruction) {
    return ctx.reply('Tell me what to change:\n`/edit make the button say "Start your journey"`', { parse_mode: 'Markdown' });
  }

  const g = user.profile.github;
  if (!g || !g.repo || !g.pat) {
    const steps = [];
    if (!g || !g.repo) steps.push('`/setrepo <github-url>`');
    if (!g || !g.pat) steps.push('`/setpat <github-token>`');
    return ctx.reply(`Connect your GitHub repo first:\n${steps.join('\n')}`, { parse_mode: 'Markdown' });
  }

  await ctx.sendChatAction('typing');
  await ctx.reply(`🔍 Looking at your code for: _"${instruction}"_`, { parse_mode: 'Markdown' });

  try {
    const { files, branch } = await listFiles(g.pat, g.repo);
    if (!files.length) return ctx.reply('No editable files found in your repo. Check the repo URL and token permissions.');

    const apiKey = user.apiKey || PLATFORM_API_KEY;
    const targetFiles = await pickFiles(apiKey, files, instruction);

    if (!targetFiles.length) {
      return ctx.reply("Couldn't identify the right file to edit. Try being more specific — mention the component, page, or section name.");
    }

    const changes = [];
    for (const filePath of targetFiles) {
      await ctx.sendChatAction('typing');
      const { content: oldContent, sha } = await readFile(g.pat, g.repo, filePath, branch);
      const newContent = await generateChange(apiKey, filePath, oldContent, instruction);
      if (newContent.trim() !== oldContent.trim()) {
        changes.push({ filePath, oldContent, newContent, sha });
      }
    }

    if (!changes.length) {
      return ctx.reply('Looked at the files but no changes were needed — or the change was already in place. Try rephrasing.');
    }

    // Store pending edit
    user.pendingEdit = { instruction, changes, branch };
    saveUsers(users);

    // Build diff preview
    let preview = `*Proposed changes for:* _${instruction}_\n\n`;
    for (const c of changes) {
      const diff = formatDiff(c.oldContent, c.newContent);
      preview += `📄 \`${c.filePath}\`\n\`\`\`diff\n${diff}\n\`\`\`\n\n`;
    }
    if (preview.length > 3600) preview = preview.slice(0, 3600) + '\n_(preview truncated)_\n\n';

    const deployNote = user.profile.deployHook ? '🚀 Will auto-deploy after commit.\n\n' : '_(Add `/setdeploy <url>` to auto-deploy after commit)_\n\n';

    await ctx.reply(preview + deployNote + 'Does this look right?', {
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [[
          { text: '✅ Commit & deploy', callback_data: 'edit_confirm' },
          { text: '❌ Cancel', callback_data: 'edit_cancel' }
        ]]
      }
    });

  } catch (err) {
    console.error('Edit error:', err.message);
    await ctx.reply(`Something went wrong: ${err.message}`);
  }
});

bot.action('edit_confirm', async (ctx) => {
  const userId = String(ctx.from.id);
  const user = getUser(users, userId);
  if (!user.pendingEdit) return ctx.answerCbQuery('No pending edit found.');

  await ctx.answerCbQuery('Committing...');
  await ctx.editMessageReplyMarkup({ inline_keyboard: [] });
  await ctx.reply('⏳ Committing to GitHub...');

  try {
    const { instruction, changes, branch } = user.pendingEdit;
    const g = user.profile.github;

    for (const c of changes) {
      await writeFile(g.pat, g.repo, c.filePath, c.newContent, c.sha, instruction, branch);
    }

    user.pendingEdit = null;

    if (user.profile.deployHook) {
      await ctx.reply('✅ Committed. Triggering deploy...');
      const ok = await triggerDeploy(user.profile.deployHook).catch(() => false);
      saveUsers(users);
      if (ok) {
        await ctx.reply('🚀 Deployed! Your site will be live in about a minute.');
      } else {
        await ctx.reply('✅ Committed to GitHub, but the deploy hook failed. Trigger manually in Vercel or check the hook URL.');
      }
    } else {
      saveUsers(users);
      await ctx.reply(`✅ Committed to \`${g.repo}\`.\n\nAdd a deploy hook with \`/setdeploy <url>\` to auto-deploy next time.`, { parse_mode: 'Markdown' });
    }
  } catch (err) {
    console.error('Commit error:', err.message);
    user.pendingEdit = null;
    saveUsers(users);
    await ctx.reply(`❌ Commit failed: ${err.message}`);
  }
});

bot.action('edit_cancel', async (ctx) => {
  const userId = String(ctx.from.id);
  const user = getUser(users, userId);
  user.pendingEdit = null;
  saveUsers(users);
  await ctx.answerCbQuery('Cancelled');
  await ctx.editMessageReplyMarkup({ inline_keyboard: [] });
  await ctx.reply('Edit cancelled. What else can I help with?');
});

// ─── Launch ───────────────────────────────────────────────────────────────────

// ── Model validation on startup ───────────────────────────────────────────────
// Queries /v1/models to confirm the configured model exists on this API key.
// If not, logs a loud error and alerts Jackson via Telegram — never silently fails.
async function validateModel() {
  try {
    const res = await fetch('https://api.anthropic.com/v1/models', {
      headers: {
        'x-api-key': PLATFORM_API_KEY,
        'anthropic-version': '2023-06-01'
      }
    });
    const data = await res.json();
    const available = (data.data || []).map(m => m.id);
    if (!available.includes(MODEL)) {
      const msg = `⚠️ AgentStandard bot started with INVALID model: \`${MODEL}\`\n\nAvailable models on this key:\n${available.map(m => `• ${m}`).join('\n')}\n\nUpdate ANTHROPIC_MODEL in .env and restart with --update-env.`;
      console.error('❌  MODEL VALIDATION FAILED:', MODEL);
      console.error('    Available:', available.join(', '));
      // Alert Jackson
      if (process.env.JACKSON_CHAT_ID) {
        await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ chat_id: process.env.JACKSON_CHAT_ID, text: msg, parse_mode: 'Markdown' })
        }).catch(() => {});
      }
    } else {
      console.log(`    Model validated:    ${MODEL} ✓`);
    }
  } catch (err) {
    console.warn('    Model validation skipped (could not reach /v1/models):', err.message);
  }
}

bot.launch()
  .then(async () => {
    console.log('✅  AgentStandard bot started');
    console.log(`    Model:              ${MODEL}`);
    console.log(`    Free messages:      ${FREE_MESSAGE_LIMIT} per user (setup questions free)`);
    console.log(`    Input cap:          ${MAX_INPUT_CHARS} chars`);
    console.log(`    Output cap:         ${MAX_OUTPUT_TOKENS} tokens`);
    console.log(`    Data file:          ${DATA_FILE}`);
    console.log('    Press Ctrl+C to stop.\n');
    await validateModel();
  })
  .catch((err) => {
    console.error('❌  Failed to start bot:', err.message);
    process.exit(1);
  });

process.once('SIGINT', () => { saveUsers(users); bot.stop('SIGINT'); });
process.once('SIGTERM', () => { saveUsers(users); bot.stop('SIGTERM'); });
