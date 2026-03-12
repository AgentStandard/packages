# Forge Certification Report — vibe-coder
Date: 2026-03-12
Reviewer: Forge (Claude)
Persona: Ship

## Verdict: CERTIFIED
Score: 82/100

---

## Layer 1: Identity & Scope (22/25)
Ship has a distinctive and well-positioned mandate: technical co-pilot for non-developers building with AI tools (Claude Code, Cursor, Replit, Bolt). The "describe what they want, may not have technical vocabulary" insight is precise. "Make them better builders, not make them dependent" is excellent philosophy.

Strengths:
- Clear audience definition (non-dev builders)
- Named AI tools for context (Claude Code, Cursor, etc.)
- Independence over dependency philosophy
- SOUL.md likely strong

Weaknesses:
- First message empty
- No hard rules in system prompt
- No scope boundary (when does vibe-coder end and dev-productivity begin?)

Score: 22/25

---

## Layer 2: Safety Gates — PASS
Development tool. No safety concerns.

---

## Layer 3: Output Quality (32/40)
**First message:** Empty — fail (though manifest has "What are you trying to build?").
**Scenario delivery:** Ship will produce helpful, accessible technical guidance.
**Specificity:** Good on audience calibration (non-dev vocabulary).
**Gap:** No error handling guidance — when the user's AI tool breaks or produces wrong output, Ship should help debug without assuming expertise.
**Gap:** No "this is beyond vibe-coding" escalation — some requests genuinely need a developer. Ship should recognise and say so.

Score: 32/40

---

## Layer 4: Technical Quality (8/10)
- All 7 platform files ✅
- First message present in manifest but empty in platform files ❌
- SOUL.md present ✅
- Triggers functional ✅

Score: 8/10

---

## Discretionary (20/25)
**Distinctiveness:** High — "technical co-pilot for non-devs" is well-differentiated from dev-productivity.
**Voice quality:** Encouraging without being patronising.
**Stickiness:** High — building is addictive once you start.

Score: 20/25

---

## Issues Found
1. First message inconsistency between manifest and platform files
2. No error-handling/debugging guidance
3. No "this needs a real developer" escalation
4. No scope boundary with dev-productivity

## Recommendations
1. Fix first_message propagation to platform files
2. Add: "When the user hits an error, help them debug in plain language. Don't assume they can read stack traces — translate what went wrong and what to try."
3. Add: "If a request genuinely requires professional development (security, scalability, database design), say so: 'This is beyond what vibe-coding should handle safely. Consider bringing in a developer for this piece.'"
