import React, { useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import CustomButton from "../../components/UI/Button";
import { BUTTON_VARIANT } from "../../enums";
import useFetch from "../../hooks/useFetch";
import type { IJob } from "../../types/jobs";

const jobTypes = [
  {
    id: 1,
    title: "Technology",
    icon: "https://careers.swiggy.com/assets/img/icons/ic_1.png",
  },
  {
    id: 2,
    title: "Business",
    icon: "https://careers.swiggy.com/assets/img/icons/ic_2.png",
  },
  {
    id: 3,
    title: "Cloud kitchen",
    icon: "https://careers.swiggy.com/assets/img/icons/ic_3.png",
  },
  {
    id: 4,
    title: "Customer care",
    icon: "https://careers.swiggy.com/assets/img/icons/ic_4.png",
  },
  {
    id: 5,
    title: "Campus",
    icon: "https://careers.swiggy.com/assets/img/icons/ic_5.png",
  },
  {
    id: 6,
    title: "Corporate support",
    icon: "https://careers.swiggy.com/assets/img/icons/ic_6.png",
  },
];

const CareersPage = () => {
  const { response, makeAPICall } = useFetch();

  const fetchJobs = async () => {
    await makeAPICall("jobs");
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <>
      <img
        src={"https://careers.swiggy.com/assets/img/banner3.jpg"}
        style={{
          marginTop: "20px",
          width: "100%",
          height: "360px",
          objectFit: "cover",
          objectPosition: "top",
        }}
      />
      <Typography
        variant="h5"
        sx={{
          px: 1.5,
          color: "white",
          fontWeight: 600,
          position: "absolute",
          top: 255,
          left: 590,
          whiteSpace: "wrap",
          maxWidth: "400px",
          letterSpacing: 4,
          fontSize: 28
        }}
      >
        <b>Discover</b> active jobs
      </Typography>
      <Typography
        variant="body1"
        sx={{ fontSize: 22, textAlign: "center", my: 2, letterSpacing: 1 }}
      >
        We build innovative products & solutions that deliver unparalleled
        convenience to urban consumers. The best part? Every bit of your work at
        Bigbite will help elevate the lives of our users across India.
      </Typography>
      <Typography
        variant="body1"
        sx={{ fontSize: 30, textAlign: "center", my: 4, letterSpacing: 6 }}
      >
        Where Do You <b>Belong?</b>
      </Typography>
      <Grid container spacing={8}>
        {jobTypes?.map((job) => (
          <Grid
            key={job.id}
            size={{ md: 4, xs: 6, sm: 12 }}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <img src={job.icon} />
            <Typography
              variant="h6"
              sx={{
                textTransform: "uppercase",
                letterSpacing: 6,
                fontSize: 22,
                color: "#553d3d",
                textAlign: "center",
              }}
            >
              {job.title}
            </Typography>
            <CustomButton
              variant={BUTTON_VARIANT.OUTLINED}
              btnText="Explore"
              style={{
                width: "max-content",
                "&:hover": { background: "#d54545", color: "white !important" },
              }}
            />
          </Grid>
        ))}
      </Grid>
      <Grid
        container
        spacing={5}
        sx={{
          mt: 5,
          background: "#5134b6",
          px: 25,
          py: 4,
          width: "132.1%",
          justifyContent: "space-around",
          ml: "-185px",
        }}
      >
        {response?.data
          ?.filter((job: IJob) => job?.isActive === 1)
          ?.slice(0, 9)
          ?.map((job: IJob) => (
            <Grid
              key={job.id}
              size={{ md: 4, xs: 6, sm: 12 }}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontSize: 22,
                  color: "white",
                }}
              >
                {job.title}
              </Typography>
              <Typography
                sx={{
                  fontSize: 20,
                  color: "white",
                }}
              >
                {job.location}
              </Typography>
            </Grid>
          ))}
      </Grid>
      <Box
        sx={{
          mt: 8,
          display: "flex",
          flexDirection: "column",
          gap: 4,
          alignItems: "center",
          px: 35,
        }}
      >
        <Typography
          sx={{
            letterSpacing: 6,
            fontSize: 28,
          }}
        >
          Bigbite Gigabytes
        </Typography>
        <Typography
          variant="h2"
          sx={{
            fontWeight: 600,
            textAlign: "center",
          }}
        >
          #LetsTalkDeepTech | Webinar Series
        </Typography>
        <Typography variant="body1" sx={{ fontSize: 20, textAlign: "center" }}>
          Missed the latest edition of Gigabytes - Bigbite's tech webinar
          series? Want to know what's geeking inside Bigbite's hyperlocal tech
          world?
        </Typography>
      </Box>
    </>
  );
};

export default CareersPage;
