import conversationModel from "../models/conversation.model.js";

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

}

const deleteConversation = async (req, res) => {}

export {
    getConversations,
    getConversationById,
    deleteConversation 
}
