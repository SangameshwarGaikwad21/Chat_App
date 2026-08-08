import { motion } from "framer-motion";
import { MessageCircleMore } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import socket from "../../socket/socket";
import { addMessage } from "../../redux/auth/message.slice";

export default function ChatBody() {

    const bottomRef = useRef(null);

    const dispatch = useDispatch();

    const { messages, loading } = useSelector(
        (state) => state.message
    );

    const { user } = useSelector(
        (state) => state.auth
    );

    // Scroll to bottom whenever messages change
    useEffect(() => {

        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
        });

    }, [messages]);


    // Socket.IO connection
    useEffect(() => {

    if (!user?._id) {
        return;
    }

    // Send REAL logged-in user ID
    socket.io.opts.query = {
        userId: user._id,
    };

    socket.connect();

    const handleConnect = () => {
        console.log("Socket connected:",socket.id);
    };

    const handleConnectError = (error) => {
      console.error("Socket error:",error.message);
    };

    const handleNewMessage = (message) => {
        console.log("📩 REAL MESSAGE RECEIVED:",message);
        dispatch(addMessage(message));
    };

    socket.on("connect",handleConnect);
    socket.on("connect_error",handleConnectError);
    socket.on("newMessage",handleNewMessage);

    return () => {
        socket.off("connect",handleConnect);
        socket.off("connect_error",handleConnectError);
        socket.off("newMessage",handleNewMessage);
    };

}, [user?._id, dispatch]);


    const formatDate = (date) => {

        const today = new Date();

        const yesterday = new Date();

        yesterday.setDate(
            today.getDate() - 1
        );

        const messageDate = new Date(date);

        if (
            messageDate.toDateString() ===
            today.toDateString()
        ) {
            return "Today";
        }

        if (
            messageDate.toDateString() ===
            yesterday.toDateString()
        ) {
            return "Yesterday";
        }

        return messageDate.toLocaleDateString(
            "en-IN",
            {
                day: "numeric",
                month: "long",
                year: "numeric",
            }
        );
    };


    if (loading) {

        return (
            <div className="flex h-full items-center justify-center text-white">
                Loading...
            </div>
        );

    }


    return (
       <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.35 }}
    className="relative flex-1 h-full overflow-y-auto bg-[#020617] px-4 py-6 sm:px-6"
>
    {/* Background decoration */}
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-20 h-80 w-80 rounded-full bg-blue-500/5 blur-3xl" />

        <div className="absolute -right-40 bottom-20 h-80 w-80 rounded-full bg-purple-500/5 blur-3xl" />
    </div>

    <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col gap-2">

        {messages.length > 0 ? (

            <>
                {messages.map((message, index) => {

                    const senderId =
                        typeof message.sender === "object"
                            ? message.sender._id
                            : message.sender;

                    const isMe =
                        String(senderId) ===
                        String(user?._id);

                    const currentDate =
                        formatDate(message.createdAt);

                    const previousDate =
                        index > 0
                            ? formatDate(
                                messages[index - 1].createdAt
                            )
                            : null;

                    const showDate =
                        currentDate !== previousDate;

                    return (
                        <div
                            key={
                                message._id ||
                                `${message.createdAt}-${index}`
                            }
                        >

                            {/* Date separator */}
                            {showDate && (
                                <div className="my-6 flex items-center gap-3">

                                    <div className="h-px flex-1 bg-slate-800" />

                                    <span className="rounded-full border border-slate-800 bg-slate-900/80 px-4 py-1.5 text-[11px] font-medium text-slate-400 shadow-sm backdrop-blur">
                                        {currentDate}
                                    </span>

                                    <div className="h-px flex-1 bg-slate-800" />

                                </div>
                            )}

                            {/* Message row */}
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    y: 8,
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
                                className={`mb-2 flex ${
                                    isMe
                                        ? "justify-end"
                                        : "justify-start"
                                }`}
                            >

                                <div
                                    className={`group relative flex max-w-[80%] flex-col sm:max-w-[65%] ${
                                        isMe
                                            ? "items-end"
                                            : "items-start"
                                    }`}
                                >

                                    {/* Bubble */}
                                    <div
                                        className={`
                                            relative rounded-2xl px-4 py-2.5
                                            text-sm leading-relaxed
                                            shadow-md
                                            transition-all duration-200
                                            ${
                                                isMe
                                                    ? `
                                                        rounded-br-md
                                                        bg-gradient-to-r
                                                        from-blue-600
                                                        to-indigo-600
                                                        text-white
                                                        shadow-blue-900/20
                                                      `
                                                    : `
                                                        rounded-bl-md
                                                        border
                                                        border-slate-800
                                                        bg-slate-900
                                                        text-slate-100
                                                        shadow-black/20
                                                      `
                                            }
                                        `}
                                    >

                                        {/* Message text */}
                                        {message.text && (
                                            <p className="whitespace-pre-wrap break-words">
                                                {message.text}
                                            </p>
                                        )}

                                        {/* Image message */}
                                        {message.image && (
                                            <img
                                                src={message.image}
                                                alt="message"
                                                className="mb-2 max-h-72 max-w-full rounded-xl object-cover"
                                            />
                                        )}

                                        {/* Time */}
                                        <div
                                            className={`
                                                mt-1 flex items-center justify-end gap-1
                                                text-[10px]
                                                ${
                                                    isMe
                                                        ? "text-blue-100/70"
                                                        : "text-slate-500"
                                                }
                                            `}
                                        >
                                            {new Date(
                                                message.createdAt
                                            ).toLocaleTimeString(
                                                "en-IN",
                                                {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                }
                                            )}

                                            {isMe && (
                                                <span className="text-[11px]">
                                                    ✓
                                                </span>
                                            )}
                                        </div>

                                    </div>

                                </div>

                            </motion.div>

                        </div>
                    );
                })}

                {/* Scroll anchor */}
                <div ref={bottomRef} />

            </>

        ) : (

            /* Empty state */
            <motion.div
                initial={{
                    opacity: 0,
                    scale: 0.95,
                    y: 20,
                }}
                animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                }}
                transition={{
                    duration: 0.4,
                    type: "spring",
                    stiffness: 120,
                }}
                className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center"
            >

                {/* Icon */}
                <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-slate-800 bg-slate-900 shadow-xl shadow-black/20">
                    <MessageCircleMore
                        size={38}
                        strokeWidth={1.5}
                        className="text-blue-500"
                    />
                </div>

                {/* Heading */}
                <h2 className="mt-6 text-xl font-semibold text-white sm:text-2xl">
                    Start the conversation
                </h2>

                {/* Description */}
                <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
                    Send a message to start chatting. Your
                    conversation will appear here.
                </p>

                {/* Small decoration */}
                <div className="mt-6 flex items-center gap-2 text-xs text-slate-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                    Messages are delivered in real time
                </div>

            </motion.div>

        )}

    </div>
</motion.div>

    );
}