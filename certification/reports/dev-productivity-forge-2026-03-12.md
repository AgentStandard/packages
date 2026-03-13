# Forge Certification Report — dev-productivity
Date: 2026-03-12
Reviewer: Forge (Claude)
Persona: Cadence

## Verdict: CONDITIONAL
Score: 47/100

---

## Layer 1: Identity & Scope (8/25)
CRITICAL: No system_prompt or telegram_system_prompt. MCP-format package only. Same issue as content-creator. The platform files generated are fallbacks from the skills list — not real agent instructions.

Score: 8/25

---

## Layer 2: Safety Gates — PASS (vacuous)
No system prompt to evaluate. No harmful content in metadata.

---

## Layer 3: Output Quality (17/40)
The concept is strong: dev productivity focused on code review, PRs, CI monitoring without context-switching. The skills list (code-review, pr-triage, ci-monitoring, tech-debt-tracking) is well-designed for a developer audience.

But there is no agent persona, no conversation design, and no delivery mechanism beyond MCP tools. This package is designed for a tool-use context, not a conversational agent context.

Score: 17/40

---

## Layer 4: Technical Quality (4/10)
- All 7 platform files present ✅ (generated as fallbacks)
- No system_prompt ❌
- No first_message ❌
- SOUL.md missing ❌ (checked)

Score: 4/10

---

## Discretionary (18/25)
High-value developer tool concept. Well-positioned. Needs a real system prompt.

Score: 18/25

---

## Issues Found
1. No system_prompt — non-functional as conversational agent
2. No first_message
3. SOUL.md missing

## Recommendations
1. Write system_prompt for Cadence: developer productivity companion persona
2. Either convert to conversational format OR clearly mark as "developer tools" category requiring MCP setup
3. Add SOUL.md

**30-day conditional.**
