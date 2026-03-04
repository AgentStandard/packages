require('dotenv').config();
const { Telegraf } = require('telegraf');
const Anthropic = require('@anthropic-ai/sdk');
const fs = require('fs');
const path = require('path');
const PACKAGES = require('./packages');

// ─── Config ───────────────────────────────────────────────────────────────────

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const PLATFORM_API_KEY = process.env.ANTHROPIC_API_KEY;
const MODEL = 'claude-haiku-3-5-20241022';
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
function buildSystemPrompt(profile) {
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
      messageCount: 0,     // only counts post-setup conversation messages
      apiKey: null,
      awaitingKey: false,
      history: [],
      // Setup state
      setupComplete: false,
      setupStep: 0,
      awaitingCategoryPick: false,
      giftFlow: null,
      profile: {},         // stores answers: name, use, style
    };
  }
  // Migrate old users without setup fields
  if (users[userId].setupComplete === undefined) {
    users[userId].setupComplete = true; // treat existing users as already set up
    users[userId].setupStep = SETUP_QUESTIONS.length;
    users[userId].profile = {};
  }
  return users[userId];
}



// ─── Claude ───────────────────────────────────────────────────────────────────

async function callClaude(apiKey, history, userMessage, profile) {
  const client = new Anthropic({ apiKey });

  // Truncate input to prevent abuse
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
    system: buildSystemPrompt(profile || {}),
    messages,
  });

  return response.content[0].text;
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

  // ── Package deep link ──────────────────────────────────────────────────────
  if (packageData) {
    user.profile.packageSlug = packageSlug;
    user.profile.packageName = packageData.name;
    saveUsers(users);
    await ctx.reply(
      `Hi ${firstName || 'there'}! You're setting up *${packageData.name}* — ${packageData.tagline}\n\nBefore we start, a couple of quick questions so I can actually be useful to you.\n\nWhat should I call you?`,
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
      const packageIntro = user.profile.packageName
        ? `${agentName} is set up as your ${user.profile.packageName} companion. `
        : '';
      const giftedBy = user.profile.giftedBy
        ? `${user.profile.giftedBy} gave you a good one.\n\n`
        : '';
      await ctx.reply(
        `${giftedBy}${tenetsAck}${goalAck}${packageIntro}I've got everything I need to be useful to you.\n\nYou have ${FREE_MESSAGE_LIMIT} free messages, ${name || 'let\'s go'}. What do you want to start with?`
      );
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
    const reply = await callClaude(apiKey, user.history, text, user.profile);

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
    `Here's what I can do:\n\n` +
    `💬 *Chat* — just send me a message. I remember our full conversation.\n\n` +
    `📦 */packages* — browse all available agent packages. Each one shapes how I work for a specific area of your life.\n\n` +
    `🔄 */reset* — start fresh with a new setup. Clears everything.\n\n` +
    `📊 */status* — see your usage.\n\n` +
    `You have 30 free messages on the platform. After that, add your own Anthropic API key to keep going (console.anthropic.com/api-keys).\n\n` +
    `agentstandard.ai`,
    { parse_mode: 'Markdown' }
  );
});

// ── /packages ────────────────────────────────────────────────────────────────

bot.command('packages', async (ctx) => {
  const grouped = {
    'Health': ['gp-prep', 'supplement-stack'],
    'Productivity': ['week-in-review', 'memory-architect'],
    'Lifestyle': ['wine-log', 'taste-map', 'home-stack'],
    'Social': ['relationship-graph', 'network-pulse', 'gift-curator'],
    'Learning': ['skill-tracker', 'book-brain', 'read-it-later'],
    'Career': ['salary-scout'],
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

// ─── Launch ───────────────────────────────────────────────────────────────────

bot.launch()
  .then(() => {
    console.log('✅  AgentStandard bot started');
    console.log(`    Model:              ${MODEL}`);
    console.log(`    Free messages:      ${FREE_MESSAGE_LIMIT} per user (setup questions free)`);
    console.log(`    Input cap:          ${MAX_INPUT_CHARS} chars`);
    console.log(`    Output cap:         ${MAX_OUTPUT_TOKENS} tokens`);
    console.log(`    Data file:          ${DATA_FILE}`);
    console.log('    Press Ctrl+C to stop.\n');
  })
  .catch((err) => {
    console.error('❌  Failed to start bot:', err.message);
    process.exit(1);
  });

process.once('SIGINT', () => { saveUsers(users); bot.stop('SIGINT'); });
process.once('SIGTERM', () => { saveUsers(users); bot.stop('SIGTERM'); });
