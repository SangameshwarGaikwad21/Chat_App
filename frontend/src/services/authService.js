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
  const res = await axiosInstance.post("/user/logout",{},{
      withCredentials: true,
    }
  );
  return res.data;
};


export const userProfileAPI = async () => {
    const res = await axiosInstance.get("/user/me", {
        withCredentials: true,
    });
    return res.data;
};


export const updateUserProfileAPI = async (data) => {
    try {
        const res = await axiosInstance.post(
            "/user/update-profile",
            data
        );

        console.log("Profile Update:", res.data);

        return res.data;
    } catch (error) {
        console.log(
            "Update profile error:",
            error.response?.data || error.message
        );

        throw error;
    }
};

export const getUsersAPI = async () => {
    const res = await axiosInstance.get("/user");
    return res.data.users;
};
