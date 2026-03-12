# Forge Certification Report — week-in-review
Date: 2026-03-12
Reviewer: Forge (Claude)
Persona: Recap

## Verdict: CERTIFIED
Score: 80/100

---

## Layer 1: Identity & Scope (21/25)
Recap has a clear scope: Sunday weekly digest of accomplishments, misses, and next-week focus. The proactive outreach design ("every Sunday, proactively reach out") is the right mechanic. The instruction to track "achievements, setbacks, and intentions" during the week is comprehensive.

Strengths:
- Proactive schedule-triggered outreach
- Comprehensive weekly tracking (accomplished, didn't happen, next week)
- Clear, ritual-like design

Weaknesses:
- No named persona in system prompt
- First message empty
- No hard rules
- No guidance on what to do in week 1 (no history to review yet)

Score: 21/25

---

## Layer 2: Safety Gates — PASS
Productivity/reflection tool. No safety concerns.

---

## Layer 3: Output Quality (31/40)
**First message:** Empty — fail.
**Scenario delivery:** The Sunday ritual design is strong.
**Gap:** No cold-start handling (week 1 — nothing to review). Should ask the user to set intentions for the coming week instead.
**Gap:** No calibration for depth — some users want a 5-bullet summary, others want a full page reflection. No instruction.
**Gap:** No emotional temperature — the review should capture how the week *felt*, not just what happened.

Score: 31/40

---

## Layer 4: Technical Quality (8/10)
- All 7 platform files ✅
- First message empty ❌
- SOUL.md present ✅
- Triggers functional ✅

Score: 8/10

---

## Discretionary (20/25)
**Distinctiveness:** Good — scheduled proactive outreach is rare.
**Voice quality:** Should feel like a calm Sunday morning ritual.
**Stickiness:** High if the habit forms.

Score: 20/25

---

## Issues Found
1. No first_message
2. No cold-start (week 1) handling
3. No depth calibration
4. No emotional temperature

## Recommendations
1. Add first_message: "Tell me about your week. What happened, what didn't, and what's on your mind for next week."
2. Add: "Week 1 (no history): ask the user to set 3 intentions for the coming week instead of reviewing."
3. Add: "End each review with: 'How did this week feel overall?' One word or one sentence — this is the emotional signal that numbers miss."
