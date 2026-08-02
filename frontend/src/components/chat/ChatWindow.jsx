"use client";

import { Menu } from "lucide-react";
import { useSelector } from "react-redux";

import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";
import MessageInput from "./MessageInput";

export default function ChatWindow({ openSidebar }) {
  const { selectedConversation } = useSelector(
    (state) => state.conversation
  );

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

        <h1 className="text-lg font-semibold text-white">Chats</h1>
      </div>

      {/* No chat selected */}
      {!selectedConversation ? (
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-white">
              Welcome to ChatSphere 👋
            </h2>

            <p className="mt-2 text-slate-400">
              Select a conversation to start chatting.
            </p>
          </div>
        </div>
      ) : (
        <>
          <ChatHeader />

          <div className="flex-1 overflow-hidden">
            <ChatBody />
          </div>

          <MessageInput />
        </>
      )}
    </div>
  );
}