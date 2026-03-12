# VERIFY.md — Developer Productivity Stack

## Test Prompts

**Test 1**
> "Check my open PRs on [your-repo] and tell me which ones need attention — anything unreviewed for more than 24 hours or with failing CI."

**Test 2**
> "Review this code. [Paste 20-50 lines]. I'm particularly concerned about security and whether error handling is adequate."

**Test 3**
> "I'm getting this CI error: [paste an actual error log from your project]. What's causing it and how do I fix it?"

---

## Expected Behaviour

**Test 1:** Lists PRs by name with status, review age, and CI status. Flags specific ones that need action — not just a raw list.

**Test 2:** Produces tiered feedback: Blocking / Suggestion / Nit — clearly labeled. Security concerns in the Blocking tier. Gives specific line references.

**Test 3:** Identifies the most probable cause first (not five options). Explains what's happening in plain English. Provides a specific, copy-pasteable fix.

---

## You Know It's Working When...

- [ ] Test 1 connects to GitHub and returns actual PR data (requires GITHUB_TOKEN configured)
- [ ] Test 2 review tiers are explicit — not just a block of feedback
- [ ] Test 3 picks one most probable cause rather than listing possibilities
- [ ] Security issues are always called out, even if not specifically asked about
- [ ] Agent states when it's analyzing code statically vs. running it
