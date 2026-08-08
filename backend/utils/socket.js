import http from "http";
import { Server } from "socket.io";
import app from "../app.js";

export const server = http.createServer(app);

export const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
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

    console.log("🟢 SOCKET CONNECTED");
    console.log("USER ID:", userId);
    console.log("SOCKET ID:", socket.id);

    if (userId) {
        userSocketMap[userId] = socket.id;
    }

    console.log("ONLINE USERS:", userSocketMap);

    io.emit(
        "getOnlineUsers",
        Object.keys(userSocketMap)
    );

    socket.on("disconnect", () => {

        console.log("🔴 SOCKET DISCONNECTED:", socket.id);

        if (userId) {
            delete userSocketMap[userId];
        }

        io.emit(
            "getOnlineUsers",
            Object.keys(userSocketMap)
        );
    });
});