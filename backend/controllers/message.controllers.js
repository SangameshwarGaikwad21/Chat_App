import Conversation from "../models/conversation.model.js";
import { Message } from "../models/message.model.js";
import { io, getReceiverSocketId } from "../utils/socket.js";

const sendMessage = async (req, res) => {
  try {
    const sender = req.user._id;
    const receiver = req.params.receiverId;

    const { text } = req.body;

    // Image will come from Multer
    const image = req.file;

    // User must send text or image
    if (!text?.trim() && !image) {
      return res.status(400).json({
        success: false,
        message: "Text or image is required",
      });
    }

    let conversation = await Conversation.findOne({
      participants: {
        $all: [sender, receiver],
      },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [sender, receiver],
        messages: [],
      });
    }

    let imageUrl = null;

    // Upload image if user selected one
    if (image) {
      // Upload to Cloudinary
      // imageUrl = result.secure_url;
    }

    // Save message
    const newMessage = await Message.create({
      conversation: conversation._id,
      sender,
      receiver,
      text: text || "",
      image: imageUrl,
    });

    conversation.lastMessage = newMessage._id;

    await conversation.save();

    // Get receiver socket
    const receiverSocketId = getReceiverSocketId(
      receiver.toString()
    );

    // Send real-time message
    if (receiverSocketId) {
      io.to(receiverSocketId).emit(
        "newMessage",
        newMessage
      );
    }

    return res.status(201).json({
      success: true,
      message: newMessage,
    });

  } catch (error) {
    console.error("SEND MESSAGE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getMessage = async (req, res) => {
  try {
    const sender = req.user._id;
    const receiver = req.params.receiverId;

    const conversation = await Conversation.findOne({
    participants: {
        $all: [sender, receiver],
    },
    });


    if (!conversation) {
      return res.status(200).json({
        success: true,
        messages: [],
      });
    }

    const messages = await Message.find({
      conversation: conversation._id,
    }).sort({ createdAt: 1 });

    return res.status(200).json({
      success: true,
      messages,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteMessage = async (req, res) => {
  try {
    const userId = req.user._id;
    const { messageId } = req.params;

    console.log("========== DELETE DEBUG ==========");
    console.log("Message ID from frontend:", messageId);
    console.log("Logged in user:", userId);

    const message = await Message.findById(messageId);

    console.log("Message found:", message);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    if (message.sender.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this message",
      });
    }

    await Message.findByIdAndDelete(messageId);

    return res.status(200).json({
      success: true,
      message: "Message Deleted Successfully",
      deletedMessageId: messageId,
    });

  } catch (error) {
    console.log("Delete error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete the message",
    });
  }
};

const editMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    const { message } = req.body;

    const userId = req.user._id;

    if (!message || message.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Message cannot be empty",
      });
    }

    const existingMessage = await Message.findById(messageId);

    if (!existingMessage) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    // Only sender can edit the message
    if (existingMessage.sender.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "You can only edit your own message",
      });
    }

    existingMessage.text = message.trim();
    existingMessage.isEdited = true;
    existingMessage.editedAt = new Date();

    await existingMessage.save();

    return res.status(200).json({
      success: true,
      message: "Message updated successfully",
      data: existingMessage,
    });
  } catch (error) {
    console.log("Edit message error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export {
    sendMessage,
    getMessage,
    deleteMessage,
    editMessage
}