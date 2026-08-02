import axiosInstance from "./axios";

export const sendMessageAPI = async (receiverId, messageData) => {
    const response = await axiosInstance.post(
        `/api/messages/send-message/${receiverId}`,
        messageData
    );

    return response.data;
};

export const getMessagesAPI = async (receiverId) => {
    const response = await axiosInstance.get(
        `/message/${receiverId}`
    );

    return response.data;
};

export const deleteMessageAPI = async (messageId) => {
    const response = await axiosInstance.delete(
        `/api/messages/${messageId}`
    );

    return response.data;
};