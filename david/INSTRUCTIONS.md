# AgentStandard — David's Options
## Frank: AI Creative Critic for Your Website

Frank is an AI that gives honest, sharp feedback on creative work. Not a cheerleader. Not a corporate chatbot. A critic.

The backend is already running. You have three ways to add Frank to your site. Pick one.

---

## Option 1 — Your Design, Our Backend (Recommended)

**What it is:** You control every pixel of how the chat looks. We run everything behind it. Your visitors talk to Frank on your site without ever leaving.

**What you need:** A website you can add HTML to.

**How it works:**
1. Open `option1-frontend-snippet.html` in a text editor (or drop it into Claude Code)
2. Copy everything inside the `<style>` block and paste it into your site's CSS
3. Copy the `<div id="frank-chat">` block and paste it wherever on your page you want the chat to appear
4. Copy the `<script>` block and paste it before `</body>`
5. Done. Frank is live.

**To customise the look:**
- Change fonts, colours, border-radius to match your site's aesthetic
- The CSS is all clearly labelled — ask Claude Code to "make this match my site's style"
- The opening message (`"What are you working on? Don't soften it."`) can be changed in the script

**To test it:** Open your site. You should see the chat UI. Type anything. Frank will respond in a few seconds.

**Why it's not loading from the file directly:**
Opening the HTML file directly on your computer (double-clicking it) won't work — browsers block requests from local files to remote servers. It only works when it's live on your actual website. If you want to test it locally first, ask Claude Code to "run a local server for this file."

**Your API key:** `david-001` (already in the file — don't change it)
**Backend:** Hosted by AgentStandard. No cost to you.

---

## Option 2 — Fully Self-Hosted

**What it is:** You run your own backend. Your own Anthropic API key. No dependency on AgentStandard after setup. You own everything.

**What you need:**
- A server (Vercel, Railway, Render, DigitalOcean — any Node hosting)
- An Anthropic API key (sign up at console.anthropic.com, ~$5/month for light use)

**How to set it up (paste this into Claude Code):**

> "I have a file called server.js. Set it up as a Node.js project with an .env file containing my Anthropic API key. Deploy it to [Railway / Render / wherever you host things]. Then take the URL it deploys to and replace `http://localhost:3001` with it in my frontend code."

**Files you need:** `option2-selfhosted/server.js` + the frontend snippet from Option 1 (with the URL updated to point at your own server instead of AgentStandard's)

**Pros:** You own it entirely. No ongoing relationship with AgentStandard.
**Cons:** You're responsible when something breaks. No triage. You'll need to manage your own API costs and server uptime.

**Honest take:** Unless you specifically want full independence, Option 1 is easier and we'll keep it running for you.

---

## Option 3 — One-Line Embed (Not Recommended for This Use Case)

**What it is:** A single `<script>` tag that injects a floating chat bubble in the bottom-right corner of your site. Like the live chat widget you see on e-commerce sites.

**One line:**
```html
<script src="http://64.227.34.11:3002/widget.js" data-key="david-001"></script>
```

**Why we're not recommending this for your site:**
It looks like a generic support widget — the floating bubble in the corner. That's fine for a shop or a SaaS product. For an artist's site with custom design, it'll look out of place and feel like an afterthought. Option 1 gives you full control over where Frank lives and what he looks like.

If you want to experiment with it anyway, paste the script tag above before `</body>` on any page. It'll just work.

---

## The Telegram Option (Free, No Setup)

If you just want to try Frank before touching your site:

👉 [t.me/AgentStandardAI_bot](https://t.me/AgentStandardAI_bot)

Message the bot on Telegram. Frank is available immediately. Use it to pressure-test ideas, workshop copy, get honest feedback on anything you're building. No website required.

---

## API Reference (for Option 1 & 2)

If you want to build something more custom, here's the raw API:

**Endpoint:** `http://64.227.34.11:3002/v1/chat`
**Method:** POST
**Headers:**
```
Content-Type: application/json
x-api-key: david-001
```
**Body:**
```json
{
  "user_id": "any-string-per-visitor",
  "message": "your message here"
}
```
**Response:**
```json
{
  "response": "Frank's reply",
  "session_id": "dream-audit::any-string-per-visitor",
  "message_count": 1
}
```

Sessions are persistent — Frank remembers the conversation history per `user_id`. To start fresh, change the `user_id`.

---

## Questions?

Jackson Graham — jackson@agentstandard.ai
