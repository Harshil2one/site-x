import React, { useEffect, useRef, useState } from "react";
import {
  Avatar,
  Box,
  Grid,
  InputLabel,
  Typography,
  Divider,
} from "@mui/material";
import Input from "../components/UI/Input";
import { Mail, Phone, Trash2, User } from "lucide-react";
import { BUTTON_VARIANT, INPUT_SIZE, PUBLIC_ROUTE, USER_ROLE } from "../enums";
import { useLocalStorage } from "../hooks/useLocalStorage";
import CustomButton from "../components/UI/Button";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import useFetch from "../hooks/useFetch";
import Address from "../components/common/AddressField";
import { type IAddress } from "../types/common";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../redux/store";
import { switchRoles } from "../redux/slices/role";
import { useTranslation } from "react-i18next";

const ProfilePage = () => {
  const { t } = useTranslation();

  const { response, makeAPICall, loading, error, setError } = useFetch();
  const navigate = useNavigate();
  const fileInput = useRef<HTMLInputElement>(null);

  const { getLocalStorage, setLocalStorage, clearLocalStorage } =
    useLocalStorage();
  const user = getLocalStorage("user");

  const dispatch = useDispatch<AppDispatch>();
  const role = useSelector((state: RootState) => state.user.role);

  const [image, setImage] = useState<string | null>(null);
  const [profileData, setProfileData] = useState<{
    name: string;
    email: string;
    contact: string;
    image: string | null;
  }>({
    name: "",
    email: "",
    contact: "",
    image: null,
  });
  const [address, setAddress] = useState<IAddress>({
    line1: "",
    line2: "",
    city: "",
    state: "",
    pin: "",
  });

  const handleAvatarClick = () => {
    fileInput.current?.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setError("");

      const sizeInMB = file.size / (1024 * 1024);
      if (Math.floor(sizeInMB) > 10) {
        setError(t("imageError"));
        return;
      }

      const reader = new FileReader();

      reader.onloadend = () => {
        const base64String = reader.result as string;
        setProfileData((prev) => ({ ...prev, image: base64String }));
        setImage(base64String);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleChange = (key: string, value: string) => {
    setProfileData((prev) => ({ ...prev, [key]: value }));
  };

  const handleAddressChange = (key: string, value: string) => {
    setAddress((prev) => ({ ...prev, [key]: value }));
  };

  const updateProfile = () => {
    const data = {
      name: profileData.name,
      email: profileData.email,
      contact: profileData.contact,
      address,
      image: profileData.image,
    };

    makeAPICall(`profile/${user.id}`, {
      method: "PATCH",
      data,
    });
    const userData = { ...user, ...data };
    setLocalStorage("user", userData);
  };

  const deleteAccount = async () => {
    const res = await makeAPICall(`profile/delete-account/${user.id}`, {
      method: "DELETE",
    });
    if (res?.status === 200) {
      toast.success(res?.message);
      setTimeout(() => {
        clearLocalStorage();
        navigate(PUBLIC_ROUTE.HOME);
      }, 0);
    } else {
      toast.error(error);
    }
  };

  useEffect(() => {
    makeAPICall(`profile/${user.id}`, { method: "GET" });
  }, [user.id]);

  useEffect(() => {
    if (error) toast.error(error);
    if (response?.data) {
      setProfileData((prev) => ({
        ...prev,
        name: response.data.name,
        email: response.data.email,
        contact: response.data.contact,
        image: response.data.image || null,
      }));
      setImage(response.data.image || null);
      setAddress(response.data.address ? response.data.address : address);
    }
    if (!response?.data && response?.message) toast.success(response?.message);
  }, [response, error]);

  return (
    <>
      <Box sx={{ py: { md: 4, xs: 1, sm: 2 } }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
            {t("profileHeader")}
          </Typography>

          {user.role === USER_ROLE.ADMIN && (
            <CustomButton
              variant={BUTTON_VARIANT.OUTLINED}
              style={{
                width: "max-content",
              }}
              btnText={
                role === USER_ROLE.ADMIN ? t("switchToUser") : t("becomeAdmin")
              }
              onClick={() =>
                dispatch(
                  switchRoles(
                    role === USER_ROLE.ADMIN ? USER_ROLE.USER : USER_ROLE.ADMIN
                  )
                )
              }
            />
          )}
        </Box>
        <Typography variant="body1" sx={{ color: "text.secondary", mb: 1 }}>
          {t("profileSubText")}
        </Typography>
        <Divider sx={{ mb: 4 }} />

        <Grid container spacing={5} sx={{ alignItems: "center" }}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageChange}
                ref={fileInput}
              />
              <Avatar
                src={image || profileData?.image || ""}
                sx={{
                  width: 150,
                  height: 150,
                  cursor: "pointer",
                  "&:hover": { boxShadow: 3 },
                }}
                onClick={handleAvatarClick}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 0.5,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", fontStyle: "italic" }}
                >
                  {t("profilePictureText")}
                </Typography>
                <Typography sx={{ color: "red", fontSize: 15 }}>
                  {t("imageValidationText")}
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 8 }}>
            <Grid container spacing={3}>
              <Grid size={12}>
                <InputLabel htmlFor="name" sx={{ fontSize: 14, mb: 0.5 }}>
                  {t("username")}
                </InputLabel>
                <Input
                  placeholder={t("usernamePlaceholder")}
                  size={INPUT_SIZE.SMALL}
                  style={{ width: "100%" }}
                  startAdornment={<User size={20} />}
                  value={profileData?.name || ""}
                  onDebounce={(name) => handleChange("name", name)}
                  bounceTime={0}
                  isReset
                />
              </Grid>

              <Grid size={{ md: 6, sm: 12, xs: 12 }}>
                <InputLabel htmlFor="email" sx={{ fontSize: 14, mb: 0.5 }}>
                  {t("email")}
                </InputLabel>
                <Input
                  placeholder={t("emailPlaceholder")}
                  size={INPUT_SIZE.SMALL}
                  style={{ width: "100%" }}
                  startAdornment={<Mail size={20} />}
                  value={profileData?.email || ""}
                  onDebounce={(email) => handleChange("email", email)}
                  bounceTime={0}
                  isReset
                />
              </Grid>

              <Grid size={{ md: 6, sm: 12, xs: 12 }}>
                <InputLabel htmlFor="contact" sx={{ fontSize: 14, mb: 0.5 }}>
                  {t("mobile")}
                </InputLabel>
                <Input
                  placeholder={t("mobilePlaceholder")}
                  size={INPUT_SIZE.SMALL}
                  style={{ width: "100%" }}
                  startAdornment={<Phone size={20} />}
                  value={profileData?.contact || ""}
                  onDebounce={(contact) => handleChange("contact", contact)}
                  bounceTime={0}
                  isReset
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Divider
          sx={{ mt: 8, mb: 4, height: "1px", backgroundColor: "black" }}
        />
        <Address address={address} handleChange={handleAddressChange} />
      </Box>
      <Box sx={{ display: "flex", mt: 2, justifyContent: "space-between" }}>
        <CustomButton
          btnText={t("deleteAccount")}
          variant={BUTTON_VARIANT.OUTLINED}
          style={{
            padding: { md: "8px 0", sm: "6px 2px", xs: "4px" },
            width: { md: "180px", sm: "auto", xs: "max-content" },
            borderRadius: "8px",
          }}
          icon={<Trash2 size={18} />}
          onClick={deleteAccount}
        />
        <Box sx={{ display: "flex", gap: 2 }}>
          <CustomButton
            btnText={t("update")}
            variant={BUTTON_VARIANT.CONTAINED}
            style={{
              padding: { md: "8px 0", sm: "6px 2px", xs: "4px" },
              width: { md: "100px", sm: "auto", xs: "max-content" },
              borderRadius: "8px",
            }}
            onClick={updateProfile}
            loading={loading}
          />
          <CustomButton
            btnText={t("cancel")}
            variant={BUTTON_VARIANT.OUTLINED}
            style={{
              width: { md: "100px", sm: "auto", xs: "max-content" },
              borderRadius: "8px",
              padding: { md: "8px 0", sm: "6px 2px", xs: "4px" },
            }}
            onClick={() => navigate(PUBLIC_ROUTE.HOME)}
          />
        </Box>
      </Box>
    </>
  );
};

export default ProfilePage;
