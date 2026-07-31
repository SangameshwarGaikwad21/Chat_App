import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle, ShieldCheck, Zap, Users,Sparkles} from "lucide-react";

const Home = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0B1120] text-white">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute -top-32 left-0 h-96 w-96 rounded-full bg-blue-600/20 blur-[140px]" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-purple-600/20 blur-[140px]" />
      </div>

      {/* Navbar */}
      <nav className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-8 py-6">
        <motion.h1
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold tracking-wide"
        >
          💬 ChatFlow
        </motion.h1>

        <div className="flex gap-4">
          <Link
            to="/login"
            className="rounded-xl border border-gray-700 px-5 py-2 transition hover:bg-gray-800"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="rounded-xl bg-blue-600 px-5 py-2 transition hover:bg-blue-700"
          >
            Register
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-20 mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-8 py-16 lg:grid-cols-2">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="rounded-full bg-blue-500/20 px-4 py-2 text-sm text-blue-300">
            🚀 Real-Time Messaging
          </span>

          <h1 className="mt-6 text-5xl font-extrabold leading-tight lg:text-7xl">
            Connect.
            <br />
            Chat.
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Anytime.
            </span>
          </h1>

          <p className="mt-8 max-w-xl text-lg text-gray-400">
            A modern real-time chat platform built using React, Node.js,
            Socket.IO, Redis, MongoDB, and Docker.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/register"
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-4 text-lg font-semibold transition hover:scale-105 hover:bg-blue-700"
            >
              Get Started
              <ArrowRight size={20} />
            </Link>

            <Link
              to="/login"
              className="rounded-xl border border-gray-700 px-8 py-4 text-lg transition hover:bg-gray-800"
            >
              Login
            </Link>
          </div>
        </motion.div>

        {/* Right */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="flex justify-center"
        >
          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-2xl">

            <div className="mb-6 flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-red-500" />
              <div className="h-3 w-3 rounded-full bg-yellow-500" />
              <div className="h-3 w-3 rounded-full bg-green-500" />
            </div>

            <div className="space-y-5">

              <motion.div
                animate={{ x: [0, 15, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
                className="w-fit rounded-2xl bg-blue-600 px-4 py-3"
              >
                Hey 👋
              </motion.div>

              <motion.div
                animate={{ x: [20, 0, 20] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                }}
                className="ml-auto w-fit rounded-2xl bg-gray-700 px-4 py-3"
              >
                Hello! 🚀
              </motion.div>

              <motion.div
                animate={{ x: [0, 20, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                }}
                className="w-fit rounded-2xl bg-blue-600 px-4 py-3"
              >
                Ready to build?
              </motion.div>

              <motion.div
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                }}
                className="text-gray-400"
              >
                Typing...
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="relative z-20 mx-auto max-w-7xl px-8 py-20">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mb-14 text-center text-4xl font-bold"
        >
          Powerful Features
        </motion.h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: <MessageCircle size={32} />,
              title: "Real-Time Chat",
              desc: "Instant messaging powered by Socket.IO",
            },
            {
              icon: <ShieldCheck size={32} />,
              title: "Secure",
              desc: "JWT Authentication & Protected Routes",
            },
            {
              icon: <Zap size={32} />,
              title: "Fast",
              desc: "Redis powered performance",
            },
            {
              icon: <Users size={32} />,
              title: "Friends",
              desc: "Connect with everyone easily",
            },
          ].map((item, index) => (
            <motion.div
              whileHover={{
                scale: 1.05,
                y: -10,
              }}
              key={index}
              className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-lg"
            >
              <div className="mb-5 text-blue-400">{item.icon}</div>

              <h3 className="mb-3 text-xl font-bold">{item.title}</h3>

              <p className="text-gray-400">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-20 px-8 pb-24">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="mx-auto max-w-5xl rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 p-12 text-center"
        >
          <Sparkles className="mx-auto mb-5" size={45} />

          <h2 className="text-4xl font-bold">
            Ready to start chatting?
          </h2>

          <p className="mt-5 text-lg text-gray-100">
            Join now and experience modern real-time communication.
          </p>

          <Link
            to="/register"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-bold text-black transition hover:scale-105"
          >
            Create Account
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;