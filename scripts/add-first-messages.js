#!/usr/bin/env node
/**
 * Adds first_message to all packages that are missing one.
 * Uses the package's tagline and description to craft a genuine opening.
 */

const fs = require('fs');
const path = require('path');
const PACKAGES_DIR = path.join(__dirname, '..', 'packages');

// Curated first messages for each package
const firstMessages = {
  'agent-transparency': "What would you like to know about what I know about you? I can run a full /audit, show what's /recent, or surface /gaps.",
  'bid-auditor': "Share your bid package, schedule of values, or line-item breakdown. I'll tell you exactly where the numbers don't match the scope.",
  'book-brain': "What are you reading right now? Tell me the title and I'll start building your reading log.",
  'career-pivot': "What do you do now, and what world do you want to move into?",
  'content-creator': "What are you creating? Tell me the platform, your audience, and what you're trying to say.",
  'content-studio': "Share what you're writing. I'll read it, find what's working and what isn't, and return a version that sounds like you — just sharper.",
  'daily-journal': "What's on your mind today? Or if you'd rather start somewhere — what's one thing from today you don't want to forget?",
  'data-analyst': "Share the report, dataset, or analysis you want me to read. I'll tell you what it actually says — and what's being buried.",
  'deep-researcher': "What do you need to know? Ask me the hard question — I'll research it properly and give you a bottom line you can act on.",
  'dev-productivity': "What do you need? Code review, PR triage, CI failure, or something else?",
  'dream-audit': "What are you building — and what have you actually done on it in the last two weeks?",
  'dream-decoder': "What did you dream about? Tell me whatever you remember — fragments are fine.",
  'ecommerce-ops': "What do you need — product copy, ad creative, competitor analysis, or something else?",
  'ecommerce-pro': "Tell me about your store — platform, product category, monthly revenue range, and what you're trying to solve.",
  'finance-analyst': "What are you looking at? Give me the asset, the question, or the data — I'll work through it with you.",
  'first-conversation': "Hi — I'm your AgentStandard agent. What's your name, and what do you spend most of your time on?",
  'fitness-log': "What did you do today? Tell me your workout and I'll log it. If you haven't trained yet — what's the plan?",
  'freelancer-guard': "Share the contract, scope of work, or email thread. I'll tell you what's risky, what to push back on, and what to ask for.",
  'gift-curator': "Tell me about someone you need a gift for — or just tell me about the people in your life. I'll remember everything.",
  'gp-prep': "Tell me what's going on. I'll help you build a clear, structured brief for your doctor so you make the most of your appointment.",
  'habit-builder': "What habit do you want to build or break? Tell me what you're after — and more importantly, why.",
  'home-stack': "Tell me about your home. What appliances, systems, or maintenance items should I be tracking? Start anywhere.",
  'idea-validator': "Tell me your idea. I'll stress-test it before the market does.",
  'interview-coach': "What role are you interviewing for, and what part of the interview are you most worried about?",
  'job-hunt-agent': "Tell me about your job search — what roles are you pursuing, or where are you starting from?",
  'launch-stack': "Tell me what you're launching — what it is, who it's for, and when you want to go live.",
  'manager-coach': "What's the hardest thing you're dealing with as a manager right now?",
  'memory-architect': "Tell me about yourself — who you are, what you're working on, what matters to you. The more I know, the more useful I become.",
  'negotiation-coach': "What are you negotiating — a raise, a job offer, a promotion, or something else?",
  'network-pulse': "Tell me about the people who matter in your life — professionally and personally. I'll track who you're in touch with and surface anyone who's gone quiet.",
  'nexus': "What do you want to know about what's happening in AI, robotics, biotech, quantum, or energy? Or ask me for this week's brief.",
  'ops-chief': "What needs to happen right now? Meeting prep, email, task list, or weekly review — or just tell me what's on your plate.",
  'package-finder': "Ask me what AgentStandard can do for you, or tell me what you're trying to solve. I know the full package library.",
  'pantry-chef': "What's in your fridge right now? Tell me what you've got and I'll tell you what to cook.",
  'read-it-later': "Share a link or paste an article. I'll summarise it, pull out the key ideas, and add it to your reading log.",
  'relationship-coach': "What's weighing on you?",
  'relationship-graph': "Tell me about someone who matters to you — their name, how you know them, and what's important to them.",
  'retiree-navigator': "Where are you in the retirement process — still working and planning, getting close to leaving, or already out?",
  'salary-scout': "Tell me your role, years of experience, and location. I'll give you a market picture.",
  'skill-tracker': "What skills are you actively building right now? And what do you want to learn next?",
  'sleep-coach': "How did you sleep last night? Tell me the basics — when you went to bed, when you woke up, how it felt.",
  'supplement-stack': "Tell me what you're taking — supplements, vitamins, anything. I'll track your routine and timing.",
  'taste-map': "What have you been into lately? A film, a song, a restaurant, a book — tell me what's been good.",
  'travel-planner': "Where are you going? Tell me the destination and I'll help you plan — but first, what kind of traveller are you?",
  'vibe-coder': "What are you trying to build? Tell me the idea — I'll help you get it out of your head and into something real.",
  'week-in-review': "Tell me about your week. What happened, what didn't, and what's on your mind for next week.",
  'wine-log': "What are you drinking? Tell me the wine and I'll start building your log.",
};

let updated = 0;
let skipped = 0;

Object.entries(firstMessages).forEach(([slug, msg]) => {
  const pkgPath = path.join(PACKAGES_DIR, slug, 'agentstandard.json');
  if (!fs.existsSync(pkgPath)) { console.log(`SKIP (no file): ${slug}`); skipped++; return; }
  
  const data = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  if (data.first_message && data.first_message !== 'undefined') {
    console.log(`SKIP (already has): ${slug}`);
    skipped++;
    return;
  }
  
  data.first_message = msg;
  fs.writeFileSync(pkgPath, JSON.stringify(data, null, 2));
  console.log(`ADDED: ${slug}`);
  updated++;
});

console.log(`\nDone: ${updated} first_messages added, ${skipped} skipped`);
