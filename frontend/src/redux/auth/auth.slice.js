import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { registerUserAPI,loginUserAPI } from "../../services/authService";
import toast from "react-hot-toast";

export const registerUser = createAsyncThunk("auth/register",async(userData,thunkAPI)=>{
    try {
        const response = await registerUserAPI(userData)
        console.log("User register:-",response)
        toast.success("User Registered Successfully ✅");
        return response
    } 
    catch (error) {
        return thunkAPI.rejectWithValue(
            error.response?.data?.message || "Registration Failed"
        )   
    }
})

export const loginUser = createAsyncThunk("auth/login",async(userData,thunkAPI)=>{
    try {
        const response = await loginUserAPI(userData)
        console.log("Login User:-",response)
        toast.success("User Login Done")
        return response
    } 
    catch (error) {
        return thunkAPI.rejectWithValue(
            error.response?.data?.message || "User Login Failed"
        )  
    }
})

const initialState={
    user: null,
    loading: false,
    error: null,
    success: false,
}   

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        resetState:(state)=>{
            state.loading = false,
            state.success=false,
            state.error = null
        }
    },
    extraReducers:(builder)=>{
        builder

        // registerUser
        .addCase(registerUser.pending,(state)=>{
            state.loading = true;
            state.success = false;
            state.error = null;
        })
        .addCase(registerUser.fulfilled,(state,action)=>{
            state.loading = false;
            state.success = true;
            state.user = action.payload.data.user;
        })
        .addCase(registerUser.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
            state.success = false;
        })

        // loginUser
        .addCase(loginUser.pending,(state)=>{
            state.loading =true,
            state.error= null
        })
        .addCase(loginUser.fulfilled,(state,action)=>{
            state.loading = false;
            state.success =true;
            state.user = action.payload.data.user;
        })
        .addCase(loginUser.rejected,(state,action)=>{
            state.loading =false,
            state.error = action.payload
        })

        // logoutUser
    }
})

export const {resetState} = authSlice.actions;

export default authSlice.reducer;