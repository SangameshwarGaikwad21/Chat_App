import http from "http";
import { Server } from "socket.io";
import app from "../app.js";

export const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || process.env.FRONTNED_URL || "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const userSocketMap = {};

export const getReceiverSocketId = (userId) => {
  return userSocketMap[userId];
};

io.on("connection", (socket) => {


  const userId = socket.handshake.query.userId;

  if (userId) {
    userSocketMap[userId] = socket.id;
  }



  socket.on("disconnect", () => {
    if (userId) {
      delete userSocketMap[userId];
    }
  });
});
