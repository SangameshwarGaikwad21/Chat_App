import { uploadOnCloudinary } from "../utils/cloudinary.js";
import {User} from "../models/user.model.js"

const RegisterUser = async (req, res) => {
    try {

        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const userExisted = await User.findOne({
            $or: [{ username }, { email }]
        });

        if (userExisted) {
            return res.status(409).json({
                message: "User already exists"
            });
        }

        const avatarLocalPath = req.files?.avatar?.[0]?.path;

        if (!avatarLocalPath) {
            return res.status(400).json({
                message: "Avatar is required"
            });
        }

        const avatar = await uploadOnCloudinary(avatarLocalPath);

        if (!avatar || !avatar.url) {
            return res.status(500).json({
                message: "File upload failed"
            });
        }

        const userSaved = await User.create({
            username,
            email,
            password,
            avatar: avatar.url
        });

        const createdUser = await User.findById(userSaved._id).select(
            "-password -refreshToken"
        );

        return res.status(201).json({
            user: createdUser,
            message: "User Registered Successfully"
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

export{
    RegisterUser
}