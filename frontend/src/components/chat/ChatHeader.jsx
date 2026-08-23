"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  Phone,
  Video,
  MoreVertical,
  Search,
  Trash2,
  User,
  X,
} from "lucide-react";

import { useSelector } from "react-redux";

export default function ChatHeader() {
  const [showMenu, setShowMenu] = useState(false);

  const { selectedConversation } = useSelector(
    (state) => state.conversation
  );

  const chatUser = selectedConversation?.user;

  // No conversation selected
  if (!chatUser) {
    return (
      <header
        className="
          flex
          h-16
          items-center
          border-b
          border-slate-800/80
          bg-[#020617]/95
          px-4
          backdrop-blur-xl
          sm:px-6
        "
      >
        <div className="flex items-center gap-3">
          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              border
              border-slate-800
              bg-slate-900
            "
          >
            <User
              size={20}
              className="text-slate-500"
            />
          </div>

          <div>
            <h2 className="font-semibold text-slate-300">
              Select a conversation
            </h2>

            <p className="text-xs text-slate-600">
              Choose someone to start chatting
            </p>
          </div>
        </div>
      </header>
    );
  }

  return (
    <motion.header
      initial={{
        y: -30,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      transition={{
        duration: 0.45,
        ease: "easeOut",
      }}
      className="
        relative
        z-20
        flex
        h-[72px]
        shrink-0
        items-center
        justify-between
        border-b
        border-slate-800/80
        bg-[#020617]/90
        px-4
        shadow-lg
        shadow-black/20
        backdrop-blur-xl
        sm:px-6
      "
    >
      {/* Background glow */}

      <div
        className="
          pointer-events-none
          absolute
          left-0
          top-0
          h-full
          w-64
          bg-gradient-to-r
          from-cyan-500/5
          to-transparent
        "
      />

      {/* =========================
          LEFT SIDE
      ========================= */}

      <div className="relative z-10 flex min-w-0 items-center gap-3 sm:gap-4">
        {/* Avatar */}

        <motion.div
          initial={{
            scale: 0,
            rotate: -15,
          }}
          animate={{
            scale: 1,
            rotate: 0,
          }}
          transition={{
            type: "spring",
            stiffness: 250,
            damping: 18,
            delay: 0.15,
          }}
          className="relative shrink-0"
        >
          <img
            src={
              chatUser?.avatar ||
              "/avatar.png"
            }
            alt={
              chatUser?.username ||
              "User"
            }
            className="
              h-11
              w-11
              rounded-2xl
              border
              border-slate-700
              object-cover
              shadow-lg
              shadow-black/30
              transition
              duration-300
              hover:border-cyan-500/60
            "
          />

          {/* Online indicator */}

          {chatUser?.isOnline && (
            <>
              <span
                className="
                  absolute
                  -bottom-0.5
                  -right-0.5
                  h-3.5
                  w-3.5
                  rounded-full
                  border-2
                  border-[#020617]
                  bg-emerald-500
                "
              />

              <span
                className="
                  absolute
                  -bottom-0.5
                  -right-0.5
                  h-3.5
                  w-3.5
                  animate-ping
                  rounded-full
                  bg-emerald-500/50
                "
              />
            </>
          )}
        </motion.div>

        {/* User information */}

        <motion.div
          initial={{
            x: -20,
            opacity: 0,
          }}
          animate={{
            x: 0,
            opacity: 1,
          }}
          transition={{
            delay: 0.2,
            duration: 0.35,
          }}
          className="min-w-0"
        >
          <h2
            className="
              truncate
              text-base
              font-semibold
              text-white
              sm:text-lg
            "
          >
            {chatUser?.username}
          </h2>

          <div className="mt-0.5 flex items-center gap-2">
            {chatUser?.isOnline ? (
              <>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

                <p className="text-xs text-emerald-400">
                  Online
                </p>
              </>
            ) : (
              <p className="text-xs text-slate-500">
                Offline
              </p>
            )}
          </div>
        </motion.div>
      </div>

      {/* =========================
          RIGHT SIDE
      ========================= */}

      <motion.div
        initial={{
          opacity: 0,
          x: 20,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          delay: 0.25,
        }}
        className="
          relative
          z-30
          flex
          items-center
          gap-1
          sm:gap-2
        "
      >
        {/* Search */}

        <HeaderButton
          title="Search messages"
          icon={<Search size={19} />}
          onClick={() => {
            console.log("Search messages");
          }}
          className="
            hidden
            sm:flex
          "
        />

        {/* Phone */}

        <HeaderButton
          title="Voice call"
          icon={<Phone size={19} />}
          onClick={() => {
            console.log("Voice call");
          }}
          hoverClass="
            hover:bg-emerald-500/10
            hover:text-emerald-400
          "
        />

        {/* Video */}

        <HeaderButton
          title="Video call"
          icon={<Video size={19} />}
          onClick={() => {
            console.log("Video call");
          }}
          hoverClass="
            hover:bg-purple-500/10
            hover:text-purple-400
          "
        />

        {/* More Menu */}

        <button
          type="button"
          onClick={() =>
            setShowMenu(!showMenu)
          }
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            text-slate-400
            transition-all
            duration-200
            hover:bg-slate-800
            hover:text-white
            active:scale-95
          "
        >
          <MoreVertical size={20} />
        </button>

        {/* =========================
            DROPDOWN MENU
        ========================= */}

        <AnimatePresence>
          {showMenu && (
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.95,
                y: -10,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.95,
                y: -10,
              }}
              transition={{
                duration: 0.15,
              }}
              className="
                absolute
                right-0
                top-12
                w-52
                overflow-hidden
                rounded-2xl
                border
                border-slate-800
                bg-slate-900/95
                p-1.5
                shadow-2xl
                shadow-black/50
                backdrop-blur-xl
              "
            >
              {/* View Profile */}

              <button
                type="button"
                onClick={() => {
                  console.log("View profile");
                  setShowMenu(false);
                }}
                className="
                  flex
                  w-full
                  items-center
                  gap-3
                  rounded-xl
                  px-3
                  py-2.5
                  text-left
                  text-sm
                  text-slate-300
                  transition
                  hover:bg-slate-800
                  hover:text-white
                "
              >
                <User size={17} />

                View profile
              </button>

              {/* Clear chat */}

              <button
                type="button"
                onClick={() => {
                  console.log("Clear chat");
                  setShowMenu(false);
                }}
                className="
                  flex
                  w-full
                  items-center
                  gap-3
                  rounded-xl
                  px-3
                  py-2.5
                  text-left
                  text-sm
                  text-slate-300
                  transition
                  hover:bg-slate-800
                  hover:text-white
                "
              >
                <X size={17} />

                Clear chat
              </button>

              {/* Divider */}

              <div className="my-1 border-t border-slate-800" />

              {/* Delete chat */}

              <button
                type="button"
                onClick={() => {
                  console.log("Delete chat");
                  setShowMenu(false);
                }}
                className="
                  flex
                  w-full
                  items-center
                  gap-3
                  rounded-xl
                  px-3
                  py-2.5
                  text-left
                  text-sm
                  text-red-400
                  transition
                  hover:bg-red-500/10
                  hover:text-red-300
                "
              >
                <Trash2 size={17} />

                Delete chat
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.header>
  );
}

/* =========================
   REUSABLE HEADER BUTTON
========================= */

function HeaderButton({
  icon,
  title,
  onClick,
  hoverClass = "",
  className = "",
}) {
  return (
    <motion.button
      type="button"
      title={title}
      onClick={onClick}
      whileHover={{
        scale: 1.08,
      }}
      whileTap={{
        scale: 0.92,
      }}
      className={`
        flex
        h-10
        w-10
        items-center
        justify-center
        rounded-xl
        text-slate-400
        transition-all
        duration-200
        hover:bg-slate-800
        hover:text-cyan-400
        ${hoverClass}
        ${className}
      `}
    >
      {icon}
    </motion.button>
  );
}