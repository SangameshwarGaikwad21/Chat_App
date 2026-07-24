import mongoose,{Schema} from "mongoose"

const messageSchema = new Schema(
    {
        conversation: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Conversation",
            required: true,
        },
        sender:{
            type:mongoose.Types.ObjectId,
            ref:"User",
            required:true
        },
        receiver:{
            type:mongoose.Types.ObjectId,
            ref:"User",
            required:true
        },
        text:{
            type: String,
            trim: true,
        },
        image:{
            type: String,
            trim: true,
        },
       isSeen: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps:true
    }
)

export const Message = mongoose.model("Message",messageSchema)