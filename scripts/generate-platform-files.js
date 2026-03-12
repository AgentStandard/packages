#!/usr/bin/env node
/**
 * AgentStandard Multi-Platform File Generator
 * 
 * Reads each package's agentstandard.json and generates:
 * - claude-project.md
 * - claude-code.md
 * - chatgpt-instructions.md
 * - api-prompt.txt
 * - triggers.json
 *
 * Usage: node generate-platform-files.js [--package slug] [--all] [--dry-run]
 */

const fs = require('fs');
const path = require('path');

const PACKAGES_DIR = path.join(__dirname, '..', 'packages');
const PERSONA_MAP_PATH = path.join(PACKAGES_DIR, '_meta', 'persona-names.json');
const args = process.argv.slice(2);

// Load persona name overrides
let personaOverrides = {};
if (fs.existsSync(PERSONA_MAP_PATH)) {
  personaOverrides = JSON.parse(fs.readFileSync(PERSONA_MAP_PATH, 'utf8')).personas || {};
}

const dryRun = args.includes('--dry-run');
const force = args.includes('--force');
const allPkgs = args.includes('--all');
const pkgFlag = args.indexOf('--package');
const targetPkg = pkgFlag !== -1 ? args[pkgFlag + 1] : null;

// ─── Persona name extraction ───
function extractPersonaName(systemPrompt, slug) {
  // Try to extract "You are X —" or "You are X." or "You are X,"
  const match = systemPrompt.match(/You are (\w+)\s*[—–\-,.]/i);
  if (match) return match[1];
  // Fallback: capitalise the slug
  return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
}

// ─── Extract hard rules from system prompt ───
function extractHardRules(systemPrompt) {
  const match = systemPrompt.match(/Hard rules?:?\n([\s\S]*?)(?:\n\n|$)/i);
  if (match) return match[1].trim();
  return null;
}

// ─── Extract disclaimer ───
function getDisclaimer(manifest) {
  return manifest.disclaimer || null;
}

// ─── Generate triggers.json ───
function generateTriggers(manifest, personaName) {
  const slug = manifest.slug || manifest.id;
  
  // Generate activation phrases from tags and description
  const tags = manifest.tags || [];
  const phrases = [];
  
  // Add command-style activations
  phrases.push(`${slug} mode`);
  phrases.push(`help me with ${manifest.name.toLowerCase()}`);
  phrases.push(`start ${manifest.name.toLowerCase()}`);
  phrases.push(`I need ${manifest.name.toLowerCase().replace(/-/g, ' ')}`);
  
  // Add tag-based phrases
  tags.slice(0, 3).forEach(tag => {
    phrases.push(`help with ${tag.replace(/-/g, ' ')}`);
  });

  return {
    slug,
    activation: {
      explicit_command: `@${slug}`,
      phrases,
      context_signals: [`user mentions ${tags.slice(0, 2).join(' or ')} topics`]
    },
    deactivation: {
      explicit_command: "@default",
      phrases: ["done", "exit", `exit ${slug}`, `stop ${manifest.name.toLowerCase()}`, "back to normal"],
      auto_deactivate: {
        after_unrelated_turns: 3,
        on_session_end: true,
        after_minutes_idle: 30
      }
    },
    scope: "session",
    singleton: true,
    persona_name: personaName
  };
}

// ─── Generate claude-project.md ───
function generateClaudeProject(manifest, personaName) {
  const slug = manifest.slug || manifest.id;
  const disclaimer = getDisclaimer(manifest);
  const disclaimerBlock = disclaimer ? `\n## Disclaimer\n${disclaimer}\n` : '';
  
  return `# ${manifest.name} — Claude.ai Project Instructions

## Activation
You are now in **${manifest.name} mode** as **${personaName}**, ${manifest.description.split('.')[0].toLowerCase()}.

Stay in this mode for this project. If the user says "done", "exit", "back to normal", or "@default", acknowledge and exit ${manifest.name} mode.
${disclaimerBlock}
## Who You Are
${manifest.system_prompt}

## First Message
When starting a new conversation, open with:
"${manifest.first_message}"

## Deactivation
When user says "done", "exit ${slug}", "back to normal", or "@default":
→ Say: "Exiting ${manifest.name} mode. Come back anytime."
→ Return to normal assistant behaviour.
`;
}

// ─── Generate claude-code.md ───
function generateClaudeCode(manifest, personaName) {
  const slug = manifest.slug || manifest.id;
  const hardRules = extractHardRules(manifest.system_prompt);
  const disclaimer = getDisclaimer(manifest);
  const disclaimerBlock = disclaimer ? `\n**Disclaimer:** ${disclaimer}\n` : '';
  
  // Create a compressed version of core behaviour
  const coreLines = manifest.system_prompt
    .split('\n')
    .filter(l => l.trim().startsWith('-') || l.trim().startsWith('•'))
    .slice(0, 8)
    .map(l => l.trim())
    .join('\n');

  return `# ${manifest.name} Skill — Claude Code (CLAUDE.md addition)

## AgentStandard Skill: ${slug}
**Activation:** Say "@${slug}", "start ${manifest.name.toLowerCase()}", or "${manifest.name.toLowerCase()} mode"
**Deactivation:** Say "done", "@default", or "exit ${slug}"

### When ${slug} is ACTIVE:
You are ${personaName} — ${manifest.tagline.toLowerCase()}
${disclaimerBlock}
**Core behaviour:**
${coreLines || manifest.system_prompt.substring(0, 500)}

${hardRules ? `**Hard rules:**\n${hardRules}\n` : ''}
**Deactivate** when user says "done", "exit", "@default", or topic clearly shifts away for 3+ turns. Say "Exiting ${manifest.name} mode" and return to normal coding assistant behaviour.

### When ${slug} is INACTIVE:
Ignore this section entirely. Behave as normal.
`;
}

// ─── Generate chatgpt-instructions.md ───
function generateChatGPT(manifest, personaName) {
  const slug = manifest.slug || manifest.id;
  const disclaimer = getDisclaimer(manifest);
  const disclaimerBlock = disclaimer ? `\n## Important Disclaimer\n${disclaimer}\n` : '';
  
  return `You are ${personaName}, ${manifest.description.split('.')[0].toLowerCase()} — part of the AgentStandard ${manifest.name} package.
${disclaimerBlock}
## Your Role
${manifest.system_prompt}

## First Message
When starting, open with: "${manifest.first_message}"

## Activation / Deactivation
You are always in ${manifest.name} mode in this GPT. If the user says "exit ${slug}", "done", or "back to normal", say: "${manifest.name} mode paused. Come back anytime — your progress lives in our chat history." Then behave as a general assistant until they reactivate.

## Certified by AgentStandard
This package has been reviewed and certified at agentstandard.ai
`;
}

// ─── Generate api-prompt.txt ───
function generateAPIPrompt(manifest, personaName) {
  const slug = manifest.slug || manifest.id;
  const disclaimer = getDisclaimer(manifest);
  const disclaimerNote = disclaimer ? `\nImportant: ${disclaimer}\n` : '';
  
  // Compress system prompt for API efficiency
  let compressed = manifest.system_prompt
    .replace(/\n\n+/g, '\n\n')
    .trim();
  
  // If it's too long, take the first 2000 chars
  if (compressed.length > 2500) {
    compressed = compressed.substring(0, 2500) + '...';
  }

  return `You are ${personaName}, ${manifest.description.split('.')[0].toLowerCase()} (AgentStandard: ${slug} v${manifest.version}).
${disclaimerNote}
${compressed}

Deactivate when user says "done", "exit ${slug}", or "@default". Return to base assistant behaviour and confirm: "Exiting ${manifest.name} mode."

Certified by AgentStandard (agentstandard.ai)
`;
}

// ─── Main ───
function processPackage(pkgDir) {
  const jsonPath = path.join(pkgDir, 'agentstandard.json');
  if (!fs.existsSync(jsonPath)) return;
  
  const slug = path.basename(pkgDir);
  if (slug === '.github' || slug === '_meta') return;
  
  const manifest = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  // Support both schema versions: system_prompt (new) and telegram_system_prompt (old)
  if (!manifest.system_prompt && manifest.telegram_system_prompt) {
    manifest.system_prompt = manifest.telegram_system_prompt;
  }
  if (!manifest.system_prompt) {
    // Try to build a minimal prompt from description + skills
    if (manifest.description && manifest.skills && manifest.skills.length > 0) {
      const skillList = manifest.skills.map(s => `- ${s.name}: ${s.description}`).join('\n');
      manifest.system_prompt = `You are a specialised assistant for ${manifest.name.toLowerCase()}. ${manifest.description}\n\nYour skills:\n${skillList}`;
    } else {
      console.log(`${slug}: SKIPPED (no system_prompt or telegram_system_prompt)`);
      return 0;
    }
  }
  const personaName = personaOverrides[slug] || extractPersonaName(manifest.system_prompt, slug);
  // Ensure first_message exists
  if (!manifest.first_message) {
    manifest.first_message = `What can I help you with? I'm ${personaName} — ${manifest.tagline || manifest.description.split('.')[0].toLowerCase()}.`;
  }
  
  const files = {
    'triggers.json': JSON.stringify(generateTriggers(manifest, personaName), null, 2),
    'claude-project.md': generateClaudeProject(manifest, personaName),
    'claude-code.md': generateClaudeCode(manifest, personaName),
    'chatgpt-instructions.md': generateChatGPT(manifest, personaName),
    'api-prompt.txt': generateAPIPrompt(manifest, personaName)
  };
  
  let created = 0;
  let skipped = 0;
  
  for (const [filename, content] of Object.entries(files)) {
    const filePath = path.join(pkgDir, filename);
    if (fs.existsSync(filePath) && !force) {
      skipped++;
      continue;
    }
    if (dryRun) {
      console.log(`  [DRY RUN] Would create: ${filename}`);
      created++;
    } else {
      fs.writeFileSync(filePath, content);
      created++;
    }
  }
  
  console.log(`${slug}: ${created} created, ${skipped} skipped (existing)`);
  return created;
}

// Entry point
console.log(`AgentStandard Platform File Generator${dryRun ? ' [DRY RUN]' : ''}\n`);

let totalCreated = 0;

if (targetPkg) {
  const pkgDir = path.join(PACKAGES_DIR, targetPkg);
  if (!fs.existsSync(pkgDir)) {
    console.error(`Package not found: ${targetPkg}`);
    process.exit(1);
  }
  totalCreated += processPackage(pkgDir) || 0;
} else if (allPkgs) {
  const dirs = fs.readdirSync(PACKAGES_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => path.join(PACKAGES_DIR, d.name));
  
  for (const dir of dirs) {
    totalCreated += processPackage(dir) || 0;
  }
} else {
  console.log('Usage: node generate-platform-files.js --all [--dry-run]');
  console.log('       node generate-platform-files.js --package <slug> [--dry-run]');
  process.exit(0);
}

console.log(`\nTotal files created: ${totalCreated}`);
