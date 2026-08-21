"use client";
import { motion } from "framer-motion";
import {Search,Settings,LogOut,MessageCircleMore,X,} from "lucide-react";
import { useEffect, useState } from "react";
import { getConversations,setSelectedConversation } from "../../redux/auth/conversation.slice";
import { useDispatch,useSelector } from "react-redux";
import {getMessages} from "../../redux/auth/message.slice";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/auth/auth.slice";


const SidebarWrapper = ({ closeSidebar }) => {
  const [activeTab, setActiveTab] = useState("Chats");

  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { conversations, loading, selectedConversation } = useSelector((state) => state.conversation);

  useEffect(() => {
    dispatch(getConversations());
  }, [dispatch]);


  const handleConversationClick = (chat) => {

  dispatch(setSelectedConversation(chat));


  dispatch(getMessages(chat.user._id));
  closeSidebar?.();
};

    const handlelogOut = async()=>{
        try {
            await dispatch(logoutUser())
            navigate("/login");
        } 
        catch (error) {
            console.error("Logout failed:", error);
        }
    }

  return (
    <motion.aside
    initial={{ x: -80, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    exit={{ x: -80, opacity: 0 }}
    transition={{
        type: "spring",
        stiffness: 260,
        damping: 28,
    }}
    className="
        relative flex h-screen
        w-[320px] sm:w-[360px] md:w-[380px]
        flex-col overflow-hidden
        border-r border-slate-800/80
        bg-[#020617]
    "
>
    {/* Background Effects */}
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-72 w-72 rounded-full bg-cyan-500/5 blur-3xl" />

        <div className="absolute -right-32 top-1/3 h-72 w-72 rounded-full bg-blue-500/5 blur-3xl" />

        <div className="absolute bottom-0 left-1/3 h-60 w-60 rounded-full bg-purple-500/5 blur-3xl" />
    </div>


    {/* ================= HEADER ================= */}

    <div className="relative z-10 flex items-center justify-between border-b border-slate-800/80 px-5 py-4">

        {/* Logo */}
        <div className="flex items-center gap-3">

            <div className="
                flex h-11 w-11
                items-center justify-center
                rounded-2xl
                bg-gradient-to-br
                from-cyan-400
                to-blue-600
                shadow-lg
                shadow-cyan-500/20
            ">
                <MessageCircleMore
                    size={23}
                    className="text-white"
                />
            </div>

            <div>
                <h1 className="
                    bg-gradient-to-r
                    from-cyan-400
                    via-blue-400
                    to-indigo-400
                    bg-clip-text
                    text-xl
                    font-bold
                    tracking-tight
                    text-transparent
                ">
                    ChatSphere
                </h1>

                <p className="text-[11px] text-slate-500">
                    Connect & chat
                </p>
            </div>

        </div>


        {/* Actions */}
        <div className="flex items-center gap-1">

            {/* Profile */}
            <button
                onClick={() => navigate("/profile")}
                className="
                    group relative
                    rounded-full
                    p-0.5
                    transition
                    hover:scale-105
                "
            >
                <img
                    src={user?.avatar || "/avatar.png"}
                    alt={user?.username || "User"}
                    className="
                        h-10 w-10
                        rounded-full
                        border-2
                        border-cyan-500/70
                        object-cover
                        transition
                        group-hover:border-cyan-400
                    "
                />

                {/* Online */}
                <span className="
                    absolute
                    bottom-0
                    right-0
                    h-3
                    w-3
                    rounded-full
                    border-2
                    border-[#020617]
                    bg-emerald-500
                " />
            </button>


            {/* Logout */}
            <button
            onClick={handlelogOut}
                className="
                    ml-1
                    rounded-xl
                    p-2.5
                    text-slate-500
                    transition
                    hover:bg-red-500/10
                    hover:text-red-400
                "
            >
                <LogOut size={18} />
            </button>

        </div>

    </div>


    {/* ================= SEARCH ================= */}

    <div className="relative z-10 px-5 py-4">

        <div className="
            group
            flex items-center gap-3
            rounded-2xl
            border border-slate-800
            bg-slate-900/60
            px-4 py-3
            shadow-inner
            transition-all
            duration-200
            focus-within:border-cyan-500/50
            focus-within:bg-slate-900
            focus-within:shadow-lg
            focus-within:shadow-cyan-500/5
        ">

            <Search
                size={18}
                className="
                    text-slate-500
                    transition
                    group-focus-within:text-cyan-400
                "
            />

            <input
                type="text"
                placeholder="Search conversations..."
                className="
                    min-w-0
                    flex-1
                    bg-transparent
                    text-sm
                    text-white
                    outline-none
                    placeholder:text-slate-600
                "
            />

            <div className="
                hidden
                rounded-md
                border border-slate-800
                bg-slate-950
                px-1.5 py-0.5
                text-[10px]
                text-slate-600
                sm:block
            ">
                /
            </div>

        </div>

    </div>


    {/* ================= TABS ================= */}

    <div className="relative z-10 px-5 pb-4">

        <div className="
            relative
            flex
            rounded-xl
            border border-slate-800
            bg-slate-900/60
            p-1
        ">

            {/* Chats */}
            <button
                onClick={() => setActiveTab("Chats")}
                className="
                    relative
                    z-10
                    flex
                    flex-1
                    items-center
                    justify-center
                    gap-2
                    rounded-lg
                    py-2
                    text-sm
                    font-medium
                "
            >

                {activeTab === "Chats" && (
                    <motion.div
                        layoutId="activeTab"
                        className="
                            absolute
                            inset-0
                            rounded-lg
                            bg-gradient-to-r
                            from-cyan-500
                            to-blue-500
                            shadow-lg
                            shadow-cyan-500/10
                        "
                        transition={{
                            type: "spring",
                            stiffness: 350,
                            damping: 30,
                        }}
                    />
                )}

                <MessageCircleMore
                    size={15}
                    className="relative"
                />

                <span
                    className={`
                        relative
                        ${
                            activeTab === "Chats"
                                ? "text-white"
                                : "text-slate-500"
                        }
                    `}
                >
                    Chats
                </span>

            </button>


            {/* Groups */}
            <button
                onClick={() => setActiveTab("Groups")}
                className="
                    relative
                    z-10
                    flex
                    flex-1
                    items-center
                    justify-center
                    gap-2
                    rounded-lg
                    py-2
                    text-sm
                    font-medium
                "
            >

                {activeTab === "Groups" && (
                    <motion.div
                        layoutId="activeTab"
                        className="
                            absolute
                            inset-0
                            rounded-lg
                            bg-gradient-to-r
                            from-cyan-500
                            to-blue-500
                            shadow-lg
                            shadow-cyan-500/10
                        "
                        transition={{
                            type: "spring",
                            stiffness: 350,
                            damping: 30,
                        }}
                    />
                )}

                <span
                    className={`
                        relative
                        ${
                            activeTab === "Groups"
                                ? "text-white"
                                : "text-slate-500"
                        }
                    `}
                >
                    Groups
                </span>

            </button>

        </div>

    </div>


    {/* ================= CONVERSATIONS ================= */}

    <div
        className="
            relative
            z-10
            flex-1
            overflow-y-auto
            px-3
            pb-5

            [&::-webkit-scrollbar]:w-1.5
            [&::-webkit-scrollbar-track]:bg-transparent
            [&::-webkit-scrollbar-thumb]:rounded-full
            [&::-webkit-scrollbar-thumb]:bg-slate-800
            hover:[&::-webkit-scrollbar-thumb]:bg-slate-700
        "
    >

        {loading ? (

            /* Loading */
            <div className="flex h-full flex-col items-center justify-center">

                <div className="
                    h-8 w-8
                    animate-spin
                    rounded-full
                    border-2
                    border-slate-700
                    border-t-cyan-400
                " />

                <p className="mt-3 text-xs text-slate-600">
                    Loading conversations...
                </p>

            </div>

        ) : conversations.length > 0 ? (

            /* Conversation List */
            <div className="space-y-1">

                {conversations.map((chat) => (

                    <motion.div
                        key={chat._id}
                        whileHover={{
                            scale: 1.01,
                        }}
                        whileTap={{
                            scale: 0.99,
                        }}
                        onClick={() =>
                            handleConversationClick(chat)
                        }
                        className={`
                            group
                            relative
                            flex
                            cursor-pointer
                            items-center
                            gap-3
                            rounded-2xl
                            p-3
                            transition-all
                            duration-200

                            ${
                                selectedConversation?._id ===
                                chat._id

                                    ? `
                                        border
                                        border-cyan-500/30
                                        bg-gradient-to-r
                                        from-cyan-500/10
                                        to-blue-500/5
                                        shadow-lg
                                        shadow-cyan-500/5
                                      `

                                    : `
                                        border
                                        border-transparent
                                        hover:border-slate-800
                                        hover:bg-slate-900/70
                                      `
                            }
                        `}
                    >

                        {/* Active indicator */}
                        {selectedConversation?._id ===
                            chat._id && (
                            <div className="
                                absolute
                                left-0
                                top-1/2
                                h-8
                                w-0.5
                                -translate-y-1/2
                                rounded-full
                                bg-cyan-400
                            " />
                        )}


                        {/* Avatar */}
                        <div className="relative flex-shrink-0">

                            <img
                                src={
                                    chat.user?.avatar ||
                                    "/avatar.png"
                                }
                                alt={
                                    chat.user?.username ||
                                    "User"
                                }
                                className="
                                    h-12
                                    w-12
                                    rounded-full
                                    border
                                    border-slate-700
                                    object-cover
                                    transition
                                    group-hover:border-slate-600
                                "
                            />

                            {/* Online indicator */}
                            <span className="
                                absolute
                                bottom-0
                                right-0
                                h-3
                                w-3
                                rounded-full
                                border-2
                                border-[#020617]
                                bg-emerald-500
                            " />

                        </div>


                        {/* Chat information */}
                        <div className="min-w-0 flex-1">

                            <div className="flex items-center justify-between gap-2">

                                <h3 className="
                                    min-w-0
                                    truncate
                                    text-sm
                                    font-semibold
                                    text-slate-100
                                ">
                                    {chat.user?.username}
                                </h3>

                                <span className="
                                    flex-shrink-0
                                    text-[10px]
                                    text-slate-600
                                ">
                                    {new Date(
                                        chat.updatedAt
                                    ).toLocaleTimeString(
                                        [],
                                        {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        }
                                    )}
                                </span>

                            </div>


                            <div className="
                                mt-1
                                flex
                                items-center
                                justify-between
                                gap-2
                            ">

                                <p className="
                                    min-w-0
                                    flex-1
                                    truncate
                                    text-xs
                                    text-slate-500
                                ">
                                    {chat.lastMessage?.text ||
                                        "Start chatting..."}
                                </p>


                                {/* Unread badge */}
                                {chat.unreadCount > 0 && (
                                    <span className="
                                        flex
                                        h-5
                                        min-w-5
                                        items-center
                                        justify-center
                                        rounded-full
                                        bg-cyan-500
                                        px-1.5
                                        text-[10px]
                                        font-bold
                                        text-white
                                    ">
                                        {chat.unreadCount}
                                    </span>
                                )}

                            </div>

                        </div>

                    </motion.div>

                ))}

            </div>

        ) : (

            /* Empty State */
            <motion.div
                initial={{
                    opacity: 0,
                    y: 15,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    duration: 0.3,
                }}
                className="
                    flex
                    h-full
                    items-center
                    justify-center
                    px-5
                "
            >

                <div className="text-center">

                    <div className="
                        mx-auto
                        flex
                        h-16
                        w-16
                        items-center
                        justify-center
                        rounded-2xl
                        border
                        border-slate-800
                        bg-slate-900
                        shadow-xl
                    ">
                        <MessageCircleMore
                            size={30}
                            strokeWidth={1.5}
                            className="text-slate-600"
                        />
                    </div>

                    <h3 className="
                        mt-5
                        text-base
                        font-semibold
                        text-white
                    ">
                        No conversations yet
                    </h3>

                    <p className="
                        mt-2
                        text-xs
                        leading-5
                        text-slate-600
                    ">
                        Search for someone and
                        <br />
                        start your first conversation.
                    </p>
                </div>
            </motion.div>
        )}
    </div>
</motion.aside>
  );
};

export default SidebarWrapper;
