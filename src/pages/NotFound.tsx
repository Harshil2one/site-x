import React from "react";
import { Box, Typography } from "@mui/material";
import CustomButton from "../components/UI/Button";
import { useNavigate } from "react-router-dom";
import { PUBLIC_ROUTE } from "../enums";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
        alignItems: "center",
        justifyContent: "center",
        minHeight: "65vh",
      }}
    >
      <Typography variant="h4" data-testid="header-title">
        404 | Page Not Found
      </Typography>
      <CustomButton
        btnText="Go To Home"
        testId="go-home-button"
        onClick={() => navigate(PUBLIC_ROUTE.HOME)}
      />
    </Box>
  );
};

export default NotFoundPage;
