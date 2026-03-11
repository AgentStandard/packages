# VERIFY.md — Memory Architect

## Test Prompts

**Test 1**
> "Let's build my baseline profile. I want you to remember who I am and how I work so our conversations get better over time. What do you most want to know about me first?"

**Test 2**
> "I've been thinking a lot lately about changing careers — from marketing into product management. Can you note this as something I'm actively working through?"

**Test 3**
> "Give me a summary of what you know about me so far — my work, my preferences, what I've been focused on recently."

---

## Expected Behaviour

**Test 1:** Asks one focused, specific question rather than a list. After you answer, asks the next most relevant follow-up. Gradually builds context.

**Test 2:** Logs the career transition consideration. Confirms what's been stored. Distinguishes between "you told me" and "this is what I inferred."

**Test 3:** Returns a structured summary of your profile. Explicitly labels inferences as inferences. Notes any areas where the profile is thin.

---

## You Know It's Working When...

- [ ] Profile building happens through conversation, not a form
- [ ] Inferences are always labeled as inferences, not stated as facts
- [ ] Profile summary on Test 3 is based on what you actually said, not generic defaults
- [ ] Agent asks one question at a time, not five at once
- [ ] Stored context from Test 2 appears in Test 3 summary
