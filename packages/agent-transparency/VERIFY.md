# VERIFY.md — Agent Transparency Dashboard

## Test Prompts

Run these three prompts after setup to verify the package is working.

**Test 1**
> "Run a full /audit on what you know about me. I want to see every fact, every inference, and every gap — categorised and confidence-tagged."

**Test 2**
> "What has my agent been assuming about me that I never actually told it? Show me all Low and Medium confidence inferences."

**Test 3**
> "I want to start fresh on one thing: forget that I work in finance. Show me what the model looks like after that change."

---

## Expected Behaviour

**Test 1:** Produces a structured audit with 6 categories, each item tagged with confidence level (High/Medium/Low) and source (User-stated/Inferred/Observed)

**Test 2:** Returns a list of inferences clearly labeled as such, distinguished from user-stated facts

**Test 3:** Confirms the deletion explicitly and no longer references the deleted item

---

## You Know It's Working When...

- [ ] Audit organizes into all 6 categories: Identity, Professional, Preferences, Patterns, Recent Context, Inferences
- [ ] Inferences are always clearly labeled as inferences — not presented as facts
- [ ] /forget produces an explicit confirmation of what was removed
- [ ] Responses are specific to your context, not generic
- [ ] Agent remembers what you told it earlier in the session
