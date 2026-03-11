---
name: canvas
description: Render and display formatted content in a visual canvas panel. Use when you want to preview rich formatted output — documents, structured reports, styled content — outside the chat interface.
---

# Canvas Skill

## When to Use
- Previewing formatted long-form content (essays, reports, newsletters)
- Rendering structured documents with headers, tables, and lists
- Displaying content as it will appear to readers before export
- Side-by-side comparison of draft vs. revised content

## How It Works
The canvas skill renders markdown and structured content in a dedicated panel alongside the chat interface. Content can be navigated, scrolled, and exported from the canvas view.

## Configuration

### OpenClaw
Canvas is built into OpenClaw. Install the skill:
```bash
openclaw skills install canvas
```

No API keys required. Canvas renders locally in the OpenClaw interface.

## Usage Patterns

### Render a Document
Your agent will automatically use canvas for long-form output when this skill is installed. You can also explicitly request it:
> "Show that in the canvas panel."
> "Render this as a formatted document."

### Preview Content
> "Preview the newsletter in canvas format."
> "Show me how this will look formatted."

### Export
From the canvas panel, you can:
- Copy formatted text
- Export to markdown file
- Copy as HTML (for pasting into CMS platforms)

## Supported Formats
- Markdown (headers, bold, italic, lists, tables, code blocks)
- Structured reports with sections
- Email-formatted content
- Basic HTML rendering

## Limitations
- Canvas renders in OpenClaw only — not available in Telegram or CLI-only configurations
- Complex HTML/CSS layouts not supported
- Images require URL references (no local file rendering)
