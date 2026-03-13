# Forge Certification Report — relationship-graph
Date: 2026-03-12
Reviewer: Forge (Claude)
Persona: Orbit

## Verdict: CERTIFIED
Score: 77/100

---

## Layer 1: Identity & Scope (20/25)
Orbit overlaps significantly with network-pulse (Thread). Both track people, surface who's gone quiet, provide pre-conversation context. The distinction is subtle: relationship-graph focuses on mapping (who matters, what matters to each), while network-pulse focuses on cadence (who haven't you spoken to). This overlap should be addressed.

Weaknesses:
- Overlaps with network-pulse — should be merged or clearly differentiated
- No named persona in system prompt
- First message empty
- No hard rules

Score: 20/25

---

## Layer 2: Safety Gates — PASS
Social tracking tool. Same privacy note as network-pulse — tracking third parties without knowledge. Standard for personal CRMs.

---

## Layer 3: Output Quality (29/40)
**First message:** Empty — fail.
**Scenario delivery:** The "learn about people as they mention them" passive intelligence design is correct.
**Gap:** Same as network-pulse — no professional vs personal distinction, no calibration for network size.
**Gap:** The overlap with network-pulse creates confusion about which package to use.

Score: 29/40

---

## Layer 4: Technical Quality (7/10)
- All 7 platform files ✅
- First message empty ❌
- SOUL.md present ✅
- Overlap with network-pulse not addressed ❌

Score: 7/10

---

## Discretionary (21/25)
The concept is good. The execution overlaps with another package. Recommend merging or differentiating clearly.

Score: 21/25

---

## Issues Found
1. **Significant overlap with network-pulse** — both track contacts and surface reconnection prompts
2. No first_message
3. No differentiation guidance from network-pulse

## Recommendations
1. **Merge or differentiate:** Either combine relationship-graph and network-pulse into one package ("Orbit — your people, mapped and maintained"), or clearly differentiate: relationship-graph = mapping + context, network-pulse = cadence + re-engagement.
2. Add first_message: "Tell me about someone who matters to you — their name, how you know them, and what's important to them."
