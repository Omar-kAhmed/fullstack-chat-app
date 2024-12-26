import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "https://fullstack-chat-app-backend-v42m.onrender.com" : "/api",
  withCredentials: true,
});
