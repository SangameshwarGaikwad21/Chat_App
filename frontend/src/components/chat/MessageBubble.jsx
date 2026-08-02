"use client";

import { CheckCheck } from "lucide-react";

export default function MessageBubble({
  message,
}) {
  const isMe = message.sender === "me";

  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-sm rounded-2xl px-4 py-3 shadow-lg ${
          isMe
            ? "rounded-br-md bg-gradient-to-r from-blue-600 to-cyan-500 text-white"
            : "rounded-bl-md bg-slate-800 text-slate-100"
        }`}
      >
        <p>{message.text}</p>

        <div className="mt-2 flex items-center justify-end gap-1 text-xs opacity-70">
          <span>{message.time}</span>

          {isMe && <CheckCheck size={14} />}
        </div>
      </div>
    </div>
  );
}