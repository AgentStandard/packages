#!/usr/bin/env node
const { execSync } = require('child_process');
const fs = require('fs');

const PREV_COMMIT = 'b7ef7d6ccc1d300d6ad7ef3733f609c78751605e';

// Get the previous content
const prevData = JSON.parse(
  execSync(`gh api repos/AgentStandard/web/contents/src/App.jsx?ref=${PREV_COMMIT}`).toString()
);
const prevContent = prevData.content; // already base64

// Get current SHA (what we just pushed)
const currentData = JSON.parse(
  execSync('gh api repos/AgentStandard/web/contents/src/App.jsx').toString()
);
const currentSha = currentData.sha;
console.log('Reverting from:', currentSha);
console.log('Back to commit:', PREV_COMMIT);

const payload = JSON.stringify({
  message: 'Revert: restore App.jsx to pre-wire state (not ready for deploy)',
  content: prevContent.replace(/\n/g, ''),
  sha: currentSha
});

fs.writeFileSync('C:/Users/jacks/.openclaw/workspace/agentstandard/tmp_revert_payload.json', payload);

const result = JSON.parse(
  execSync('gh api --method PUT repos/AgentStandard/web/contents/src/App.jsx --input C:/Users/jacks/.openclaw/workspace/agentstandard/tmp_revert_payload.json').toString()
);

console.log('Reverted. Commit:', result.commit.sha);
fs.unlinkSync('C:/Users/jacks/.openclaw/workspace/agentstandard/tmp_revert_payload.json');
