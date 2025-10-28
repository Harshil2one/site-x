import { Box, Container } from "@mui/material";
import { BrowserRouter, useLocation } from "react-router-dom";
import { Provider } from "react-redux";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import AllRoutes from "./route";
import { PUBLIC_ROUTE } from "./enums";
import { useEffect } from "react";
import { store } from "./redux/store";
import AIBot from "./components/common/AIBot";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return null;
};

function Layout() {
  const location = useLocation();

  const hideLayout = [
    PUBLIC_ROUTE.SIGNIN,
    PUBLIC_ROUTE.SIGNUP,
    PUBLIC_ROUTE.FORGOT_PASSWORD,
  ];
  const isHidden = hideLayout.includes(location.pathname as PUBLIC_ROUTE);

  return (
    <Provider store={store}>
      <Header hideNav={isHidden} />
      <Container>
        <Box sx={{ my: isHidden ? 0 : 10, mx: 3 }}>
          <AllRoutes />
        </Box>
      </Container>
      <AIBot />
      {!isHidden && <Footer />}
    </Provider>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout />
    </BrowserRouter>
  );
}
