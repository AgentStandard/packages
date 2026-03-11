# TOOLS.md — Developer Productivity Stack

## Environment Configuration

### ANTHROPIC_API_KEY
- **What it does:** Connects your agent to Claude
- **Required:** Yes
- **How to get it:** https://console.anthropic.com/api-keys
- **Where to set it:** OpenClaw Settings → API Keys → Anthropic

```
ANTHROPIC_API_KEY=sk-ant-...
```

---

### GITHUB_TOKEN
- **What it does:** Gives your agent access to your GitHub repositories — PRs, issues, CI runs, code contents
- **Required:** Yes (for GitHub operations; agent can still review pasted code without it)
- **How to get it:** https://github.com/settings/tokens — create a personal access token
- **Scopes needed:** `repo`, `workflow`, `read:org` (for org repos)
- **Where to set it:** OpenClaw Settings → Environment Variables

```
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxx
```

---

## Skills to Install

```bash
openclaw skills install github web-search
```

**github** — Direct GitHub integration: PR management, CI status, issue tracking, code review

**web-search** — Technical documentation lookup, Stack Overflow, library comparisons

---

## Repository Context to Give Your Agent on Day 1

```
My primary repo is: [owner/repo-name]
My main branch is: [main / master / develop]
Tech stack: [e.g., Next.js, PostgreSQL, Vercel CI]
Team size: [solo / small team / larger]
What I most want help with: [code review / CI / documentation / all]
```

---

## Estimated Costs

| Item | Cost |
|------|------|
| ANTHROPIC_API_KEY | ~$0.08/session |
| GITHUB_TOKEN | Free |
| Skills | Free |
