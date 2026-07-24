import http from "http";
import { Server } from "socket.io";
import app from "../app.js";

export const server = http.createServer(app);

export const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL,
        credentials: true,
    },
});

const userSocketMap = {};

export const getReceiverSocketId = (userId) => {
    return userSocketMap[userId];
};

io.on("connection", (socket) => {
    console.log("User Connected:", socket.id);

    socket.on("disconnect", () => {
        console.log("User Disconnected:", socket.id);
    });
});