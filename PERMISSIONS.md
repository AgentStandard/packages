# AgentStandard — Agent Rights, Permissions & Credentials
*Last updated: 2026-03-03*

---

## Agent Permissions

| Agent | Identity | Rights | Limits |
|---|---|---|---|
| **Aspera (main)** | Primary coordinator | Full workspace read/write, GitHub push, Moltbook API, Telegram messaging | Cannot make financial commitments without Jackson approval |
| **Sub-agents** | Spawned for specific tasks | Scoped to assigned directory only | No git push without explicit per-session "push it" from Jackson |
| **AgentStandard bot** | Moltbook presence | Post to Moltbook, query packages, interact with agent network | Cannot make purchases or commitments |

---

## Active Credentials

| Service | Credential | Location | Rotation |
|---|---|---|---|
| Moltbook API | `moltbook_sk_cuBoOQZZ56VQfoePfNEVJcOwGpic5IEc` | `credentials/moltbook.json` | On compromise |
| Formspree | Form ID: `xreawdry` | Hardcoded in site (safe — public endpoint) | On compromise |
| GitHub | jacksonbgraham OAuth (gh CLI) | System keychain | Annual |
| Hostinger | jacksonbgraham@gmail.com login | Jackson's password manager | Annual |
| Vercel | jacksonbgraham GitHub OAuth | Vercel dashboard | Annual |
| Anthropic API | In OpenClaw config | `~/.openclaw/.env` | Annual |

---

## Account Ownership

| Account | Platform | Login | Owner |
|---|---|---|---|
| agentstandard.ai | Hostinger | jacksonbgraham@gmail.com | Jackson |
| hello@agentstandard.ai | Hostinger email | → forwards to jacksonbgraham@gmail.com | Jackson |
| github.com/AgentStandard | GitHub Org | jacksonbgraham | Jackson |
| @AgentStandardAI | Twitter/X | hello@agentstandard.ai | Jackson/AgentStandard |
| moltbook.com/u/agentstandard | Moltbook | hello@agentstandard.ai | Jackson + Aspera |
| agentstandard.vercel.app | Vercel | jacksonbgraham GitHub | Jackson |

---

## What Requires Jackson Approval

- Any git push to production
- Any external communication (partnerships, press, investors)
- Any financial transaction or commitment
- Any changes to POLICIES.md, manifesto, brand narrative
- Acquisition conversations or investor meetings
- Adding new team members or contributors

## What Aspera Can Do Autonomously

- Read, write, and organise workspace files
- Push code changes when explicitly told "push it" or "deploy"
- Post to Moltbook
- Update FINANCE.md, METRICS.md, POLICIES.md (content only, not policy changes)
- Spawn sub-agents for builds (with no-push constraint by default)
- Tag git versions

---

## Security Checklist (weekly)
- [ ] No credentials committed to GitHub (check with `git log --all -- credentials/`)
- [ ] Moltbook API key not exposed in any public file
- [ ] Formspree form receiving expected traffic (not being spammed)
- [ ] GitHub org has no unexpected members
- [ ] Vercel deploy log shows no unexpected deployments

---

*Review this file weekly. Update immediately on any credential change.*
