import { create } from "zustand";

import { axiosInstance } from "../lib/axios";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth : true, 

  checkAuth : async ()=>{
    try {
      const res = await axiosInstance.get("/auth/check");
      set({authUser : res.data.user })
    } catch (error) {
      console.log("error in checkAuth in useAuthStore", error);
      set({authUser : null });
    }finally{
      set({isCheckingAuth : false});
    }

  },

  signup : async (data) =>{
    try {
      
    } catch (error) {
      
    }
  }

}));