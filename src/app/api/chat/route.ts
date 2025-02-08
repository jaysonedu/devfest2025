// src/app/api/chat/route.ts
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages,
  });

  return new Response(JSON.stringify(response.choices[0].message));
}
