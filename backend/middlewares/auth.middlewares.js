import JWT from "jsonwebtoken"
import {User} from "../models/user.model.js"

export const VerifyJWT = async (req, res, next) => {
    try {

        console.log("============== VERIFY JWT ==============");
        console.log("req.cookies :", req.cookies);
        console.log("req.headers.cookie :", req.headers.cookie);

        const token =
            req.cookies?.accessToken ||
            req.header("Authorization")?.replace("Bearer ", "");

        console.log("TOKEN =>", token);

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized Request",
            });
        }

        const decoded = JWT.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET
        );

        console.log("Decoded:", decoded);

        const user = await User.findById(decoded._id)
            .select("-password -refreshToken");

        console.log("User:", user);

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