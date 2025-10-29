import React from "react";
import { Box, Card, Typography } from "@mui/material";
import Input from "../../components/UI/Input";
import CustomButton from "../../components/UI/Button";
import { useFormik } from "formik";
import { rideWithUsValidationSchema } from "../../utils/schema";
import useFetch from "../../hooks/useFetch";

const RideWithUs = () => {
  const { response, makeAPICall } = useFetch();

  const formik = useFormik({
    initialValues: {
      name: "",
      city: "Ahmedabad",
      contact: "",
    },
    validationSchema: rideWithUsValidationSchema,
    onSubmit: (data) => {
      makeAPICall("riders/register", { method: "POST", data });
    },
  });

  return (
    <Box sx={{ py: 3 }}>
      <img
        src={`../../../public/assets/ride-with-us.jpg`}
        style={{
          borderRadius: "16px",
          width: "100%",
          height: "400px",
          objectFit: "cover",
          objectPosition: "top",
          marginBottom: "16px",
        }}
      />
      <Typography
        variant="h5"
        sx={{
          px: 1.5,
          color: "white",
          position: "absolute",
          top: 150,
          left: 230,
          whiteSpace: "wrap",
          maxWidth: "400px",
          fontSize: 50,
        }}
      >
        Join <span style={{ color: "", fontWeight: 700 }}>Bigbite</span>{" "}
        delivery platform
      </Typography>
      <Typography
        variant="h6"
        sx={{
          px: 1.5,
          color: "white",
          fontWeight: 600,
          position: "absolute",
          bottom: 290,
          left: 230,
          whiteSpace: "wrap",
          maxWidth: "400px",
          display: "flex",
          gap: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            border: "1px solid white",
            px: 1.5,
            py: 1,
            fontWeight: 700,
            fontSize: "26px",
            lineHeight: "1.5rem",
            borderRadius: "8px",
            fontFamily: "auto",
          }}
        >
          B
        </Typography>
        Delivery
      </Typography>
      <Card
        sx={{
          width: "300px",
          height: "310px",
          p: 3,
          position: "absolute",
          top: 125,
          right: 230,
          whiteSpace: "wrap",
          maxWidth: "400px",
          fontSize: 50,
          boxShadow: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {response ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src="../../../public/assets/success.gif" width={300} />
            <Typography
              sx={{ fontSize: 28, color: "#414449", textAlign: "center" }}
            >
              {response?.message}
            </Typography>
          </Box>
        ) : (
          <>
            <Typography sx={{ fontWeight: 600, color: "grey", fontSize: 18 }}>
              Register as Bigbite Partner
            </Typography>
            <Input
              placeholder="Enter your name"
              bounceTime={0}
              name="name"
              value={formik.values.name}
              isFocused
              style={{ width: "100%" }}
              required
              error={formik.touched.name && formik.errors.name}
              onDebounce={(name) => formik.setFieldValue("name", name)}
            />
            <Input
              placeholder="Enter Your Mobile Number"
              required
              name="contact"
              value={formik.values.contact}
              style={{ width: "100%" }}
              bounceTime={0}
              error={formik.touched.contact && formik.errors.contact}
              onDebounce={(contact) => formik.setFieldValue("contact", contact)}
            />
            <Input
              placeholder="Enter preferred city"
              style={{ width: "100%" }}
              value={formik.values.city}
              disabled
              bounceTime={0}
            />
            <CustomButton
              btnText="Register"
              style={{
                fontWeight: 600,
                borderRadius: "8px",
                height: "50px",
                fontSize: 18,
              }}
              onClick={formik.handleSubmit}
            />
          </>
        )}
      </Card>

      <Box
        sx={{
          my: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {[
          { label: "Earn Up to ₹30,000/month", img: "earn.webp" },
          { label: "No fixed hours", img: "no-fix-hours.webp" },
          { label: "Work in your area", img: "work-area.webp" },
          { label: "Onboard within 24 hrs", img: "onboard.webp" },
        ].map((benefit) => (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
            }}
          >
            <img src={`../../../public/assets/${benefit.img}`} width={100} />
            <Typography sx={{ fontWeight: 600, fontSize: 20, color: "grey" }}>
              {benefit.label}
            </Typography>
          </Box>
        ))}
      </Box>

      <Card
        sx={{
          p: 3,
          boxShadow: "none",
          border: "1px solid grey",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography sx={{ fontSize: 28, color: "#414449" }}>
          Become a Bigbite partner today
        </Typography>
        <CustomButton
          btnText="Get started"
          style={{
            width: "max-content",
            fontSize: 18,
            fontWeight: 600,
            borderRadius: "8px",
          }}
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
        />
      </Card>
    </Box>
  );
};

export default RideWithUs;
