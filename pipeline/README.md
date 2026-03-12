# AgentStandard — Package Discovery Pipeline

Automated discovery of AI agent packages, MCP servers, and skills for the [AgentStandard](https://agentstandard.ai) marketplace.

## Overview

The pipeline runs on a schedule (e.g. daily via Task Scheduler or cron), searches multiple sources for new packages, deduplicates, and appends candidates to `candidates.md` for human review.

```
discover.mjs  →  candidates.md  (append new entries)
               →  pipeline-state.json  (update seen URLs)
```

## Files

| File | Purpose |
|---|---|
| `discover.mjs` | Main discovery script (Node.js ESM) |
| `candidates.md` | Running list of discovered packages for review |
| `pipeline-state.json` | Deduplication state — URLs already processed |
| `README.md` | This file |

## Sources

| Source | Query | Criteria |
|---|---|---|
| **GitHub** | Topics: `mcp-server`, `claude-agent`, `ai-agent`, `openai-tools`, `llm-tools` | Created last 30 days, 5+ stars |
| **Reddit** | r/ClaudeAI, r/ChatGPT, r/LocalLLaMA | Last 7 days, 5+ upvotes, keyword match |
| **MCP.so** | Index page scrape | All listed servers |
| **ClawHub** | Home page scrape | All listed skills |

## Running It

### Manual run
```bash
cd C:\Users\jacks\.openclaw\workspace\agentstandard\pipeline
node discover.mjs
```

### Scheduled (Windows Task Scheduler)
1. Open Task Scheduler → Create Basic Task
2. Trigger: Daily at e.g. 08:00
3. Action: Start a program
   - Program: `node`
   - Arguments: `discover.mjs`
   - Start in: `C:\Users\jacks\.openclaw\workspace\agentstandard\pipeline`

### Scheduled (Unix cron)
```cron
0 8 * * * cd /path/to/agentstandard/pipeline && node discover.mjs >> logs/discover.log 2>&1
```

## Reviewing Candidates

Open `candidates.md` and update each entry's **Status** field:

| Status | Meaning |
|---|---|
| 🔍 New | Not yet reviewed |
| ✅ Approved | Will be listed on AgentStandard |
| ❌ Rejected | Not a fit |
| 🔄 Investigating | Needs more research |
| 📬 Contacted | Outreach sent to package author |

## Deduplication

`pipeline-state.json` stores every URL that's been added to `candidates.md`. On each run, the script reads this file and skips any URLs already seen. If you want to re-evaluate a package, remove its URL from `seenUrls` in `pipeline-state.json`.

## Rate Limits

- **GitHub**: unauthenticated API = ~10 requests/min. The script adds a 7s delay between topic searches. To increase throughput, add a `GITHUB_TOKEN` env var and pass it as a Bearer token header.
- **Reddit**: Public JSON API, no auth required. 2s delay between subreddits.
- **MCP.so / ClawHub**: Single HTTP fetch each, no rate limiting needed.

## Adding a GitHub Token (optional)

```bash
# Windows
set GITHUB_TOKEN=ghp_your_token_here
node discover.mjs

# Unix
GITHUB_TOKEN=ghp_your_token_here node discover.mjs
```

Edit `discover.mjs` → `fetchGitHub()` to include `Authorization: Bearer ${process.env.GITHUB_TOKEN}` in the headers object.

## Troubleshooting

- **"HTTP 403 for github"** — rate limited. Wait a minute and retry, or add a GitHub token.
- **"HTTP 429"** — too many requests. Increase sleep delays in the script.
- **No candidates found** — check that the sources are reachable. Run each fetch manually to debug.
- **candidates.md getting huge** — archive old entries. The pipeline only appends; manual curation is expected.
