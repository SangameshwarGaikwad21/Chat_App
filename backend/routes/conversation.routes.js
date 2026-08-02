import { Router } from "express";
import { deleteConversation, getConversationById, getConversations } from "../controllers/conversation.controllers.js";
import { VerifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();

router.get("/", VerifyJWT, getConversations);          
router.get("/:conversationId", VerifyJWT, getConversationById);
router.delete("/:conversationId", VerifyJWT, deleteConversation);

export default router;