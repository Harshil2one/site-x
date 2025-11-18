import {
  Typography,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import { Shield, Info, MapPin, Mail, Phone } from "lucide-react";

const PrivacyPolicyPage = () => {
  return (
    <Box sx={{ py: {md: 3, xs: 1, sm: 2}, px: { md: 4, sm: 2, xs: 1 } }}>
      <Box mb={4}>
        <Typography gutterBottom sx={{ fontWeight: 700, fontSize: "28px" }}>
          Privacy Policy
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Last Updated: October 8, 2025
        </Typography>
        <Divider sx={{ mt: 2 }} />
      </Box>

      <Box mb={4}>
        <Typography variant="h6" gutterBottom>
          1. Introduction
        </Typography>
        <Typography paragraph>
          Welcome to our platform. This Privacy Policy explains how we collect,
          use, disclose, and safeguard your information. By using our platform,
          you agree to the practices outlined in this policy.
        </Typography>
      </Box>

      <Box mb={4}>
        <Typography variant="h6" gutterBottom>
          2. Information We Collect
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <Info size={20} />
            </ListItemIcon>
            <ListItemText primary="Personal Information: Name, email, phone, delivery address, payment details." />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Shield size={20} />
            </ListItemIcon>
            <ListItemText primary="Device Information: Device model, OS, unique identifiers." />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <MapPin size={20} />
            </ListItemIcon>
            <ListItemText primary="Location Data: GPS location to facilitate order delivery." />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Info size={20} />
            </ListItemIcon>
            <ListItemText primary="Usage Data: Interaction with our platform, order history, and preferences." />
          </ListItem>
        </List>
      </Box>

      <Box mb={4}>
        <Typography variant="h6" gutterBottom>
          3. How We Use Your Information
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <Shield size={20} />
            </ListItemIcon>
            <ListItemText primary="Processing and delivering orders." />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Mail size={20} />
            </ListItemIcon>
            <ListItemText primary="Sending updates, promotional materials, and customer support communications." />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Info size={20} />
            </ListItemIcon>
            <ListItemText primary="Improving and personalizing your platform experience." />
          </ListItem>
        </List>
      </Box>

      <Box mb={4}>
        <Typography variant="h6" gutterBottom>
          4. Sharing Your Information
        </Typography>
        <Typography paragraph>
          We may share your information with trusted service providers to
          facilitate deliveries, payment processing, and customer support. We do
          not sell your personal data. Information may also be shared when
          required by law.
        </Typography>
      </Box>

      <Box mb={4}>
        <Typography variant="h6" gutterBottom>
          5. Data Security
        </Typography>
        <Typography paragraph>
          We implement reasonable technical and administrative measures to
          protect your personal information. However, no transmission over the
          Internet is fully secure.
        </Typography>
      </Box>

      <Box mb={4}>
        <Typography variant="h6" gutterBottom>
          6. Your Rights
        </Typography>
        <Typography paragraph>
          You have the right to access, correct, or request deletion of your
          personal information. You may also opt-out of marketing communications
          at any time.
        </Typography>
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          7. Contact Us
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <Mail size={20} />
            </ListItemIcon>
            <ListItemText primary="Email: bigbite.support@gmail.com" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Phone size={20} />
            </ListItemIcon>
            <ListItemText primary="Phone: +91-9865525843" />
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default PrivacyPolicyPage;
