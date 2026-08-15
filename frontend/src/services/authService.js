import axiosInstance from "./axios"

export const registerUserAPI = async(data)=>{
    const res = await axiosInstance.post("/user/register",data)
    return res.data
}

export const loginUserAPI = async(data)=>{
    const res = await axiosInstance.post("/user/login",data)
    console.log(res.data)
    return res.data
}

export const logoutAPI = async () => {
  const res = await axiosInstance.post("/user/logout",{},{
      withCredentials: true,
    }
  );
  return res.data;
};


export const userProfileAPI = async () => {
    try {
        
        const res = await axiosInstance.get("/user/me", {
            withCredentials: true,
        });        
        return res.data;
    } catch (error) {
        console.log("Profile Error:", error.response);
        throw error;
    }
};


export const updateUserProfileAPI = async()=>{
    try {
        const res = await axiosInstance.post("/user/update-profile",)
        console.log("Profile Update:-",res.data)
        return res.data
    } 
    catch (error) {
        console.log("update profile error",error.message)
        throw error;    
    }
}