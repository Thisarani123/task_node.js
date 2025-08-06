// agent_templates/chatbotAgent.js

const knowledgeBase = {
  "services": "We offer AI automation, CRM integration, HR onboarding, and SEO optimization.",
  "hours": "Our support team is available Monday to Friday, 9 AM to 6 PM.",
  "pricing": "Pricing starts at $99/month. Contact sales for enterprise plans.",
  "contact": "Email us at support@company.com or call 077-6048930.",
  "onboarding": "New clients get a 1-hour onboarding session and API docs."
};

function getResponse(question) {
  const q = question.toLowerCase();

  if (q.includes('service') || q.includes('offer')) return knowledgeBase.services;
  if (q.includes('hour') || q.includes('available')) return knowledgeBase.hours;
  if (q.includes('price') || q.includes('cost')) return knowledgeBase.pricing;
  if (q.includes('contact') || q.includes('email')) return knowledgeBase.contact;
  if (q.includes('onboard') || q.includes('setup')) return knowledgeBase.onboarding;

  return "I'm not sure. Can you rephrase? I'm still learning!";
}

function logQuery(question, response) {
  console.log(`\n💬 User asked: "${question}"`);
  console.log(`🤖 Bot replied: "${response}"`);
}

module.exports = { getResponse, logQuery };