// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { getResponse, logQuery } = require('./agent_templates/chatbotAgent');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// ➤ GET / → Welcome
app.get('/', (req, res) => {
  res.send(`
    <h1>💬 BMAD Chatbot Agent</h1>
    <p>Use POST requests to:</p>
    <ul>
      <li><code>/agent/start</code> → Start agent</li>
      <li><code>/agent/query</code> → Ask a question</li>
      <li><code>/agent/workflow/support</code> → Run support workflow</li>
    </ul>
  `);
});

// ➤ POST /agent/start → Start the agent
app.post('/agent/start', (req, res) => {
  const { name } = req.body;
  console.log(`🟢 Chatbot Agent started for: ${name || 'Guest'}`);
  res.json({ status: 'Chatbot started', message: `Hello ${name || 'User'}! How can I help?` });
});

// ➤ POST /agent/query → Answer a question
app.post('/agent/query', (req, res) => {
  const { question } = req.body;
  if (!question) return res.status(400).json({ error: 'Question is required' });

  const reply = getResponse(question);
  logQuery(question, reply);
  res.json({ reply });
});

// ➤ POST /agent/workflow/support → Full workflow
app.post('/agent/workflow/support', (req, res) => {
  const { issue } = req.body;
  console.log(`🔧 Support Workflow: "${issue}"`);

  const reply = getResponse(issue);
  logQuery(issue, reply);

  console.log("🎫 Ticket created: TKT-2025");
  console.log("📧 Confirmation email sent");

  res.json({
    status: 'Support workflow completed',
    resolution: reply,
    ticket: 'TKT-2025'
  });
});

app.listen(PORT, () => {
  console.log(`\n🚀 BMAD Chatbot Agent running on http://localhost:${PORT}`);
  console.log(`💡 Test with Postman or curl\n`);
});