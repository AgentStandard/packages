# AgentStandard — Project Policies & Guardrails
*Established: 2026-03-03*

## Version Control
- Tag before every major change: `git tag v[x.x.x]-[context]` then build
- Named tags for every real-world event: launches, tests, interviews, demos
- Non-code docs saved with ISO dates in filenames
- Never push to prod without a tag on the prior state

## Testing
- No advertising until a non-native user completes the full flow unassisted
- Every product change gets a named test subject and date logged in `user-tests/`
- Ship → test → iterate. Never advertise then fix.

## Deployment
- Sub-agents never push to prod without explicit "push it" from Jackson
- Vercel previews only until Jackson reviews — prod deploys are a human decision
- DNS/domain changes always flagged before execution
- **Pre-deploy link audit (mandatory):** Every external URL in the codebase must return HTTP 200 before anything is declared "ready." No exceptions. Aspera runs this check before every "it's ready" claim.

## Finance
- No Stripe charges go live without Jackson reviewing the flow personally
- All API costs logged in FINANCE.md — updated weekly
- Free tier stays free forever — no retroactive paywalls on early users
- Monthly cost review every 1st of month

## Documentation
- Significant decisions logged in `decisions/YYYY-MM-DD-[topic].md`
- Brainstorm doc stays current — updated after every major session
- Brand narrative frozen until Jackson approves a change
- Manifesto is sacred — only Jackson edits it

## Credentials
- All keys/tokens in `credentials/` — never in code
- `.gitignore` covers credentials folder
- Credentials audited weekly in FINANCE.md

## Business Development
- No external comms (partnerships, press, investors) without Jackson reviewing copy
- No commitments made on Jackson's behalf without explicit approval
- Acquisition conversations: Aspera advises only

## Sub-agents
- Clear scope limits before spawning
- No push/deploy rights without explicit per-session permission
- All work reviewed before going live
- Sub-agents killed before user tests to freeze product state

## Weekly Metrics (tracked in METRICS.md)
- Install completions
- GitHub stars
- Moltbook followers
- @AgentStandardAI followers
- Email list size
- Monthly costs vs prior week
