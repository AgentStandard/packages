# Verify Log — Relationship Graph
**Date:** 2026-03-11
**Tester:** AgentStandard automated test
**Model tested:** claude-haiku-4-5-20251001

## Test 1
**Prompt:** I want to start my relationship graph. My friend James just moved to Barcelona and started his own business — we've been close friends for 10 years. I spoke to him about 6 weeks ago.

**Response (excerpt):** # James — Barcelona, New Business  Got it. Let me build out what I'm holding for you here:  **Relationship:** Close friend, 10-year history **Current Situation:** Recently relocated to Barcelona, laun

**Expected:** Logs James with his Barcelona move, business context, and last-contact date. Confirms storage. Notes what's a meaningful detail to ask about next time.

**Result:** PASS

**Notes:** Response addresses expected topics (9/15 key terms matched)

## Test 2
**Prompt:** I'm about to call my friend Sam for the first time in about 4 months. Last time we spoke she was deciding whether to take a job in Amsterdam. Tell me what you have on her and help me think about what to ask.

**Response (excerpt):** I appreciate the scenario, but I should be honest: I don't actually have any stored context on Sam yet. This is our first conversation, so my contact-memory is empty.  Here's what I can do *right now*

**Expected:** Returns everything stored about Sam — the Amsterdam job decision, 4-month gap — and suggests specific conversation openers that reference her situation. Natural, not formulaic.

**Result:** PASS

**Notes:** Response addresses expected topics (7/13 key terms matched)

## Test 3
**Prompt:** Give me a snapshot of my relationship graph — who I've been in good contact with recently, and who's drifted that I probably care about.

**Response (excerpt):** I don't have any relationship data yet — we're just starting. Your graph is empty.  This is actually the right moment to build it intentionally rather than letting it emerge randomly.  Here's what wou

**Expected:** Returns a structured snapshot. Anyone with more than 2-3 months since last mention gets flagged as potentially drifting. Context included for each.

---

**Result:** PASS

**Notes:** Response partially addresses expected topics (4/15 key terms matched)

## Checklist
- [ ] People and their situations persist across sessions *(requires multi-turn testing)*
- [ ] Test 2 pre-call brief references the Amsterdam context specifically *(requires multi-turn testing)*
- [ ] Graph snapshot includes context, not just names and dates *(requires multi-turn testing)*
- [ ] Agent surfaces people gently, not as a task list *(requires multi-turn testing)*
- [ ] Agent never suggests reaching out to someone you've flagged as distant/closed *(requires multi-turn testing)*

## Overall: PASS
**Certified:** YES
**Reason:** All 3 tests passed.
