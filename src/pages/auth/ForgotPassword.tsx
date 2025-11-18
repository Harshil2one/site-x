import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, InputLabel, Typography } from "@mui/material";
import Input from "../../components/UI/Input";
import CustomButton from "../../components/UI/Button";
import { INPUT_SIZE, INPUT_TYPE, PUBLIC_ROUTE } from "../../enums";
import { ChevronLeft } from "lucide-react";
import useFetch from "../../hooks/useFetch";
import toast from "react-hot-toast";
import OtpInput from "../../components/UI/OTPInput";

const ForgotPasswordPage = () => {
  const { loading, response, error, makeAPICall } = useFetch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState(0);

  const handleBtnClick = () => {
    setPassword("");
    if (step === 0) {
      makeAPICall("auth/send-otp", {
        method: "POST",
        data: { email },
      });
      setStep(1);
    } else {
      makeAPICall("auth/verify-otp", {
        method: "POST",
        data: { email, otp },
      });
      setStep(2);
    }
  };

  const handleUpdatePassword = () => {
    makeAPICall("auth/update-password", {
      method: "POST",
      data: { email, password },
    });
    setStep(0);
    navigate(PUBLIC_ROUTE.SIGNIN);
  };

  if (error) {
    toast.error(error);
  }

  useEffect(() => {
    response && toast.success(response.message);
  }, [step]);

  if (step === 2) {
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
          >
            Welcome to Bigbite!
          </Typography>

          <Box>
            <InputLabel htmlFor="password" sx={{ fontSize: 14, mb: 0.5 }}>
              Password
            </InputLabel>
            <Input
              type={INPUT_TYPE.TEXT}
              placeholder="enter your password"
              value={password}
              size={INPUT_SIZE.SMALL}
              style={{ width: "100%" }}
              bounceTime={0}
              onDebounce={(password) => setPassword(password)}
              isReset
              testId="password-input"
            />
          </Box>
          <CustomButton
            btnText="Update Password"
            onClick={handleUpdatePassword}
            style={{ padding: "10px 0" }}
            loading={loading}
            testId="update-password-button"
          />
          <Link
            to={PUBLIC_ROUTE.SIGNIN}
            style={{
              color: "#d54545",
              textDecoration: "none",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
            }}
          >
            <ChevronLeft size={20} /> Back to Login
          </Link>
        </Box>
      </Box>
    );
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
          Welcome to Bigbite!
        </Typography>

        <Box>
          <InputLabel htmlFor="email" sx={{ fontSize: 14, mb: 0.5 }}>
            Email Address
          </InputLabel>
          <Input
            size={INPUT_SIZE.SMALL}
            placeholder="e.g. username@domain.com"
            type={INPUT_TYPE.EMAIL}
            value={email}
            style={{ width: "100%" }}
            onDebounce={(email) => setEmail(email)}
            bounceTime={0}
            isReset
            isFocused={step === 0}
            disabled={step !== 0}
            testId="email-input"
          />
        </Box>

        {step === 1 && (
          <Box>
            <InputLabel htmlFor="email" sx={{ fontSize: 14, mb: 0.5 }}>
              One Time Password
            </InputLabel>
            <OtpInput
              isFocused={true}
              testId="otp-input"
              onChange={(otp) => setOtp(otp)}
            />
          </Box>
        )}

        <CustomButton
          btnText={step === 1 ? "Verify OTP" : "SEND EMAIL"}
          onClick={handleBtnClick}
          style={{ padding: "10px 0" }}
          loading={loading}
          testId="otp-button"
        />

        <Link
          to={PUBLIC_ROUTE.SIGNIN}
          style={{
            color: "#d54545",
            textDecoration: "none",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
          }}
        >
          <ChevronLeft size={20} /> Back to Login
        </Link>
      </Box>
    </Box>
  );
};

export default ForgotPasswordPage;
