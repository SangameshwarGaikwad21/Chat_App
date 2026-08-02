"use client";

import { motion } from "framer-motion";
import {
  Paperclip,
  Smile,
  SendHorizontal,
  Mic,
  ImagePlus,
} from "lucide-react";

export default function MessageInput() {
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
        <motion.button
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          className="rounded-xl p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-yellow-400"
        >
          <Smile size={22} />
        </motion.button>

        {/* Attachment */}
        <motion.button
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          className="rounded-xl p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-cyan-400"
        >
          <Paperclip size={22} />
        </motion.button>

        {/* Image */}
        <motion.button
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          className="rounded-xl p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-green-400"
        >
          <ImagePlus size={22} />
        </motion.button>

        {/* Input */}
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 bg-transparent px-2 text-white placeholder:text-slate-500 focus:outline-none"
        />

        {/* Voice */}
        <motion.button
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          className="rounded-xl p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-red-400"
        >
          <Mic size={22} />
        </motion.button>

        {/* Send */}
        <motion.button
          whileHover={{
            scale: 1.08,
            boxShadow: "0px 0px 20px rgba(6,182,212,.4)",
          }}
          whileTap={{ scale: 0.95 }}
          className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 p-3 text-white shadow-lg transition-all"
        >
          <SendHorizontal size={20} />
        </motion.button>
      </div>
    </motion.div>
  );
}