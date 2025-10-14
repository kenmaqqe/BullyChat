"use client";
import { useState } from "react";
import { useBullyStore } from "@/app/store/useBullyStore";

export default function Chat() {
  const [input, setInput] = useState("");
  const addNewMessage = useBullyStore((state) => state.addNewMessage);

  const askAi = (question: string) => {
    addNewMessage({ id: crypto.randomUUID(), role: "user", content: question });
    setInput("");
  };

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
