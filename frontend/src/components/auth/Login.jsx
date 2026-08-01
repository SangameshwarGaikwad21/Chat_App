import React, { useState } from "react";
import {
  MessageCircle,
  ShieldCheck,
  Zap,
  Users,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { loginUser } from "../../redux/auth/auth.slice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // Handle Input Change
  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle Login
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      return toast.error("Please fill all fields");
    }

    try {
      await dispatch(loginUser(form)).unwrap();

        toast.success("Login Successfully 🎉");
        console.log("Navigating...");
        navigate("/chat");
        
    } catch (error) {
        console.log("Login Error:", error);

        toast.error(
            typeof error === "string"
                ? error
                : error?.message || "Invalid email or password"
            );
        }
    };

  return (
    <div className="min-h-screen bg-[#10141F] flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-7xl grid lg:grid-cols-2 rounded-3xl overflow-hidden shadow-2xl border border-[#2D3342]">

        {/* Left Section */}

        <div className="bg-[#20242F] flex items-center justify-center p-12">
          <div className="w-full max-w-md">

            <h2 className="text-4xl font-bold text-white">
              Welcome Back 👋
            </h2>

            <p className="text-gray-400 mt-3">
              Sign in to continue your conversations with ChatSphere.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-10 space-y-5"
            >

              {/* Email */}

              <div>
                <label className="text-gray-300 block mb-2">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full bg-[#10141F] border border-[#303746] rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500"
                />
              </div>

              {/* Password */}

              <div>
                <label className="text-gray-300 block mb-2">
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full bg-[#10141F] border border-[#303746] rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500"
                />
              </div>

              {/* Forgot Password */}

              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-sm text-blue-500 hover:text-blue-400"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Login Button */}

              {loading ? (
                <button
                  disabled
                  className="w-full bg-blue-600 py-3 rounded-xl text-white opacity-70 cursor-not-allowed"
                >
                  Signing In...
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 py-3 rounded-xl text-white font-semibold"
                >
                  Login
                </button>
              )}

              {/* Register */}

              <p className="text-center text-gray-400">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-blue-500 hover:underline"
                >
                  Register
                </Link>
              </p>

            </form>
          </div>
        </div>

        {/* Right Section */}

        <div className="bg-[#10141F] p-16 flex flex-col justify-center">

          <div className="flex items-center gap-3 mb-8">
            <div className="bg-blue-600 p-3 rounded-xl">
              <MessageCircle className="text-white" size={28} />
            </div>

            <h1 className="text-4xl font-bold text-white">
              ChatSphere
            </h1>
          </div>

          <h2 className="text-5xl font-bold text-white leading-tight">
            Welcome Back.
            <br />
            Stay Connected.
            <br />
            Anytime.
          </h2>

          <p className="text-gray-400 mt-6 text-lg leading-8">
            ChatSphere brings secure, fast, and seamless communication
            for developers, teams, and communities. Pick up every
            conversation right where you left off.
          </p>

          <div className="mt-12 space-y-6">

            <div className="flex items-center gap-4">
              <MessageCircle className="text-blue-500" />
              <span className="text-white">
                Instant Real-Time Messaging
              </span>
            </div>

            <div className="flex items-center gap-4">
              <ShieldCheck className="text-green-500" />
              <span className="text-white">
                End-to-End Secure Authentication
              </span>
            </div>

            <div className="flex items-center gap-4">
              <Users className="text-yellow-500" />
              <span className="text-white">
                One-to-One & Group Conversations
              </span>
            </div>

            <div className="flex items-center gap-4">
              <Zap className="text-pink-500" />
              <span className="text-white">
                Fast, Reliable & Modern Experience
              </span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;