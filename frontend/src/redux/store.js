import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/auth/auth.slice.js"
import conversationSlice from "./auth/conversation.slice.js";
import messageSlice from "./auth/message.slice.js";


export const store = configureStore({
   reducer: {
    auth: authReducer,
    conversation: conversationSlice,
    message:messageSlice
  }
})