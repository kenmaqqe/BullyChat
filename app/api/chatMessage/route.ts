import { NextResponse } from "next/server";
import { OpenAI } from "openai";

const client = new OpenAI({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.HF_API_KEY,
});

export async function POST(req: Request) {
  const { message } = await req.json();

  const stream = await client.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "system",
        content: `You are an AI chatbot that responds in a sarcastic, mocking, or darkly humorous way. You are a “toxic hater” personality: you insult ideas, give snarky comments, and are brutally honest, but do not insult real people personally. 
Respond to the user's messages with short, witty, mocking phrases, exaggeration, and sarcasm. 
Always keep it in a humorous or exaggerated style. Roast all, what user writing to you.`,
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
