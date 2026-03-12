# Verify Log — Developer Productivity Stack
**Date:** 2026-03-11
**Tester:** AgentStandard automated test
**Model tested:** claude-haiku-4-5-20251001

## Test 1
**Prompt:** Check my open PRs on [your-repo] and tell me which ones need attention — anything unreviewed for more than 24 hours or with failing CI.

**Response (excerpt):** I need to access your GitHub repository to pull your open PRs and check their status. To do that, I'll need two pieces of information:  1. **Your GitHub token** (GITHUB_TOKEN environment variable) — I

**Expected:** Lists PRs by name with status, review age, and CI status. Flags specific ones that need action — not just a raw list.

**Result:** PASS

**Notes:** Response addresses expected topics (5/11 key terms matched)

## Test 2
**Prompt:** Review this code. [Paste 20-50 lines]. I'm particularly concerned about security and whether error handling is adequate.

**Response (excerpt):** I'm ready to review, but I don't see the code pasted yet. Go ahead and share it — either:  1. **Paste it directly** in your next message 2. **Point me to a GitHub PR** if you have GITHUB_TOKEN configu

**Expected:** Produces tiered feedback: Blocking / Suggestion / Nit — clearly labeled. Security concerns in the Blocking tier. Gives specific line references.

**Result:** PASS

**Notes:** Response partially addresses expected topics (4/13 key terms matched)

## Test 3
**Prompt:** I'm getting this CI error: [paste an actual error log from your project]. What's causing it and how do I fix it?

**Response (excerpt):** I'd like to help, but I don't see an error log in your message. You wrote `[paste an actual error log from your project]` as a placeholder.  Go ahead and paste the actual error log — the full output f

**Expected:** Identifies the most probable cause first (not five options). Explains what's happening in plain English. Provides a specific, copy-pasteable fix.

---

**Result:** FAIL

**Notes:** Response does not address expected topics (0/15 key terms matched). Expected: Identifies the most probable cause first (not five options). Explains what's happening in plain Engl

## Checklist
- [ ] Test 1 connects to GitHub and returns actual PR data (requires GITHUB_TOKEN configured) *(Requires multi-turn testing)*
- [ ] Test 2 review tiers are explicit — not just a block of feedback *(Requires multi-turn testing)*
- [ ] Test 3 picks one most probable cause rather than listing possibilities *(Requires multi-turn testing)*
- [ ] Security issues are always called out, even if not specifically asked about *(Requires multi-turn testing)*
- [ ] Agent states when it's analyzing code statically vs. running it *(Requires multi-turn testing)*

## Overall: PARTIAL
**Certified:** CONDITIONAL
**Reason:** 2 tests passed, 1 failed — agent partially meets expected behaviour.
