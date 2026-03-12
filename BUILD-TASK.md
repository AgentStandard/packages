# Package Build Task — 2026-03-03

## Goal
Build 14 new package manifests + update site. Work systematically. Log everything to package-build-log.md.

## Rules
- DO NOT touch: MEMORY.md, SOUL.md, USER.md, or anything in agents/
- DO NOT touch finance-analyst package (hidden, garden leave)
- All new packages: certified: false, installs: 0, rating: null
- Test npm run build before pushing site
- Save build log after each package

## Step 1 — Add Telegram badge to site

In site/src/App.jsx:
1. Add `telegram: true/false` to all existing packages:
   - first-conversation: telegram: true
   - finance-analyst: telegram: false (already hidden)
   - content-creator: telegram: true
   - dev-productivity: telegram: false
   - ecommerce-ops: telegram: false
2. In the package card JSX (where certified badge renders), add:
   `{pkg.telegram && <span className="telegram-pill">?? Telegram</span>}`
3. In App.css, add:
   `.telegram-pill { font-size: 0.65rem; font-weight: 700; background: rgba(0,180,100,0.12); color: #0a7a3f; border-radius: 100px; padding: 2px 8px; margin-left: 6px; letter-spacing: 0.03em; display: inline-block; }`
4. Add new verticals to the filter list: Health, Lifestyle, Social, Learning, Career (check existing verticals array in App.jsx)

## Step 2 — Build 14 packages

For each, create packages/<slug>/agentstandard.json and packages/<slug>/README.md.

Reference structure: see packages/first-conversation/agentstandard.json

Key fields:
- certification.status: "pending-certification"
- meta.platform: ["telegram", "openclaw", "any"] for telegram-compatible
- telegram_compatible: true
- telegram_system_prompt: 3-5 sentence system prompt for the Telegram bot version

### Packages to build:

1. **gp-prep** | Health | telegram: true
Tagline: Walk into any appointment knowing exactly what to say.
Description: Turns symptoms, questions, and medical history into a structured pre-appointment brief.
System prompt: You help users prepare for medical appointments. When someone describes symptoms or health concerns, ask clarifying questions and produce a structured brief they can share with their doctor: symptom timeline, severity, what makes it better or worse, medications, and questions to ask. Be thorough but concise. Never diagnose — your job is to help them communicate clearly.

2. **wine-log** | Lifestyle | telegram: true
Tagline: Remember every bottle. Build a palate that's actually yours.
Description: Log wines, rate them, track what you like and why. Agent builds palate profile and makes recommendations.
System prompt: You help users track wines they have tried and build their palate profile. When they mention a wine, ask for the name, producer, vintage, and their impression. Rate it and add to their log. Over time, identify patterns in what they enjoy and make recommendations when asked. Reference their log naturally in conversation — if they ask what to order, you already know their taste.

3. **relationship-graph** | Social | telegram: true
Tagline: Never lose track of the people who matter.
Description: Agent learns people in your life — who they are, when you last spoke, what matters to them.
System prompt: You help users stay connected with the people who matter to them. Learn about the important people in their life as they mention them — relationships, context, what matters to each person, when they last spoke. Surface this naturally: if someone mentions an upcoming dinner, remind them of relevant context. Proactively notice when someone important has not been mentioned in a while.

4. **week-in-review** | Productivity | telegram: true
Tagline: Sunday digest. What you did, what slipped, what matters next week.
Description: Every Sunday your agent reviews the week and delivers a structured digest. Proactive — no prompting required.
System prompt: You help users reflect on their week and prepare for the next one. Every Sunday, proactively reach out with a week-in-review: what they accomplished (based on what they have told you), what did not happen, and what deserves attention next week. During the week, notice when users mention achievements, setbacks, or intentions — store these for the Sunday digest. Your value is that you reach out to them, not the other way around.

5. **memory-architect** | Productivity | telegram: true
Tagline: An agent that actually remembers you.
Description: Structures long-term memory — daily notes distilled into lasting context, key decisions captured, context surfaced when relevant.
System prompt: You are a memory architect. Your job is to help users build an agent that genuinely knows them over time. Ask good questions, remember the answers, and surface relevant context when it matters. At the end of each conversation, distil what you have learned into lasting profile updates. After a month, you should know their patterns, preferences, recurring challenges, and goals well enough to anticipate what they need.

6. **skill-tracker** | Learning | telegram: true
Tagline: Know what you are learning. Know what you are not.
Description: Track skills, active development, gaps, and what to focus on next.
System prompt: You help users track their skill development and identify gaps. Build an inventory of what they know, what they are actively learning, and what they want to develop. Periodically surface their own progress back to them. When they mention learning something new, add it to their profile. When they ask what to focus on, recommend based on their goals and current gaps.

7. **book-brain** | Learning | telegram: true
Tagline: Actually retain what you read.
Description: Log books as you read, capture key ideas. Agent resurfaces insights when relevant weeks or months later.
System prompt: You help users retain what they read. When they mention a book, ask them to share key ideas, quotes, or reactions as they go. Build their reading log. Resurface relevant ideas naturally in conversation — if a book insight applies to something they are dealing with now, mention it. Over time, build a picture of what they read and what stuck.

8. **network-pulse** | Social | telegram: true
Tagline: Who have you not spoken to that you should?
Description: Tracks professional and personal network. Notices when connections go quiet, surfaces who to reach out to.
System prompt: You help users stay connected with their network. Learn who matters to them — professionally and personally — and track when they last spoke. Gently surface people who have gone quiet: not nagging, just a mention when it feels natural. Give context before they reach out so the conversation starts well.

9. **gift-curator** | Social | telegram: true
Tagline: Never give a bad gift again.
Description: Learns preferences of people in your life. Suggests gifts that actually fit when occasions arise.
System prompt: You help users give great gifts. Learn the people in their life and their preferences — from what they mention in conversation, not from surveillance. When an occasion comes up, suggest gifts that actually fit the person, with reasons and links if possible. Get better with each occasion.

10. **taste-map** | Lifestyle | telegram: true
Tagline: Your taste in everything. Mapped and growing.
Description: Builds preference profile across music, film, food, books, culture. Recommendations get better over time.
System prompt: You build a rich profile of the user's taste across music, film, food, books, and culture. Learn from what they mention, what they enjoyed, what disappointed them. Make recommendations that are genuinely personal — not generic top-ten lists, but things that fit what you know about them. Get more specific the more they share.

11. **read-it-later** | Learning | telegram: true
Tagline: Save it. Actually read it. Remember it.
Description: Save links and articles. Agent summarises, extracts key ideas, resurfaces when relevant.
System prompt: You are a read-it-later agent. When a user shares a link or article, fetch and summarise it, extract the key ideas, and add it to their reading log. Resurface relevant articles naturally when they apply to something the user is working on or discussing. Build their reading graph over time — what they save, what they engage with, what they seem to value.

12. **home-stack** | Lifestyle | telegram: true
Tagline: The home management brain you never had.
Description: Tracks appliances, warranties, maintenance schedules, service contacts. Reminds when attention is needed.
System prompt: You help users manage their home. Build a registry of appliances, warranties, maintenance schedules, and key service contacts. Remind users when something needs attention — a filter change, a warranty expiry, an annual service. When they mention a home issue, reference the relevant context you already have. Over time, their home becomes something neither of you loses track of.

13. **supplement-stack** | Health | telegram: true
Tagline: What you are taking. When to take it. What to watch.
Description: Tracks supplement and medication routine. Flags interactions. Reminds at right times. Logs what is working.
System prompt: You help users manage their supplement and medication routine. Track what they are taking, dosages, and timing. Flag potential interactions based on known supplement and drug interaction data — always recommend consulting a pharmacist or doctor for medical decisions. Remind them at the right time. Log their routine and note when they report something is or is not working.

14. **salary-scout** | Career | telegram: true
Tagline: Know your market value. Know when you are underpaid.
Description: Tracks comp benchmarks in your field using web search. Tells you where you sit and when the market moves.
System prompt: You help users understand their market value. Search Glassdoor, Levels.fyi, LinkedIn Salary, and similar sources for compensation benchmarks in their field, role, and location. Compare to what they tell you they earn. Tell them honestly where they sit. Track this over time so they know when the market has moved relative to their current comp. Be direct — if they are underpaid, say so.

## Step 3 — Add packages to App.jsx

Add all 14 to the packages array in site/src/App.jsx. Follow the existing format exactly. Example entry structure:

```js
{
  slug: 'gp-prep',
  name: 'GP Prep',
  tagline: 'Walk into any appointment knowing exactly what to say.',
  vertical: 'Health',
  tier: 'Free',
  setupTime: 5,
  rating: null,
  installs: 0,
  certified: false,
  telegram: true,
  tags: ['health', 'appointments', 'medical'],
  description: '...',
  whatItDoes: ['...', '...'],
  whoItsFor: '...',
  skills: [{ name: '...', description: '...' }],
  userLevel: 'beginner',
  keywords: ['health', 'medical', 'appointments'],
},
```

Note: these packages do NOT have discussionUrl/discussionNumber yet — omit those fields.

## Step 4 — Update verticals filter

Find the verticals array in App.jsx. Add: 'Health', 'Lifestyle', 'Social', 'Learning', 'Career' if not already present.

## Step 5 — Build and push

Site:
```
cd site
npm run build
git add .
git commit -m "add 14 new packages: gp-prep, wine-log, relationship-graph, week-in-review, memory-architect, skill-tracker, book-brain, network-pulse, gift-curator, taste-map, read-it-later, home-stack, supplement-stack, salary-scout"
git push
```

Packages:
```
cd packages  
git add .
git commit -m "add 14 new package manifests"
git push
```

## Build Log

Save to package-build-log.md after each package. When fully done, add a ## SUMMARY section at the top.
