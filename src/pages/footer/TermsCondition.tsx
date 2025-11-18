import { Box, Typography, Divider } from "@mui/material";

const TermsAndPrivacyPage = () => {
  return (
    <Box sx={{ py: { md: 3, xs: 1, sm: 2 }, px: { md: 4, sm: 2, xs: 1 } }}>
      <Box mb={4}>
        <Typography gutterBottom sx={{ fontWeight: 700, fontSize: "28px" }}>
          Terms & Conditions
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Last Updated: October 8, 2025
        </Typography>
        <Divider sx={{ mt: 2 }} />
      </Box>

      <Box mb={4}>
        <Typography variant="h5" gutterBottom>
          Terms Introduction
        </Typography>
        <Typography paragraph>
          By accessing or using our platform, you agree to comply with these
          Terms & Conditions.
        </Typography>
      </Box>

      <Box mb={4}>
        <Typography variant="h5" gutterBottom>
          Use of Platform
        </Typography>
        <Typography paragraph>
          You agree to use the platform only for lawful purposes and in
          accordance with these terms.
        </Typography>
      </Box>

      <Box mb={4}>
        <Typography variant="h5" gutterBottom>
          User Responsibility
        </Typography>
        <Typography paragraph>
          You are responsible for maintaining the confidentiality of your
          account and for all activities under your account.
        </Typography>
      </Box>

      <Box mb={4}>
        <Typography variant="h5" gutterBottom>
          Changes to Terms
        </Typography>
        <Typography paragraph>
          We may update these terms periodically. Any changes will be posted on
          this page with an updated "Last Updated" date.
        </Typography>
      </Box>

      <Box>
        <Typography variant="h5" gutterBottom>
          Governing Law
        </Typography>
        <Typography paragraph>
          These terms are governed by the laws of India. Any disputes shall be
          resolved under the jurisdiction of competent courts in India.
        </Typography>
      </Box>
    </Box>
  );
};

export default TermsAndPrivacyPage;
