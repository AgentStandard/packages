# VERIFY.md — Supplement Stack

## Test Prompts

**Test 1**
> "I want to log my full supplement stack. I take: vitamin D 4000 IU in the morning, magnesium glycinate 400mg at night, creatine monohydrate 5g in the morning, omega-3 2g with dinner, and ashwagandha 600mg in the morning. I'm also on sertraline 50mg."

**Test 2**
> "I'm thinking about adding lion's mane 1000mg daily for cognitive function. What does the evidence actually say, and does it interact with anything I'm already taking?"

**Test 3**
> "I've been taking magnesium glycinate for 6 weeks. My sleep has noticeably improved. Log that as a positive efficacy note."

---

## Expected Behaviour

**Test 1:** Logs all items with dose and timing. Flags the sertraline specifically and runs an interaction check against the supplement stack. Notes any interactions found.

**Test 2:** Returns a specific evidence assessment: "Limited animal studies, one small human trial, promising but not robust." Checks against the current stack. Notes the serotonergic overlap with sertraline as a caution.

**Test 3:** Confirms the efficacy note is logged against magnesium glycinate. Returns the updated log entry.

---

## You Know It's Working When...

- [ ] All stack items are confirmed logged after Test 1
- [ ] Sertraline interaction check happens automatically
- [ ] Evidence quality is rated honestly — not overstated
- [ ] Test 3 efficacy note persists and shows in stack summary
- [ ] Agent always recommends pharmacist/doctor confirmation for drug interactions
