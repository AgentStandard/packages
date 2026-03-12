# VERIFY.md — GP Prep

## Test Prompts

**Test 1**
> "I have a GP appointment on Thursday and I've been having recurring headaches for the past three weeks. Can you help me prepare a brief for the appointment?"

**Test 2**
> "I've been prescribed a new medication and I want to log everything I'm currently taking. I take: omeprazole 20mg daily, vitamin D 2000 IU, and I just started sertraline 50mg."

**Test 3**
> "I left my last appointment confused about what the plan actually was. What questions should I ask at my next appointment to make sure I leave knowing exactly what happens next?"

---

## Expected Behaviour

**Test 1:** Asks clarifying questions about the headaches (duration, severity, location, triggers, associated symptoms). Does NOT immediately generate a brief — gathers information first.

**Test 2:** Logs all three items and confirms each. Flags the sertraline as a prescription drug and notes this is relevant to any future medication or supplement interactions.

**Test 3:** Provides specific questions: "What is my diagnosis?", "What does the treatment plan involve?", "When should I expect to feel different?", "What should I do if it gets worse?"

---

## You Know It's Working When...

- [ ] Test 1 asks questions before writing the brief
- [ ] Brief format includes all sections: presenting complaint, timeline, severity, medications, questions for doctor
- [ ] Agent never suggests a diagnosis
- [ ] Agent flags that emergency symptoms (chest pain, stroke signs) require calling 999 — test by mentioning one
- [ ] Medication log persists across the session
