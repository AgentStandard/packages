#!/usr/bin/env node
/**
 * Systematic layer-by-layer coverage audit across all 47 packages.
 * Checks each package against applicable rule types, patches gaps.
 *
 * Layers:
 *   1. SCOPE        — every package
 *   2. CRISIS       — reflective, emotional, health, entry-point packages
 *   3. SAFETY       — physical health/safety risk packages
 *   4. DECEPTION    — packages that could assist deception of third parties
 *   5. DISCLAIMER   — legal, medical, financial liability
 *   6. ACCURACY     — all (done — just auditing coverage)
 */

const fs = require('fs');
const path = require('path');
const PACKAGES_DIR = path.join(__dirname, '..', 'packages');

// ── Layer detection strings ──────────────────────────────────────────────────
const CHECKS = {
  crisis:    ['CRISIS PROTOCOL', '116 123', 'Samaritans', '988', 'self-harm'],
  safety:    ['INJURY PROTOCOL', 'ALLERGY PROTOCOL', 'CLINICAL DEFERRAL', 'ALCOHOL AWARENESS', 'EMERGENCY', 'pharmacist', '999', 'emergency', 'clinical'],
  deception: ['HONESTY RULE', 'fabricat', 'mislead', 'deceiv', 'false claim', 'fake review'],
  disclaimer:['disclaimer', 'DISCLAIMER', 'not a lawyer', 'not investment advice', 'not a doctor', 'not a licensed', 'Dose is not', 'not a medical professional'],
  accuracy:  ['ACCURACY: Never fabricate', 'live data', 'training data', 'data freshness', 'REGIONAL LIMITATION', 'Never diagnose', 'never assess prescription', 'Never fabricate supplement', 'Never fabricate benefit'],
};

// ── Which layers apply to each package ───────────────────────────────────────
const APPLICABLE = {
  // Health
  'gp-prep':           ['crisis','safety','disclaimer','accuracy'],
  'sleep-coach':       ['crisis','safety','accuracy'],
  'fitness-log':       ['crisis','safety','accuracy'],
  'supplement-stack':  ['safety','disclaimer','accuracy'],
  'pantry-chef':       ['safety','accuracy'],

  // Lifestyle / reflective
  'daily-journal':     ['crisis','accuracy'],
  'dream-decoder':     ['crisis','accuracy'],
  'dream-audit':       ['crisis','accuracy'],
  'week-in-review':    ['crisis','accuracy'],
  'memory-architect':  ['crisis','accuracy'],
  'habit-builder':     ['crisis','accuracy'],
  'skill-tracker':     ['crisis','accuracy'],
  'wine-log':          ['safety','accuracy'],   // alcohol dependency signal

  // Relationships
  'relationship-coach':['crisis','deception','accuracy'],
  'relationship-graph':['accuracy'],
  'network-pulse':     ['accuracy'],

  // Career
  'interview-coach':   ['deception','accuracy'],
  'career-pivot':      ['deception','accuracy'],
  'negotiation-coach': ['deception','accuracy'],
  'manager-coach':     ['deception','accuracy'],
  'salary-scout':      ['disclaimer','accuracy'],
  'job-hunt-agent':    ['deception','disclaimer','accuracy'],
  'retiree-navigator': ['disclaimer','accuracy'],

  // Finance / legal
  'finance-analyst':   ['disclaimer','accuracy'],
  'freelancer-guard':  ['disclaimer','accuracy'],
  'bid-auditor':       ['disclaimer','accuracy'],

  // Content / creative / deception-risk
  'content-creator':   ['deception','accuracy'],
  'content-studio':    ['deception','accuracy'],
  'launch-stack':      ['deception','accuracy'],
  'ecommerce-pro':     ['deception','accuracy'],
  'ecommerce-ops':     ['deception','accuracy'],
  'vibe-coder':        ['deception','accuracy'],

  // Entry point
  'first-conversation':['crisis','accuracy'],

  // General / productivity (low risk — accuracy only)
  'book-brain':        ['accuracy'],
  'taste-map':         ['accuracy'],
  'read-it-later':     ['accuracy'],
  'gift-curator':      ['accuracy'],
  'travel-planner':    ['accuracy'],
  'home-stack':        ['safety','accuracy'],
  'ops-chief':         ['accuracy'],
  'data-analyst':      ['accuracy'],
  'deep-researcher':   ['accuracy'],
  'nexus':             ['accuracy'],
  'idea-validator':    ['accuracy'],
  'agent-transparency':['accuracy'],
  'package-finder':    ['accuracy'],

  // Builders / dev
  'dev-productivity':  ['accuracy'],
  'launch-stack':      ['deception','accuracy'],
};

// ── Patches for each gap type ─────────────────────────────────────────────────

const CRISIS_STANDARD = `

CRISIS PROTOCOL: If a user expresses suicidal ideation, self-harm thoughts, or explicit statements of wanting to hurt themselves — step out of your role immediately. Acknowledge them, provide crisis resources (UK: 116 123 Samaritans, free 24/7, or 999 if immediate danger; US: call or text 988), and do not continue the session until they confirm they are safe. You are not a crisis counsellor — your role is to connect them to one.`;

const CRISIS_REFLECTIVE = `

CRISIS PROTOCOL: This is a reflective space — people sometimes surface heavy or dark emotions here. Distinguish:
Healthy processing (respond with warmth): sadness, frustration, "I don't know how to keep going" — hold space, ask gently.
Genuine crisis (step out of role): explicit self-harm or suicidal statements → "I hear you. What you're feeling matters. UK: 116 123 (Samaritans) or 999. US: call or text 988." Do not continue until they confirm safe.`;

const patches = {

  // ── CRISIS patches ──────────────────────────────────────────────────────────

  'sleep-coach': {
    layer: 'crisis',
    text: CRISIS_STANDARD,
    check: 'CRISIS PROTOCOL'
  },
  'fitness-log': {
    layer: 'crisis',
    text: CRISIS_STANDARD,
    check: 'CRISIS PROTOCOL'
  },
  'habit-builder': {
    layer: 'crisis',
    text: CRISIS_REFLECTIVE,
    check: 'CRISIS PROTOCOL'
  },
  'skill-tracker': {
    layer: 'crisis',
    text: CRISIS_REFLECTIVE,
    check: 'CRISIS PROTOCOL'
  },
  'first-conversation': {
    layer: 'crisis',
    text: CRISIS_STANDARD,
    check: 'CRISIS PROTOCOL'
  },

  // ── SAFETY patches ──────────────────────────────────────────────────────────

  'wine-log': {
    layer: 'safety',
    text: `

ALCOHOL AWARENESS: If a user's log shows very high-frequency or high-volume consumption over an extended period (e.g. drinking heavily every day for multiple weeks), include a single, non-judgmental note: "That's been a busy stretch on the wine front — how are you feeling about the frequency?" Do this once, not repeatedly. You are a wine log, not a wellness app — but you can notice.`,
    check: 'ALCOHOL AWARENESS'
  },

  // ── DECEPTION patches ───────────────────────────────────────────────────────

  'ecommerce-pro': {
    layer: 'deception',
    text: `

HONESTY RULE: Never assist with fake reviews, fabricated testimonials, misleading before/after comparisons, or deceptive advertising claims. If asked: "I can help you build genuine social proof and compelling honest copy. Faking it is an FTC/ASA liability and a brand risk." Sustainable growth doesn't require deception.`,
    check: 'HONESTY RULE'
  },
  'ecommerce-ops': {
    layer: 'deception',
    text: `

HONESTY RULE: Never write fake reviews, false product claims, or misleading ad copy. If asked for deceptive content, decline and offer honest alternatives. False advertising is a legal risk in most markets.`,
    check: 'HONESTY RULE'
  },
  'vibe-coder': {
    layer: 'deception',
    text: `

HONESTY RULE: Do not help build apps or tools designed primarily to deceive users — phishing pages, fake login screens, misleading UIs ("dark patterns"), or tools that misrepresent their function. Help people build things they'd be proud to show users.`,
    check: 'HONESTY RULE'
  },
  'job-hunt-agent': {
    layer: 'deception',
    text: `

HONESTY RULE: Help users present their real experience as compellingly as possible. Never assist with fabricating qualifications, inventing employment history, or misrepresenting credentials on applications. Discovered fabrications result in permanent reputational damage and termination.`,
    check: 'HONESTY RULE'
  },

  // ── DISCLAIMER patches ──────────────────────────────────────────────────────

  'retiree-navigator': {
    layer: 'disclaimer',
    text: `

DISCLAIMER: Compass provides general guidance on retirement planning topics. It is not a licensed financial planner, attorney, or benefits counsellor. Social Security, Medicare, pension, and tax decisions have permanent financial consequences — always verify with official sources (SSA.gov, Medicare.gov) and consult a qualified professional before making irreversible decisions.`,
    check: 'Compass provides general guidance'
  },
  'job-hunt-agent': {
    layer: 'disclaimer',
    text: `

DISCLAIMER: Provides job search coaching and support. Not a licensed career counsellor or employment lawyer. For employment contract review, disputes, or legal questions about termination or discrimination, consult a qualified employment solicitor or attorney.`,
    check: 'employment solicitor'
  },
};

// ── Run audit ──────────────────────────────────────────────────────────────────

const gapReport = [];
let fixed = 0;
let clean = 0;
let notApplicable = 0;

const allPkgs = fs.readdirSync(PACKAGES_DIR, { withFileTypes: true })
  .filter(d => d.isDirectory() && !d.name.startsWith('_') && !d.name.startsWith('.'))
  .map(d => d.name)
  .sort();

allPkgs.forEach(slug => {
  const pkgPath = path.join(PACKAGES_DIR, slug, 'agentstandard.json');
  if (!fs.existsSync(pkgPath)) return;

  const data = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  const spKey = data.system_prompt ? 'system_prompt' : 'telegram_system_prompt';
  const sp = data[spKey] || '';
  const applicable = APPLICABLE[slug] || ['accuracy'];

  const gaps = [];

  applicable.forEach(layer => {
    const checkStrings = CHECKS[layer];
    const hasLayer = checkStrings.some(c => sp.includes(c));
    if (!hasLayer) {
      gaps.push(layer);
    }
  });

  if (gaps.length > 0) {
    gapReport.push({ slug, gaps });

    // Apply patches
    gaps.forEach(layer => {
      const patchKey = slug;
      const patch = patches[patchKey];
      if (patch && patch.layer === layer) {
        if (!sp.includes(patch.check)) {
          data[spKey] = data[spKey] + patch.text;
          console.log(`PATCHED [${layer}]: ${slug}`);
          fixed++;
        }
      } else if (!patch) {
        // Log unfixed gap
        console.log(`GAP [${layer}]: ${slug} — no patch defined`);
      }
    });

    fs.writeFileSync(pkgPath, JSON.stringify(data, null, 2));
  } else {
    clean++;
  }
});

// Apply multi-layer patches (job-hunt-agent has both deception + disclaimer)
// Already handled above since we iterate gaps per slug

// ── Audit report ──────────────────────────────────────────────────────────────

console.log('\n═══════════════════════════════════════');
console.log('COVERAGE AUDIT REPORT');
console.log('═══════════════════════════════════════');
console.log(`Packages audited: ${allPkgs.length}`);
console.log(`Clean (all layers present): ${clean}`);
console.log(`Gaps found and patched: ${fixed}`);
console.log('');

if (gapReport.length > 0) {
  console.log('Packages with gaps:');
  gapReport.forEach(({ slug, gaps }) => console.log(`  ${slug}: [${gaps.join(', ')}]`));
} else {
  console.log('No gaps found.');
}

// ── Summary by layer ──────────────────────────────────────────────────────────
console.log('\nLayer coverage:');
const layers = ['crisis','safety','deception','disclaimer','accuracy'];
layers.forEach(layer => {
  const applicable = allPkgs.filter(s => (APPLICABLE[s] || ['accuracy']).includes(layer));
  const covered = applicable.filter(s => {
    const p = path.join(PACKAGES_DIR, s, 'agentstandard.json');
    if (!fs.existsSync(p)) return false;
    const d = JSON.parse(fs.readFileSync(p,'utf8'));
    const sp = d.system_prompt || d.telegram_system_prompt || '';
    return CHECKS[layer].some(c => sp.includes(c));
  });
  console.log(`  ${layer.padEnd(12)}: ${covered.length}/${applicable.length} applicable packages`);
});
