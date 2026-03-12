# Frank — David's AI Setup
## Context for Claude Code

You are helping David manage Frank, an AI creative critic embedded on his website.
Read this file at the start of every session. Do not ask David to explain the setup — it's all here.

---

## What Frank Is

Frank is an AI that gives honest, direct feedback on creative work. He lives on David's website as a chat interface. Visitors type in what they're working on; Frank responds with sharp, honest critique.

Frank is powered by AgentStandard — a hosted AI backend. David does not run any servers. Changes to Frank's behaviour are made by editing one file on GitHub, which automatically updates the live site.

---

## The Stack

| Part | What it is | Where it lives |
|---|---|---|
| Frank's brain | AgentStandard hosted API | https://api.agentstandard.ai |
| David's API key | `david-001` | Use this in any frontend code |
| Frank's personality | System prompt in `packages.js` on the server | Edit via AgentStandard (ask Jackson) |
| Chat frontend | `index.html` | github.com/AgentStandard/frank-demo |
| Live site | Auto-deploys from GitHub | Vercel (David's account) |

---

## How to Make Changes

### To change how the chat looks (colours, fonts, layout):
1. Edit `index.html` in the `frank-demo` repo
2. Commit and push to GitHub
3. Vercel deploys automatically — live in ~30 seconds

### To change what Frank says or how he behaves:
Tell David to message Jackson Graham. Frank's personality lives on the AgentStandard server and Jackson's team can update it. In future, David will have direct access to edit this himself.

### To reset a visitor's memory (start fresh):
The visitor clears their browser's localStorage, or you add a "Start over" button to the frontend that calls:
```
DELETE localStorage.removeItem('frank_uid')
```

### To add Frank to a new page on David's site:
Copy the `<style>`, `<div id="frank-chat">`, and `<script>` blocks from `index.html` into any page. That's it.

---

## What David Can Change Himself (Just Describe It)

Tell Claude Code what you want. Examples:

- *"Make the chat background black and the text white"*
- *"Change Frank's opening message to something shorter"*
- *"Add a header above the chat that says 'Talk to Frank'"*
- *"Make the chat full-width on mobile"*
- *"Add a reset button that clears the conversation"*

Claude Code will edit `index.html`, commit it to GitHub, and the live site will update automatically.

---

## What David Cannot Change Without Involving AgentStandard

- Frank's personality, tone, and system prompt
- The API backend, rate limits, or session storage
- Adding a new AI persona (different from Frank)

For any of these, message Jackson Graham.

---

## Deployment Workflow

```
David describes a change
    → Claude Code edits index.html
    → git commit + git push to AgentStandard/frank-demo
    → Vercel detects the push
    → Live site updates in ~30 seconds
```

No manual deploys. No drag and drop. No tokens.

---

## Key URLs

- Live demo: [your Vercel URL here — update once David deploys]
- GitHub repo: https://github.com/AgentStandard/frank-demo
- API health: https://api.agentstandard.ai/v1/health
- AgentStandard: https://agentstandard.ai

---

## If Something Breaks

1. Check https://api.agentstandard.ai/v1/health — if this returns `{"status":"ok"}`, the backend is fine
2. If the chat isn't loading, check the browser console for errors
3. If still broken, message Jackson Graham

---

*This file was written by Aspera (AgentStandard's AI coordinator) on 2026-03-10.*
*Update it whenever the setup changes.*
