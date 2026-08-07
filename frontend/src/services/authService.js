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
        console.log("Calling profile API");
        
        const res = await axiosInstance.get("/user/me", {
            withCredentials: true,
        });
        console.log("Profile Response:", res.data);
        
        return res.data;
    } catch (error) {
        console.log("Profile Error:", error.response);
        throw error;
    }
};
