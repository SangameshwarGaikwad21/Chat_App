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

  // Edit states
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

  // Receive new message from socket
  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (newMessage) => {
      dispatch(addMessage(newMessage));
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [dispatch]);

  // Delete message
  const handleDelete = async (messageId) => {
    try {
      await dispatch(deleteMessage(messageId)).unwrap();
      toast.success("Message deleted successfully");
    } catch (error) {
      console.error("Delete Error:", error);
      toast.error(
        error || "Failed to delete message"
      );
    }
  };
 
  // Start editing
  const handleStartEdit = (message) => {
    setEditingMessageId(message._id);
    setEditedText(message.text);
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingMessageId(null);
    setEditedText("");
  };

  // Save edited message
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

      toast.success("Message updated successfully");

      setEditingMessageId(null);
      setEditedText("");

    } catch (error) {
      console.error("Update Error:", error);

      toast.error(
        error || "Failed to update message"
      );
    }
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        Loading messages...
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col overflow-y-auto px-4 py-6">

      <div className="flex flex-col gap-4">

        {messages?.map((message) => {
          const isMe =
            message.sender?.toString() ===
            user?._id?.toString();

          return (
            <div
              key={message._id}
              className={`group flex flex-col ${
                isMe ? "items-end" : "items-start"
              }`}
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`
                  max-w-[75%]
                  rounded-2xl
                  px-4
                  py-2
                  break-words
                  ${
                    isMe
                      ? "bg-blue-600 text-white"
                      : "bg-gray-700 text-white"
                  }
                `}
              >
                {editingMessageId === message._id ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={editedText}
                      onChange={(e) =>
                        setEditedText(e.target.value)
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleEdit(message._id);
                        }

                        if (e.key === "Escape") {
                          handleCancelEdit();
                        }
                      }}
                      autoFocus
                      className="
                        min-w-[180px]
                        bg-transparent
                        text-white
                        outline-none
                      "
                    />

                    <button
                      onClick={() =>
                        handleEdit(message._id)
                      }
                      className="
                        rounded-md
                        p-1
                        hover:bg-white/10
                      "
                    >
                      <Check size={16} />
                    </button>

                    <button
                      onClick={handleCancelEdit}
                      className="
                        rounded-md
                        p-1
                        hover:bg-white/10
                      "
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <>
                    <span>{message.text}</span>

                    {message.isEdited && (
                      <span className="ml-2 text-[10px] opacity-60">
                        edited
                      </span>
                    )}
                  </>
                )}
              </motion.div>

              {isMe &&
                editingMessageId !== message._id && (
                  <div
                    className="
                      mt-1
                      flex
                      gap-2
                      opacity-0
                      transition
                      duration-200
                      group-hover:opacity-100
                    "
                  >
                    <button
                      onClick={() =>
                        handleStartEdit(message)
                      }
                      className="
                        flex
                        items-center
                        gap-1
                        rounded-md
                        px-2
                        py-1
                        text-xs
                        text-blue-400
                        hover:bg-blue-500/10
                      "
                    >
                      <Pencil size={13} />
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(message._id)
                      }
                      className="
                        flex
                        items-center
                        gap-1
                        rounded-md
                        px-2
                        py-1
                        text-xs
                        text-red-400
                        hover:bg-red-500/10
                      "
                    >
                      <Trash2 size={13} />
                      Delete
                    </button>
                  </div>
                )}

              <span
                className="
                  mt-1
                  px-1
                  text-[10px]
                  text-gray-400
                "
              >
                {message.createdAt &&
                  new Date(
                    message.createdAt
                  ).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
              </span>
            </div>
          );
        })}
      </div>

      {!loading && messages?.length === 0 && (
        <div
          className="
            flex
            flex-1
            flex-col
            items-center
            justify-center
            text-gray-400
          "
        >
          <MessageCircleMore size={40} />

          <p className="mt-2">
            No messages yet
          </p>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}