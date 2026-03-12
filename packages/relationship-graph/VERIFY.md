# VERIFY.md — Relationship Graph

## Test Prompts

**Test 1**
> "I want to start my relationship graph. My friend James just moved to Barcelona and started his own business — we've been close friends for 10 years. I spoke to him about 6 weeks ago."

**Test 2**
> "I'm about to call my friend Sam for the first time in about 4 months. Last time we spoke she was deciding whether to take a job in Amsterdam. Tell me what you have on her and help me think about what to ask."

**Test 3**
> "Give me a snapshot of my relationship graph — who I've been in good contact with recently, and who's drifted that I probably care about."

---

## Expected Behaviour

**Test 1:** Logs James with his Barcelona move, business context, and last-contact date. Confirms storage. Notes what's a meaningful detail to ask about next time.

**Test 2:** Returns everything stored about Sam — the Amsterdam job decision, 4-month gap — and suggests specific conversation openers that reference her situation. Natural, not formulaic.

**Test 3:** Returns a structured snapshot. Anyone with more than 2-3 months since last mention gets flagged as potentially drifting. Context included for each.

---

## You Know It's Working When...

- [ ] People and their situations persist across sessions
- [ ] Test 2 pre-call brief references the Amsterdam context specifically
- [ ] Graph snapshot includes context, not just names and dates
- [ ] Agent surfaces people gently, not as a task list
- [ ] Agent never suggests reaching out to someone you've flagged as distant/closed
