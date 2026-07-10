import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"
import JWT from "jsonwebtoken"

const userSchema= new Schema(
    {
        username:{
            type:String,
            required:[true,"Fullname is required"]
        },
        email:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:[true,"Password is required"]
        },
        refreshToken:{
            type:String
        },
        avatar:{
            type:String,
            required:true
        },
        role: {
            type: String,
            enum: ["user","admin"],
            default: "user"
        }
    },
    {
        timestamps:true
    }
)

userSchema.pre("save",async function(){
    if(!this.isModified("password")) return ;

    this.password = await bcrypt.hash(this.password,10)
})

userSchema.methods.PasswordIsCorrect = async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken = function(){
    return JWT.sign(
        {
            _id:this._id,
            email:this.email,
            username:this.username
        },
         process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function(){
    return JWT.sign(
        {
            _id:this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User =mongoose.model("User",userSchema)