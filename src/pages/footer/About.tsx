import React from "react";
import { Box, Divider, Grid, Typography } from "@mui/material";

const AboutUsPage = () => {
  return (
    <>
      <img
        style={{
          height: 600,
          width: "132.1%",
          justifyContent: "space-around",
          marginLeft: "-185px",
          position: "relative",
          top: 0,
        }}
        src="https://www.swiggy.com/corporate/wp-content/uploads/2024/10/about-banner-image-scaled.webp"
      />
      <img
        src="https://www.swiggy.com/corporate/wp-content/uploads/2024/10/dineout.webp"
        style={{ position: "absolute", top: 480, width: "180px" }}
      />
      <img
        src="https://www.swiggy.com/corporate/wp-content/uploads/2024/10/food.webp"
        style={{ position: "absolute", top: 300, left: 450, width: "180px" }}
      />
      <Typography
        sx={{
          border: "2px solid white",
          px: 1.5,
          py: 1,
          fontWeight: 800,
          fontSize: "38px",
          lineHeight: "2.5rem",
          borderRadius: "8px",
          background: "#d54545",
          fontFamily: "auto",
          color: "white",
          position: "absolute",
          bottom: 100,
          left: "50%",
        }}
      >
        B
      </Typography>
      <img
        src="https://www.swiggy.com/corporate/wp-content/uploads/2024/10/instamart.webp"
        style={{ position: "absolute", top: 300, right: 450, width: "180px" }}
      />
      <img
        src="https://www.swiggy.com/corporate/wp-content/uploads/2025/10/Scenes-new-icon.png"
        style={{ position: "absolute", top: 480, right: 180, width: "180px" }}
      />
      <Typography
        variant="body1"
        sx={{
          fontSize: 40,
          textAlign: "center",
          letterSpacing: 2,
          fontWeight: 700,
          position: "relative",
          bottom: 520,
        }}
      >
        ABOUT US
      </Typography>
      <Typography
        variant="body1"
        sx={{
          fontSize: 20,
          textAlign: "center",
          letterSpacing: 1,
          color: "grey",
          position: "relative",
          bottom: 505,
        }}
      >
        Bigbite is a new-age consumer-first organization offering an easy-to-use
        convenience platform, accessible through a unified app.
      </Typography>
      <Box>
        <Divider
          sx={{
            "&:before, &:after": {
              borderTop: "2px solid #d54545 !important",
              width: "10% !important",
            },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            top: -50,
          }}
        >
          <Typography
            sx={{ fontWeight: 800, fontSize: 36, color: "#02060CBF" }}
          >
            INDUSTRY PIONEER
          </Typography>
        </Divider>
        <Grid container spacing={3} sx={{ alignItems: "center", mb: 8 }}>
          <Grid size={{ md: 7, xs: 12 }}>
            <Typography sx={{ color: "grey", fontSize: 20 }}>
              Being among the first few entrants, Bigbite has successfully
              pioneered the hyperlocal commerce industry in India, launching
              Food Delivery in 2014 and Quick Commerce in 2020. Due to the
              pioneering status of Bigbite, it is well-recognised as a leader in
              innovation in hyperlocal commerce and a category-defining brand;
              trusted, intuitive and deeply embedded in the daily routines of
              millions of Indians.
            </Typography>
          </Grid>
          <Grid size={{ md: 5, xs: 0 }}>
            <img
              style={{
                width: "500px",
                height: "300px",
                objectFit: "cover",
                border: "1px solid #8080803b",
                borderRadius: 26,
              }}
              src="https://img.freepik.com/premium-vector/man-jumping-barrier-obstacle-ambitious-male-character-overcoming-hurdledifficulty-problem-life-trouble-challenge-psychology-concept-flat-vector-illustration-isolated-white-background_198278-23205.jpg"
            />
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Box
          sx={{ display: "flex", flexDirection: "column", alignItems: "start" }}
        >
          <Typography
            sx={{
              fontWeight: 700,
              color: "#1ba672",
              fontSize: 36,
              lineHeight: "36px",
            }}
          >
            3 Million+
          </Typography>
          <Typography sx={{ fontWeight: 400, color: "grey", fontSize: 18 }}>
            orders delivered
          </Typography>
        </Box>
        <Divider
          orientation="vertical"
          variant="middle"
          flexItem
          sx={{ borderColor: "grey !important" }}
        />
        <Box
          sx={{ display: "flex", flexDirection: "column", alignItems: "start" }}
        >
          <Typography
            sx={{
              fontWeight: 700,
              color: "#1ba672",
              fontSize: 36,
              lineHeight: "36px",
            }}
          >
            238k+
          </Typography>
          <Typography sx={{ fontWeight: 400, color: "grey", fontSize: 18 }}>
            restaurant partners
          </Typography>
        </Box>
        <Divider
          orientation="vertical"
          variant="middle"
          flexItem
          sx={{ borderColor: "grey !important" }}
        />
        <Box
          sx={{ display: "flex", flexDirection: "column", alignItems: "start" }}
        >
          <Typography
            sx={{
              fontWeight: 700,
              color: "#1ba672",
              fontSize: 36,
              lineHeight: "36px",
            }}
          >
            520k+
          </Typography>
          <Typography sx={{ fontWeight: 400, color: "grey", fontSize: 18 }}>
            delivery partners
          </Typography>
        </Box>
        <Divider
          orientation="vertical"
          variant="middle"
          flexItem
          sx={{ borderColor: "grey !important" }}
        />
        <Box
          sx={{ display: "flex", flexDirection: "column", alignItems: "start" }}
        >
          <Typography
            sx={{
              fontWeight: 700,
              color: "#1ba672",
              fontSize: 36,
              lineHeight: "36px",
            }}
          >
            1+
          </Typography>
          <Typography sx={{ fontWeight: 400, color: "grey", fontSize: 18 }}>
            cities in India
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default AboutUsPage;
