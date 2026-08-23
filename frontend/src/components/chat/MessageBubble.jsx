import { useSelector } from "react-redux";
import { Check, CheckCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function MessageBubble({ message }) {
  const { user } = useSelector((state) => state.auth);

  // Check if the current user sent this message
  const senderId =
    typeof message.sender === "object"
      ? message.sender?._id
      : message.sender;

  const isMe =
    senderId?.toString() === user?._id?.toString();

  // Format message time
  const formattedTime = message.createdAt
    ? new Date(message.createdAt).toLocaleTimeString(
        "en-IN",
        {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }
      )
    : "";

  // Message status
  const isSeen = message.isSeen;

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 10,
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
      className={`flex w-full ${
        isMe ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`
          group
          w-fit
          max-w-[80%]
          sm:max-w-[65%]
          rounded-2xl
          px-4
          py-2.5
          shadow-md
          transition-all
          duration-200
          hover:shadow-lg
          ${
            isMe
              ? `
                rounded-br-md
                bg-gradient-to-br
                from-blue-600
                to-cyan-500
                text-white
              `
              : `
                rounded-bl-md
                border
                border-slate-700/70
                bg-slate-800
                text-slate-100
              `
          }
        `}
      >
        {/* IMAGE MESSAGE */}

        {message.image && (
          <img
            src={message.image}
            alt="message"
            className="
              mb-2
              max-h-[350px]
              w-full
              rounded-xl
              object-cover
            "
          />
        )}

        {/* TEXT MESSAGE */}

        {message.text && (
          <p
            className="
              whitespace-pre-wrap
              break-words
              text-sm
              leading-relaxed
              sm:text-[15px]
            "
          >
            {message.text}
          </p>
        )}

        {/* TIME + MESSAGE STATUS */}

        <div
          className={`
            mt-1
            flex
            items-center
            justify-end
            gap-1
            text-[10px]
            sm:text-[11px]
            ${
              isMe
                ? "text-cyan-100"
                : "text-slate-400"
            }
          `}
        >
          {/* MESSAGE TIME */}

          <span>
            {formattedTime}
          </span>

          {/* MESSAGE STATUS */}

          {isMe && (
            <>
              {isSeen ? (
                <CheckCheck
                  size={15}
                  className="text-cyan-100"
                />
              ) : (
                <Check
                  size={14}
                  className="text-cyan-100/80"
                />
              )}
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}