import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, InputLabel, Typography } from "@mui/material";
import Input from "../../components/UI/Input";
import CustomButton from "../../components/UI/Button";
import {
  INPUT_SIZE,
  INPUT_TYPE,
  PRIVATE_ROUTE,
  PUBLIC_ROUTE,
  USER_ROLE,
} from "../../enums";
import { Eye, EyeOff } from "lucide-react";
import useFetch from "../../hooks/useFetch";
import toast from "react-hot-toast";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cart";
import { switchRoles } from "../../redux/slices/role";

const LoginPage = () => {
  const { loading, response, error, setError, makeAPICall } = useFetch();
  const { setLocalStorage } = useLocalStorage();

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (key: string, value: string) => {
    setError("");
    setFormData({ ...formData, [key]: value });
  };

  const handleSignIn = () => {
    makeAPICall("auth/signin", {
      method: "POST",
      data: {
        email: formData.email,
        password: formData.password,
      },
    });
    dispatch(switchRoles(USER_ROLE.USER));
  };

  if (error) {
    toast.error(error);
  }

  if (response) {
    toast.success(response.message);
    setLocalStorage("user", response.data.user);
    setLocalStorage("token", response?.data.token);
    dispatch(addToCart(response?.data?.cart));
    dispatch(switchRoles(response.data.user?.role));
    if (response.data.user?.role === 1 || response.data.user?.role === 2) {
      navigate(PUBLIC_ROUTE.HOME);
    } else if (response.data.user?.role === 3) {
      navigate(PRIVATE_ROUTE.RIDERS);
    } else if (response.data.user?.role === 4) {
      navigate(PRIVATE_ROUTE.RESTAURANT);
    }
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to bottom, #FFFFFF 10%, #d54545 200%)",
        px: 2,
      }}
    >
      <Box
        sx={{
          width: { xs: "90%", sm: "60%", md: "40%" },
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Typography
          variant="h4"
          fontWeight={700}
          textAlign="center"
          gutterBottom
          data-testid="header-title"
        >
          Welcome back!
        </Typography>

        <Box>
          <InputLabel htmlFor="email" sx={{ fontSize: 14, mb: 0.5 }}>
            Email or Username
          </InputLabel>
          <Input
            size={INPUT_SIZE.SMALL}
            placeholder="enter your username or email"
            style={{ width: "100%" }}
            testId="email-input"
            isFocused
            isReset
            value={formData.email}
            bounceTime={0}
            onDebounce={(email) => handleChange("email", email)}
          />
        </Box>

        <Box>
          <InputLabel htmlFor="password" sx={{ fontSize: 14, mb: 0.5 }}>
            Password
          </InputLabel>
          <Input
            type={passwordVisible ? INPUT_TYPE.TEXT : INPUT_TYPE.PASSWORD}
            placeholder="enter your password"
            testId="password-input"
            size={INPUT_SIZE.SMALL}
            style={{ width: "100%" }}
            endAdornment={
              passwordVisible ? <Eye size={20} /> : <EyeOff size={20} />
            }
            isReset
            value={formData.password}
            bounceTime={0}
            onEndClick={() => setPasswordVisible(!passwordVisible)}
            onDebounce={(password) => handleChange("password", password)}
          />
          <Typography textAlign="right" sx={{ fontSize: 14, mt: 0.5 }}>
            <Link
              to={PUBLIC_ROUTE.FORGOT_PASSWORD}
              style={{ textDecoration: "none", color: "black" }}
            >
              Forgot Password?
            </Link>
          </Typography>
        </Box>

        <CustomButton
          btnText="LOG IN"
          onClick={handleSignIn}
          style={{ padding: "10px 0" }}
          loading={loading}
          testId="login-button"
        />

        <Typography textAlign="center" sx={{ fontSize: 14 }}>
          New to Bigbite?{" "}
          <Link
            to={PUBLIC_ROUTE.SIGNUP}
            style={{
              color: "#d54545",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Register
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginPage;
