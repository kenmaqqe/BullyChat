"use client";
import { Bot, User } from "lucide-react";
import { useBullyStore } from "@/app/store/useBullyStore";

const MessageFeed = () => {
  const messages = useBullyStore((state) => state.messages);

  return (
    <div className="flex flex-col gap-4 p-4 overflow-y-auto max-h-[80vh]">
      {messages.length === 0 ? (
        <p className="text-center text-zinc-500 italic">
          No messages yet... Type something to start roasting 🔥
        </p>
      ) : (
        messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-center gap-3 ${
              message.role === "user" ? "justify-end" : ""
            }`}
          >
            {message.role === "ai" && (
              <div className="p-2 rounded-full bg-zinc-700">
                <Bot size={20} />
              </div>
            )}

            <div
              className={`p-3 rounded-2xl max-w-[70%] ${
                message.role === "user"
                  ? "bg-green-600 text-white self-end"
                  : "bg-zinc-800 text-zinc-100"
              }`}
            >
              <p className="whitespace-pre-wrap">
                {message.content ? message.content : "Thinking..."}
              </p>
            </div>

            {message.role === "user" && (
              <div className="p-2 rounded-full bg-green-700">
                <User size={20} />
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default MessageFeed;
