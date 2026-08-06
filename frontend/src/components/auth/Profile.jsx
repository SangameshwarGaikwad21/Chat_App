import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import {getUserProfile} from "../../redux/auth/auth.slice"


export default function Profile() {
    const dispatch = useDispatch();

    const { user, loading } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(getUserProfile());
    }, [dispatch]);

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-slate-950">
                <motion.h1
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{
                        repeat: Infinity,
                        duration: 1.2,
                    }}
                    className="text-xl font-semibold text-cyan-400"
                >
                    Loading...
                </motion.h1>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex h-screen items-center justify-center bg-slate-950">
                <h1 className="text-2xl font-bold text-white">
                    User not found
                </h1>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">

            {/* Background Blur */}
            <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl"></div>
            <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl"></div>

            <div className="relative mx-auto max-w-4xl p-6">

                {/* Back Button */}
                <Link
                    to="/chat"
                    className="inline-flex items-center gap-2 rounded-lg bg-slate-800 px-4 py-2 text-slate-300 transition-all hover:bg-cyan-600 hover:text-white"
                >
                    <ArrowLeft size={18} />
                    Back to Chat
                </Link>

                {/* Profile Card */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mt-8 rounded-3xl border border-slate-700 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-md"
                >
                    <div className="flex flex-col items-center">

                        {/* Avatar */}
                        <motion.img
                            whileHover={{
                                scale: 1.08,
                                rotate: 2,
                            }}
                            transition={{ type: "spring" }}
                            src={
                                user.avatar ||
                                "https://ui-avatars.com/api/?name=User"
                            }
                            alt={user.username}
                            className="h-40 w-40 rounded-full border-4 border-cyan-500 object-cover shadow-lg shadow-cyan-500/20"
                        />

                        {/* Username */}
                        <motion.h1
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="mt-6 text-4xl font-bold"
                        >
                            {user.username}
                        </motion.h1>

                        {/* Email */}
                        <p className="mt-2 text-slate-400">
                            {user.email}
                        </p>

                        {/* Role */}
                        <motion.span
                            whileHover={{ scale: 1.05 }}
                            className="mt-4 rounded-full bg-green-500/20 px-5 py-2 text-sm font-medium text-green-400"
                        >
                            {user.role}
                        </motion.span>

                    </div>

                    {/* Information Cards */}
                    <div className="mt-10 grid gap-6 md:grid-cols-2">

                        <motion.div
                            whileHover={{
                                y: -5,
                                scale: 1.02,
                            }}
                            className="rounded-2xl bg-slate-800 p-6 shadow-lg"
                        >
                            <h2 className="text-lg font-semibold text-cyan-400">
                                Bio
                            </h2>

                            <p className="mt-3 text-slate-300">
                                {user.bio || "No bio added."}
                            </p>
                        </motion.div>

                        <motion.div
                            whileHover={{
                                y: -5,
                                scale: 1.02,
                            }}
                            className="rounded-2xl bg-slate-800 p-6 shadow-lg"
                        >
                            <h2 className="text-lg font-semibold text-cyan-400">
                                Last Seen
                            </h2>

                            <p className="mt-3 text-slate-300">
                                {user.lastSeen
                                    ? new Date(user.lastSeen).toLocaleString()
                                    : "Not Available"}
                            </p>
                        </motion.div>

                    </div>

                    {/* Buttons */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="mt-10 flex flex-wrap justify-center gap-4"
                    >
                        <button className="rounded-xl bg-cyan-600 px-6 py-3 font-semibold transition-all hover:bg-cyan-500">
                            Edit Profile
                        </button>

                        <Link
                            to="/chat"
                            className="rounded-xl bg-slate-700 px-6 py-3 font-semibold transition-all hover:bg-slate-600"
                        >
                            Go to Chat
                        </Link>
                    </motion.div>

                </motion.div>

            </div>
        </div>
    );
}