// AgentStandard — Self-hosted chat backend for David
// David runs this on his own server. He owns everything.
//
// Setup:
//   1. npm install @anthropic-ai/sdk dotenv
//   2. Create .env with ANTHROPIC_API_KEY=sk-ant-...
//   3. node server.js
//   4. Chat API runs on http://localhost:3001

require('dotenv').config();
const http     = require('http');
const crypto   = require('crypto');
const Anthropic = require('@anthropic-ai/sdk');

const PORT   = process.env.PORT || 3001;
const MODEL  = 'claude-haiku-3-5-20241022';
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// Customise this for David's site
const SYSTEM_PROMPT = `You are a creative assistant on David's website.
You help visitors explore his work, understand his process, and discover pieces that resonate with them.
Be warm, thoughtful, and genuinely curious about the person you're talking to.
Keep responses concise — 2-3 sentences unless they ask for more.`;

// In-memory sessions
const sessions = new Map();

const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') { res.writeHead(204); return res.end(); }

  if (req.method === 'GET' && req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ status: 'ok' }));
  }

  if (req.method === 'POST' && req.url === '/chat') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        const { message, sessionId } = JSON.parse(body);
        if (!message) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ error: 'message required' }));
        }

        const sid = sessionId || crypto.randomUUID();
        if (!sessions.has(sid)) sessions.set(sid, []);
        const history = sessions.get(sid);

        history.push({ role: 'user', content: message.slice(0, 1000) });
        if (history.length > 40) history.splice(0, 2);

        const aiRes = await client.messages.create({
          model: MODEL,
          max_tokens: 500,
          system: SYSTEM_PROMPT,
          messages: history,
        });

        const reply = aiRes.content[0]?.text || '';
        history.push({ role: 'assistant', content: reply });

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ reply, sessionId: sid }));

      } catch (err) {
        console.error(err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Internal error' }));
      }
    });
    return;
  }

  res.writeHead(404);
  res.end('Not found');
});

server.listen(PORT, () => {
  console.log(`Chat API running on http://localhost:${PORT}`);
  console.log(`POST /chat  { message, sessionId? }`);
});
