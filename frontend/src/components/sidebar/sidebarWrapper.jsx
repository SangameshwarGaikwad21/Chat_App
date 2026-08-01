import { motion } from "framer-motion";
import { Search, Settings, LogOut, MessageCircleMore} from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const SidebarWrapper = () => {

  const [activeTab, setActiveTab] = useState("Chats");


  return (
  <motion.aside
    initial={{ x: -60, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="relative flex h-screen w-[380px] flex-col overflow-hidden border-r border-slate-800 bg-[#0B1120]"
  >
    <div className="absolute -top-40 -left-20 h-72 w-72 rounded-full bg-cyan-500/10 blur-[120px]" />
    <div className="absolute -bottom-40 -right-20 h-72 w-72 rounded-full bg-purple-500/10 blur-[120px]" />
    
    <div className="relative z-10 flex items-center justify-between border-b border-slate-800 px-6 py-5">
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 p-2 shadow-lg shadow-cyan-500/20">
          <MessageCircleMore className="text-white" size={24} />
        </div>

        <div>
          <h1 className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-2xl font-bold text-transparent">
            ChatSphere
          </h1>

          <p className="text-xs text-slate-500">
            Connect with everyone
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="rounded-xl p-2 text-slate-400 transition-all duration-300 hover:bg-slate-800 hover:text-white">
          <Settings size={20} />
        </button>

        <button 
          className="rounded-xl p-2 text-slate-400 transition-all duration-300 hover:bg-red-500/10 hover:text-red-400"
          
        >
          <LogOut size={20} />
        </button>
      </div>
    </div>

    <div className="relative z-10 p-5">
      <div className="flex items-center gap-3 rounded-2xl border border-slate-700 bg-slate-900/70 px-4 py-3 backdrop-blur-xl">
        <Search className="text-slate-500" size={18} />

        <input
          type="text"
          placeholder="Search conversations..."
          className="flex-1 bg-transparent text-white placeholder:text-slate-500 outline-none"
        />
      </div>
    </div>

    {/* Section Title */}
    <div className="relative z-10 px-6 pb-4">
        <div className="relative flex rounded-xl bg-slate-900 p-1">

          <button
            onClick={() => setActiveTab("Chats")}
            className="relative z-10 flex-1 py-2 text-sm font-medium"
          >
            {activeTab === "Chats" && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 rounded-lg bg-cyan-500"
                transition={{
                  type: "spring",
                  stiffness: 350,
                  damping: 30,
                }}
              />
            )}

            <span
              className={`relative ${
                activeTab === "Chats"
                  ? "text-white"
                  : "text-slate-400"
              }`}
            >
              Chats
            </span>
          </button>

          <button
            onClick={() => setActiveTab("Groups")}
            className="relative z-10 flex-1 py-2 text-sm font-medium"
          >
            {activeTab === "Groups" && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 rounded-lg bg-cyan-500"
                transition={{
                  type: "spring",
                  stiffness: 350,
                  damping: 30,
                }}
              />
            )}

            <span
              className={`relative ${
                activeTab === "Groups"
                  ? "text-white"
                  : "text-slate-400"
              }`}
            >
              Groups
            </span>
          </button>

        </div>
      </div>
    <div className="relative z-10 flex flex-1 items-center justify-center px-6">
      <div className="text-center">
        <div className="mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-slate-800/70">
          <MessageCircleMore
            size={42}
            className="text-slate-500"
          />
        </div>

        <h3 className="text-lg font-semibold text-white">
          No Conversations Yet
        </h3>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Search for a user and start your first conversation.
        </p>
      </div>
    </div>
  </motion.aside>
);
};

export default SidebarWrapper;