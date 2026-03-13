#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const PACKAGES_DIR = path.join(__dirname, '..', 'packages');
const personaNames = JSON.parse(fs.readFileSync(path.join(PACKAGES_DIR, '_meta', 'persona-names.json'), 'utf8'));

const slugs = [
  'career-pivot', 'daily-journal', 'dream-decoder', 'ecommerce-pro',
  'fitness-log', 'habit-builder', 'interview-coach', 'manager-coach',
  'negotiation-coach', 'package-finder', 'relationship-coach',
  'retiree-navigator', 'sleep-coach', 'travel-planner',
];

let doc = `# AgentStandard — New Package Review
14 packages pending Jackson sign-off for site launch
Generated: ${new Date().toISOString().slice(0,10)}

---

`;

slugs.forEach((slug, i) => {
  const p = path.join(PACKAGES_DIR, slug, 'agentstandard.json');
  const d = JSON.parse(fs.readFileSync(p, 'utf8'));
  const persona = personaNames[slug] || '—';
  const score = d.certification ? d.certification.score : '—';
  const sp = d.system_prompt || d.telegram_system_prompt || '';

  doc += `## ${i+1}. ${d.name}\n`;
  doc += `**Slug:** \`${slug}\`  \n`;
  doc += `**Persona:** ${persona}  \n`;
  doc += `**Tagline:** ${d.tagline}  \n`;
  doc += `**Forge Score:** ${score}/100  \n`;
  doc += `**Vertical:** ${d.vertical || '—'}  \n`;
  if (d.disclaimer) doc += `**Disclaimer:** ${d.disclaimer}  \n`;
  doc += `\n`;

  doc += `### First Message\n`;
  doc += `> ${d.first_message || '*(none)*'}\n\n`;

  doc += `### System Prompt\n`;
  doc += `\`\`\`\n${sp.trim()}\n\`\`\`\n\n`;

  doc += `---\n\n`;
});

const outPath = path.join(__dirname, '..', 'NEW-PACKAGES-REVIEW.md');
fs.writeFileSync(outPath, doc);
console.log('Written: ' + outPath);
console.log('Length: ' + doc.length + ' chars');
