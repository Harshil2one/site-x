import axios, { type AxiosRequestConfig } from "axios";
import { useContext, useState } from "react";
import LoadingContext from "../context/LoadingContext";
import { PUBLIC_ROUTE } from "../enums";

interface FetchConfig<T = unknown> extends AxiosRequestConfig {
  type?: "formdata" | "json";
  data?: T;
}

const useFetch = () => {
  const [response, setResponse] = useState<any>(null);
  const { loading, setLoading } = useContext(LoadingContext);
  const [error, setError] = useState("");
  const token = JSON.parse(localStorage.getItem("token") || "{}");

  const makeAPICall = async (url: string, config: FetchConfig = {}) => {
    try {
      setLoading(true);
      setError("");
      const response = await axios({
        url: `${import.meta.env.VITE_API_URL}/${url}`,
        method: config.method || "GET",
        headers: {
          "Content-Type": "application/json",
          token,
          ...config.headers,
        },
        data:
          config.type === "formdata"
            ? config.data
              ? config.data
              : undefined
            : config.data
            ? JSON.stringify(config.data)
            : undefined,
      });
      setResponse(response.data);
      setError("");
      setLoading(false);
      return response.data;
    } catch (err: any) {
      setError(err.response.data.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (error === "jwt expired") {
    localStorage.clear();
    window.location.href = PUBLIC_ROUTE.SIGNIN;
  }

  return { response, loading, error, makeAPICall, setError };
};

export default useFetch;
