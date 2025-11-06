import axios, { type AxiosResponse } from "axios";
import { PUBLIC_ROUTE } from "../enums";
import toast from "react-hot-toast";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (!config.url?.includes("auth/roles")) {
      const localToken = JSON.parse(localStorage.getItem("token") || "null");
      const urlParams = new URLSearchParams(window.location.search);
      const sharedToken = urlParams.get("token");
      const token = sharedToken || localToken;

      if (token && config.headers) {
        config.headers["token"] = token;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: any) => {
    if (error.code === "ERR_NETWORK") {
      toast.error("Something wrong happened!");
      return;
    }
    if (error.response?.data?.message === "jwt expired") {
      localStorage.clear();
      window.location.href = PUBLIC_ROUTE.SIGNIN;
      return;
    }
    const originalRequest: any = error.config;

    if (!originalRequest._retry) {
      originalRequest._retry = true;

      try {
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        localStorage.clear();
        window.location.href = PUBLIC_ROUTE.HOME;
        return Promise.reject(refreshError);
      }
    }
  }
);

export default axiosInstance;
