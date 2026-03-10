// deploy.js — GitHub + Vercel helpers for AgentStandard bot
const Anthropic = require('@anthropic-ai/sdk');

const GITHUB_API = 'https://api.github.com';
const CODE_MODEL = process.env.ANTHROPIC_CODE_MODEL || process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-5-20250929';

// ── GitHub helpers ─────────────────────────────────────────────────────────────

function parseRepoSlug(input) {
  if (!input) return null;
  const m = input.trim().match(/(?:https?:\/\/github\.com\/)?([a-zA-Z0-9_.-]+\/[a-zA-Z0-9_.-]+?)(?:\.git|\/.*)?$/);
  return m ? m[1] : null;
}

async function ghGet(pat, path) {
  const res = await fetch(`${GITHUB_API}${path}`, {
    headers: {
      Authorization: `token ${pat}`,
      'User-Agent': 'AgentStandard-Bot',
      Accept: 'application/vnd.github.v3+json'
    }
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`GitHub: ${data.message || res.status}`);
  return data;
}

async function ghPut(pat, path, body) {
  const res = await fetch(`${GITHUB_API}${path}`, {
    method: 'PUT',
    headers: {
      Authorization: `token ${pat}`,
      'User-Agent': 'AgentStandard-Bot',
      Accept: 'application/vnd.github.v3+json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`GitHub write failed: ${data.message || res.status}`);
  return data;
}

async function getDefaultBranch(pat, repo) {
  const data = await ghGet(pat, `/repos/${repo}`);
  return data.default_branch || 'main';
}

const SKIP = ['node_modules', '.git', 'dist', '.next', 'build', 'out', '.cache', 'coverage'];
const EDITABLE_EXT = ['.js', '.jsx', '.ts', '.tsx', '.html', '.css', '.scss', '.json', '.md', '.vue', '.svelte', '.py', '.rb', '.go', '.env.example'];

async function listFiles(pat, repo) {
  const branch = await getDefaultBranch(pat, repo);
  const data = await ghGet(pat, `/repos/${repo}/git/trees/${branch}?recursive=1`);
  const files = (data.tree || [])
    .filter(f => f.type === 'blob')
    .map(f => f.path)
    .filter(p => !SKIP.some(s => p.includes(`/${s}/`) || p.startsWith(`${s}/`)))
    .filter(p => EDITABLE_EXT.some(e => p.endsWith(e)))
    .slice(0, 300);
  return { files, branch };
}

async function readFile(pat, repo, filePath, branch) {
  const data = await ghGet(pat, `/repos/${repo}/contents/${encodeURIComponent(filePath)}?ref=${branch}`);
  const content = Buffer.from(data.content.replace(/\n/g, ''), 'base64').toString('utf8');
  return { content, sha: data.sha };
}

async function writeFile(pat, repo, filePath, content, sha, commitMsg, branch) {
  return ghPut(pat, `/repos/${repo}/contents/${encodeURIComponent(filePath)}`, {
    message: commitMsg,
    content: Buffer.from(content).toString('base64'),
    sha,
    branch
  });
}

// ── Vercel ─────────────────────────────────────────────────────────────────────

async function triggerDeploy(hookUrl) {
  const res = await fetch(hookUrl, { method: 'POST' });
  return res.ok;
}

// ── AI helpers ────────────────────────────────────────────────────────────────

// Claude picks which file(s) to edit based on instruction
async function pickFiles(apiKey, files, instruction) {
  const client = new Anthropic({ apiKey });
  const fileList = files.join('\n');
  const msg = await client.messages.create({
    model: CODE_MODEL,
    max_tokens: 150,
    messages: [{
      role: 'user',
      content: `Files in this project:\n${fileList}\n\nWhich 1-2 files need editing to: "${instruction}"\n\nReply with ONLY the exact file path(s), one per line. Nothing else.`
    }]
  });
  const lines = msg.content[0].text.trim().split('\n').map(l => l.trim()).filter(Boolean);
  return lines.filter(l => files.includes(l)).slice(0, 2);
}

// Claude generates the modified file
async function generateChange(apiKey, filePath, currentContent, instruction) {
  const client = new Anthropic({ apiKey });
  const truncated = currentContent.length > 12000 ? currentContent.slice(0, 12000) + '\n... (truncated)' : currentContent;
  const msg = await client.messages.create({
    model: CODE_MODEL,
    max_tokens: 4000,
    messages: [{
      role: 'user',
      content: `File: ${filePath}\n\nCurrent content:\n\`\`\`\n${truncated}\n\`\`\`\n\nChange: ${instruction}\n\nReturn ONLY the complete modified file content. No explanation. No markdown fences. No preamble. Just the file.`
    }]
  });
  return msg.content[0].text.trim();
}

// Simple line-level diff for Telegram display
function formatDiff(oldContent, newContent) {
  const oldLines = oldContent.split('\n');
  const newLines = newContent.split('\n');
  const out = [];
  let count = 0;
  const maxChanges = 12;

  for (let i = 0; i < Math.max(oldLines.length, newLines.length); i++) {
    const o = (oldLines[i] !== undefined ? oldLines[i] : '').trimEnd();
    const n = (newLines[i] !== undefined ? newLines[i] : '').trimEnd();
    if (o !== n) {
      if (o) out.push(`- ${o.substring(0, 90)}`);
      if (n) out.push(`+ ${n.substring(0, 90)}`);
      count++;
      if (count >= maxChanges) {
        const remaining = Math.max(oldLines.length, newLines.length) - i - 1;
        if (remaining > 0) out.push(`  ... (${remaining} more lines)`);
        break;
      }
    }
  }

  return out.length ? out.join('\n') : '(whitespace / formatting only)';
}

module.exports = {
  parseRepoSlug,
  listFiles,
  readFile,
  writeFile,
  triggerDeploy,
  pickFiles,
  generateChange,
  formatDiff
};
