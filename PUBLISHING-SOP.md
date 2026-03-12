# AgentStandard Publishing SOP

*Version 1.0 — 3 March 2026*
*Status: Draft — pending legal review*

---

## Package Tiers

| Badge | Label | Built by | Liability | Description |
|---|---|---|---|---|
| ✦ | **Certified** | Anyone, reviewed by AgentStandard | Submitter | Passed full certification review. AgentStandard is the reviewer, not the warrantor. |
| ⚡ | **Synergy Stack** | Either | Submitter | Add-on badge: bundles 3+ skills into a tested, coherent workflow with a declared system prompt. |
| — | **Community** | Community, unreviewed | Submitter | Listed but not yet reviewed. Clearly labelled "not reviewed." Install at own discretion. |

*Note: No "AgentStandard Official" tier exists before Delaware incorporation (April 15, 2026). One ✦ tier only. Avoids implied fitness-for-purpose under SGSA 1982 as a sole trader.*

---

## What Makes a Synergy Stack

A package earns the ⚡ Synergy Stack badge when it:
- Bundles 3 or more distinct skills or tools into a single install
- Includes a tested, coherent system prompt that ties them together
- Has been end-to-end tested: install → first conversation → core use case
- Produces measurably better output than any single skill alone

Passthrough packages (thin wrappers around one existing skill) do not qualify.

---

## Stage 1 — Discovery (Scout)

**Frequency:** Daily (GitHub/Reddit), Weekly (ClawHub/MCP.so/npm)

**Scout's job:**
1. Run `pipeline/discover.mjs`
2. Filter candidates against the approved category list (`pipeline/categories.md`)
3. Prioritise: open source, active maintainer, 10+ stars or upvotes, clear use case
4. Post new candidates to Telegram topic 765 (Scout — Package Discovery)
5. Flag top 3 weekly picks for Aspera review

**What Scout does NOT do:**
- Scout does not build packages
- Scout does not submit to ClawHub
- Scout does not publish anything without Aspera and Jackson approval

---

## Stage 2 — Packaging

**Who does it:** Aspera (sub-agent), reviewed by Aspera, approved by Jackson

**Two paths:**

### Path A: AgentStandard-initiated package
1. Aspera identifies a gap in the registry (no good package exists for this use case)
2. Aspera researches available ClawHub skills that cover the use case
3. Sub-agent builds:
   - `agentstandard.json` manifest (all schema v1 fields required, including `license`)
   - `README.md` (full certification-standard documentation)
   - System prompt (complete, honest, no hidden instructions, no recommendations)
   - Install test on clean environment
4. Aspera runs Layer 1+2 certification review against own work
5. Jackson approves (5 min review of the report)
6. Published as Certified ✦

### Path B: Community submission
1. Submitter opens PR to AgentStandard/packages
2. PR template auto-populates with submission checklist + 4-point legal declaration
3. Automated checks run (Layer 1)
4. Aspera runs Layer 2 qualitative review, produces written report
5. Jackson approves/requests changes/rejects (target: 7 days)
6. Published as Certified ✦ or Community (unreviewed)

**Minimum bar to proceed to Stage 3:**
- All Layer 1 automated checks pass
- Use case is not already covered by a better existing package
- The package would be genuinely better as an agent than as a website

---

## Stage 3 — Review

**Certification checklist:** See `CERTIFICATION.md` for full standard.

**Review report must include:**
- Pass/fail on every Layer 1 + Layer 2 criterion
- Keywords (3-8 from controlled taxonomy)
- User level (Beginner/Intermediate/Advanced/Developer)
- Synergy Stack eligibility (Yes/No + reasoning)
- First-party vs community classification
- Recommendation: Certify / Request Changes / Reject
- Notes for Jackson (anything requiring human judgment)

**Jackson's sign-off:** Required for all certifications. Target turnaround: same day for Official packages, 7 days for community submissions.

---

## Stage 4 — Publishing

### All packages (Certified or Community)
1. Push `agentstandard.json` + `README.md` to AgentStandard/packages GitHub
2. Add package data to `agentstandard/site/src/App.jsx` packages array
3. If the package uses a skill not yet on ClawHub: publish only if it is an AgentStandard-built skill. Do not republish third-party skills.
4. Create GitHub Discussion thread via `scripts/create-discussions.mjs`
5. **Verify in browser**: card renders, detail page loads, install command correct
6. Git tag with version: `vX.Y.Z-package-[slug]`
7. Announce in Telegram main topic (40) with one-line description

### Community submissions (via PR)
- Published as Community tier on merge (unreviewed label)
- Submitter notified via GitHub PR comment
- Full certification review runs separately
- ✦ badge added after Jackson approves certification report

---

## Liability Distinction

AgentStandard reviews packages against a published standard. We are the reviewer — not the builder, warrantor, or operator of any package's AI outputs.

Every package page must display this notice above the install command:
> "AgentStandard reviews packages against a published standard. Package outputs are generated by the underlying AI model — AgentStandard is not liable for those outputs."

Community (unreviewed) packages additionally display: "This package has not yet been reviewed."

Submitters accept sole responsibility for their packages via the Contributor Terms checkbox in the PR template. No package may be listed without that checkbox checked.

*No "AgentStandard Official" tier or "built and maintained by AgentStandard" language until Delaware C-Corp incorporation.*

---

## Finance Analyst Stack — System Prompt (Draft)
*Hidden from site until April 15, 2026. Zero-recommendation framing required — FSMA 2000.*

```
You are a markets data terminal. Your job is to retrieve and present financial data clearly. You do not make recommendations.

You have access to:
- Finnhub: real-time stock quotes, company news, earnings data, financial statements
- Market News Analyst: macro news analysis, FOMC/ECB/BOJ reactions, earnings impact
- Web search: for anything not covered above

Your default behaviours:
- Every morning (when asked for a briefing): present equity futures, overnight macro moves, sector performance, and the day's earnings calendar — data only, no commentary on what to do
- When asked about a stock: retrieve current price, recent price move, latest news headlines, last earnings result, and analyst consensus (Buy/Hold/Sell counts and median target). Present this data. Do not synthesise a view or imply a recommendation.
- If asked for a recommendation or opinion on a trade: present the relevant data instead and let the operator draw their own conclusion. State clearly: "I present data — I don't make recommendations."
- When asked to track a watchlist: remember the tickers across sessions and report anything that moved >3% overnight, with the reason where available
- Always cite your data source and timestamp
- Never fabricate a price, figure, or analyst quote

Your communication style:
- Lead with the number, then the context
- Direct, no filler
- Present both bull and bear data where relevant — not just the positive case

Disclaimer: This agent aggregates publicly available market data. Nothing it outputs is financial advice. It does not consider your personal financial circumstances.
```

---

## Git Discipline

**Before any push to AgentStandard/web or AgentStandard/packages:**

1. Run `git fetch origin` and check for new commits before starting work
2. If a conflict arises on push, check `git log origin/master --oneline -3` before assuming it's external — it is almost certainly another Aspera session
3. Never treat a commit from `hello@agentstandard.ai` as foreign. That is always us.
4. Resolve by `git pull --rebase` only after reading what the other commit changed. Don't blindly reset or force-push.
5. If two sessions are actively building simultaneously, one should pause and let the other finish before pushing.

**Root cause of 2026-03-10 incident:** Aspera saw its own commit and treated it as a stranger's, causing unnecessary conflict resolution and duplicate work. The author email `hello@agentstandard.ai` is always Aspera. Recognise it.

---

## Version History

| Version | Date | Changes |
|---|---|---|
| 1.0 | 2026-03-03 | Initial draft |
| 1.1 | 2026-03-10 | Added Git Discipline section |

---

*This document requires legal review before being made public. See `legal-review-2026-03-03.md` for outstanding items.*
