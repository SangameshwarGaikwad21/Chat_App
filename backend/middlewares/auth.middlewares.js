import JWT from "jsonwebtoken"
import {User} from "../models/user.model.js"

export const VerifyJWT =async(req,res,next)=>{
    try {

        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

        if(!token){
            return res.status(401).json({
                message:"Unauthorized Request"
            })
        }

        const decodedToken =JWT.verify(token,process.env.ACCESS_TOKEN_SECRET)

        const user = await User.findById(decodedToken?._id)
        .select("-password -refreshToken");

        if (!user) {
            throw new ApiError(401, "Invalid Access Token");
        }

        req.user = user;
        next();
        
    } 
    catch (error) {
        return res
        .status(500)
        .json({
            message:"Failed while generate the VerifyJWT Token"
        })    
    }
}