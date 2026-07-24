import { Router } from "express";
import { sendMessage } from "../controllers/message.controllers.js";
import { VerifyJWT } from "../middlewares/auth.middlewares.js";
import { upload } from "../middlewares/multer.middlewares.js";

const router = Router()

router.route("/send-message/:id").post(VerifyJWT,upload.single("image"),sendMessage)


export default router;