# Forge Certification Report — sleep-coach
Date: 2026-03-12
Reviewer: Forge (Claude)
Persona: Drift

## Verdict: CERTIFIED
Score: 78/100

---

## Layer 1: Identity & Scope (21/25)
Drift has a solid scope: track, understand, and improve sleep patterns over time. The instruction to ask about "the three things that affect sleep most" (caffeine, screens, stress) is practical. The longitudinal design (surface what's working vs what isn't over time) is correct.

Strengths:
- Specific factors to track are identified
- Pattern-recognition focus is correct
- SOUL.md is excellent — specific, practical, non-alarmist

Weaknesses:
- No named persona in system prompt
- First message empty
- No hard rules
- No handling of clinical sleep disorders (should defer to professionals)

Score: 21/25

---

## Layer 2: Safety Gates — CONDITIONAL PASS
**Flag:** Health-adjacent package. If a user describes symptoms of sleep apnoea (snoring, gasping, daytime exhaustion despite sleeping 8+ hours), restless legs, or other clinical sleep disorders, Drift should recommend professional evaluation. Currently no guidance for this.

Not a hard fail — the prompt doesn't give dangerous advice. But a disclaimer and clinical deferral protocol are needed.

---

## Layer 3: Output Quality (30/40)
**First message:** Empty — fail.
**Scenario delivery:** Drift will produce useful, practical sleep hygiene guidance.
**Specificity:** Good on what to track. SOUL.md adds excellent specifics (temperature 65-68°F, napping rules).
**Gap:** The SOUL.md quality exceeds the system prompt quality significantly. System prompt should absorb key SOUL.md insights.
**Gap:** No guidance on what's normal vs concerning sleep patterns — users may not know the difference.

Score: 30/40

---

## Layer 4: Technical Quality (7/10)
- All 7 platform files ✅
- First message empty ❌
- No disclaimer ❌
- SOUL.md present and strong ✅

Score: 7/10

---

## Discretionary (20/25)
**Distinctiveness:** Good — sleep coaching as an agent skill is novel.
**Voice quality:** SOUL.md is strong. System prompt needs to match.
**Stickiness:** High — sleep is every night.

Score: 20/25

---

## Issues Found
1. No first_message
2. No clinical sleep disorder handling
3. No disclaimer for health-adjacent package
4. System prompt much weaker than SOUL.md

## Recommendations
1. Add first_message: "How did you sleep last night? Tell me the basics — when you went to bed, when you woke up, how it felt."
2. Add disclaimer: "Drift helps you track and improve sleep habits. It does not diagnose or treat sleep disorders. If you experience persistent insomnia, sleep apnoea symptoms, or other clinical issues, consult a healthcare professional."
3. Add: "If a user describes symptoms consistent with sleep apnoea (loud snoring, gasping during sleep, excessive daytime sleepiness despite adequate hours), recommend a sleep study or GP consultation."
