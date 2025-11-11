import { Box, Container } from "@mui/material";
import { BrowserRouter, useLocation } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import AllRoutes from "./route";
import { PUBLIC_ROUTE, USER_ROLE } from "./enums";
import { useEffect } from "react";
import { store, type RootState } from "./redux/store";
import AIBot from "./components/common/AIBot";
import { SocketProvider } from "./context/SocketContext";

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
  const role = useSelector((state: RootState) => state.user.role);

  const hideLayout = [
    PUBLIC_ROUTE.SIGNIN,
    PUBLIC_ROUTE.SIGNUP,
    PUBLIC_ROUTE.FORGOT_PASSWORD,
  ];
  const isHidden = hideLayout.includes(location.pathname as PUBLIC_ROUTE);

  const isAdmin = role === USER_ROLE.ADMIN;

  return (
    <>
      <Header hideNav={isHidden} />
      <Container>
        <Box sx={{ my: isHidden ? 0 : 10, mx: 3 }}>
          <AllRoutes />
        </Box>
      </Container>
      <AIBot />
      {!isHidden && !isAdmin && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <SocketProvider
          url={import.meta.env.REACT_APP_SOCKET_URL || "http://localhost:8000"}
        >
          <ScrollToTop />
          <Layout />
        </SocketProvider>
      </Provider>
    </BrowserRouter>
  );
}
