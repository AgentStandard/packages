#!/usr/bin/env node
/**
 * AgentStandard — Package Discovery Pipeline
 * discover.mjs
 *
 * Discovers new AI agent packages from multiple sources:
 *  - GitHub (mcp-server, claude-agent, ai-agent, openai-tools, llm-tools topics)
 *  - Reddit (r/ClaudeAI, r/ChatGPT)
 *  - MCP.so
 *  - ClawHub
 *
 * Deduplicates against existing candidates.md and pipeline-state.json.
 * Appends new candidates to candidates.md.
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PIPELINE_DIR = __dirname;
const CANDIDATES_FILE = join(PIPELINE_DIR, 'candidates.md');
const STATE_FILE = join(PIPELINE_DIR, 'pipeline-state.json');

const TODAY = new Date().toISOString().split('T')[0];
const THIRTY_DAYS_AGO = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

// ─── State management ────────────────────────────────────────────────────────

function loadState() {
  if (!existsSync(STATE_FILE)) {
    return { seenUrls: [], lastRun: null };
  }
  try {
    return JSON.parse(readFileSync(STATE_FILE, 'utf8'));
  } catch {
    console.warn('[state] Could not parse pipeline-state.json — starting fresh');
    return { seenUrls: [], lastRun: null };
  }
}

function saveState(state) {
  state.lastRun = new Date().toISOString();
  writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

// ─── Candidate formatting ────────────────────────────────────────────────────

function formatCandidate({ name, source, url, stars, description, whyInteresting }) {
  return `
## ${name}
- **Source:** ${source}
- **URL:** ${url}
- **Stars/Upvotes:** ${stars ?? 'N/A'}
- **Description:** ${description || 'No description available'}
- **Why interesting:** ${whyInteresting || 'Discovered via automated pipeline'}
- **Status:** 🔍 New
- **Added:** ${TODAY}
`;
}

// ─── HTTP helpers ────────────────────────────────────────────────────────────

async function fetchJSON(url, headers = {}) {
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'AgentStandard-Discovery-Bot/1.0 (agentstandard.ai)',
      ...headers,
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.json();
}

async function fetchHTML(url) {
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; AgentStandard-Bot/1.0; +https://agentstandard.ai)',
      Accept: 'text/html,application/xhtml+xml',
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.text();
}

// ─── Sleep helper (rate limiting) ────────────────────────────────────────────

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ─── Source: GitHub ──────────────────────────────────────────────────────────

const GITHUB_TOPICS = [
  'mcp-server',
  'claude-agent',
  'ai-agent',
  'openai-tools',
  'llm-tools',
];

async function fetchGitHub(seenUrls) {
  console.log('[github] Searching repositories...');
  const results = [];

  for (const topic of GITHUB_TOPICS) {
    const query = `topic:${topic} created:>=${THIRTY_DAYS_AGO} stars:>=5`;
    const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&sort=stars&order=desc&per_page=10`;

    try {
      const data = await fetchJSON(url, {
        Accept: 'application/vnd.github.v3+json',
      });

      for (const repo of data.items || []) {
        const repoUrl = repo.html_url;
        if (seenUrls.includes(repoUrl)) continue;

        const whyMap = {
          'mcp-server': 'MCP server — direct protocol fit for AgentStandard',
          'claude-agent': 'Claude-native agent — high compatibility',
          'ai-agent': 'General AI agent package',
          'openai-tools': 'OpenAI tool integration',
          'llm-tools': 'LLM utility / tooling layer',
        };

        results.push({
          name: repo.full_name,
          source: 'GitHub',
          url: repoUrl,
          stars: repo.stargazers_count,
          description: repo.description || '',
          whyInteresting: `${whyMap[topic]} | ${repo.stargazers_count} stars, created ${repo.created_at?.split('T')[0]}`,
        });

        seenUrls.push(repoUrl);
      }

      console.log(`  [github/${topic}] Found ${data.items?.length ?? 0} repos`);
      // Respect unauthenticated rate limit (~10 req/min)
      await sleep(7000);
    } catch (err) {
      console.error(`  [github/${topic}] Error: ${err.message}`);
    }
  }

  return results;
}

// ─── Source: Reddit ──────────────────────────────────────────────────────────

const REDDIT_SEARCHES = [
  { sub: 'ClaudeAI', q: 'mcp server agent tool' },
  { sub: 'ClaudeAI', q: 'MCP release new' },
  { sub: 'ChatGPT', q: 'agent plugin tool openai' },
  { sub: 'LocalLLaMA', q: 'mcp server agent tools' },
];

function extractRedditUrl(post) {
  // Prefer external link; fall back to Reddit thread itself
  const ext = post.data?.url;
  if (ext && !ext.includes('reddit.com')) return ext;
  return `https://www.reddit.com${post.data?.permalink}`;
}

function isRelevant(title = '', selftext = '') {
  const text = `${title} ${selftext}`.toLowerCase();
  return (
    text.includes('mcp') ||
    text.includes('agent') ||
    text.includes('tool') ||
    text.includes('plugin') ||
    text.includes('server')
  );
}

async function fetchReddit(seenUrls) {
  console.log('[reddit] Searching subreddits...');
  const results = [];

  for (const { sub, q } of REDDIT_SEARCHES) {
    const url = `https://www.reddit.com/r/${sub}/search.json?q=${encodeURIComponent(q)}&sort=top&t=week&limit=25&restrict_sr=1`;

    try {
      const data = await fetchJSON(url);
      const posts = data?.data?.children || [];

      for (const post of posts) {
        const d = post.data;
        if (!d || d.score < 5) continue;
        if (!isRelevant(d.title, d.selftext)) continue;

        const postUrl = extractRedditUrl(post);
        if (seenUrls.includes(postUrl)) continue;

        // If it links to GitHub, check that too
        const isGithub = postUrl.includes('github.com');

        results.push({
          name: d.title?.slice(0, 80) || 'Reddit post',
          source: `Reddit r/${sub}`,
          url: postUrl,
          stars: d.score,
          description: d.selftext?.slice(0, 120) || d.title || '',
          whyInteresting: `r/${sub} post with ${d.score} upvotes${isGithub ? ' — links to GitHub project' : ''}`,
        });

        seenUrls.push(postUrl);
      }

      console.log(`  [reddit/r/${sub}] Processed ${posts.length} posts`);
      await sleep(2000);
    } catch (err) {
      console.error(`  [reddit/r/${sub}] Error: ${err.message}`);
    }
  }

  return results;
}

// ─── Source: MCP.so ──────────────────────────────────────────────────────────

function parseMcpSo(html) {
  const results = [];

  // Extract server card links — pattern: href="/servers/slug" or href="/server/slug"
  const linkPattern = /href="(\/(?:servers?|tools?)\/[a-z0-9_-]+)"/gi;
  const namePattern = /<h[23][^>]*>\s*([^<]{3,80})\s*<\/h[23]>/gi;
  const descPattern = /<p[^>]*class="[^"]*desc[^"]*"[^>]*>\s*([^<]{10,200})\s*<\/p>/gi;

  const links = [...html.matchAll(linkPattern)].map((m) => m[1]);
  const names = [...html.matchAll(namePattern)].map((m) => m[1].trim());
  const descs = [...html.matchAll(descPattern)].map((m) => m[1].trim());

  const seen = new Set();
  for (let i = 0; i < links.length; i++) {
    const slug = links[i];
    if (seen.has(slug)) continue;
    seen.add(slug);

    const fullUrl = `https://mcp.so${slug}`;
    results.push({
      name: names[i] || slug.split('/').pop(),
      source: 'MCP.so',
      url: fullUrl,
      stars: null,
      description: descs[i] || '',
      whyInteresting: 'Listed on MCP.so — curated MCP server directory',
    });
  }

  return results;
}

async function fetchMcpSo(seenUrls) {
  console.log('[mcp.so] Fetching server listings...');
  try {
    const html = await fetchHTML('https://mcp.so');
    const parsed = parseMcpSo(html);
    const fresh = parsed.filter((r) => !seenUrls.includes(r.url));
    fresh.forEach((r) => seenUrls.push(r.url));
    console.log(`  [mcp.so] Found ${fresh.length} new entries (${parsed.length} total parsed)`);
    return fresh;
  } catch (err) {
    console.error(`  [mcp.so] Error: ${err.message}`);
    return [];
  }
}

// ─── Source: ClawHub ─────────────────────────────────────────────────────────

function parseClawHub(html) {
  const results = [];

  // Match skill cards — look for links with /skills/ or /packages/ paths
  const linkPattern = /href="(https?:\/\/clawhub\.com\/(?:skills?|packages?)\/[a-z0-9_-]+)"/gi;
  const namePattern = /<(?:h[234]|strong)[^>]*>\s*([^<]{3,60})\s*<\/(?:h[234]|strong)>/gi;
  const descPattern = /<p[^>]*>\s*([^<]{15,200})\s*<\/p>/gi;

  const links = [...html.matchAll(linkPattern)].map((m) => m[1]);
  const names = [...html.matchAll(namePattern)].map((m) => m[1].trim());
  const descs = [...html.matchAll(descPattern)].map((m) => m[1].trim());

  const seen = new Set();
  for (let i = 0; i < links.length; i++) {
    const url = links[i];
    if (seen.has(url)) continue;
    seen.add(url);

    results.push({
      name: names[i] || url.split('/').pop(),
      source: 'ClawHub',
      url,
      stars: null,
      description: descs[i] || '',
      whyInteresting: 'Published skill on ClawHub — potential AgentStandard listing',
    });
  }

  // Also try to find npm-style package links
  const npmPattern = /href="(https?:\/\/clawhub\.com\/[^"]+)"/gi;
  for (const match of html.matchAll(npmPattern)) {
    const url = match[1];
    if (seen.has(url) || url === 'https://clawhub.com/' || url.includes('#')) continue;
    seen.add(url);
    results.push({
      name: url.split('/').pop() || 'ClawHub package',
      source: 'ClawHub',
      url,
      stars: null,
      description: '',
      whyInteresting: 'Published on ClawHub',
    });
  }

  return results;
}

async function fetchClawHub(seenUrls) {
  console.log('[clawhub] Fetching skill listings...');
  try {
    const html = await fetchHTML('https://clawhub.com');
    const parsed = parseClawHub(html);
    const fresh = parsed.filter((r) => !seenUrls.includes(r.url));
    fresh.forEach((r) => seenUrls.push(r.url));
    console.log(`  [clawhub] Found ${fresh.length} new entries (${parsed.length} total parsed)`);
    return fresh;
  } catch (err) {
    console.error(`  [clawhub] Error: ${err.message}`);
    return [];
  }
}

// ─── Write candidates ────────────────────────────────────────────────────────

function appendCandidates(candidates) {
  if (candidates.length === 0) {
    console.log('[output] No new candidates to append.');
    return;
  }

  const entries = candidates.map(formatCandidate).join('');
  const divider = `\n---\n<!-- Run: ${TODAY} — ${candidates.length} new candidates -->\n`;

  const existing = existsSync(CANDIDATES_FILE) ? readFileSync(CANDIDATES_FILE, 'utf8') : '';
  writeFileSync(CANDIDATES_FILE, existing + divider + entries);

  console.log(`[output] Appended ${candidates.length} new candidates to candidates.md`);
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`\n╔══════════════════════════════════════════╗`);
  console.log(`║  AgentStandard Discovery Pipeline        ║`);
  console.log(`║  ${new Date().toISOString()}          ║`);
  console.log(`╚══════════════════════════════════════════╝\n`);

  const state = loadState();
  const seenUrls = state.seenUrls || [];

  const allCandidates = [];

  // GitHub (slowest due to rate limits — run first)
  try {
    const github = await fetchGitHub(seenUrls);
    allCandidates.push(...github);
  } catch (err) {
    console.error('[github] Fatal error:', err.message);
  }

  // Reddit
  try {
    const reddit = await fetchReddit(seenUrls);
    allCandidates.push(...reddit);
  } catch (err) {
    console.error('[reddit] Fatal error:', err.message);
  }

  // MCP.so
  try {
    const mcp = await fetchMcpSo(seenUrls);
    allCandidates.push(...mcp);
  } catch (err) {
    console.error('[mcp.so] Fatal error:', err.message);
  }

  // ClawHub
  try {
    const clawhub = await fetchClawHub(seenUrls);
    allCandidates.push(...clawhub);
  } catch (err) {
    console.error('[clawhub] Fatal error:', err.message);
  }

  // Write output
  appendCandidates(allCandidates);

  // Save updated state
  state.seenUrls = seenUrls;
  saveState(state);

  console.log(`\n✅ Done. Total new candidates: ${allCandidates.length}`);
  console.log(`   State saved to pipeline-state.json`);
  console.log(`   Review candidates in candidates.md\n`);
}

main().catch((err) => {
  console.error('Fatal:', err);
  process.exit(1);
});
