"use client";
import { useState } from "react";
import { useBullyStore } from "@/app/store/useBullyStore";

export default function Chat() {
  const [input, setInput] = useState("");
  const addNewMessage = useBullyStore((state) => state.addNewMessage);
  const messages = useBullyStore((state) => state.messages);
  const updateMessage = useBullyStore((state) => state.updateMessage);

  const askAi = (question: string) => {
    addNewMessage({ id: crypto.randomUUID(), role: "user", content: question });
    setInput("");
    const aiMessageId = crypto.randomUUID();
    addNewMessage({
      id: aiMessageId,
      role: "ai",
      content: "",
    });
    setTimeout(() => {
      getAnswer(question, aiMessageId);
    }, 1000);
  };

  async function getAnswer(message: string, id: string) {
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
      updateMessage(id, chunk);
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
    </div>
  );
}
