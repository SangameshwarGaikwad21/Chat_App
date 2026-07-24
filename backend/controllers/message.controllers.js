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

const getMessage =async(req,res) =>{
    try {
        const sender = req.user._id
        const receiver = req.params.id

        const conversation = await Conversation.findOne({
            participants:{
                $all: [sender, receiver]
            }
        })

        if(!conversation){
            return res
            .status(400)
            .json({
                success: true,
                messages: []
            })
        }

        const messages = await Message.find({
            conversation: conversation._id
        })
        .sort({ createdAt: 1 });

        return res
        .status(200)
        .json({
            success: true,
            message: "Messages fetched successfully",
            messages: messages
        });
    } 
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const deleteMessage =async(req,res)=>{
    try {

        const userId = req.user._id
        const{ messageId } = req.params
        
        const message = await Message.findById(messageId)

        if (!message) {
            return res.status(404).json({
                success: false,
                message: "Message not found",
            });
        }

        // Check if the logged-in user is the sender
        if (message.sender.toString() !== userId.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to delete this message",
            });
        }

        await Message.findByIdAndDelete(messageId)

        return res
        .status(200)
        .json({
            message:"Message Deleted Successfully",
            success:true
        })
    } catch (error) {

        console.log(error.message)

        return res
        .status(500)
        .json({
            message:"Failed to delete the message",
            success:false
        })
    }
}


export {
    sendMessage,
    getMessage,
    deleteMessage
}