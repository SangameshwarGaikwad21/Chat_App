import { uploadOnCloudinary } from "../utils/cloudinary.js";
import {User} from "../models/user.model.js"

const generateAccessAndRefreshToken = async(userId)=>{
    try {
        const user = await User.findById(userId)

        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false });
        
        return { accessToken, refreshToken };

    } 
    catch (error) {
        return res
        .status(400)
        .json({
            message:"User failed while generating accesstoken and refreshtoken"
        })    
    }
}

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


const loginUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if ((!username && !email) || !password) {
      return res.status(400).json({
        success: false,
        message: "Username or Email and Password are required.",
      });
    }

    const user = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials.",
      });
    }

    const isPasswordValid = await user.PasswordIsCorrect(password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials.",
      });
    }

    const { accessToken, refreshToken } =
      await generateAccessAndRefreshToken(user._id);

    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

   
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite:
        process.env.NODE_ENV === "production" ? "none" : "lax",
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, cookieOptions)
      .cookie("refreshToken", refreshToken, cookieOptions)
      .json({
        success: true,
        message: "User logged in successfully.",
        user: loggedInUser,
        accessToken,
        refreshToken,
      });
  } catch (error) {
    console.error("Login Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};


export{
    RegisterUser,
    loginUser
}