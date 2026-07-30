import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { registerUser } from "../../services/authService";

export const registerUser = createAsyncThunk("/user/register",async(userData,thunkAPI)=>{
    try {
        const response = await registerUser(userData)
        return response
        console.log("User register",response)
    } 
    catch (error) {
        return thunkAPI.rejectWithValue(
            error.response?.data?.message || "Registration Failed"
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
        .addCase(registerUser.pending,(state)=>{
            state.loading = false,
            state.error = null
        })
        .addCase(registerUser.fulfilled,(state,action)=>{
            state.loading = false,
            state.success = true,
            state.user = action.payload.user
        })
        .addCase(registerUser.rejected,(state,action)=>{
            state.loading = false,
            state.error = action.payload
        })
    }
})

export const {resetState} = authSlice.actions;

export default authSlice.reducer;