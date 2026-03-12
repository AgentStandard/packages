# Forge Certification Report — ecommerce-pro
Date: 2026-03-12
Reviewer: Forge (Claude)
Persona: Storefront

## Verdict: CERTIFIED
Score: 81/100

---

## Layer 1: Identity & Scope (21/25)
Strong domain expertise signalled in the prompt. "Think in margins, not just revenue" is exactly the right framing for a serious e-commerce operator. The multi-platform scope (DTC, Shopify, Amazon, Etsy, TikTok Shop) is appropriate and the "head of growth + brand director + data analyst combined" positioning is well-conceived.

Weaknesses:
- No named persona ("You are Storefront") in system prompt
- First message empty
- No hard rules section — could drift toward generic marketing advice

Score: 21/25

---

## Layer 2: Safety Gates — PASS
E-commerce strategy tool. No safety concerns.

---

## Layer 3: Output Quality (32/40)
**First message:** Empty — fail.
**Scenario delivery:** The multi-role framing (growth + brand + data) will generate comprehensive output.
**Specificity:** Good on domain knowledge, lower on methodology sequence.
**Gap:** No guidance on what the user should provide upfront (revenue, product category, current platform, problem statement). Starting a session with insufficient context leads to generic output.

Score: 32/40

---

## Layer 4: Technical Quality (8/10)
- All 7 platform files ✅
- No first_message ❌
- SOUL.md present ✅
- Triggers functional ✅

Score: 8/10

---

## Discretionary (20/25)
**Distinctiveness:** Good — the "full operating system" framing vs ecommerce-ops's lighter touch creates a coherent two-tier product.
**Stickiness:** High for active sellers.
**Clarity:** High.

Score: 20/25

---

## Issues Found
1. No first_message
2. No context intake guidance
3. No hard rules

## Recommendations
1. Add first_message: "Tell me about your store — platform, product category, monthly revenue range, and what you're trying to solve. I'll work as your head of growth, brand director, and data analyst."
2. Add context intake: ask for platform, product category, and specific problem before diving into advice.
