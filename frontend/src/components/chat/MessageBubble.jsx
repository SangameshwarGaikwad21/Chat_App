import { useSelector } from "react-redux";
import { CheckCheck } from "lucide-react";

export default function MessageBubble({ message }) {
    const { user } = useSelector((state) => state.auth);

    const isMe =
        message.sender?._id === user?._id ||
        message.sender === user?._id;

    return (
        <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
            <div
                className={`max-w-sm rounded-2xl px-4 py-3 shadow-lg ${
                    isMe
                        ? "rounded-br-md bg-gradient-to-r from-blue-600 to-cyan-500 text-white"
                        : "rounded-bl-md bg-slate-800 text-slate-100"
                }`}
            >
                {/* Message */}
                <p className="break-words text-sm leading-relaxed">
                    {message.text}
                </p>

                {/* Time + Double Tick */}
                <div
                    className={`mt-2 flex items-center justify-end gap-1 text-[11px] ${
                        isMe ? "text-cyan-100" : "text-slate-400"
                    }`}
                >
                    <span>
                        {new Date(message.createdAt).toLocaleTimeString(
                            "en-IN",
                            {
                                hour: "2-digit",
                                minute: "2-digit",
                            }
                        )}
                    </span>

                    {isMe && (
                        <CheckCheck
                            size={14}
                            className="text-cyan-100"
                        />
                    )}
                </div>
            </div>
        </div>
    );
}