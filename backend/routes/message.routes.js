import { Router } from "express";
import { deleteMessage, editMessage, getMessage, sendMessage } from "../controllers/message.controllers.js";
import { VerifyJWT } from "../middlewares/auth.middlewares.js";
import { upload } from "../middlewares/multer.middlewares.js";

const router = Router()

router.post("/send-message/:receiverId", VerifyJWT, upload.single("image"), sendMessage);

router.get("/:receiverId", VerifyJWT, getMessage);

router.delete("/:messageId", VerifyJWT, deleteMessage);

router.put( "/edit-message/:messageId", VerifyJWT, editMessage);

export default router;