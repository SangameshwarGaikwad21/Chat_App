"use client";

import { motion } from "framer-motion";
import MessageBubble from "./MessageBubble";
import { MessageCircleMore } from "lucide-react";

const messages= [];

export default function ChatBody() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="
        relative
        flex-1
        overflow-y-auto
        bg-[#020817]
        p-6
      "
    >
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-20 h-96 w-96 rounded-full bg-cyan-500/10 blur-[140px]" />
        <div className="absolute bottom-0 right-10 h-96 w-96 rounded-full bg-blue-600/10 blur-[140px]" />
        <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/5 blur-[180px]" />
    </div>

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col gap-4">
        {messages.length > 0 ? (
          messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 0.5,
              type: "spring",
              stiffness: 120,
            }}
            className="flex h-full min-h-[70vh] flex-col items-center justify-center"
          >
            <div className="rounded-full bg-slate-800/70 p-6 shadow-2xl backdrop-blur-xl">
              <MessageCircleMore
                size={60}
                className="text-cyan-400"
              />
            </div>

            <h2 className="mt-6 text-2xl font-bold text-white">
              No Messages Yet
            </h2>

            <p className="mt-2 max-w-md text-center text-slate-400">
              Start a new conversation by sending your first message.
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}