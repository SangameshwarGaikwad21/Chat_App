import express from "express"
import { config } from "dotenv";
import cors from "cors"
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes.js"
import morgan from "morgan";

config();

const app=express()

const corsOptions={
    origin:[],
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

app.get("/", (req, res) => {
  res.send("Backned running 🚀");
});

export default app;