#!/usr/bin/env node
/**
 * Fixes genuine coverage gaps identified by the audit.
 */

const fs = require('fs');
const path = require('path');
const PACKAGES_DIR = path.join(__dirname, '..', 'packages');

function appendToPrompt(slug, text, checkStr) {
  const p = path.join(PACKAGES_DIR, slug, 'agentstandard.json');
  const data = JSON.parse(fs.readFileSync(p, 'utf8'));
  const spKey = data.system_prompt ? 'system_prompt' : 'telegram_system_prompt';
  if (data[spKey].includes(checkStr)) {
    console.log(`SKIP (already has): ${slug}`);
    return;
  }
  data[spKey] = data[spKey] + text;
  fs.writeFileSync(p, JSON.stringify(data, null, 2));
  console.log(`FIXED: ${slug}`);
}

// 1. gp-prep — formal disclaimer missing from system_prompt
appendToPrompt('gp-prep',
`

DISCLAIMER: Triage is not a doctor, nurse, or licensed medical professional. It helps you prepare for appointments — it does not diagnose, treat, or replace professional medical advice. For emergencies, call 999 (UK) or 911 (US) immediately. For any medical decision, always follow the advice of your qualified healthcare provider.`,
  'Triage is not a doctor'
);

// 2. relationship-coach — crisis protocol entirely missing
appendToPrompt('relationship-coach',
`

CRISIS PROTOCOL: If a user expresses suicidal ideation, self-harm thoughts, or explicit statements of wanting to hurt themselves — step out of the Cleo persona immediately. Acknowledge them: "I hear you. What you're feeling matters." Provide crisis resources: UK: 116 123 (Samaritans, free 24/7) or 999 if immediate danger. US: call or text 988. Do not return to relationship coaching until they confirm they are safe.`,
  'CRISIS PROTOCOL'
);

// 3. salary-scout — no formal disclaimer in system_prompt
appendToPrompt('salary-scout',
`

DISCLAIMER: Benchmark provides general salary guidance only. It is not a licensed financial adviser, HR consultant, or employment lawyer. Compensation decisions are significant — verify with live sources (Glassdoor, Levels.fyi, LinkedIn Salary) and seek professional advice for high-stakes negotiations or employment disputes.`,
  'Benchmark provides general salary guidance'
);

// 4. supplement-stack — no ACCURACY rule (was intentionally skipped, but domain rules don't cover general fabrication)
appendToPrompt('supplement-stack',
`

ACCURACY: Never fabricate supplement ingredients, study citations, efficacy claims, or regulatory status. When uncertain about a specific supplement's mechanism, interactions, or evidence base, say so: "The evidence on that is mixed — I'd check with a pharmacist or look at examine.com." An honest "I don't know" beats a confident wrong answer.`,
  'ACCURACY: Never fabricate supplement'
);

// 5. retiree-navigator — no ACCURACY rule (domain rules cover SS/Medicare but not general fabrication)
appendToPrompt('retiree-navigator',
`

ACCURACY: Never fabricate benefit amounts, eligibility rules, tax thresholds, or regulatory details. These change frequently and vary by individual circumstance. When giving specific figures, note: "These are approximate — verify with SSA.gov, Medicare.gov, or your benefits counsellor before making any decisions."`,
  'ACCURACY: Never fabricate benefit amounts'
);

console.log('\nAll gaps fixed.');
