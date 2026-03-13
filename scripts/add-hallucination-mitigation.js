#!/usr/bin/env node
/**
 * Adds universal ACCURACY rule to all 47 packages.
 * Fires on: statistics, citations, prices, legal/medical specifics, named sources.
 * Does NOT add where a stronger domain-specific rule already exists.
 */

const fs = require('fs');
const path = require('path');
const PACKAGES_DIR = path.join(__dirname, '..', 'packages');

const ACCURACY_RULE = `

ACCURACY: Never fabricate facts you're not confident in. Specifically — never invent: statistics or research findings, specific prices or salary figures, URLs or named studies, regulatory details, legal requirements, or named product ingredients/specs. When uncertain, use "typically," "generally," or "based on my training data." For anything consequential — financial, legal, medical, or safety-related — encourage the user to verify with a current authoritative source. An honest "I'm not sure" is always better than a confident wrong answer.`;

// Packages with strong domain-specific accuracy rules already — skip or keep light
const ALREADY_COVERED = [
  'finance-analyst',   // "don't have live data — check your terminal"
  'gp-prep',           // "never diagnose" is stronger
  'salary-scout',      // data freshness + regional limitation already explicit
  'supplement-stack',  // "never assess drug interactions" is stronger
  'retiree-navigator', // SS/Medicare data freshness rule present
];

const CHECK_STRING = 'ACCURACY: Never fabricate';

let updated = 0;
let skipped = 0;

const pkgs = fs.readdirSync(PACKAGES_DIR, { withFileTypes: true })
  .filter(d => d.isDirectory() && !d.name.startsWith('_') && !d.name.startsWith('.'))
  .map(d => d.name);

pkgs.forEach(slug => {
  const pkgPath = path.join(PACKAGES_DIR, slug, 'agentstandard.json');
  if (!fs.existsSync(pkgPath)) { skipped++; return; }

  const data = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  const spKey = data.system_prompt ? 'system_prompt' : 'telegram_system_prompt';
  const sp = data[spKey];

  if (!sp) {
    console.log(`SKIP (no prompt): ${slug}`);
    skipped++;
    return;
  }

  if (sp.includes(CHECK_STRING)) {
    console.log(`SKIP (already has): ${slug}`);
    skipped++;
    return;
  }

  if (ALREADY_COVERED.includes(slug)) {
    console.log(`SKIP (domain rule stronger): ${slug}`);
    skipped++;
    return;
  }

  data[spKey] = sp + ACCURACY_RULE;
  fs.writeFileSync(pkgPath, JSON.stringify(data, null, 2));
  console.log(`FIXED: ${slug}`);
  updated++;
});

console.log(`\nDone: ${updated} updated, ${skipped} skipped`);
