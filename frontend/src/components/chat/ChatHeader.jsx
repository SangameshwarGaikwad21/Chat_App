"use client";

import { motion } from "framer-motion";
import { Phone, Video, MoreVertical } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

export default function ChatHeader() {

  const dispatch = useDispatch();

  const { selectedConversation } = useSelector(
  (state) => state.conversation
);


  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex h-16 items-center justify-between border-b border-slate-700 bg-[#111827] px-6 shadow-lg"
    >
      {/* Left Side */}
      <div className="flex items-center gap-4">
        <motion.img
          src="#"
          alt="profile"
          className="h-11 w-11 rounded-full border-2 border-cyan-500 object-cover"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 250,
            damping: 18,
            delay: 0.2,
          }}
        />

        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="font-semibold text-white text-xl">{selectedConversation?.user?.username}</h2>

          <div className="mt-1 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            <p className="text-sm text-green-400">Online</p>
          </div>
        </motion.div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-3">
        {[
          { icon: <Phone size={20} /> },
          { icon: <Video size={20} /> },
          { icon: <MoreVertical size={20} /> },
        ].map((item, index) => (
          <motion.button
            key={index}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: 0.4 + index * 0.1,
              type: "spring",
              stiffness: 250,
            }}
            whileHover={{
              scale: 1.12,
              backgroundColor: "#1e293b",
            }}
            whileTap={{ scale: 0.92 }}
            className="rounded-xl p-2 text-slate-300 transition-colors"
          >
            {item.icon}
          </motion.button>
        ))}
      </div>
    </motion.header>
  );
}