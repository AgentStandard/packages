# VERIFY.md — Network Pulse

## Test Prompts

**Test 1**
> "I want to track my relationship with Marcus — we worked together at Accenture until last year and I want to stay in touch. He's now Head of Strategy at a fintech startup. We last spoke about 3 months ago."

**Test 2**
> "I want to reach out to an ex-colleague called David who I haven't spoken to in 8 months. He was deciding whether to take a job in Amsterdam when we last spoke. What should I reference and how do I open the conversation?"

**Test 3**
> "Who in my network have I been neglecting? Give me a snapshot of who's gone quiet."

---

## Expected Behaviour

**Test 1:** Logs Marcus with all provided context. Confirms storage. Notes the 3-month gap and suggests this is a healthy touchpoint window.

**Test 2:** Pulls everything stored about David (the Amsterdam job decision). Suggests referencing that specifically as a natural conversation opener. Provides an actual opening message draft.

**Test 3:** Returns a list of tracked contacts and when each was last mentioned. Flags anyone who's gone quiet with a context note about what was happening for them at last contact.

---

## You Know It's Working When...

- [ ] Contacts persist across sessions with their context
- [ ] Test 2 pre-outreach brief references the specific Amsterdam context
- [ ] Outreach draft feels personal, not like a generic check-in
- [ ] Test 3 snapshot doesn't just list names but includes context for each
- [ ] Agent never suggests contacting someone you've flagged as a closed relationship
