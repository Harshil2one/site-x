import React, { createContext, useState, type ReactNode } from "react";
import Loader from "../components/UI/Loader";

const LoadingContext = createContext<{
  loading: boolean;
  setLoading: (value: boolean) => void;
}>({
  loading: false,
  setLoading: () => {},
});

interface LoaderProps {
  children: ReactNode;
}

export const LoaderProvider = ({ children }: LoaderProps) => {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
      {loading && <Loader fullScreen loading={loading} />}
    </LoadingContext.Provider>
  );
};

export default LoadingContext;
