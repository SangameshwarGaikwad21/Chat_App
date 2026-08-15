import JWT from "jsonwebtoken"
import {User} from "../models/user.model.js"

export const VerifyJWT = async (req, res, next) => {
    try {
        const token =
            req.cookies?.accessToken ||
            req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized Request",
            });
        }

        console.log("COOKIE:", req.cookies);
            console.log("AUTH HEADER:", req.header("Authorization"));
            console.log("TOKEN:", token);

        const decoded = JWT.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET
        );
        const user = await User.findById(decoded._id)
            .select("-password -refreshToken");

        req.user = user;
        next();
    } catch (err) {

        console.log(err);

        return res.status(401).json({
            success: false,
            message: err.message,
        });

    }
};