import { Link, useNavigate } from "react-router-dom";
import {
  MessageCircle,
  ShieldCheck,
  Zap,
  Users,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import toast from "react-hot-toast";

import { registerUser } from "../../redux/auth/auth.slice";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.auth);

  const [preview, setPreview] = useState(null);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    avatar: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "avatar") {
      const file = files[0];

      setForm((prev) => ({
        ...prev,
        avatar: file,
      }));

      if (file) {
        setPreview(URL.createObjectURL(file));
      }
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.username ||
      !form.email ||
      !form.password ||
      !form.avatar
    ) {
      return toast.error("Please fill all fields");
    }

    const formData = new FormData();

    formData.append("username", form.username);
    formData.append("email", form.email);
    formData.append("password", form.password);
    formData.append("avatar", form.avatar);

    try {
      await dispatch(registerUser(formData)).unwrap();

      toast.success("Account Created Successfully 🎉");

      navigate("/chat");
    } catch (error) {
      console.log("Register Error:", error);

      toast.error(
        typeof error === "string"
          ? error
          : error?.message || "Registration Failed ❌"
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#10141F] flex items-center justify-center px-6">
      <div className="w-full max-w-7xl grid lg:grid-cols-2 rounded-3xl overflow-hidden shadow-2xl border border-[#2D3342]">

        {/* Left Section */}

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
            Connect.
            <br />
            Chat.
            <br />
            Collaborate.
          </h2>

          <p className="text-gray-400 mt-6 text-lg leading-8">
            Experience secure and lightning-fast messaging built for developers,
            teams and communities.
          </p>

          <div className="mt-12 space-y-6">

            <div className="flex items-center gap-4">
              <MessageCircle className="text-blue-500" />
              <span className="text-white">Real-time Messaging</span>
            </div>

            <div className="flex items-center gap-4">
              <ShieldCheck className="text-green-500" />
              <span className="text-white">Secure Authentication</span>
            </div>

            <div className="flex items-center gap-4">
              <Users className="text-yellow-500" />
              <span className="text-white">Private & Group Chats</span>
            </div>

            <div className="flex items-center gap-4">
              <Zap className="text-pink-500" />
              <span className="text-white">Lightning Fast</span>
            </div>

          </div>

        </div>

        {/* Right Section */}

        <div className="bg-[#20242F] flex items-center justify-center p-12">

          <div className="w-full max-w-md">

            <h2 className="text-4xl font-bold text-white">
              Create Account
            </h2>

            <p className="text-gray-400 mt-3">
              Join ChatSphere and start chatting today.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-10 space-y-5"
            >

              {/* Avatar Preview */}

              <div className="flex justify-center">

                {preview ? (
                  <img
                    src={preview}
                    alt="Avatar"
                    className="w-24 h-24 rounded-full object-cover border-4 border-blue-500"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-[#10141F] border border-[#303746] flex items-center justify-center text-gray-400">
                    Avatar
                  </div>
                )}

              </div>

              {/* Avatar */}

              <div>
                <label className="text-gray-300 block mb-2">
                  Avatar
                </label>

                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full bg-[#10141F] border border-[#303746] rounded-xl px-4 py-3 text-white
                  file:mr-4 file:rounded-lg file:border-0 file:bg-blue-600
                  file:px-4 file:py-2 file:text-white file:cursor-pointer cursor-pointer"
                />
              </div>

              {/* Username */}

              <div>
                <label className="text-gray-300 block mb-2">
                  Username
                </label>

                <input
                  type="text"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full bg-[#10141F] border border-[#303746] rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500"
                />
              </div>

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
                  placeholder="john@gmail.com"
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
                  placeholder="********"
                  className="w-full bg-[#10141F] border border-[#303746] rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500"
                />
              </div>

              {/* Button */}

              {loading ? (
                <button
                  disabled
                  className="w-full bg-blue-600 py-3 rounded-xl text-white opacity-70 cursor-not-allowed"
                >
                  Creating Account...
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 transition-all py-3 rounded-xl text-white font-semibold"
                >
                  Create Account
                </button>
              )}

            </form>

            <p className="text-center text-gray-400 mt-8">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-500 hover:underline"
              >
                Login
              </Link>
            </p>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Register;