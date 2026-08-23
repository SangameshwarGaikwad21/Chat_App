"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  Paperclip,
  Smile,
  SendHorizontal,
  Mic,
  ImagePlus,
  X,
} from "lucide-react";

import { useDispatch, useSelector } from "react-redux";

import { sendMessage } from "../../redux/auth/message.slice";

import socket from "../../socket/socket";

export default function MessageInput() {
  const [text, setText] = useState("");

  const [selectedImage, setSelectedImage] =
    useState(null);

  const [imagePreview, setImagePreview] =
    useState(null);

  const dispatch = useDispatch();

  const typingTimeoutRef = useRef(null);

  const imageInputRef = useRef(null);

  const { selectedConversation } = useSelector(
    (state) => state.conversation
  );

  // -------------------------
  // HANDLE TYPING
  // -------------------------

  const handleTyping = (e) => {
    const value = e.target.value;

    setText(value);

    if (!selectedConversation) return;

    const receiverId =
      selectedConversation.user._id;

    socket.emit("typing", receiverId);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("stopTyping", receiverId);
    }, 1000);
  };

  // -------------------------
  // HANDLE IMAGE SELECT
  // -------------------------

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image");
      return;
    }

    // Remove previous preview
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    setSelectedImage(file);

    const previewUrl =
      URL.createObjectURL(file);

    setImagePreview(previewUrl);

    e.target.value = "";
  };

  // -------------------------
  // REMOVE IMAGE
  // -------------------------

  const handleRemoveImage = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    setSelectedImage(null);

    setImagePreview(null);

    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  };

  // -------------------------
  // SEND MESSAGE
  // -------------------------

  const handleSendMessage = async () => {
    if (!text.trim() && !selectedImage) {
      return;
    }

    if (!selectedConversation) {
      return;
    }

    const receiverId =
      selectedConversation.user._id;

    const formData = new FormData();

    formData.append("text", text.trim());

    if (selectedImage) {
      formData.append(
        "image",
        selectedImage
      );
    }

    try {
      await dispatch(
        sendMessage({
          receiverId,
          text: formData,
        })
      ).unwrap();

      socket.emit(
        "stopTyping",
        receiverId
      );

      setText("");

      handleRemoveImage();

      if (typingTimeoutRef.current) {
        clearTimeout(
          typingTimeoutRef.current
        );
      }

    } catch (error) {
      console.error(
        "Send message error:",
        error
      );
    }
  };

  // -------------------------
  // CLEANUP
  // -------------------------

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(
          typingTimeoutRef.current
        );
      }
    };
  }, []);

  return (
    <motion.div
      initial={{
        y: 30,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      transition={{
        duration: 0.35,
        ease: "easeOut",
      }}
      className="
        border-t
        border-slate-800/80
        bg-[#020817]/95
        px-3
        py-3
        backdrop-blur-xl
        sm:px-6
        sm:py-5
      "
    >
      <div className="mx-auto max-w-5xl">

        {/* IMAGE PREVIEW */}

        <AnimatePresence>
          {imagePreview && (
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9,
                y: 10,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.9,
                y: 10,
              }}
              className="
                relative
                mb-3
                w-fit
                overflow-hidden
                rounded-2xl
                border
                border-slate-700/70
                bg-slate-900
                p-1
                shadow-xl
              "
            >
              <img
                src={imagePreview}
                alt="Selected image"
                className="
                  h-28
                  w-28
                  rounded-xl
                  object-cover
                  sm:h-36
                  sm:w-36
                "
              />

              {/* IMAGE OVERLAY */}

              <div
                className="
                  absolute
                  inset-x-1
                  bottom-1
                  rounded-b-xl
                  bg-black/50
                  px-2
                  py-1
                  text-xs
                  text-slate-200
                  backdrop-blur-sm
                "
              >
                Image ready
              </div>

              {/* REMOVE BUTTON */}

              <button
                type="button"
                onClick={handleRemoveImage}
                className="
                  absolute
                  right-2
                  top-2
                  flex
                  h-7
                  w-7
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/10
                  bg-black/60
                  text-white
                  shadow-lg
                  transition
                  hover:scale-110
                  hover:bg-red-500
                "
              >
                <X size={15} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>


        {/* HIDDEN FILE INPUT */}

        <input
          type="file"
          accept="image/*"
          ref={imageInputRef}
          onChange={handleImageChange}
          className="hidden"
        />


        {/* MESSAGE INPUT CONTAINER */}

        <div
          className="
            flex
            items-center
            gap-1
            rounded-2xl
            border
            border-slate-700/70
            bg-slate-900/90
            p-2
            shadow-[0_10px_40px_rgba(0,0,0,0.35)]
            transition
            focus-within:border-cyan-500/50
            focus-within:ring-2
            focus-within:ring-cyan-500/10
          "
        >

          {/* EMOJI */}

          <button
            type="button"
            className="
              hidden
              rounded-xl
              p-2.5
              text-slate-400
              transition
              hover:bg-slate-800
              hover:text-yellow-400
              sm:block
            "
          >
            <Smile size={20} />
          </button>


          {/* ATTACHMENT */}

          <button
            type="button"
            className="
              hidden
              rounded-xl
              p-2.5
              text-slate-400
              transition
              hover:bg-slate-800
              hover:text-cyan-400
              sm:block
            "
          >
            <Paperclip size={20} />
          </button>


          {/* IMAGE */}

          <button
            type="button"
            onClick={() =>
              imageInputRef.current?.click()
            }
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              text-slate-400
              transition
              hover:bg-green-500/10
              hover:text-green-400
            "
            title="Send image"
          >
            <ImagePlus size={21} />
          </button>


          {/* TEXT INPUT */}

          <input
            type="text"
            value={text}
            onChange={handleTyping}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            placeholder="Type a message..."
            className="
              min-w-0
              flex-1
              bg-transparent
              px-2
              text-sm
              text-white
              placeholder:text-slate-500
              focus:outline-none
              sm:text-base
            "
          />


          {/* MIC */}

          {!text.trim() && !selectedImage && (
            <button
              type="button"
              className="
                hidden
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                text-slate-400
                transition
                hover:bg-red-500/10
                hover:text-red-400
                sm:flex
              "
              title="Voice message"
            >
              <Mic size={20} />
            </button>
          )}


          {/* SEND BUTTON */}

          <motion.button
            type="button"
            onClick={handleSendMessage}
            disabled={
              !text.trim() &&
              !selectedImage
            }
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.92,
            }}
            className="
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-gradient-to-br
              from-cyan-500
              to-blue-600
              text-white
              shadow-lg
              shadow-cyan-500/20
              transition
              disabled:cursor-not-allowed
              disabled:opacity-40
            "
          >
            <SendHorizontal size={20} />
          </motion.button>

        </div>

      </div>
    </motion.div>
  );
}