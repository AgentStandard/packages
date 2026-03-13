#!/usr/bin/env node
/**
 * Wires 14 missing packages into App.jsx
 * Reads from agentstandard.json manifests and persona-names.json
 * Also fixes the finance-analyst duplicate
 */

const fs = require('fs');
const path = require('path');

const PACKAGES_DIR = path.join(__dirname, '..', 'packages');
const APP_JSX = path.join(__dirname, '..', 'tmp_app.jsx');

const personaNames = JSON.parse(
  fs.readFileSync(path.join(PACKAGES_DIR, '_meta', 'persona-names.json'), 'utf8')
);

const missing = [
  'career-pivot',
  'daily-journal',
  'dream-decoder',
  'ecommerce-pro',
  'fitness-log',
  'habit-builder',
  'interview-coach',
  'manager-coach',
  'negotiation-coach',
  'package-finder',
  'relationship-coach',
  'retiree-navigator',
  'sleep-coach',
  'travel-planner',
];

// Vertical mapping
const verticals = {
  'career-pivot':      'Career',
  'daily-journal':     'Lifestyle',
  'dream-decoder':     'Lifestyle',
  'ecommerce-pro':     'Business',
  'fitness-log':       'Health',
  'habit-builder':     'Lifestyle',
  'interview-coach':   'Career',
  'manager-coach':     'Career',
  'negotiation-coach': 'Career',
  'package-finder':    'General',
  'relationship-coach':'Lifestyle',
  'retiree-navigator': 'Lifestyle',
  'sleep-coach':       'Health',
  'travel-planner':    'Lifestyle',
};

// Tier mapping
const tiers = {
  'career-pivot':      'Pro',
  'daily-journal':     'Starter',
  'dream-decoder':     'Starter',
  'ecommerce-pro':     'Pro',
  'fitness-log':       'Starter',
  'habit-builder':     'Starter',
  'interview-coach':   'Pro',
  'manager-coach':     'Pro',
  'negotiation-coach': 'Pro',
  'package-finder':    'Starter',
  'relationship-coach':'Pro',
  'retiree-navigator': 'Pro',
  'sleep-coach':       'Starter',
  'travel-planner':    'Starter',
};

// Setup times (minutes)
const setupTimes = {
  'career-pivot':      15,
  'daily-journal':     5,
  'dream-decoder':     5,
  'ecommerce-pro':     20,
  'fitness-log':       5,
  'habit-builder':     5,
  'interview-coach':   10,
  'manager-coach':     10,
  'negotiation-coach': 10,
  'package-finder':    5,
  'relationship-coach':10,
  'retiree-navigator': 15,
  'sleep-coach':       5,
  'travel-planner':    5,
};

// Skills per package
const skillSets = {
  'career-pivot':      [
    { name: 'Gap Analysis', description: 'Honest assessment of what you have vs what you need' },
    { name: 'Network Bridge', description: 'Targeted relationship-building into the new field' },
    { name: 'Narrative Coaching', description: 'How to tell your pivot story compellingly' },
  ],
  'daily-journal':     [
    { name: 'Prompted Reflection', description: 'Smart questions that surface what matters' },
    { name: 'Pattern Recognition', description: 'Spots recurring themes across your entries' },
    { name: 'Memory Continuity', description: 'Remembers your context across sessions' },
  ],
  'dream-decoder':     [
    { name: 'Dream Logging', description: 'Captures and organises dream content over time' },
    { name: 'Symbol Mapping', description: 'Explores recurring imagery and emotional themes' },
    { name: 'Pattern Tracking', description: 'Surfaces themes across multiple dreams' },
  ],
  'ecommerce-pro':     [
    { name: 'Growth Strategy', description: 'Channel-by-channel plan to scale revenue' },
    { name: 'Conversion Audit', description: 'Identifies friction killing your conversion rate' },
    { name: 'Retention Engine', description: 'LTV-focused post-purchase programmes' },
  ],
  'fitness-log':       [
    { name: 'Workout Logging', description: 'Fast, frictionless session tracking' },
    { name: 'Progress Trends', description: 'Spots strength and endurance gains over time' },
    { name: 'Recovery Awareness', description: 'Flags signs of overtraining' },
  ],
  'habit-builder':     [
    { name: 'Habit Design', description: 'Builds habits with the right cue-routine-reward structure' },
    { name: 'Streak Tracking', description: 'Daily accountability without shame spirals' },
    { name: 'Friction Removal', description: 'Identifies what keeps breaking the chain' },
  ],
  'interview-coach':   [
    { name: 'STAR Drilling', description: 'Sharpens your stories under real questioning' },
    { name: 'Pressure Testing', description: 'Simulates the questions you hope they won\'t ask' },
    { name: 'Offer Coaching', description: 'Handles the post-interview negotiation too' },
  ],
  'manager-coach':     [
    { name: 'Situation Analysis', description: 'Cuts through to what\'s actually going on' },
    { name: 'Conversation Prep', description: 'Scripts the hard conversation before you have it' },
    { name: 'Team Dynamics', description: 'Reads interpersonal patterns and flags risks' },
  ],
  'negotiation-coach': [
    { name: 'Anchor Strategy', description: 'Sets the opening number and range correctly' },
    { name: 'Counter Prep', description: 'Anticipates every counter and prepares your response' },
    { name: 'BATNA Mapping', description: 'Knows your walk-away before you sit down' },
  ],
  'package-finder':    [
    { name: 'Needs Matching', description: 'Maps what you want to what\'s available' },
    { name: 'Package Knowledge', description: 'Knows all 47 packages and what they do' },
    { name: 'Smart Suggestions', description: 'Recommends max 2 — never a sales pitch' },
  ],
  'relationship-coach':[
    { name: 'Situation Framing', description: 'Finds the real issue beneath the surface one' },
    { name: 'Communication Coaching', description: 'Scripts what to say and how to say it' },
    { name: 'Pattern Awareness', description: 'Spots recurring dynamics worth addressing' },
  ],
  'retiree-navigator': [
    { name: 'Income Planning', description: 'SS, pension, and withdrawal sequencing' },
    { name: 'Medicare Navigation', description: 'Part A/B/C/D decoded without the jargon' },
    { name: 'Lifestyle Architecture', description: 'Purpose and structure for the non-working years' },
  ],
  'sleep-coach':       [
    { name: 'Sleep Logging', description: 'Tracks bedtime, wake time, and quality over time' },
    { name: 'Hygiene Protocol', description: 'Personalised improvements based on your patterns' },
    { name: 'Trend Analysis', description: 'Spots what\'s consistently helping or hurting' },
  ],
  'travel-planner':    [
    { name: 'Trip Architecture', description: 'Full itinerary built around your travel style' },
    { name: 'Logistics Tracking', description: 'Flights, hotels, and timing in one place' },
    { name: 'Local Intelligence', description: 'What to do, where to eat, what to avoid' },
  ],
};

// Tags per package
const tagSets = {
  'career-pivot':       ['career', 'transition', 'professional development'],
  'daily-journal':      ['reflection', 'mindfulness', 'daily habit'],
  'dream-decoder':      ['dreams', 'reflection', 'psychology'],
  'ecommerce-pro':      ['ecommerce', 'growth', 'revenue', 'shopify'],
  'fitness-log':        ['fitness', 'tracking', 'health'],
  'habit-builder':      ['habits', 'productivity', 'daily routine'],
  'interview-coach':    ['interview', 'career', 'job search'],
  'manager-coach':      ['management', 'leadership', 'teams'],
  'negotiation-coach':  ['negotiation', 'salary', 'career'],
  'package-finder':     ['discovery', 'onboarding', 'general'],
  'relationship-coach': ['relationships', 'communication', 'personal'],
  'retiree-navigator':  ['retirement', 'finance', 'life stage'],
  'sleep-coach':        ['sleep', 'health', 'recovery'],
  'travel-planner':     ['travel', 'planning', 'lifestyle'],
};

// Who it's for
const whoFor = {
  'career-pivot':       'Professionals who want to move into a different field and need a realistic plan, not encouragement.',
  'daily-journal':      'Anyone who wants to think more clearly about their life — no journalling experience required.',
  'dream-decoder':      'People who want to understand what their dreams might be telling them, tracked over time.',
  'ecommerce-pro':      'Store owners doing $10k-$1m+ who want a strategic partner, not just tactical tips.',
  'fitness-log':        'Anyone who trains and wants to track progress without spreadsheets or bloated apps.',
  'habit-builder':      'People who know what they want to change but keep falling off after two weeks.',
  'interview-coach':    'Anyone preparing for a job interview who wants honest feedback, not reassurance.',
  'manager-coach':      'People managers who want a thinking partner for the hard, human parts of leadership.',
  'negotiation-coach':  'Anyone negotiating compensation — whether a new offer, raise, or promotion conversation.',
  'package-finder':     'New users who want to know what AgentStandard can do for them before picking a package.',
  'relationship-coach': 'Anyone navigating something hard with a person they care about.',
  'retiree-navigator':  'People in or approaching retirement who want clarity without jargon.',
  'sleep-coach':        'Anyone who wants to sleep better and actually understand what\'s getting in the way.',
  'travel-planner':     'Travellers who want a thinking partner that knows them — not a generic itinerary generator.',
};

// What it does (3 bullet points)
const whatItDoesSets = {
  'career-pivot':      [
    'Honestly assesses the gap between where you are and where you want to be',
    'Builds a targeted plan to fill the gap through skills, network, and narrative',
    'Coaches you on how to tell your pivot story in a way that lands',
  ],
  'daily-journal':     [
    'Asks the questions that get you past the surface of your day',
    'Spots patterns and themes across your entries over time',
    'Holds your context so every session continues from where you left off',
  ],
  'dream-decoder':     [
    'Captures dream content and builds a log over time',
    'Explores recurring symbols, emotions, and imagery with curiosity — not dogma',
    'Tracks patterns across multiple dreams to surface themes worth exploring',
  ],
  'ecommerce-pro':     [
    'Analyses your store\'s conversion, retention, and unit economics',
    'Builds a channel-specific growth roadmap based on where you actually are',
    'Coaches you on the highest-leverage moves for your stage and constraints',
  ],
  'fitness-log':       [
    'Logs every session with minimal friction — tell it what you did, it handles the rest',
    'Tracks strength and endurance trends so you can see progress clearly',
    'Flags overtraining signals and suggests recovery when the data warrants it',
  ],
  'habit-builder':     [
    'Designs your habit with the right cue, routine, and reward structure',
    'Tracks your streak and checks in daily without nagging',
    'Diagnoses what keeps breaking the chain and adjusts the approach',
  ],
  'interview-coach':   [
    'Drills your STAR stories until they\'re tight and specific',
    'Simulates the questions you hope they won\'t ask — and the ones they always do',
    'Coaches post-interview negotiation when the offer arrives',
  ],
  'manager-coach':     [
    'Analyses the people situation you\'re actually dealing with, not a textbook version',
    'Prepares you word-for-word for the conversation you\'re dreading',
    'Spots patterns in your team dynamics before they become real problems',
  ],
  'negotiation-coach': [
    'Sets your anchor and negotiation range based on your leverage, not hope',
    'Prepares you for every counter they\'re likely to make',
    'Maps your BATNA so you know your walk-away before you sit down',
  ],
  'package-finder':    [
    'Listens to what you\'re trying to solve and matches it to the right package',
    'Knows all 47 certified packages and what each one actually does',
    'Recommends no more than two options — never a sales pitch',
  ],
  'relationship-coach':[
    'Holds space for whatever you\'re dealing with, without rushing to advice',
    'Frames what\'s actually going on and helps you see it more clearly',
    'Coaches you on what to say and how to say it when it matters',
  ],
  'retiree-navigator': [
    'Explains Social Security, Medicare, and pension decisions without the jargon',
    'Builds an income and withdrawal plan around your actual numbers',
    'Helps you think through purpose, structure, and identity in retirement',
  ],
  'sleep-coach':       [
    'Logs your sleep and builds a picture of your patterns over time',
    'Gives you personalised hygiene improvements based on what\'s actually hurting your sleep',
    'Spots what\'s consistently helping or consistently getting in the way',
  ],
  'travel-planner':    [
    'Builds a full itinerary around your travel style, budget, and group',
    'Tracks logistics — flights, hotels, timing — so nothing falls through the gaps',
    'Gives local intelligence that generic guides miss',
  ],
};

// Build package entries
const newEntries = missing.map(slug => {
  const manifestPath = path.join(PACKAGES_DIR, slug, 'agentstandard.json');
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const persona = personaNames[slug] || null;
  const score = manifest.certification ? manifest.certification.score : null;

  const entry = {
    slug,
    name: manifest.name,
    tagline: manifest.tagline,
    vertical: verticals[slug],
    tier: tiers[slug],
    setupTime: setupTimes[slug],
    rating: null,
    installs: 0,
    certified: true,
    health: {
      status: 'healthy',
      lastTested: '2026-03-13',
      forgeScore: score,
      creditScore: 'efficient',
    },
    telegram: true,
    tags: tagSets[slug],
    description: manifest.description,
    whatItDoes: whatItDoesSets[slug],
    whoItsFor: whoFor[slug],
    skills: skillSets[slug],
    userLevel: ['habit-builder','daily-journal','dream-decoder','fitness-log','sleep-coach','travel-planner','package-finder'].includes(slug) ? 'beginner' : 'intermediate',
    keywords: tagSets[slug],
  };

  if (persona) entry.persona = persona;

  return entry;
});

// Serialise to JS object notation (not JSON — App.jsx uses JS object literal syntax)
function serializeEntry(e) {
  const lines = ['  {'];
  lines.push(`    slug: '${e.slug}',`);
  lines.push(`    name: '${e.name.replace(/'/g,"\\'")}',`);
  lines.push(`    tagline: '${e.tagline.replace(/'/g,"\\'")}',`);
  if (e.persona) lines.push(`    persona: '${e.persona}',`);
  lines.push(`    vertical: '${e.vertical}',`);
  lines.push(`    tier: '${e.tier}',`);
  lines.push(`    setupTime: ${e.setupTime},`);
  lines.push(`    rating: null,`);
  lines.push(`    installs: 0,`);
  lines.push(`    certified: true,`);
  lines.push(`    health: { status: 'healthy', lastTested: '2026-03-13', forgeScore: ${e.health.forgeScore}, creditScore: 'efficient' },`);
  lines.push(`    telegram: true,`);
  lines.push(`    tags: [${e.tags.map(t=>`'${t}'`).join(', ')}],`);
  lines.push(`    description: '${e.description.replace(/'/g,"\\'").replace(/\n/g,' ')}',`);
  lines.push(`    whatItDoes: [`);
  e.whatItDoes.forEach(w => lines.push(`      '${w.replace(/'/g,"\\'")}',`));
  lines.push(`    ],`);
  lines.push(`    whoItsFor: '${e.whoItsFor.replace(/'/g,"\\'")}',`);
  lines.push(`    skills: [`);
  e.skills.forEach(s => lines.push(`      { name: '${s.name.replace(/'/g,"\\'")}', description: '${s.description.replace(/'/g,"\\'")}' },`));
  lines.push(`    ],`);
  lines.push(`    userLevel: '${e.userLevel}',`);
  lines.push(`    keywords: [${e.keywords.map(k=>`'${k}'`).join(', ')}],`);
  lines.push(`  },`);
  return lines.join('\n');
}

// Read App.jsx
let src = fs.readFileSync(APP_JSX, 'utf8');

// Fix duplicate finance-analyst (remove the second occurrence)
const firstFA = src.indexOf("slug: 'finance-analyst'");
const secondFA = src.indexOf("slug: 'finance-analyst'", firstFA + 1);
if (secondFA > -1) {
  // Find the start and end of the second entry
  // Go back to find the opening {
  let start = secondFA;
  while (src[start] !== '{') start--;
  // Find the closing },
  let depth = 0, end = start;
  while (end < src.length) {
    if (src[end] === '{') depth++;
    if (src[end] === '}') { depth--; if (depth === 0) break; }
    end++;
  }
  // Include trailing comma and newline
  while (src[end+1] === ',' || src[end+1] === '\n') end++;
  src = src.slice(0, start-2) + src.slice(end+1); // -2 to remove preceding newline + spaces
  console.log('Fixed: duplicate finance-analyst removed');
}

// Find the end of the packages array and insert before it
const arrayEnd = src.lastIndexOf('];', src.indexOf('// End of packages') > -1 ? src.indexOf('// End of packages') : undefined);
// Find closing ]; of the packages array more precisely
// Look for the pattern where packages = [ ends
const pkgArrayIdx = src.indexOf('const packages = [');
// Find the matching ]
let depth = 0, closeIdx = pkgArrayIdx + 'const packages = ['.length;
for (; closeIdx < src.length; closeIdx++) {
  if (src[closeIdx] === '[' || src[closeIdx] === '{') depth++;
  if (src[closeIdx] === ']' || src[closeIdx] === '}') { depth--; if (depth < 0) break; }
}

const newEntriesStr = '\n' + newEntries.map(serializeEntry).join('\n') + '\n';
src = src.slice(0, closeIdx) + newEntriesStr + src.slice(closeIdx);

fs.writeFileSync(APP_JSX, src);
console.log(`Added ${newEntries.length} packages to App.jsx`);
console.log('Slugs added:', newEntries.map(e=>e.slug).join(', '));
