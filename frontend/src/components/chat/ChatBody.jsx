import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import {
  MessageCircleMore,
  Pencil,
  Trash2,
  Check,
  X,
} from "lucide-react";

import {
  addMessage,
  deleteMessage,
  updateMessage,
} from "../../redux/auth/message.slice";
import { getConversations } from "../../redux/auth/conversation.slice";

import socket from "../../socket/socket";

export default function ChatBody() {
  const bottomRef = useRef(null);

  const dispatch = useDispatch();

  const { messages, loading } = useSelector(
    (state) => state.message
  );

  const { user } = useSelector(
    (state) => state.auth
  );

  const { selectedConversation } = useSelector(
    (state) => state.conversation
  );

  const [editingMessageId, setEditingMessageId] =
    useState(null);

  const [editedText, setEditedText] =
    useState("");

  // Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  // Socket new message
  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (newMessage) => {
      const senderId =
        typeof newMessage.sender === "object"
          ? newMessage.sender?._id
          : newMessage.sender;

      // Incoming messages for another chat belong in the sidebar, not the
      // conversation currently open on screen.
      if (senderId?.toString() === selectedConversation?.user?._id?.toString()) {
        dispatch(addMessage(newMessage));
      }

      dispatch(getConversations());
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [dispatch, selectedConversation?.user?._id]);

  // Delete message
  const handleDelete = async (messageId) => {
    try {
      await dispatch(
        deleteMessage(messageId)
      ).unwrap();

      toast.success("Message deleted");
    } catch (error) {
      toast.error(
        error || "Failed to delete message"
      );
    }
  };

  // Start edit
  const handleStartEdit = (message) => {
    setEditingMessageId(message._id);
    setEditedText(message.text);
  };

  // Cancel edit
  const handleCancelEdit = () => {
    setEditingMessageId(null);
    setEditedText("");
  };

  // Save edit
  const handleEdit = async (messageId) => {
    try {
      if (!editedText.trim()) {
        toast.error("Message cannot be empty");
        return;
      }

      await dispatch(
        updateMessage({
          messageId,
          message: editedText.trim(),
        })
      ).unwrap();

      toast.success("Message updated");

      setEditingMessageId(null);
      setEditedText("");
    } catch (error) {
      toast.error(
        error || "Failed to update message"
      );
    }
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="flex items-center gap-3 text-sm text-slate-400">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" />
          Loading messages...
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto bg-[#020817] px-4 py-6 sm:px-6">
      <div className="mx-auto flex max-w-5xl flex-col gap-5">

        {messages?.map((message) => {
          const isMe =
            message.sender?.toString() ===
            user?._id?.toString();

          const hasImage = Boolean(message.image);

          const hasText = Boolean(
            message.text?.trim()
          );

          const messageTime =
            message.createdAt &&
            new Date(
              message.createdAt
            ).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });

          return (
            <motion.div
              key={message._id}
              initial={{
                opacity: 0,
                y: 12,
                scale: 0.98,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              transition={{
                duration: 0.2,
              }}
              className={`
                group
                flex
                w-full
                flex-col
                ${
                  isMe
                    ? "items-end"
                    : "items-start"
                }
              `}
            >

              {/* MESSAGE + ACTIONS */}

              <div
                className={`
                  flex
                  items-center
                  gap-2
                  ${
                    isMe
                      ? "flex-row"
                      : "flex-row-reverse"
                  }
                `}
              >

                {/* ACTIONS */}

                {isMe &&
                  editingMessageId !==
                    message._id && (
                    <div
                      className="
                        flex
                        translate-x-1
                        items-center
                        gap-1
                        opacity-0
                        transition-all
                        duration-200
                        group-hover:translate-x-0
                        group-hover:opacity-100
                      "
                    >
                      {hasText && (
                        <button
                          onClick={() =>
                            handleStartEdit(
                              message
                            )
                          }
                          className="
                            rounded-lg
                            p-2
                            text-slate-500
                            transition
                            hover:bg-slate-800
                            hover:text-cyan-400
                          "
                          title="Edit message"
                        >
                          <Pencil size={15} />
                        </button>
                      )}

                      <button
                        onClick={() =>
                          handleDelete(
                            message._id
                          )
                        }
                        className="
                          rounded-lg
                          p-2
                          text-slate-500
                          transition
                          hover:bg-red-500/10
                          hover:text-red-400
                        "
                        title="Delete message"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  )}

                {/* MESSAGE BUBBLE */}

                <div
                  className={`
                    max-w-[85vw]
                    overflow-hidden
                    rounded-2xl
                    shadow-lg
                    sm:max-w-[75%]

                    ${
                      hasImage && !hasText
                        ? "p-1.5"
                        : "px-4 py-3"
                    }

                    ${
                      isMe
                        ? `
                          rounded-br-md
                          bg-gradient-to-br
                          from-cyan-500
                          to-blue-600
                          text-white
                        `
                        : `
                          rounded-bl-md
                          border
                          border-slate-700/70
                          bg-slate-900
                          text-slate-100
                        `
                    }
                  `}
                >

                  {/* EDIT MODE */}

                  {editingMessageId ===
                  message._id ? (
                    <div className="flex min-w-[220px] items-center gap-2">
                      <input
                        type="text"
                        value={editedText}
                        onChange={(e) =>
                          setEditedText(
                            e.target.value
                          )
                        }
                        onKeyDown={(e) => {
                          if (
                            e.key === "Enter"
                          ) {
                            handleEdit(
                              message._id
                            );
                          }

                          if (
                            e.key === "Escape"
                          ) {
                            handleCancelEdit();
                          }
                        }}
                        autoFocus
                        className="
                          min-w-0
                          flex-1
                          bg-transparent
                          text-sm
                          text-white
                          outline-none
                        "
                      />

                      <button
                        onClick={() =>
                          handleEdit(
                            message._id
                          )
                        }
                        className="
                          rounded-lg
                          bg-white/15
                          p-1.5
                          transition
                          hover:bg-white/25
                        "
                      >
                        <Check size={16} />
                      </button>

                      <button
                        onClick={
                          handleCancelEdit
                        }
                        className="
                          rounded-lg
                          p-1.5
                          transition
                          hover:bg-white/10
                        "
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <>
                      {/* IMAGE */}

                      {hasImage && (
                        <div
                          className={`
                            overflow-hidden
                            rounded-xl
                            ${
                              hasText
                                ? "mb-2"
                                : ""
                            }
                          `}
                        >
                          <img
                            src={message.image}
                            alt="sent image"
                            className="
                              block
                              h-auto
                              max-h-[420px]
                              max-w-[340px]
                              w-auto
                              rounded-xl
                              object-contain
                              transition-transform
                              duration-300
                              hover:scale-[1.02]
                            "
                          />
                        </div>
                      )}

                      {/* TEXT */}

                      {hasText && (
                        <p className="whitespace-pre-wrap break-words text-sm leading-relaxed">
                          {message.text}
                        </p>
                      )}

                      {/* FOOTER */}

                      <div
                        className={`
                          mt-1.5
                          flex
                          items-center
                          gap-1.5
                          text-[10px]

                          ${
                            isMe
                              ? "justify-end text-white/70"
                              : "justify-end text-slate-500"
                          }
                        `}
                      >
                        {message.isEdited && (
                          <span>
                            edited
                          </span>
                        )}

                        <span>
                          {messageTime}
                        </span>
                      </div>
                    </>
                  )}

                </div>
              </div>
            </motion.div>
          );
        })}

        {/* EMPTY STATE */}

        {!loading &&
          messages?.length === 0 && (
            <div
              className="
                flex
                min-h-[60vh]
                flex-col
                items-center
                justify-center
                text-center
              "
            >
              <div
                className="
                  mb-4
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-slate-700
                  bg-slate-900
                  text-cyan-400
                  shadow-xl
                "
              >
                <MessageCircleMore size={30} />
              </div>

              <h3 className="text-lg font-semibold text-white">
                Start the conversation
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Send a message and start chatting.
              </p>
            </div>
          )}

        <div ref={bottomRef} />
      </div>
    </div>
  );
}
