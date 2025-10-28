import { Fragment } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Toaster } from "react-hot-toast";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { LoaderProvider } from "./context/LoadingContext.tsx";

createRoot(document.getElementById("root")!).render(
  <Fragment>
    <Toaster />
    <LoaderProvider>
      <App />
    </LoaderProvider>
  </Fragment>
);
