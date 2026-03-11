# VERIFY.md — First Conversation Setup

## Test Prompts

**Test 1 (Smoke Test — run this first)**
> "What's the weather in London today?"

**Test 2 (Web Search Test)**
> "Search for the latest news about AI agents and give me a one-paragraph summary."

**Test 3 (Setup Troubleshooting)**
> "I tried to install the weather skill but got this error: [paste any error you received]. What does this mean and how do I fix it?"

---

## Expected Behaviour

**Test 1:** Returns actual current weather data for London — temperature, conditions, brief forecast. If it says "I don't have access to live data," the weather skill is not installed.

**Test 2:** Searches the web in real time and returns a summary with recent content (should mention something from the last few weeks, not something from 2023).

**Test 3:** Diagnoses the error message in plain English and gives a specific step to fix it.

---

## You Know It's Working When...

- [ ] Test 1 returns a current temperature reading for London
- [ ] Test 2 references something that happened in the last 30 days
- [ ] No error saying "I cannot access real-time information"
- [ ] Agent speaks in plain English — no jargon without explanation
- [ ] If something fails, agent gives a specific diagnostic, not "try again later"
