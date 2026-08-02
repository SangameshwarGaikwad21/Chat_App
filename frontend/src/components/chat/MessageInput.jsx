"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Paperclip,
  Smile,
  SendHorizontal,
  Mic,
  ImagePlus,
} from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../../redux/auth/message.slice";

export default function MessageInput() {
  const [text, setText] = useState("");

  const dispatch = useDispatch();

  const { selectedConversation } = useSelector(
    (state) => state.conversation
  );

  const handleSendMessage = () => {
    if (!text.trim()) return;

    if (!selectedConversation) return;

    dispatch(
      sendMessage({
        receiverId: selectedConversation.user._id,
        text: {
          text,
        },
      })
    );

    setText("");
  };

  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.4,
        ease: "easeOut",
      }}
      className="border-t border-slate-800 bg-[#020817]/95 px-6 py-5 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-5xl items-center gap-3 rounded-2xl border border-slate-700/60 bg-slate-900/80 px-4 py-3 shadow-2xl backdrop-blur-xl">
        {/* Emoji */}
        <button className="rounded-xl p-2 text-slate-400 hover:bg-slate-800 hover:text-yellow-400">
          <Smile size={22} />
        </button>

        {/* Attachment */}
        <button className="rounded-xl p-2 text-slate-400 hover:bg-slate-800 hover:text-cyan-400">
          <Paperclip size={22} />
        </button>

        {/* Image */}
        <button className="rounded-xl p-2 text-slate-400 hover:bg-slate-800 hover:text-green-400">
          <ImagePlus size={22} />
        </button>

        {/* Input */}
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSendMessage();
            }
          }}
          placeholder="Type your message..."
          className="flex-1 bg-transparent px-2 text-white placeholder:text-slate-500 focus:outline-none"
        />

        {/* Voice */}
        <button className="rounded-xl p-2 text-slate-400 hover:bg-slate-800 hover:text-red-400">
          <Mic size={22} />
        </button>

        {/* Send */}
        <button
          onClick={handleSendMessage}
          className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 p-3 text-white shadow-lg"
        >
          <SendHorizontal size={20} />
        </button>
      </div>
    </motion.div>
  );
}