import { create } from "zustand";

import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import {io} from 'socket.io-client';

const Base_Url = import.meta.env.MODE ==="development" ? "http://localhost:3000" : "/api";

export const useAuthStore = create((set , get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers : [],
  socket : null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check", {
        params: { timestamp: new Date().getTime() },
      });
      if (!res.data || !res.data.user) {
        throw new Error("Invalid user data received");
      }
      set({ authUser: res.data.user }); // ✅ Update user state
      get().connectSocket();
    } catch (error) {
      console.error("Error in checkAuth in useAuthStore:", error.message);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("ACCOUNT CREATED SUCCESSFULLY");
      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },
  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in Successfully");
      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("logged out successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile Updated  Successfully");
      get().disconnectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
  connectSocket : ()=>{
    const { authUser} = get();
    if(!authUser || get().socket?.connected) return;
    const socket = io(Base_Url,{
      query: {
        userId: authUser._id,
        },
    })
    socket.connect();

    set({socket : socket});
    socket.on("getOnlineUser",(userIds)=>{
      set({onlineUsers : userIds});
    })
  },
  disconnectSocket : ()=>{
    if(get().socket?.connected) get().socket.disconnect(); 
  }
}));
