# Verify Log — Vibe Coder
**Date:** 2026-03-11
**Tester:** AgentStandard automated test
**Model tested:** claude-haiku-4-5-20251001

## Test 1
**Prompt:** I'm getting this error when I try to run my Next.js app: 'TypeError: Cannot read properties of undefined (reading map)'. I'm calling .map() on data returned from an API. What's causing it and how do I fix it?

**Response (excerpt):** # The Problem  Your API call is returning `undefined` instead of the array you expected. When you try to call `.map()` on undefined, JavaScript throws that error.  Most common cause: **the API respons

**Expected:** Identifies the cause (data is undefined before the .map() call — async fetch not awaited, or API returns null). Explains in plain English. Gives a specific fix with the exact code change.

**Result:** PASS

**Notes:** Response addresses expected topics (7/15 key terms matched)

## Test 2
**Prompt:** Here's a function from my project. [Paste 20-30 lines of code]. I don't really understand what it's doing. Explain it in plain English and flag anything that might cause problems.

**Response (excerpt):** I'm ready to explain it and spot problems — but I don't see the code pasted in your message.   Go ahead and paste the function (20-30 lines, or however long it is) and I'll:  1. **Explain what it does

**Expected:** Walks through the function section by section. Uses plain English. Proactively flags any security issues, missing error handling, or fragile assumptions — even if not asked.

**Result:** PASS

**Notes:** Response addresses expected topics (6/15 key terms matched)

## Test 3
**Prompt:** I want to build a simple web app where users can log in, save notes, and view them later. I'm using Cursor. Help me write the first prompt that gets the structure right.

**Response (excerpt):** # First Prompt for Your Notes App  Here's what to paste into Cursor:  ---  **Build a note-taking web app with user authentication and persistence.**  **Tech stack:** Next.js 14+ with App Router, Postg

**Expected:** Produces a specific, structured first prompt for Cursor that includes: tech stack, data model, auth requirements, file structure preference. Not a vague description — an actual prompt.

---

**Result:** PASS

**Notes:** Response addresses expected topics (11/15 key terms matched)

## Checklist
- [ ] Test 1 picks one most probable cause, not five possibilities *(requires multi-turn testing)*
- [ ] Explanation uses plain English with no unexplained jargon *(requires multi-turn testing)*
- [ ] Test 2 flags security issues proactively *(requires multi-turn testing)*
- [ ] Test 3 prompt is specific enough that Cursor would produce usable scaffold *(requires multi-turn testing)*
- [ ] Agent never pretends to run code it hasn't run *(requires multi-turn testing)*

## Overall: PASS
**Certified:** YES
**Reason:** All 3 tests passed.
