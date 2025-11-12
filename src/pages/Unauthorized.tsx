import React from "react";
import { Box, Typography } from "@mui/material";
import CustomButton from "../components/UI/Button";
import { useNavigate } from "react-router-dom";
import { PRIVATE_ROUTE, PUBLIC_ROUTE, USER_ROLE } from "../enums";
import { useTranslation } from "react-i18next";
import { useLocalStorage } from "../hooks/useLocalStorage";

const UnauthorizedPage = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const { getLocalStorage } = useLocalStorage();
  const user = getLocalStorage("user");

  return (
    <Box
      sx={{
        textAlign: "center",
        minHeight: "65vh",
      }}
    >
      <img
        src="../../public/assets/unauthorized.jpg"
        style={{ width: "400px", height: "auto" }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Typography sx={{ fontWeight: 500, color: "grey" }}>
          {t("unauthorized")}
        </Typography>
        <CustomButton
          btnText={t("goToHome")}
          style={{
            width: "max-content",
            borderRadius: "20px",
            padding: "8px 12px",
          }}
          onClick={() =>
            navigate(
              user?.role === USER_ROLE.USER
                ? PUBLIC_ROUTE.HOME
                : user?.role === USER_ROLE.ADMIN
                ? PRIVATE_ROUTE.DASHBOARD
                : user?.role === USER_ROLE.OWNER
                ? PRIVATE_ROUTE.OWNER_DASHBOARD
                : PRIVATE_ROUTE.RIDERS_DASHBOARD
            )
          }
        />
      </Box>
    </Box>
  );
};

export default UnauthorizedPage;
