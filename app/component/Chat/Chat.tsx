"use client";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";

export default function Chat() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  async function askAi(message: string) {
    const res = await fetch("/api/chatMessage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const reader = res.body?.getReader();
    const decoder = new TextDecoder();
    let text = "";

    if (!reader) return;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value, { stream: true });
      text += chunk;
      console.log(chunk);
      setResponse(text);
    }
  }

  return (
    <div className="p-4 space-y-4">
      <input
        className="border p-2 w-full"
        placeholder="Ask something..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        type="button"
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => askAi(input)}
      >
        Ask
      </button>
      {response && (
        <ReactMarkdown rehypePlugins={[rehypeKatex]}>{response}</ReactMarkdown>
      )}
    </div>
  );
}
