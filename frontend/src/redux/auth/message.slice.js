import toast from "react-hot-toast";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMessagesAPI, sendMessageAPI } from "../../services/message.service";

export const getMessages = createAsyncThunk(
  "message/getMessages",
  async (receiverId, thunkAPI) => {
    try {
      const response = await getMessagesAPI(receiverId);

      toast.success("Messages fetched successfully");

      return response.messages;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Fetching Messages Failed"
      );
    }
  }
);

export const sendMessage = createAsyncThunk(
  "message/sendMessage",
  async ({ receiverId, text }, thunkAPI) => {
    try {
      const response = await sendMessageAPI(receiverId, text);
      toast.success("Message sent successfully");
      return response.message;
    } 
    catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Sending Message Failed"
      );
    }
  }
)

const initialState = {
  messages: [],
  loading: false,
  error: null,
  success: false,
};

const messageSlice = createSlice({
  name: "message",
  initialState,

  reducers: {
    resetState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getMessages.pending, (state) => {
        state.loading = true;
        state.success = false;
      })

      .addCase(getMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.messages = action.payload;
      })

      .addCase(getMessages.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });

    builder 
      .addCase(sendMessage.pending,(state)=>{
        state.loading = true;
        state.success = false;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.messages.push(action.payload);
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })
  },
});

export const { resetState } = messageSlice.actions;

export default messageSlice.reducer;