import express from "express"
import { config } from "dotenv";
import cors from "cors"
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes.js"
import morgan from "morgan";
import messageRoutes from "./routes/message.routes.js"
import conversationRoutes from "./routes/conversation.routes.js"

config();

const app=express()

const corsOptions={
    origin:"http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}

app.use(cors(corsOptions))
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())
app.use(morgan("dev"));

app.use("/api/v1/user",userRoutes)
app.use("/api/v1/message",messageRoutes)
app.use("/api/v1/conversation",conversationRoutes)

app.get("/", (req, res) => {
  res.send("Backned running 🚀");
});

app.get("/socket", (req, res) => {
    res.send("OK");
});

export default app;