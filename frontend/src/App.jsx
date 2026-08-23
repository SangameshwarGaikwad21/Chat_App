import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Chat from "./components/chat/chat";
import Profile from "./components/auth/Profile";
import EditProfile from "./components/auth/EditProfile";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import { getUserProfile } from "./redux/auth/auth.slice";

import { useEffect } from "react";

import socket from "./socket/socket";

const App = () => {
  const dispatch = useDispatch();

  const { user } = useSelector(
    (state) => state.auth
  );

  // Get logged-in user
  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  // Connect Socket.IO
  useEffect(() => {
    if (!user?._id) return;

    // Send userId to backend
    socket.io.opts.query = {
      userId: user._id,
    };

    // Connect socket
    socket.connect();

    socket.on("connect", () => {
      console.log(
        "🟢 FRONTEND SOCKET CONNECTED:",
        socket.id
      );
    });

    socket.on("connect_error", (error) => {
      console.error(
        "❌ SOCKET CONNECTION ERROR:",
        error.message
      );
    });

    // Cleanup
    return () => {
      socket.disconnect();
    };
  }, [user?._id]);

  return (
    <div className="h-screen">
      <Toaster position="top-center" />

      <Routes>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/chat"
          element={<Chat />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />

        <Route
          path="/edit-profile"
          element={<EditProfile />}
        />
      </Routes>
    </div>
  );
};

export default App;