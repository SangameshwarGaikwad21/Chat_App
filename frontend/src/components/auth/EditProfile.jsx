import { useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { UpdateUserProfile } from "../../redux/auth/auth.slice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function UpdateProfile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user, loading } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        username: user?.username || "",
        email: user?.email || "",
        bio: user?.bio || "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await dispatch(UpdateUserProfile(formData)).unwrap();
            toast.success("Profile updated successfully");
            navigate("/profile");
        } catch (error) {
            toast.error(typeof error === "string" ? error : "Could not update profile");
        }
    };

    return (
        <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center px-4 py-10 overflow-hidden relative">

            {/* Background Glow */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.35, 0.2],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute w-96 h-96 bg-blue-600/20 rounded-full blur-3xl -top-20 -left-20"
            />

            <motion.div
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.15, 0.3, 0.15],
                }}
                transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute w-96 h-96 bg-purple-600/20 rounded-full blur-3xl -bottom-20 -right-20"
            />

            {/* Profile Card */}
            <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                    duration: 0.5,
                    ease: "easeOut",
                }}
                className="relative z-10 w-full max-w-lg"
            >
                <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden">

                    {/* Header */}
                    <div className="px-6 sm:px-8 pt-8 pb-6 border-b border-zinc-800">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.15 }}
                        >
                            <h1 className="text-2xl sm:text-3xl font-bold">
                                Update Profile
                            </h1>

                            <p className="text-zinc-400 mt-2 text-sm">
                                Update your username, email and bio.
                            </p>
                        </motion.div>
                    </div>

                    {/* Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="p-6 sm:p-8 space-y-6"
                    >

                        {/* Username */}
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <label className="block text-sm font-medium text-zinc-300 mb-2">
                                Username
                            </label>

                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="Enter your username"
                                className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder:text-zinc-600 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                            />
                        </motion.div>

                        {/* Email */}
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <label className="block text-sm font-medium text-zinc-300 mb-2">
                                Email
                            </label>

                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder:text-zinc-600 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                            />
                        </motion.div>

                        {/* Bio */}
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <label className="block text-sm font-medium text-zinc-300 mb-2">
                                Bio
                            </label>

                            <textarea
                                name="bio"
                                value={formData.bio}
                                onChange={handleChange}
                                placeholder="Tell something about yourself..."
                                rows={4}
                                maxLength={150}
                                className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder:text-zinc-600 outline-none resize-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                            />

                            <div className="text-right mt-1">
                                <span className="text-xs text-zinc-600">
                                    {formData.bio.length}/150
                                </span>
                            </div>
                        </motion.div>

                        {/* Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="flex gap-3 pt-2"
                        >
                            <motion.button
                                type="button"
                                onClick={() => navigate("/profile")}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.97 }}
                                className="flex-1 px-5 py-3 rounded-xl border border-zinc-700 text-zinc-300 hover:bg-zinc-800 transition-colors"
                            >
                                Cancel
                            </motion.button>

                            <motion.button
                                type="submit"
                                disabled={loading}
                                whileHover={{ scale: loading ? 1 : 1.02 }}
                                whileTap={{ scale: loading ? 1 : 0.97 }}
                                className="flex-1 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed font-medium transition-colors"
                            >
                                {loading ? "Updating..." : "Update Profile"}
                            </motion.button>
                        </motion.div>
                    </form>
                </div>
            </motion.div>
        </div>
    );
}
