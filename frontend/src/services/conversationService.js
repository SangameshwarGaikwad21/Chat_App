import axiosInstance from "./axios"

export const getConversationsAPI = async () => {
    const res = await axiosInstance.get("/conversation")
    return res.data.conversations;
}