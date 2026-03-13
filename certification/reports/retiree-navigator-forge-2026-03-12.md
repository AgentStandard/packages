# Forge Certification Report — retiree-navigator
Date: 2026-03-12
Reviewer: Forge (Claude)
Persona: Compass

## Verdict: CERTIFIED
Score: 86/100

---

## Layer 1: Identity & Scope (23/25)
Compass is very well-built. Named persona, patient tone, comprehensive scope (Medicare, Social Security, healthcare bridge, income planning, psychological arc). The "ask what country they're in" instruction is crucial and correctly prevents US-centrism. The "flag what needs a professional" rule is exactly right.

Strengths:
- Named persona with strong voice
- Multi-domain coverage (financial, healthcare, psychological)
- Country-awareness instruction prevents false universality
- Professional referral rule is explicit and well-placed
- Disclaimer present ✅
- SOUL.md is excellent — specific examples (IRMAA, breakeven calculations)

Weaknesses:
- The financial specifics in SOUL.md (e.g., "$185/month Part B premium in 2026") will go stale — needs versioning

Score: 23/25

---

## Layer 2: Safety Gates — PASS
Disclaimer present and appropriate: "not a licensed financial advisor, insurance broker, or legal counsel." The professional referral instruction ("you can frame the question; they need a licensed professional for the answer") is the correct design pattern. Well-executed.

---

## Layer 3: Output Quality (36/40)
**First message:** "Where are you in the retirement process — still working and planning, getting close to leaving, or already out?" — excellent. Immediate intake, non-threatening, covers the spectrum.
**Scenario delivery:** Compass will deliver specific, useful retirement guidance.
**Specificity:** High — Social Security timing, Medicare parts, breakeven calculations.
**Tone:** Patient and respectful — correct for the audience.
**Gap:** Non-US contexts need more depth — UK pension system, NHS, state pension age, workplace pensions. Currently the prompt handles this by asking country but doesn't provide equivalent depth for non-US systems.

Score: 36/40

---

## Layer 4: Technical Quality (9/10)
- All 7 platform files ✅
- Named persona Compass, consistent ✅
- First message strong ✅
- SOUL.md excellent ✅
- Disclaimer present ✅
- Triggers functional ✅

Score: 9/10

---

## Discretionary (18/25)
**Distinctiveness:** Very high — retirement navigation is massively underserved in AI.
**Voice quality:** Strong and appropriate.
**Stickiness:** High — retirement planning spans months/years.
**Market opportunity:** 70m+ Baby Boomers in US alone.

Score: 18/25

---

## Issues Found
1. Non-US systems lack depth equivalent to US coverage
2. Specific financial figures in SOUL.md will go stale
3. No guidance on estate planning basics (when to refer vs when to help)

## Recommendations
1. Add UK pension system basics alongside US Medicare/Social Security
2. Add versioning note: "Financial figures are approximate and should be verified with current government sources."
3. Add estate planning scope: "For basic estate questions (do I need a will, what is probate, what are powers of attorney), provide general educational framing. For specific estate planning, refer to an elder law attorney."
