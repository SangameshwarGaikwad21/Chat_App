import { useSelector } from "react-redux";
import { Check, CheckCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function MessageBubble({ message }) {
  const { user } = useSelector((state) => state.auth);

  // Get sender ID safely
  const senderId =
    typeof message.sender === "object"
      ? message.sender?._id
      : message.sender;

  const isMe =
    senderId?.toString() === user?._id?.toString();

  // Message time
  const formattedTime = message.createdAt
    ? new Date(message.createdAt).toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
    : "";

  const hasText = Boolean(message.text?.trim());
  const hasImage = Boolean(message.image);

  const isSeen = message.isSeen;

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 8,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.2,
      }}
      className={`
        flex
        w-full
        ${isMe ? "justify-end" : "justify-start"}
      `}
    >
      <div
        className={`
          w-fit
          max-w-[75%]
          sm:max-w-[60%]

          rounded-2xl

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
                from-sky-500
                to-blue-600
                text-white
                shadow-md
                shadow-blue-950/20
              `
              : `
                rounded-bl-md
                border
                border-slate-700/80
                bg-[#1b2435]
                text-slate-100
                shadow-md
                shadow-black/20
              `
          }
        `}
      >
        {/* IMAGE */}
        {hasImage && (
          <img
            src={message.image}
            alt="message"
            className={`
              block
              max-h-[350px]
              max-w-full
              rounded-xl
              object-cover
              ${hasText ? "mb-2" : ""}
            `}
          />
        )}

        {/* TEXT */}
        {hasText && (
          <p
            className="
              w-fit
              max-w-full
              whitespace-pre-wrap
              break-words
              text-[15px]
              leading-6
            "
          >
            {message.text}
          </p>
        )}

        {/* TIME + STATUS */}
        <div
          className={`
            mt-1.5
            flex
            items-center
            justify-end
            gap-1

            text-[10px]

            ${
              isMe
                ? "text-blue-100/80"
                : "text-slate-400"
            }
          `}
        >
          <span>{formattedTime}</span>

          {isMe &&
            (isSeen ? (
              <CheckCheck
                size={15}
                className="text-cyan-200"
              />
            ) : (
              <Check
                size={14}
                className="text-blue-100/80"
              />
            ))}
        </div>
      </div>
    </motion.div>
  );
}