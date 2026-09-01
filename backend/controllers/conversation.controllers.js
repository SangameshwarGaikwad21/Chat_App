import conversationModel from "../models/conversation.model.js";
import { Message } from "../models/message.model.js";

const getConversations = async (req, res) => {
    try {
        const userId = req.user._id;

        const conversations = await conversationModel.find({
            participants: userId ,
        })
        .populate("participants", "username email avatar")
        .populate("lastMessage")
        .sort({ updatedAt: -1 });

        const formatted = conversations.map((conversation) => {
            const otherUser = conversation.participants.find(
                (user) => user._id.toString() !== userId.toString()
        );

        return {
            _id: conversation._id,
            user: otherUser,
            lastMessage: conversation.lastMessage,
            updatedAt: conversation.updatedAt,
        };
    });

    res.status(200).json({
      success: true,
      conversations: formatted,
    });

    } 
    catch (error) {
        return res
        .status(500)
        .json({ 
            error: error.message,
            message: "Internal Server Error" 
        });    
    }
}

const getConversationById = async (req, res) => {
    try {
        const conversation = await conversationModel.findOne({
            _id: req.params.conversationId,
            participants: req.user._id,
        })
        .populate("participants", "username email avatar bio isOnline lastSeen")
        .populate("lastMessage");

        if (!conversation) {
            return res.status(404).json({ success: false, message: "Conversation not found" });
        }

        return res.status(200).json({ success: true, conversation });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

const deleteConversation = async (req, res) => {
    try {
        const conversation = await conversationModel.findOne({
            _id: req.params.conversationId,
            participants: req.user._id,
        });

        if (!conversation) {
            return res.status(404).json({ success: false, message: "Conversation not found" });
        }

        await Message.deleteMany({ conversation: conversation._id });
        await conversation.deleteOne();

        return res.status(200).json({ success: true, message: "Conversation deleted" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export {
    getConversations,
    getConversationById,
    deleteConversation 
}
