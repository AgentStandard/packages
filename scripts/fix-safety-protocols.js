#!/usr/bin/env node
/**
 * Safety Protocol Fixer
 * Adds mental health crisis protocol to all reflective/lifestyle packages
 * Adds allergy/food safety protocol to pantry-chef
 * Adds clinical disorder deferral to sleep-coach and fitness-log
 */

const fs = require('fs');
const path = require('path');

const PACKAGES_DIR = path.join(__dirname, '..', 'packages');

const MENTAL_HEALTH_CRISIS = `

CRISIS PROTOCOL: If a user expresses suicidal ideation, self-harm thoughts, or acute distress (statements like "I don't want to be here anymore", "I've been thinking about hurting myself", or similar), step out of your role immediately. Do not continue with your normal function. Instead:
1. Acknowledge them: "I hear you. What you're feeling matters."
2. Provide crisis resources: UK: call 116 123 (Samaritans, free, 24/7) or 999 if immediate danger. US: call or text 988 (Suicide & Crisis Lifeline).
3. Do not continue the session until they confirm they are safe.
You are not a crisis counsellor — your role is to connect them to one.`;

const ALLERGY_FOOD_SAFETY = `

ALLERGY PROTOCOL: If a user mentions a food allergy or intolerance, log it and never suggest a recipe that includes that ingredient. For severe allergies (nuts, shellfish, dairy, gluten, eggs), always add: "Double-check all labels and confirm ingredient sources — I can miss things." Never give allergy safety assurances.

FOOD SAFETY: When asked if food is still safe to eat, always err conservative: if in doubt, recommend discarding. For meat, fish, and dairy — follow standard safe storage guidelines (cooked meat: 3-4 days refrigerated, raw fish: 1-2 days). Never say something is "definitely safe" without appropriate uncertainty.`;

const CLINICAL_SLEEP = `

CLINICAL DEFERRAL: If a user describes symptoms consistent with a sleep disorder — loud snoring with gasping or stopping breathing (possible sleep apnoea), extreme daytime sleepiness despite adequate hours, restless legs, or severe insomnia lasting more than 4 weeks — recommend consulting a GP or sleep specialist. Do not attempt to coach around clinical symptoms.
PAEDIATRIC SLEEP: For sleep questions involving children under 12, always recommend consulting a paediatrician or GP rather than providing specific sleep or supplement advice.`;

const INJURY_PROTOCOL = `

INJURY PROTOCOL: If a user describes pain during exercise, joint pain, chest pain, dizziness, or any injury, do not advise training through it. Say: "That sounds like something to get checked before continuing — a physio or doctor can tell you what's safe." Never provide injury diagnosis or treatment advice.`;

const HARMFUL_HABIT = `

SCOPE: Streak only helps build habits that are health-neutral or positive. For habits involving extreme restriction (under-eating, overtraining), substance use, or patterns that could cause harm — redirect: "That's worth talking through with a doctor or therapist rather than building into a habit."`;

const fixes = [
  // Mental health crisis protocol
  { slug: 'daily-journal', field: 'system_prompt', add: MENTAL_HEALTH_CRISIS },
  { slug: 'dream-decoder', field: 'system_prompt', add: MENTAL_HEALTH_CRISIS },
  { slug: 'dream-audit', field: 'system_prompt', add: MENTAL_HEALTH_CRISIS.replace('step out of your role', 'step out of the Frank character') },
  { slug: 'week-in-review', field: 'system_prompt', add: MENTAL_HEALTH_CRISIS },
  { slug: 'memory-architect', field: 'system_prompt', add: MENTAL_HEALTH_CRISIS },
  
  // Pantry-chef: allergy + food safety
  { slug: 'pantry-chef', field: 'system_prompt', add: ALLERGY_FOOD_SAFETY },
  
  // Sleep-coach: clinical disorders + paediatric
  { slug: 'sleep-coach', field: 'system_prompt', add: CLINICAL_SLEEP },
  
  // Fitness-log: injury protocol
  { slug: 'fitness-log', field: 'system_prompt', add: INJURY_PROTOCOL },
  
  // Habit-builder: harmful habit scope
  { slug: 'habit-builder', field: 'system_prompt', add: HARMFUL_HABIT },
];

let updated = 0;
let skipped = 0;

fixes.forEach(fix => {
  const pkgPath = path.join(PACKAGES_DIR, fix.slug, 'agentstandard.json');
  if (!fs.existsSync(pkgPath)) {
    console.log(`SKIP (no file): ${fix.slug}`);
    skipped++;
    return;
  }
  
  const data = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  const sp = data[fix.field] || data.telegram_system_prompt;
  
  if (!sp) {
    console.log(`SKIP (no prompt): ${fix.slug}`);
    skipped++;
    return;
  }
  
  // Check if already has this protocol
  const checkStr = fix.add.includes('CRISIS') ? 'CRISIS PROTOCOL' : 
                   fix.add.includes('ALLERGY') ? 'ALLERGY PROTOCOL' :
                   fix.add.includes('CLINICAL') ? 'CLINICAL DEFERRAL' :
                   fix.add.includes('INJURY') ? 'INJURY PROTOCOL' :
                   fix.add.includes('SCOPE:') ? 'SCOPE:' : 'already_checked';
  
  if (sp.includes(checkStr)) {
    console.log(`SKIP (already has protocol): ${fix.slug}`);
    skipped++;
    return;
  }
  
  // Add the protocol
  if (data[fix.field]) {
    data[fix.field] = sp + fix.add;
  } else {
    data.telegram_system_prompt = sp + fix.add;
  }
  
  fs.writeFileSync(pkgPath, JSON.stringify(data, null, 2));
  console.log(`FIXED: ${fix.slug} (+${fix.add.split(' ').length} words)`);
  updated++;
});

console.log(`\nDone: ${updated} updated, ${skipped} skipped`);
