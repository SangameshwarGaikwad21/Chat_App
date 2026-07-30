import axiosInstance from "./axios"

export const registerUser = async(data)=>{
    const res = await axiosInstance.post("/user/register",data)
    return res.data
}

export const loginUser = async(data)=>{
    const res = await axiosInstance.post("/user/login",data)
    return res.data
}

export const logout = async(data)=>{
    const res = await axiosInstance.post("/user/logout",data)
    return res.data
}

export const userProfile = async(data)=>{
    const res = await axiosInstance.get("/user/me",data)
    return res.data
}