import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getConversationsAPI } from "../../services/conversationService";
import toast from "react-hot-toast";

export const getConversations = createAsyncThunk(
  "conversation/getConversations",
  async (_, thunkAPI) => {
    try {
      const response = await getConversationsAPI();
      toast.success("Conversations fetched successfully");

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Fetching Conversations Failed"
      );
    }
  }
);

const initialState = {
  conversations: [],
  loading: false,
  error: null,
  success: false,
  selectedConversation: null,
};

const conversationSlice = createSlice({
  name: "conversation",

  initialState,

  reducers: {
    resetState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
    setSelectedConversation: (state, action) => {
    state.selectedConversation = action.payload;
  },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getConversations.pending, (state) => {
        state.loading = true;
        state.success = false;
      })

      .addCase(getConversations.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.conversations = action.payload;
      })

      .addCase(getConversations.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export const { resetState,setSelectedConversation } = conversationSlice.actions;

export default conversationSlice.reducer;