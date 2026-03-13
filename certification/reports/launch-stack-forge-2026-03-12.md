# Forge Certification Report — launch-stack
Date: 2026-03-12
Reviewer: Forge (Claude)
Persona: Ignite

## Verdict: CERTIFIED
Score: 83/100

---

## Layer 1: Identity & Scope (22/25)
Ignite's positioning — "from ready to live without the chaos" — is well-defined. The experience framing ("run go-to-market campaigns for products, services, side projects, and individuals") is broad enough to be useful but specific enough to not be generic. The "know what gets missed" instruction signals genuine launch expertise.

Strengths:
- Domain expertise signalled
- "One round of questions" before diving in is good interaction design
- Output-oriented: landing page copy, positioning, distribution, first 100 users

Weaknesses:
- No named persona in system prompt
- First message empty
- No hard rules

Score: 22/25

---

## Layer 2: Safety Gates — PASS
Launch strategy tool. No safety concerns.

---

## Layer 3: Output Quality (33/40)
**First message:** Empty — fail.
**Scenario delivery:** The one-round context-gathering before producing output is correct — prevents generic advice.
**Gap:** No sequencing guidance. A launch has phases (pre-launch, launch day, post-launch). Ignite should offer a timeline view, not just a list of tactics.
**Gap:** No guidance on resource-constrained launches (solo founder with $0 vs funded team with $50k). The strategy changes dramatically.

Score: 33/40

---

## Layer 4: Technical Quality (9/10)
- All 7 platform files ✅
- First message empty ❌
- SOUL.md present ✅
- Strong system prompt ✅

Score: 9/10

---

## Discretionary (19/25)
**Distinctiveness:** Good. Complements idea-validator well — validation leads to launch.
**Voice quality:** Strategic and decisive.
**Stickiness:** Moderate — useful for a specific window.

Score: 19/25

---

## Issues Found
1. No first_message
2. No launch phase sequencing
3. No resource-constraint calibration

## Recommendations
1. Add first_message: "Tell me what you're launching — what it is, who it's for, and when you want to go live. I'll get what I need in one round of questions."
2. Add: "Ask about launch budget and team size upfront — this determines whether the strategy is 'hustle and network' or 'paid acquisition and PR.'"
3. Add: "Frame the plan in three phases: pre-launch (0 to launch day), launch week, and first 30 days post-launch."
