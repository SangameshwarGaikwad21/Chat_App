import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { registerUserAPI,loginUserAPI, userProfileAPI } from "../../services/authService";

export const registerUser = createAsyncThunk("auth/register",async(userData,thunkAPI)=>{
    try {
        const response = await registerUserAPI(userData)
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
        return response
    } 
    catch (error) {
        return thunkAPI.rejectWithValue(
            error.response?.data?.message || "User Login Failed"
        )  
    }
})

export const getUserProfile = createAsyncThunk(
    "auth/me",
    async (_, thunkAPI) => {
        try {
            const response = await userProfileAPI();

            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Get Profile Failed"
            );
        }
    }
);


const initialState = {
    user: null,
    loading: false,
    error: null,
    success: false,
    isAuthenticated: false,
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
            state.user = action.payload.user;
        })
        .addCase(registerUser.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
            state.success = false;
        })

        // loginUser
        .addCase(loginUser.pending,(state)=>{
            state.loading = true;
            state.success = false;
            state.error = null;
        })
       .addCase(loginUser.fulfilled, (state, action) => {
            console.log("🔥 Reducer Fired");
            console.log(action.payload);

            state.loading = false;
            state.success = true;
            state.error = null;
            state.user = action.payload.user;
            state.isAuthenticated = true;

            console.log("Redux User:", state.user);
        })
        .addCase(loginUser.rejected,(state,action)=>{
            state.loading = false;
            state.success = false;
            state.error = action.payload;
        })

        // getUserProfile
        .addCase(getUserProfile.pending, (state) => {
            state.loading = true;
        })
        .addCase(getUserProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.isAuthenticated = true;
            state.error = null;
        })
        .addCase(getUserProfile.rejected, (state, action) => {
            state.loading = false;
            state.user = null;
            state.isAuthenticated = false;
            state.error = action.payload;
        })
    }
}) 

export const {resetState} = authSlice.actions;

export default authSlice.reducer;
