import toast from "react-hot-toast";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMessagesAPI,sendMessageAPI,deleteMessageAPI,updatedMessageAPI} from "../../services/message.service";

export const getMessages = createAsyncThunk(
  "message/getMessages",
  async (receiverId, thunkAPI) => {

    try {
      const response = await getMessagesAPI(receiverId);
      return response.messages;
    } 
    catch (error) {
      console.log("GET Error:", error);
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

export const deleteMessage = createAsyncThunk(
  "message/deleteMessage",
  async (messageId, thunkAPI) => {
    try {
      console.log("Calling delete API:", messageId);

      const response = await deleteMessageAPI(messageId);

      return response.deletedMessageId;

    } catch (error) {
      console.log(
        "Delete API error:",
        error.response?.data || error.message
      );

      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
        "Deleting message failed"
      );
    }
  }
);


export const updateMessage = createAsyncThunk(
  "message/updateMessage",
  async ({ messageId, message }, thunkAPI) => {
    try {
      const response = await updatedMessageAPI(
        messageId,
        message
      );

      toast.success("Message updated successfully");

      return response.data;

    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
        "Updating message failed"
      );
    }
  }
);

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
    addMessage: (state, action) => {
        state.messages.push(action.payload);
    },
  },

  extraReducers: (builder) => {
    // getMessage
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
    // sendMessage
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
    
    // deleteMessage
    builder
      .addCase(deleteMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(deleteMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        state.messages = state.messages.filter(
          (message) => message._id !== action.payload
        );
      })
      .addCase(deleteMessage.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });

    //UpdateMessage
   builder
      .addCase(updateMessage.pending, (state) => {
        state.loading = true;
        state.success = false;
      })

      .addCase(updateMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        const updatedMessage = action.payload;

        const index = state.messages.findIndex(
          (message) =>
            message._id === updatedMessage._id
        );

        if (index !== -1) {
          state.messages[index] = updatedMessage;
        }
      })

      .addCase(updateMessage.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });      
  },
});

export const { resetState } = messageSlice.actions;

export default messageSlice.reducer;
export const { addMessage } = messageSlice.actions;