import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/auth/auth.slice.js"

export const store = configureStore({
    auth:authReducer
})