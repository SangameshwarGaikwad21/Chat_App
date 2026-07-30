import axiosInstance from "./axios"

export const registerUser = async(data)=>{
    const res = await axiosInstance.post("/user/register",data)
    return res.data
}


