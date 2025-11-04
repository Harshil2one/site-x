import React from "react";
import { Card, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import Input from "../../components/UI/Input";
import CustomButton from "../../components/UI/Button";
import { useFormik } from "formik";
import useFetch from "../../hooks/useFetch";
import toast from "react-hot-toast";
import { contactUsValidationSchema } from "../../utils/schema";

const ContactUsPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const { error, makeAPICall } = useFetch();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
    validationSchema: contactUsValidationSchema,
    onSubmit: async (data) => {
      const res = await makeAPICall("custom/contact-us", {
        method: "POST",
        data,
      });
      if ([200, 201].includes(res?.status)) {
        toast.success(res?.message);
        formik.resetForm();
      } else {
        toast.error(error);
      }
    },
  });

  return (
    <>
      <Grid
        container
        spacing={5}
        sx={{
          py: { md: 3, xs: 1, sm: 2 },
          background:
            "linear-gradient(90deg,rgba(255, 255, 255, 1) 0%, rgba(213, 69, 69, 0.2) 60%, rgba(255, 255, 255, 1) 100%)",
        }}
      >
        {!isMobile && (
          <>
            <img
              src={"../../../public/assets/bg-salad.webp"}
              width={250}
              style={{
                position: "absolute",
                bottom: -248,
                left: 0,
                zIndex: 999,
              }}
              loading="lazy"
            />
            <img
              src={"../../../public/assets/bg-sandwich.webp"}
              width={250}
              style={{ position: "absolute", top: 10, right: 0, zIndex: 999 }}
              loading="lazy"
            />
          </>
        )}
        <Grid size={{ md: 7, sm: 12 }}>
          <Typography gutterBottom sx={{ fontWeight: 700, fontSize: "40px" }}>
            Customer Support
          </Typography>
          <Typography
            gutterBottom
            sx={{ fontWeight: 600, fontSize: "22px", color: "#3E4047" }}
          >
            Email: support@bigbite.in
          </Typography>

          <Typography
            gutterBottom
            sx={{ mt: 5, fontWeight: 600, fontSize: "24px" }}
          >
            Corporate Office
          </Typography>
          <Typography
            gutterBottom
            sx={{ mt: 2, fontWeight: 500, color: "grey", fontSize: "18px" }}
          >
            No. 34, Sy No. G-4, Ground Floor, Shivalik Shilp Building, Opp.
            Isckon Thal Restaurant, Isckon Cross Road, Ahmedabad - 380058,
            Gujarat, India,
          </Typography>
          <Typography gutterBottom sx={{ color: "grey", fontSize: "18px" }}>
            Corporate Identity Number: L74110KA2013PLC096530 Registration
            Number: 096530
          </Typography>
        </Grid>
        <Grid size={{ md: 5, sm: 12, xs: 12 }}>
          <Card
            elevation={0}
            sx={{
              borderRadius: 3,
              border: "1px solid #80808029",
              boxShadow: "none",
              px: 2,
              py: 2.5,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Typography sx={{ fontWeight: 700, fontSize: "24px", mb: -1 }}>
              Get in touch
            </Typography>
            <Input
              placeholder="Enter Name"
              style={{ width: "100%" }}
              value={formik.values.name}
              isReset
              bounceTime={0}
              error={formik.touched.name && formik.errors.name}
              onDebounce={(name) => formik.setFieldValue("name", name)}
            />
            <Input
              placeholder="Enter Email Address"
              style={{ width: "100%" }}
              value={formik.values.email}
              isReset
              bounceTime={0}
              error={formik.touched.email && formik.errors.email}
              onDebounce={(email) => formik.setFieldValue("email", email)}
            />
            <Input
              placeholder="Enter Message"
              style={{ width: "100%" }}
              value={formik.values.message}
              multiline
              isReset
              bounceTime={0}
              error={formik.touched.message && formik.errors.message}
              onDebounce={(message) => formik.setFieldValue("message", message)}
            />
            <CustomButton
              btnText="Submit"
              style={{
                width: "max-content",
                borderRadius: "12px",
                fontWeight: 600,
              }}
              onClick={formik.handleSubmit}
            />
          </Card>
        </Grid>
      </Grid>
      <img
        src={"/assets/fast-food.jpg"}
        style={{
          marginTop: "20px",
          width: "100%",
          height: "360px",
        }}
        loading="lazy"
      />
    </>
  );
};

export default ContactUsPage;
