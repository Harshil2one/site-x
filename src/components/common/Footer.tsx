import React from "react";
import { Box, Grid, Typography, Link, Stack } from "@mui/material";
import { Linkedin, Facebook, Twitter, Instagram } from "lucide-react";
import { PUBLIC_ROUTE } from "../../enums";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        position: "relative",
        bgcolor: "#f5f5f7",
        py: 6,
        px: 3,
        background:
          "url(https://downtownmidland.com/wp-content/uploads/2020/07/Food_Header2-1920x488.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          bgcolor: "rgba(255, 255, 255, 0.3)",
          zIndex: 1,
        },
        "& > *": {
          position: "relative",
          zIndex: 2,
        },
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{ mb: 6 }}
      >
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          {t("footerHeader")}
        </Typography>
      </Stack>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 3 }}>
          <Stack spacing={2}>
            <Typography
              variant="h5"
              color="#d54545"
              fontWeight={700}
              display="flex"
              alignItems="center"
              justifyContent="start"
              lineHeight={1}
            >
              <Box
                sx={{
                  backgroundColor: "#d54545",
                  px: 1.5,
                  py: 1,
                  borderRadius: "4px",
                  color: "white",
                  fontFamily: "auto",
                }}
              >
                B
              </Box>
              igBite
            </Typography>
            <Typography variant="body2">{t("tagLine")}</Typography>
          </Stack>
        </Grid>
        <Grid size={{ xs: 6, sm: 2 }}>
          <Typography variant="subtitle1" fontWeight={600} mb={1}>
            {t("company")}
          </Typography>
          {[
            { label: "aboutUs", path: PUBLIC_ROUTE.ABOUT_US },
            { label: "careers", path: PUBLIC_ROUTE.CAREERS },
          ].map((option) => (
            <Link
              key={option.path}
              href={option.path}
              color="inherit"
              underline="none"
              display="block"
              sx={{ mb: 0.5 }}
            >
              {t(option.label)}
            </Link>
          ))}
        </Grid>

        <Grid size={{ xs: 6, sm: 2 }}>
          <Typography variant="subtitle1" fontWeight={600} mb={1}>
            {t("contactUs")}
          </Typography>
          {[
            { label: "helpSupport", path: PUBLIC_ROUTE.CONTACT_US },
            { label: "rideWithUs", path: PUBLIC_ROUTE.RIDE_WITH_US },
          ].map((option) => (
            <Link
              key={option.path}
              href={option.path}
              color="inherit"
              underline="none"
              display="block"
              sx={{ mb: 0.5 }}
            >
              {t(option.label)}
            </Link>
          ))}
        </Grid>

        <Grid size={{ xs: 6, sm: 2 }}>
          <Typography variant="subtitle1" fontWeight={600}>
            {t("legal")}
          </Typography>
          {[
            { label: "terms", path: PUBLIC_ROUTE.TERM_POLICY },
            { label: "policy", path: PUBLIC_ROUTE.PRIVACY_POLICY },
          ].map((option) => (
            <Link
              key={option.path}
              href={option.path}
              color="inherit"
              underline="none"
              display="block"
              sx={{ mb: 0.5 }}
            >
              {t(option.label)}
            </Link>
          ))}
        </Grid>

        <Grid size={{ xs: 6, sm: 2 }}>
          <Typography variant="subtitle1" fontWeight={600} mb={1}>
            {t("availableIn")}
          </Typography>
          {["ahmedabad"].map((city) => (
            <Link
              key={city}
              color="inherit"
              underline="none"
              display="block"
              sx={{ mb: 0.5 }}
            >
              {t(city)}
            </Link>
          ))}
        </Grid>
      </Grid>

      <Stack
        direction="row"
        spacing={1.5}
        sx={{
          mt: 4,
          justifyContent: "end",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 1,
          }}
        >
          <Linkedin size={22} cursor="pointer" />
          <Instagram size={22} cursor="pointer" />
          <Facebook size={22} cursor="pointer" />
          <Twitter size={22} cursor="pointer" />
        </Box>
      </Stack>
    </Box>
  );
};

export default Footer;
