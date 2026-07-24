import Conversation from "../models/conversation.model.js";
import { Message } from "../models/message.model.js";
import { io, getReceiverSocketId } from "../utils/socket.js";

const sendMessage = async (req, res) => {
    try {

        const sender = req.user._id;
        const receiver = req.params.id;

        const { text, image } = req.body;

        let conversation = await Conversation.findOne({
            participants: {
                $all: [sender, receiver]
            }
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [sender, receiver],
                messages: []
            });
        }

        const newMessage = await Message.create({
            conversation: conversation._id,
            sender,
            receiver,
            text,
            image
        });

        conversation.lastMessage = newMessage._id;

        await conversation.save();

        return res.status(201).json({
            success: true,
            message: newMessage
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

export {
    sendMessage
}