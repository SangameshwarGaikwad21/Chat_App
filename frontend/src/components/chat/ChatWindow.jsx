"use client";

import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";
import MessageInput from "./MessageInput";

export default function ChatWindow() {
  return (
    <div className="flex h-full w-full flex-col bg-[#0f172a]">
      <ChatHeader />

      <div className="flex-1 overflow-hidden">
        <ChatBody />
      </div>

      <MessageInput />
    </div>
  );
}