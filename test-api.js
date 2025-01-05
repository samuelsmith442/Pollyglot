import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Use environment variable instead
});

async function testAPI() {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: "Say hello!" }],
    });
    console.log('API Key is valid! Response:', response.choices[0].message.content);
  } catch (error) {
    console.error('API Key error:', error.message);
  }
}

testAPI();
