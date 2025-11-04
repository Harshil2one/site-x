import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import Input from "../../components/UI/Input";
import CustomButton from "../../components/UI/Button";
import { INPUT_SIZE, INPUT_TYPE, PUBLIC_ROUTE } from "../../enums";
import { Eye, EyeOff } from "lucide-react";
import useFetch from "../../hooks/useFetch";
import toast from "react-hot-toast";
import axiosInstance from "../../utils/axiosInstance";
import type { IRole } from "../../types/users";

const RegisterPage = () => {
  const { loading, response, error, setError, makeAPICall } = useFetch();
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [roles, setRoles] = useState<IRole[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: 2,
    password: "",
    confirmPassword: "",
  });

  const getAllRoles = async () => {
    const roles = await axiosInstance.get("/auth/roles");
    setRoles(roles.data?.data);
  };

  const handleChange = (key: string, value: string | number) => {
    setError("");
    setFormData({ ...formData, [key]: value });
  };

  const handleRegister = () => {
    if (formData.password === formData.confirmPassword) {
      makeAPICall("auth/signup", {
        method: "POST",
        data: {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        },
      });
    } else {
      setError("Password should be matched.");
    }
  };

  if (error) {
    toast.error(error);
  }

  if (response) {
    toast.success(response.message);
    navigate(PUBLIC_ROUTE.SIGNIN);
  }

  useEffect(() => {
    getAllRoles();
  }, []);

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
          Welcome to Bigbite!
        </Typography>

        <Box>
          <InputLabel htmlFor="name" sx={{ fontSize: 14, mb: 0.5 }}>
            Name
          </InputLabel>
          <Input
            size={INPUT_SIZE.SMALL}
            placeholder="e.g. User Name"
            style={{ width: "100%" }}
            onDebounce={(name) => handleChange("name", name)}
            bounceTime={0}
            isFocused
            isReset
            value={formData.name}
            testId="name-input"
          />
        </Box>

        <Box>
          <InputLabel htmlFor="email" sx={{ fontSize: 14, mb: 0.5 }}>
            Email Address
          </InputLabel>
          <Input
            size={INPUT_SIZE.SMALL}
            placeholder="e.g. username@domain.com"
            type={INPUT_TYPE.EMAIL}
            style={{ width: "100%" }}
            onDebounce={(email) => handleChange("email", email)}
            bounceTime={0}
            isReset
            value={formData.email}
            testId="email-input"
          />
        </Box>

        <Box>
          <InputLabel htmlFor="role" sx={{ fontSize: 14, mb: 0.5 }}>
            Select Role
          </InputLabel>
          <Select
            value={formData.role}
            onChange={(event) => handleChange("role", event.target.value)}
            displayEmpty
            sx={{
              height: "40px",
              width: "100%",
              fontSize: "0.8rem !important",
            }}
          >
            {roles?.map((option: IRole) => {
              return (
                <MenuItem
                  key={option.id}
                  sx={{
                    fontWeight: formData.role === option.id ? 600 : 500,
                  }}
                  value={option.id}
                >
                  {option.role}
                </MenuItem>
              );
            })}
          </Select>
        </Box>

        <Box>
          <InputLabel htmlFor="password" sx={{ fontSize: 14, mb: 0.5 }}>
            Password
          </InputLabel>
          <Input
            type={INPUT_TYPE.PASSWORD}
            placeholder="enter your password"
            size={INPUT_SIZE.SMALL}
            style={{ width: "100%" }}
            onDebounce={(password) => handleChange("password", password)}
            bounceTime={0}
            isReset
            value={formData.password}
            testId="password-input"
          />
        </Box>

        <Box>
          <InputLabel htmlFor="confirm-password" sx={{ fontSize: 14, mb: 0.5 }}>
            Confirm Password
          </InputLabel>
          <Input
            type={passwordVisible ? INPUT_TYPE.TEXT : INPUT_TYPE.PASSWORD}
            placeholder="enter your confirm password"
            size={INPUT_SIZE.SMALL}
            style={{ width: "100%" }}
            endAdornment={
              passwordVisible ? <Eye size={20} /> : <EyeOff size={20} />
            }
            onEndClick={() => setPasswordVisible(!passwordVisible)}
            onDebounce={(confirmPassword) =>
              handleChange("confirmPassword", confirmPassword)
            }
            bounceTime={0}
            isReset
            value={formData.confirmPassword}
            testId="confirm-password-input"
          />
        </Box>

        <CustomButton
          btnText="REGISTER"
          onClick={handleRegister}
          style={{ padding: "10px 0" }}
          loading={loading}
          testId="register-button"
        />

        <Typography textAlign="center" sx={{ fontSize: 14 }}>
          Already have an account?{" "}
          <Link
            to={PUBLIC_ROUTE.SIGNIN}
            style={{
              color: "#d54545",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Log in
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default RegisterPage;
