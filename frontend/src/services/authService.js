import axiosInstance from "./axios"

export const registerUserAPI = async(data)=>{
    const res = await axiosInstance.post("/user/register",data)
    return res.data
}

export const loginUserAPI = async(data)=>{
    const res = await axiosInstance.post("/user/login",data)
    return res.data
}

export const logoutAPI = async () => {
  const res = await axiosInstance.post(
    "/user/logout",
    {},
    {
      withCredentials: true,
    }
  );

  return res.data;
};

export const userProfileAPI = async(data)=>{
    const res = await axiosInstance.get("/user/me")
    return res.data
}