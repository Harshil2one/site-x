import axios, { type AxiosResponse } from "axios";
import { PUBLIC_ROUTE } from "../enums";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (!config.url?.includes("auth/roles")) {
      const token = JSON.parse(localStorage.getItem("token") || "");
      if (!config.url?.includes("roles") && token && config.headers) {
        config.headers = config.headers || {};
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
