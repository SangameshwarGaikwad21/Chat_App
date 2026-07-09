import express from "express"
import { config } from "dotenv";
import cors from "cors"
import cookieParser from "cookie-parser";

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

app.get("/", (req, res) => {
  res.send("Backned running 🚀");
});

export default app;