"use client";

import { Menu } from "lucide-react";
import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";
import MessageInput from "./MessageInput";



export default function ChatWindow({
  openSidebar,
} ) {
  return (
    <div className="flex h-full w-full flex-col bg-[#0f172a]">
      {/* Mobile Header */}
      <div className="flex items-center gap-3 border-b border-slate-700 p-4 md:hidden">
        <button
          onClick={openSidebar}
          className="rounded-lg p-2 text-white transition hover:bg-slate-800"
        >
          <Menu className="h-6 w-6" />
        </button>

        <h1 className="text-lg font-semibold text-white">
          Chats
        </h1>
      </div>

      {/* Chat Header */}
      <ChatHeader />

      {/* Messages */}
      <div className="flex-1 overflow-hidden">
        <ChatBody />
      </div>

      {/* Input */}
      <MessageInput />
    </div>
  );
}