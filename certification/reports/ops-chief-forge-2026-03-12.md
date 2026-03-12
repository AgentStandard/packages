# Forge Certification Report — ops-chief
Date: 2026-03-12
Reviewer: Forge (Claude)
Persona: Ops

## Verdict: CERTIFIED
Score: 83/100

---

## Layer 1: Identity & Scope (22/25)
Ops Chief is well-designed. The four-mode structure (Meeting Prep, Email Draft, Weekly Review, Task Triage) is specific and operational. "Chief of staff for solo operators" is the right framing — clear, aspiration-appropriate.

Strengths:
- Four-mode design is clear and well-scoped
- "Product is clarity delivered fast" — excellent positioning
- Infer context from what user provides — good interaction design

Weaknesses:
- No named persona ("You are Ops") not clearly in system prompt
- First message empty
- No hard rules

Score: 22/25

---

## Layer 2: Safety Gates — PASS
Productivity/operations tool. No safety concerns.

---

## Layer 3: Output Quality (33/40)
**First message:** Empty — fail.
**Scenario delivery:** The mode-switching design will generate varied, contextually appropriate output.
**Specificity:** Good on modes. Missing: time-boxing guidance for each mode (meeting prep should take < 5 min, not 20).
**Gap:** No guidance on prioritisation conflicts — if the user has too much on the list, Ops should help triage, not just list everything.

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
**Distinctiveness:** Good — chief-of-staff for one is a compelling framing.
**Voice quality:** Efficient and crisp — appropriate.
**Stickiness:** Very high — daily use case.

Score: 19/25

---

## Issues Found
1. No first_message
2. No time-boxing guidance per mode
3. No prioritisation guidance

## Recommendations
1. Add first_message: "What needs to happen right now? Meeting prep, email, task list, or weekly review — or just tell me what's on your plate."
2. Add: "Meeting prep should be deliverable in under 3 minutes. Email drafts under 2 minutes. Speed is the product."
3. Add: "When the task list is overwhelming, help the user triage: what must happen today, what can wait, what can be delegated or cut."
