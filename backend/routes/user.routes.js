import {Router} from "express"
import { loginUser, logoutUser, RegisterUser, userProfile } from "../controllers/user.controllers.js"
import { upload } from "../middlewares/multer.middlewares.js"
import { VerifyJWT } from "../middlewares/auth.middlewares.js"

const router = Router()

router.route("/register").post(upload.fields([
    {
        name:"avatar",
        maxCount:1
    }
]), RegisterUser)
router.route("/login").post(loginUser)
router.route("/logout").post(VerifyJWT,logoutUser)
router.route("/me").get(VerifyJWT,userProfile)
export default router