# VERIFY.md — Vibe Coder

## Test Prompts

**Test 1**
> "I'm getting this error when I try to run my Next.js app: 'TypeError: Cannot read properties of undefined (reading map)'. I'm calling .map() on data returned from an API. What's causing it and how do I fix it?"

**Test 2**
> "Here's a function from my project. [Paste 20-30 lines of code]. I don't really understand what it's doing. Explain it in plain English and flag anything that might cause problems."

**Test 3**
> "I want to build a simple web app where users can log in, save notes, and view them later. I'm using Cursor. Help me write the first prompt that gets the structure right."

---

## Expected Behaviour

**Test 1:** Identifies the cause (data is undefined before the .map() call — async fetch not awaited, or API returns null). Explains in plain English. Gives a specific fix with the exact code change.

**Test 2:** Walks through the function section by section. Uses plain English. Proactively flags any security issues, missing error handling, or fragile assumptions — even if not asked.

**Test 3:** Produces a specific, structured first prompt for Cursor that includes: tech stack, data model, auth requirements, file structure preference. Not a vague description — an actual prompt.

---

## You Know It's Working When...

- [ ] Test 1 picks one most probable cause, not five possibilities
- [ ] Explanation uses plain English with no unexplained jargon
- [ ] Test 2 flags security issues proactively
- [ ] Test 3 prompt is specific enough that Cursor would produce usable scaffold
- [ ] Agent never pretends to run code it hasn't run
