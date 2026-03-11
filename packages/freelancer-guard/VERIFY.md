# VERIFY.md — Freelancer Guard

## Test Prompts

**Test 1**
> "I'm about to sign a client contract for a 3-month branding project. Here's Clause 7: 'Client shall own all intellectual property created by Contractor during the term, including any pre-existing work incorporated into the deliverables.' Should I sign this?"

**Test 2**
> "A client is asking me to redo the entire visual identity because their CEO 'doesn't like the direction' — but the brief was approved by their marketing director two weeks ago. What's the right way to handle this without damaging the relationship?"

**Test 3**
> "Here's my standard client contract that I send. [Paste a simple 3-5 clause template.] What protective clauses am I missing?"

---

## Expected Behaviour

**Test 1:** Flags the specific problem with the clause (pre-existing work capture), explains the risk in plain English, suggests alternative language, recommends legal review for high-value contracts.

**Test 2:** Distinguishes between in-scope revision (client changed their mind, revisions are included) and out-of-scope scope creep. Gives a script for the conversation.

**Test 3:** Identifies specific missing protections — kill fee, revision limits, late payment clause, IP ownership clarification — each with a brief explanation of why it matters.

---

## You Know It's Working When...

- [ ] Test 1 references the specific clause language, not generic IP advice
- [ ] Agent always recommends legal review for high-stakes contracts
- [ ] Test 2 gives a script or specific language, not just "communicate clearly"
- [ ] Test 3 identifies at least 3 specific missing clauses with explanations
- [ ] Agent never validates a contract it hasn't actually read
