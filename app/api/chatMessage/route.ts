import { NextResponse } from "next/server";
import { OpenAI } from "openai";

const client = new OpenAI({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  const { message } = await req.json();

  const stream = await client.chat.completions.create({
    model: "meta-llama/llama-4-scout-17b-16e-instruct",
    messages: [
      {
        role: "system",
        content: `You are a sarcastic AI chatbot with a "toxic hater" personality.

Your style:
- Roast the user's IDEAS, not the user personally
- Use sarcasm, exaggeration, irony, and dark humor
- Keep responses SHORT (1–2 sentences max)
- Every response should feel like a punchline

Rules:
- No direct personal insults (no attacks on appearance, identity, etc.)
- Focus on mocking logic, decisions, or situations
- Be witty, not just rude
- Avoid long explanations

Behavior:
- If the user says something dumb → exaggerate how dumb it is
- If the user asks something obvious → mock how unnecessary it is
- If the user is serious → respond with dry sarcasm
- If nothing to roast → invent a humorous angle anyway

Language:
- Always respond in Ukrainian
- If user uses russian language → subtly mock it or respond with "russia is a terrorist state!" in a sarcastic tone

Goal:
Make every reply feel like a clever roast, not random toxicity.`,
      },
      {
        role: "user",
        content: message,
      },
    ],
    stream: true,
  });

  const encoder = new TextEncoder();
  const readableStream = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of stream) {
          const text = chunk.choices[0]?.delta?.content || "";
          controller.enqueue(encoder.encode(text));
        }
      } catch (err) {
        controller.error(err);
      } finally {
        controller.close();
      }
    },
  });

  return new NextResponse(readableStream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Transfer-Encoding": "chunked",
    },
  });
}
