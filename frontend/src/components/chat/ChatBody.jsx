import { motion } from "framer-motion";
import { MessageCircleMore } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
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
    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages]);

    // =========================================================
    // SOCKET.IO CONNECTION
    // =========================================================

    useEffect(() => {
        if (!user?._id) {
            return;
        }

        // Send logged-in user ID to socket server
        socket.io.opts.query = {
            userId: user._id,
        };

        socket.connect();

        const handleConnect = () => {
            console.log("Socket connected:", socket.id);
        };

        const handleConnectError = (error) => {
            console.error(
                "Socket connection error:",
                error.message
            );
        };

        const handleNewMessage = (message) => {
            dispatch(addMessage(message));
        };

        socket.on("connect", handleConnect);
        socket.on("connect_error", handleConnectError);
        socket.on("newMessage", handleNewMessage);

        return () => {
            socket.off("connect", handleConnect);
            socket.off("connect_error", handleConnectError);
            socket.off("newMessage", handleNewMessage);

            socket.disconnect();
        };
    }, [user?._id, dispatch]);

    // =========================================================
    // FORMAT MESSAGE DATE
    // =========================================================

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

    // =========================================================
    // LOADING STATE
    // =========================================================

    if (loading) {
        return (
            <div className="flex h-full items-center justify-center bg-[#020617] text-white">
                Loading...
            </div>
        );
    }

    // =========================================================
    // MAIN UI
    // =========================================================

    return (
        <motion.div initial={{opacity: 0,}}
            animate={{
                opacity: 1,
            }}
            transition={{
                duration: 0.35,
            }}
            className="
                relative
                flex-1
                h-full
                overflow-y-auto
                bg-[#020617]
                px-4
                py-6
                sm:px-6
            "
        >

            {/* =================================================
                BACKGROUND DECORATION
            ================================================= */}

            <div className="pointer-events-none absolute inset-0 overflow-hidden">

                <div
                    className="
                        absolute
                        -left-40
                        top-20
                        h-80
                        w-80
                        rounded-full
                        bg-blue-500/5
                        blur-3xl
                    "
                />

                <div
                    className="
                        absolute
                        -right-40
                        bottom-20
                        h-80
                        w-80
                        rounded-full
                        bg-purple-500/5
                        blur-3xl
                    "
                />

            </div>

            {/* =================================================
                MESSAGE CONTAINER
            ================================================= */}

            <div
                className="
                    relative
                    z-10
                    mx-auto
                    flex
                    w-full
                    max-w-4xl
                    flex-col
                    gap-2
                "
            >

                {messages.length > 0 ? (

                    <>
                        {/* =================================================
                            MESSAGES
                        ================================================= */}

                        {messages.map((message, index) => {

                            // -----------------------------------------
                            // GET SENDER ID
                            // -----------------------------------------

                            const senderId =
                                typeof message.sender === "object"
                                    ? message.sender._id
                                    : message.sender;

                            // -----------------------------------------
                            // CHECK IF MESSAGE IS MINE
                            // -----------------------------------------

                            const isMe =
                                String(senderId) ===
                                String(user?._id);

                            // -----------------------------------------
                            // CURRENT MESSAGE DATE
                            // -----------------------------------------

                            const currentDate =
                                formatDate(
                                    message.createdAt
                                );

                            // -----------------------------------------
                            // PREVIOUS MESSAGE DATE
                            // -----------------------------------------

                            const previousDate =
                                index > 0
                                    ? formatDate(
                                        messages[index - 1]
                                            .createdAt
                                    )
                                    : null;

                            // -----------------------------------------
                            // SHOW DATE SEPARATOR
                            // -----------------------------------------

                            const showDate =
                                currentDate !== previousDate;

                            return (
                                <div
                                    key={
                                        message._id ||
                                        `${message.createdAt}-${index}`
                                    }
                                >

                                    {/* =================================================
                                        DATE SEPARATOR
                                    ================================================= */}

                                    {showDate && (
                                        <motion.div
                                            initial={{
                                                opacity: 0,
                                                y: 5,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                y: 0,
                                            }}
                                            transition={{
                                                duration: 0.25,
                                            }}
                                            className="
                                                my-6
                                                flex
                                                items-center
                                                gap-3
                                            "
                                        >

                                            <div
                                                className="
                                                    h-px
                                                    flex-1
                                                    bg-slate-800
                                                "
                                            />

                                            <span
                                                className="
                                                    rounded-full
                                                    border
                                                    border-slate-800
                                                    bg-slate-900/80
                                                    px-4
                                                    py-1.5
                                                    text-[11px]
                                                    font-medium
                                                    text-slate-400
                                                    shadow-sm
                                                    backdrop-blur
                                                "
                                            >
                                                {currentDate}
                                            </span>

                                            <div
                                                className="
                                                    h-px
                                                    flex-1
                                                    bg-slate-800
                                                "
                                            />

                                        </motion.div>
                                    )}

                                    {/* =================================================
                                        MESSAGE ROW
                                    ================================================= */}

                                    <div
                                        className={`
                                            mb-2
                                            flex
                                            ${
                                                isMe
                                                    ? "justify-end"
                                                    : "justify-start"
                                            }
                                        `}
                                    >

                                        {/* =================================================
                                            MESSAGE CONTAINER
                                        ================================================= */}

                                        <div
                                            className={`
                                                group
                                                relative
                                                flex
                                                max-w-[80%]
                                                flex-col
                                                sm:max-w-[65%]
                                                ${
                                                    isMe
                                                        ? "items-end"
                                                        : "items-start"
                                                }
                                            `}
                                        >

                                            {/* =================================================
                                                MESSAGE BUBBLE
                                            ================================================= */}

                                            <motion.div
                                                layout
                                                initial={{
                                                    opacity: 0,
                                                    scale: 0.7,
                                                    x: isMe
                                                        ? 30
                                                        : -30,
                                                    y: 10,
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    scale: 1,
                                                    x: 0,
                                                    y: 0,
                                                }}
                                                transition={{
                                                    type: "spring",
                                                    stiffness: 500,
                                                    damping: 30,
                                                    mass: 0.7,
                                                }}
                                                whileHover={{
                                                    scale: 1.015,
                                                }}
                                                whileTap={{
                                                    scale: 0.98,
                                                }}
                                                className={`
                                                    relative
                                                    w-fit
                                                    max-w-full
                                                    rounded-2xl
                                                    border
                                                    px-4
                                                    py-2.5
                                                    text-sm
                                                    leading-relaxed
                                                    shadow-lg
                                                    break-words
                                                    whitespace-pre-wrap

                                                    ${
                                                        isMe
                                                            ? `
                                                                rounded-br-md
                                                            
                                                                border-blue-400/20
                                                                bg-gradient-to-br
                                                                from-blue-600
                                                                via-blue-600
                                                                to-indigo-600
                                                                text-white
                                                                shadow-blue-950/40
                                                            `
                                                            : `
                                                                rounded-bl-md
                                                                border-slate-700/60
                                                                bg-gradient-to-br
                                                                from-slate-800
                                                                to-slate-900
                                                                text-slate-100
                                                                shadow-black/40
                                                            `
                                                    }
                                                `}
                                            >

                                                {/* MESSAGE TEXT */}

                                                {message.text}

                                                {/* =================================================
                                                    IMAGE MESSAGE
                                                ================================================= */}

                                                {message.image && (
                                                    <img
                                                        src={
                                                            message.image
                                                        }
                                                        alt="message"
                                                        className="
                                                            mt-2
                                                            max-h-72
                                                            max-w-full
                                                            rounded-xl
                                                            object-cover
                                                        "
                                                    />
                                                )}

                                            </motion.div>

                                            {/* =================================================
                                                MESSAGE TIME
                                            ================================================= */}

                                            <div
                                                className={`
                                                    mt-1
                                                    flex
                                                    items-center
                                                    justify-end
                                                    gap-1
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

                                                {/* =============================================
                                                    MESSAGE STATUS
                                                ============================================= */}

                                                {isMe && (
                                                    <span
                                                        className="
                                                            text-[11px]
                                                            font-medium
                                                        "
                                                    >
                                                        ✓
                                                    </span>
                                                )}

                                            </div>

                                        </div>

                                    </div>

                                </div>
                            );
                        })}

                        {/* =================================================
                            SCROLL ANCHOR
                        ================================================= */}

                        <div ref={bottomRef} />

                    </>

                ) : (

                    /* =================================================
                        EMPTY STATE
                    ================================================= */

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
                        className="
                            flex
                            min-h-[70vh]
                            flex-col
                            items-center
                            justify-center
                            px-6
                            text-center
                        "
                    >

                        {/* ICON */}

                        <motion.div
                            animate={{
                                y: [0, -5, 0],
                            }}
                            transition={{
                                duration: 2.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="
                                flex
                                h-20
                                w-20
                                items-center
                                justify-center
                                rounded-3xl
                                border
                                border-slate-800
                                bg-slate-900
                                shadow-xl
                                shadow-black/20
                            "
                        >
                            <MessageCircleMore
                                size={38}
                                strokeWidth={1.5}
                                className="text-blue-500"
                            />
                        </motion.div>

                        {/* HEADING */}

                        <h2
                            className="
                                mt-6
                                text-xl
                                font-semibold
                                text-white
                                sm:text-2xl
                            "
                        >
                            Start the conversation
                        </h2>

                        {/* DESCRIPTION */}

                        <p
                            className="
                                mt-2
                                max-w-sm
                                text-sm
                                leading-6
                                text-slate-500
                            "
                        >
                            Send a message to start chatting.
                            Your conversation will appear here.
                        </p>

                        {/* DECORATION */}

                        <div
                            className="
                                mt-6
                                flex
                                items-center
                                gap-2
                                text-xs
                                text-slate-600
                            "
                        >
                            <motion.span
                                animate={{
                                    opacity: [0.3, 1, 0.3],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                }}
                                className="
                                    h-1.5
                                    w-1.5
                                    rounded-full
                                    bg-blue-500
                                "
                            />

                            Messages are delivered in real time
                        </div>

                    </motion.div>

                )}

            </div>

        </motion.div>
    );
}

