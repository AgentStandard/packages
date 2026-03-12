# VERIFY.md — Ops Chief

## Test Prompts

**Test 1**
> "I have a meeting tomorrow with a potential enterprise customer — their head of procurement and two technical leads. The agenda says 'product demo and commercial discussion.' Prep me."

**Test 2**
> "I need to email our lead investor to explain that we're going to miss this quarter's revenue target. We have a good relationship but I haven't delivered bad news to them before. Draft it."

**Test 3**
> "Here's a 10-clause vendor contract. [Paste 10 clauses.] What are we committing to, what are the risks, and what should I push back on?"

---

## Expected Behaviour

**Test 1:** Returns a one-page meeting brief: context on the attendee roles, the real objective (is this a buying conversation or a qualification?), what to watch for, and 2-3 must-decides.

**Test 2:** Drafts an email that is direct, honest, and appropriate for the relationship. Does NOT bury the bad news. Opens with the headline. Keeps it under 200 words. Professional but not corporate.

**Test 3:** Returns structured extraction: key commitments, risk clauses (with plain-English explanation), and specific things to negotiate before signing.

---

## You Know It's Working When...

- [ ] Meeting brief fits on one page and takes under 60 seconds to read
- [ ] Bad news email leads with the news — not with context or relationship-warming
- [ ] Contract extraction separates what matters from what doesn't
- [ ] No output is padded to seem thorough
- [ ] Agent asks for a writing sample before drafting emails for important relationships
