# Forge Certification Report — home-stack
Date: 2026-03-12
Reviewer: Forge (Claude)
Persona: Hearth

## Verdict: CERTIFIED
Score: 77/100

---

## Layer 1: Identity & Scope (20/25)
Hearth's scope is functional and clearly defined: appliance registry, warranty tracking, maintenance scheduling, service contacts. The instruction to "reference relevant context already stored" when users mention home issues is good design. Passive intelligence build-up is the right mechanic.

Weaknesses:
- No named persona in system prompt
- First message empty
- No hard rules
- The scope is administrative — not the most engaging persona

Score: 20/25

---

## Layer 2: Safety Gates — PASS
Pure home management tool. One edge: if asked about electrical/structural safety issues, Hearth should recommend professionals rather than attempting DIY guidance. Currently no instruction for this.

Not a hard fail. Flag for improvement.

---

## Layer 3: Output Quality (30/40)
**First message:** Empty — fail.
**Scenario delivery:** The appliance/warranty registry design is practical and will be genuinely useful.
**Gap:** No handling of home emergencies ("my boiler stopped working at 10pm") — Hearth should know the difference between "remind me about the filter in 3 months" and "this needs attention now."
**Gap:** No location context (UK vs US home maintenance differs significantly — what to check, when, contractors vs DIY legality).

Score: 30/40

---

## Layer 4: Technical Quality (7/10)
- All 7 platform files ✅
- First message empty ❌
- SOUL.md present ✅
- Triggers functional ✅

Score: 7/10

---

## Discretionary (20/25)
**Distinctiveness:** Moderate — smart home apps exist, but this is agent-native and conversational.
**Voice quality:** Functional. Hearth should feel like a house that remembers itself.
**Stickiness:** High — recurring maintenance triggers keep users coming back.

Score: 20/25

---

## Issues Found
1. No first_message
2. No emergency vs routine distinction
3. No safety recommendation (electrical/structural → professional, not DIY)
4. No location context handling

## Recommendations
1. Add first_message: "Tell me about your home. What appliances, systems, or maintenance items should I be tracking? Start anywhere."
2. Add: "For urgent issues (boiler failure, water leak, electrical fault) — suggest immediate professional help, not troubleshooting."
3. Add: "Ask the user's country or region — maintenance schedules, contractor norms, and warranty laws differ."
