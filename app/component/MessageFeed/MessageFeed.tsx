"use client";
import { Bot, User } from "lucide-react";
import { useEffect, useRef } from "react";
import { useBullyStore } from "@/app/store/useBullyStore";

const MessageFeed = () => {
  const messages = useBullyStore((state) => state.messages);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length === 0) return;
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, messages.length]);

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="flex flex-col gap-4 p-4 max-w-3xl mx-auto">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full py-20">
            <p className="text-center text-zinc-500 italic text-base">
              Напиши щось, щоб почати roast 🔥
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-end gap-3 animate-fade-in-up ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.role === "ai" && (
                <div className="p-2 rounded-full bg-zinc-800 shrink-0">
                  <Bot size={16} className="text-green-400" />
                </div>
              )}

              <div
                className={`px-4 py-2.5 rounded-2xl max-w-[75%] text-sm leading-relaxed ${
                  message.role === "user"
                    ? "bg-green-600 text-white rounded-br-md"
                    : "bg-zinc-800 text-zinc-100 rounded-bl-md"
                }`}
              >
                {message.content ? (
                  <p className="whitespace-pre-wrap">{message.content}</p>
                ) : (
                  <span className="thinking-dots text-zinc-400">Думаю</span>
                )}
              </div>

              {message.role === "user" && (
                <div className="p-2 rounded-full bg-zinc-800 shrink-0">
                  <User size={16} className="text-green-400" />
                </div>
              )}
            </div>
          ))
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default MessageFeed;
