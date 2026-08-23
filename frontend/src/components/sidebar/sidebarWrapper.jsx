"use client";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {Search,LogOut,MessageCircleMore,X,Image,Users,} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {getConversations,setSelectedConversation,} from "../../redux/auth/conversation.slice";
import { getMessages,} from "../../redux/auth/message.slice";
import { useNavigate } from "react-router-dom";
import {logoutUser,} from "../../redux/auth/auth.slice";


const SidebarWrapper = ({ closeSidebar }) => {

  const [activeTab, setActiveTab] =
    useState("Chats");

  const [search, setSearch] =
    useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();


  const { user } = useSelector(
    (state) => state.auth
  );


  const {
    conversations,
    loading,
    selectedConversation,
  } = useSelector(
    (state) => state.conversation
  );

  useEffect(() => {
    dispatch(getConversations());
  }, [dispatch]);


  const filteredConversations = useMemo(() => {

    if (!search.trim()) {
      return conversations || [];
    }

    const searchValue =
      search.toLowerCase().trim();

    return conversations?.filter((chat) => {

      const username =
        chat.user?.username
          ?.toLowerCase() || "";

      return username.includes(
        searchValue
      );

    });

  }, [conversations, search]);


  const handleConversationClick = (chat) => {

    dispatch(
      setSelectedConversation(chat)
    );

    dispatch(
      getMessages(chat.user._id)
    );

    closeSidebar?.();
  };


  const handleLogout = async () => {

    try {

      await dispatch(
        logoutUser()
      ).unwrap();

      navigate("/login");

    } catch (error) {

      console.error(
        "Logout failed:",
        error
      );

    }

  };


  return (

    <motion.aside

      initial={{
        x: -80,
        opacity: 0,
      }}

      animate={{
        x: 0,
        opacity: 1,
      }}

      exit={{
        x: -80,
        opacity: 0,
      }}

      transition={{
        type: "spring",
        stiffness: 260,
        damping: 28,
      }}

      className="
        relative
        flex
        h-screen
        w-[320px]
        flex-col
        overflow-hidden
        border-r
        border-slate-800/80
        bg-[#020617]
        sm:w-[360px]
        md:w-[380px]
      "
    >


      <div
        className="
          pointer-events-none
          absolute
          inset-0
          overflow-hidden
        "
      >

        <div
          className="
            absolute
            -left-32
            -top-32
            h-72
            w-72
            rounded-full
            bg-cyan-500/5
            blur-3xl
          "
        />

        <div
          className="
            absolute
            -right-32
            top-1/3
            h-72
            w-72
            rounded-full
            bg-blue-500/5
            blur-3xl
          "
        />

        <div
          className="
            absolute
            bottom-0
            left-1/3
            h-60
            w-60
            rounded-full
            bg-purple-500/5
            blur-3xl
          "
        />

      </div>



      {/* ========================================
          HEADER
      ======================================== */}

      <div
        className="
          relative
          z-10
          flex
          items-center
          justify-between
          border-b
          border-slate-800/80
          px-5
          py-4
        "
      >

        {/* LOGO */}

        <div className="flex items-center gap-3">

          <div
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-2xl
              bg-gradient-to-br
              from-cyan-400
              to-blue-600
              shadow-lg
              shadow-cyan-500/20
            "
          >

            <MessageCircleMore
              size={23}
              className="text-white"
            />

          </div>


          <div>

            <h1
              className="
                bg-gradient-to-r
                from-cyan-400
                via-blue-400
                to-indigo-400
                bg-clip-text
                text-xl
                font-bold
                tracking-tight
                text-transparent
              "
            >
              ChatSphere
            </h1>


            <p
              className="
                text-[11px]
                text-slate-500
              "
            >
              Connect & chat
            </p>

          </div>

        </div>



        {/* HEADER ACTIONS */}

        <div
          className="
            flex
            items-center
            gap-1
          "
        >

          {/* PROFILE */}

          <button

            onClick={() =>
              navigate("/profile")
            }

            className="
              group
              relative
              rounded-full
              p-0.5
              transition
              hover:scale-105
            "
          >

            <img

              src={
                user?.avatar ||
                "/avatar.png"
              }

              alt={
                user?.username ||
                "User"
              }

              className="
                h-10
                w-10
                rounded-full
                border-2
                border-cyan-500/70
                object-cover
                transition
                group-hover:border-cyan-400
              "
            />


            {/* ONLINE INDICATOR */}

            <span
              className="
                absolute
                bottom-0
                right-0
                h-3
                w-3
                rounded-full
                border-2
                border-[#020617]
                bg-emerald-500
              "
            />

          </button>



          {/* LOGOUT */}

          <button

            onClick={handleLogout}

            className="
              ml-1
              rounded-xl
              p-2.5
              text-slate-500
              transition
              hover:bg-red-500/10
              hover:text-red-400
            "

            title="Logout"
          >

            <LogOut size={18} />

          </button>

        </div>

      </div>



      {/* ========================================
          SEARCH
      ======================================== */}

      <div
        className="
          relative
          z-10
          px-4
          py-4
          sm:px-5
        "
      >

        <div
          className="
            group
            flex
            items-center
            gap-3
            rounded-2xl
            border
            border-slate-800
            bg-slate-900/70
            px-4
            py-3
            transition-all
            duration-200
            focus-within:border-cyan-500/50
            focus-within:bg-slate-900
            focus-within:ring-4
            focus-within:ring-cyan-500/5
          "
        >

          <Search

            size={18}

            className="
              shrink-0
              text-slate-500
              transition
              group-focus-within:text-cyan-400
            "
          />


          <input

            type="text"

            value={search}

            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }

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


          {/* CLEAR SEARCH */}

          {search && (

            <button

              onClick={() =>
                setSearch("")
              }

              className="
                rounded-lg
                p-1
                text-slate-500
                transition
                hover:bg-slate-800
                hover:text-white
              "
            >

              <X size={16} />

            </button>

          )}

        </div>

      </div>



      {/* ========================================
          TABS
      ======================================== */}

      <div
        className="
          relative
          z-10
          px-5
          pb-4
        "
      >

        <div
          className="
            relative
            flex
            rounded-xl
            border
            border-slate-800
            bg-slate-900/60
            p-1
          "
        >


          {/* CHATS TAB */}

          <button

            onClick={() =>
              setActiveTab("Chats")
            }

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
              size={16}
              className="
                relative
                z-10
              "
            />


            <span
              className={`
                relative
                z-10

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



          {/* GROUPS TAB */}

          <button

            onClick={() =>
              setActiveTab("Groups")
            }

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


            <Users
              size={16}
              className="
                relative
                z-10
              "
            />


            <span
              className={`
                relative
                z-10

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



      {/* ========================================
          CONVERSATIONS
      ======================================== */}

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


        {/* LOADING */}

        {loading ? (

          <div
            className="
              flex
              h-full
              flex-col
              items-center
              justify-center
            "
          >

            <div
              className="
                h-8
                w-8
                animate-spin
                rounded-full
                border-2
                border-slate-700
                border-t-cyan-400
              "
            />

            <p
              className="
                mt-3
                text-xs
                text-slate-600
              "
            >
              Loading conversations...
            </p>

          </div>


        ) : filteredConversations?.length > 0 ? (

          <AnimatePresence mode="popLayout">

            <div className="space-y-1">

              {filteredConversations.map(
                (chat) => {

                  const isSelected =
                    selectedConversation?._id ===
                    chat._id;


                  const hasImage =
                    Boolean(
                      chat.lastMessage?.image
                    );


                  const hasText =
                    Boolean(
                      chat.lastMessage?.text
                    );


                  return (

                    <motion.div

                      key={chat._id}

                      layout

                      initial={{
                        opacity: 0,
                        y: 10,
                      }}

                      animate={{
                        opacity: 1,
                        y: 0,
                      }}

                      exit={{
                        opacity: 0,
                        y: -10,
                      }}

                      whileHover={{
                        x: 3,
                      }}

                      whileTap={{
                        scale: 0.98,
                      }}

                      onClick={() =>
                        handleConversationClick(
                          chat
                        )
                      }

                      className={`
                        group
                        relative
                        flex
                        cursor-pointer
                        items-center
                        gap-3
                        overflow-hidden
                        rounded-2xl
                        p-3
                        transition-all
                        duration-200

                        ${
                          isSelected

                            ? `
                              border
                              border-cyan-500/30
                              bg-gradient-to-r
                              from-cyan-500/10
                              via-blue-500/5
                              to-transparent
                              shadow-lg
                              shadow-cyan-500/5
                            `

                            : `
                              border
                              border-transparent
                              hover:border-slate-800
                              hover:bg-slate-900/80
                            `
                        }
                      `}
                    >


                      {/* SELECTED INDICATOR */}

                      {isSelected && (

                        <>

                          <motion.div

                            layoutId="activeConversation"

                            className="
                              absolute
                              inset-y-2
                              left-0
                              w-1
                              rounded-r-full
                              bg-gradient-to-b
                              from-cyan-400
                              to-blue-500
                            "
                          />


                          <div
                            className="
                              pointer-events-none
                              absolute
                              -left-10
                              top-1/2
                              h-20
                              w-20
                              -translate-y-1/2
                              rounded-full
                              bg-cyan-500/10
                              blur-2xl
                            "
                          />

                        </>

                      )}



                      {/* AVATAR */}

                      <div
                        className="
                          relative
                          z-10
                          shrink-0
                        "
                      >

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
                            rounded-2xl
                            border
                            border-slate-700/80
                            object-cover
                            shadow-md
                            transition
                            duration-200
                            group-hover:scale-105
                            group-hover:border-cyan-500/40
                          "
                        />


                        {/* ONLINE STATUS */}

                        {chat.user?.isOnline && (

                          <span
                            className="
                              absolute
                              bottom-0
                              right-0
                              h-3.5
                              w-3.5
                              rounded-full
                              border-2
                              border-[#020617]
                              bg-emerald-500
                              shadow-[0_0_10px_rgba(16,185,129,0.7)]
                            "
                          />

                        )}

                      </div>



                      {/* CHAT INFO */}

                      <div
                        className="
                          relative
                          z-10
                          min-w-0
                          flex-1
                        "
                      >

                        {/* USERNAME + TIME */}

                        <div
                          className="
                            flex
                            items-center
                            justify-between
                            gap-2
                          "
                        >

                          <h3
                            className={`
                              truncate
                              text-sm
                              font-semibold

                              ${
                                isSelected
                                  ? "text-cyan-100"
                                  : "text-slate-100"
                              }
                            `}
                          >
                            {chat.user?.username}
                          </h3>


                          {chat.updatedAt && (

                            <span
                              className="
                                shrink-0
                                text-[10px]
                                text-slate-600
                              "
                            >

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

                          )}

                        </div>



                        {/* LAST MESSAGE */}

                        <div
                          className="
                            mt-1
                            flex
                            items-center
                            gap-2
                          "
                        >

                          <p
                            className="
                              flex
                              min-w-0
                              flex-1
                              items-center
                              gap-1.5
                              truncate
                              text-xs
                              text-slate-500
                            "
                          >

                            {/* IMAGE MESSAGE */}

                            {hasImage && !hasText && (

                              <>

                                <Image
                                  size={13}
                                  className="
                                    shrink-0
                                  "
                                />

                                <span>
                                  Photo
                                </span>

                              </>

                            )}


                            {/* TEXT MESSAGE */}

                            {hasText && (
                              chat.lastMessage.text
                            )}


                            {/* EMPTY */}

                            {!hasImage &&
                              !hasText && (
                                "Start chatting..."
                              )}

                          </p>



                          {/* UNREAD BADGE */}

                          {chat.unreadCount > 0 && (

                            <span
                              className="
                                flex
                                h-5
                                min-w-5
                                shrink-0
                                items-center
                                justify-center
                                rounded-full
                                bg-gradient-to-br
                                from-cyan-400
                                to-blue-600
                                px-1.5
                                text-[10px]
                                font-bold
                                text-white
                                shadow-lg
                                shadow-cyan-500/20
                              "
                            >

                              {chat.unreadCount > 99
                                ? "99+"
                                : chat.unreadCount}

                            </span>

                          )}

                        </div>

                      </div>

                    </motion.div>

                  );

                }
              )}

            </div>

          </AnimatePresence>


        ) : (


          /* ========================================
              EMPTY STATE
          ======================================== */

          <motion.div

            initial={{
              opacity: 0,
              y: 15,
            }}

            animate={{
              opacity: 1,
              y: 0,
            }}

            className="
              flex
              h-full
              items-center
              justify-center
              px-5
              text-center
            "
          >

            <div>

              <div
                className="
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
                "
              >

                <MessageCircleMore
                  size={30}
                  strokeWidth={1.5}
                  className="
                    text-slate-600
                  "
                />

              </div>


              <h3
                className="
                  mt-5
                  text-base
                  font-semibold
                  text-white
                "
              >

                {search
                  ? "No conversations found"
                  : "No conversations yet"}

              </h3>


              <p
                className="
                  mt-2
                  text-xs
                  leading-5
                  text-slate-600
                "
              >

                {search
                  ? `No results found for "${search}"`
                  : (
                    <>
                      Search for someone and
                      <br />
                      start your first conversation.
                    </>
                  )}

              </p>


              {search && (

                <button

                  onClick={() =>
                    setSearch("")
                  }

                  className="
                    mt-4
                    rounded-xl
                    border
                    border-slate-800
                    bg-slate-900
                    px-4
                    py-2
                    text-xs
                    text-slate-300
                    transition
                    hover:border-cyan-500/40
                    hover:text-cyan-400
                  "
                >

                  Clear search

                </button>

              )}

            </div>

          </motion.div>

        )}

      </div>

    </motion.aside>

  );

};

export default SidebarWrapper;