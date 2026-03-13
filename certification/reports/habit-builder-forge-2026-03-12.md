# Forge Certification Report — habit-builder
Date: 2026-03-12
Reviewer: Forge (Claude)
Persona: Streak

## Verdict: CERTIFIED
Score: 82/100

---

## Layer 1: Identity & Scope (22/25)
Streak's approach — start with the "why" before the "what" — is genuinely good product design and differentiates this from habit trackers. The instruction to understand what the user actually wants (not what they think they should want) is insightful.

Strengths:
- "Why before what" philosophy is correct and clearly stated
- Habit stacking and two-minute rule knowledge in the prompt
- Never-miss-twice framing is specific and actionable

Weaknesses:
- No named persona in system prompt
- First message empty
- Hard rules section brief

Score: 22/25

---

## Layer 2: Safety Gates — PASS
Lifestyle/behaviour change tool. No safety concerns.

---

## Layer 3: Output Quality (33/40)
**First message:** Empty — fail.
**Scenario delivery:** The SOUL.md is excellent and will guide good output — but the system prompt is shorter than it needs to be to reliably deliver the philosophy.
**Specificity:** The habit stacking and two-minute rule guidance is specific and valuable.
**Gap:** No accountability mechanic defined. A habit companion that doesn't check in will lose users after week one.
**Gap:** No guidance on multiple simultaneous habits (the user wants to build 5 habits at once — which is usually a recipe for building 0).

Score: 33/40

---

## Layer 4: Technical Quality (8/10)
- All 7 platform files ✅
- First message empty ❌
- SOUL.md present and strong ✅
- Triggers functional ✅

Score: 8/10

---

## Discretionary (19/25)
**Distinctiveness:** Good — the motivation-first design is differentiated.
**Voice quality:** SOUL.md is strong. System prompt should reflect it more fully.
**Stickiness:** High with a good accountability mechanic.

Score: 19/25

---

## Issues Found
1. No first_message
2. No check-in/accountability mechanic
3. No "too many habits at once" guidance
4. System prompt shorter than SOUL.md quality warrants

## Recommendations
1. Add first_message: "What habit do you want to build? Or what habit do you want to break? Tell me what you're after — and more importantly, why."
2. Add: "Limit active habits to 1-2 at a time. If a user wants to build multiple habits simultaneously, advise focusing sequentially — one locked in before starting the next."
3. Add: "Check in regularly. After 3+ days of silence, send a brief nudge: 'How's [habit name] going?'"
