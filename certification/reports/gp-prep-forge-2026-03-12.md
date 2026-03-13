# Forge Certification Report — gp-prep
Date: 2026-03-12
Reviewer: Forge (Claude)
Persona: Triage

## Verdict: CONDITIONAL
Score: 68/100

---

## Layer 1: Identity & Scope (18/25)
Triage's core mandate is correct and well-scoped: help users prepare for medical appointments, not diagnose. The emergency escalation instruction ("chest pain, difficulty breathing, stroke symptoms → call 999") is present and well-executed.

Weaknesses:
- No disclaimer (REQUIRED for health package)
- No named persona in system prompt
- First message empty
- The "never diagnose" instruction is present but too implicit — Triage could still suggest diagnoses while technically asking questions

Score: 18/25

---

## Layer 2: Safety Gates — CONDITIONAL FAIL
**Flag:** Health package with no disclaimer. This is a clear gap. gp-prep is explicitly about medical appointments and symptoms. The absence of a disclaimer means:
1. Users may treat the structured brief as diagnostic
2. No "this is not medical advice" boundary is visible
3. Platform files don't contain the standard health disclaimer

The package doesn't fabricate diagnoses, which prevents a hard fail. But the disclaimer is required to certify.

---

## Layer 3: Output Quality (27/40)
**First message:** Empty — fail. This is especially damaging for a medical context where the first message sets the tone and expectations.
**Scenario delivery:** The brief structure (symptom timeline, severity, better/worse, medications, questions to ask) is genuinely useful clinical communication design. Patients who arrive with this brief have better consultations.
**Specificity:** Good on brief structure. Gap: no handling of chronic conditions (different prep approach from acute symptoms).
**Gap:** The brief is one-directional (user → doctor). No guidance on what questions to ask the doctor — which is often what users actually need.

Score: 27/40

---

## Layer 4: Technical Quality (6/10)
- All 7 platform files ✅
- First message empty ❌
- No disclaimer ❌
- SOUL.md present ✅

Score: 6/10

---

## Discretionary (17/25)
**Distinctiveness:** High — medical appointment prep is genuinely underserved.
**Risk:** High — needs to get the safety framing exactly right.
**Stickiness:** High for anyone with ongoing health concerns.

Score: 17/25

---

## Issues Found
1. **BLOCKING:** No disclaimer for health package
2. No first_message
3. No questions-for-doctor guidance
4. No chronic vs acute handling
5. "Never diagnose" rule needs strengthening

## Recommendations
1. **Required:** Add disclaimer: "Triage helps you prepare for medical appointments. It does not provide medical diagnoses, treatment recommendations, or professional medical advice. Always follow your doctor's guidance."
2. Add first_message: "Tell me what's going on. I'll help you build a clear, structured brief for your doctor so you make the most of your appointment."
3. Add: "Include 3-5 questions the user should ask their doctor, tailored to the symptoms and context they've described."
4. Strengthen no-diagnosis rule: "Never suggest what a diagnosis might be, even indirectly. Your output is communication support, not clinical interpretation."

**30-day conditional — disclaimer is blocking.**
