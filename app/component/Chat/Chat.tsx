"use client";
import { Send } from "lucide-react";
import { useState } from "react";
import { useBullyStore } from "@/app/store/useBullyStore";

export default function Chat() {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const addNewMessage = useBullyStore((state) => state.addNewMessage);
  const updateMessage = useBullyStore((state) => state.updateMessage);

  const canSend = input.trim().length > 0 && !isLoading;

  const askAi = () => {
    const question = input.trim();
    if (!question) return;

    addNewMessage({ id: crypto.randomUUID(), role: "user", content: question });
    setInput("");
    setIsLoading(true);

    const aiMessageId = crypto.randomUUID();
    addNewMessage({
      id: aiMessageId,
      role: "ai",
      content: "",
    });

    setTimeout(() => {
      getAnswer(question, aiMessageId);
    }, 500);
  };

  async function getAnswer(message: string, id: string) {
    try {
      const res = await fetch("/api/chatMessage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) return;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        updateMessage(id, chunk);
      }
    } finally {
      setIsLoading(false);
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (canSend) askAi();
    }
  };

  return (
    <div className="border-t border-zinc-800 p-4 shrink-0">
      <div className="flex gap-2 max-w-3xl mx-auto">
        <input
          className="flex-1 bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-sm placeholder:text-zinc-500 focus:outline-none focus:border-zinc-500 transition-colors"
          placeholder="Напиши щось..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
        />
        <button
          type="button"
          className={`px-4 py-3 rounded-xl flex items-center justify-center transition-colors ${
            canSend
              ? "bg-green-600 hover:bg-green-700 text-white cursor-pointer"
              : "bg-zinc-800 text-zinc-600 cursor-not-allowed"
          }`}
          onClick={askAi}
          disabled={!canSend}
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}
