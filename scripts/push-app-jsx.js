#!/usr/bin/env node
const fs = require('fs');
const { execSync } = require('child_process');

const src = fs.readFileSync('C:/Users/jacks/.openclaw/workspace/agentstandard/tmp_app.jsx', 'utf8');
const b64 = Buffer.from(src).toString('base64');

// Get current SHA
const sha = execSync('gh api repos/AgentStandard/web/contents/src/App.jsx --jq .sha').toString().trim();
console.log('Current SHA:', sha);

// Build the payload
const payload = JSON.stringify({
  message: 'Wire all 47 packages to site — add 14 missing, fix finance-analyst duplicate\n\nAdded: career-pivot, daily-journal, dream-decoder, ecommerce-pro, fitness-log,\nhabit-builder, interview-coach, manager-coach, negotiation-coach, package-finder,\nrelationship-coach, retiree-navigator, sleep-coach, travel-planner\nFixed: finance-analyst duplicate removed\nResult: 47 unique packages, 0 duplicates',
  content: b64,
  sha: sha
});

fs.writeFileSync('C:/Users/jacks/.openclaw/workspace/agentstandard/tmp_payload.json', payload);

// Push via gh api
const result = execSync(
  'gh api --method PUT repos/AgentStandard/web/contents/src/App.jsx --input C:/Users/jacks/.openclaw/workspace/agentstandard/tmp_payload.json'
).toString();

const parsed = JSON.parse(result);
console.log('Pushed! New SHA:', parsed.content.sha);
console.log('Commit:', parsed.commit.sha);

// Cleanup
fs.unlinkSync('C:/Users/jacks/.openclaw/workspace/agentstandard/tmp_payload.json');
fs.unlinkSync('C:/Users/jacks/.openclaw/workspace/agentstandard/tmp_app_b64.txt');
fs.unlinkSync('C:/Users/jacks/.openclaw/workspace/agentstandard/tmp_app.jsx');
