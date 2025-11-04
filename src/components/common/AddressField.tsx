import React from "react";
import { Box, Grid, InputLabel, Typography, Divider } from "@mui/material";
import { Building, House, Map, MapPinHouse, MapPinned } from "lucide-react";
import Input from "../UI/Input";
import { BUTTON_VARIANT, INPUT_SIZE } from "../../enums";
import type { IAddress } from "../../types/common";
import CustomButton from "../UI/Button";
import { useTranslation } from "react-i18next";

interface IProps {
  address: IAddress;
  isAutoUpdate?: boolean;
  handleChange: (key: string, value: string) => void;
  updateAddress?: () => void;
}

const Address = ({
  address,
  isAutoUpdate = false,
  handleChange,
  updateAddress,
}: IProps) => {
  const { t } = useTranslation();

  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
        {t("addressHeader")}
      </Typography>
      <Typography variant="body1" sx={{ color: "text.secondary", mb: 1 }}>
        {t("addressSubText")}
      </Typography>

      <Divider sx={{ mb: 4 }} />

      <Grid container spacing={3}>
        <Grid size={12}>
          <InputLabel htmlFor="line1" sx={{ fontSize: 14, mb: 0.5 }}>
            {t("line1")}
          </InputLabel>
          <Input
            placeholder={t("line1Placeholder")}
            size={INPUT_SIZE.SMALL}
            style={{ width: "100%" }}
            startAdornment={<House size={20} />}
            value={address?.line1 || ""}
            onDebounce={(line1) => handleChange("line1", line1)}
            bounceTime={0}
            isReset
          />
        </Grid>

        <Grid size={12}>
          <InputLabel htmlFor="line2" sx={{ fontSize: 14, mb: 0.5 }}>
            {t("line2")}
          </InputLabel>
          <Input
            placeholder={t("line2Placeholder")}
            size={INPUT_SIZE.SMALL}
            style={{ width: "100%" }}
            startAdornment={<Building size={20} />}
            value={address?.line2 || ""}
            onDebounce={(line2) => handleChange("line2", line2)}
            bounceTime={0}
            isReset
          />
        </Grid>

        <Grid size={{ md: 4, sm: 12, xs: 12 }}>
          <InputLabel htmlFor="city" sx={{ fontSize: 14, mb: 0.5 }}>
            {t("city")}
          </InputLabel>
          <Input
            placeholder={t("city")}
            size={INPUT_SIZE.SMALL}
            style={{ width: "100%" }}
            startAdornment={<MapPinHouse size={20} />}
            value={address?.city || ""}
            onDebounce={(city) => handleChange("city", city)}
            bounceTime={0}
            isReset
          />
        </Grid>

        <Grid size={{ md: 4, sm: 12, xs: 12 }}>
          <InputLabel htmlFor="state" sx={{ fontSize: 14, mb: 0.5 }}>
            {t("state")}
          </InputLabel>
          <Input
            placeholder={t("state")}
            size={INPUT_SIZE.SMALL}
            style={{ width: "100%" }}
            startAdornment={<MapPinned size={20} />}
            value={address?.state || ""}
            onDebounce={(state) => handleChange("state", state)}
            bounceTime={0}
            isReset
          />
        </Grid>

        <Grid size={{ md: 4, sm: 12, xs: 12 }}>
          <InputLabel htmlFor="pin" sx={{ fontSize: 14, mb: 0.5 }}>
            {t("pin")}
          </InputLabel>
          <Input
            placeholder={t("pin")}
            size={INPUT_SIZE.SMALL}
            style={{ width: "100%" }}
            startAdornment={<Map size={20} />}
            value={address?.pin || ""}
            onDebounce={(pin) => handleChange("pin", pin)}
            bounceTime={0}
            isReset
          />
        </Grid>
      </Grid>
      {isAutoUpdate && updateAddress && (
        <Box
          sx={{
            mt: 3,
            display: "flex",
            gap: 2,
            alignItems: "center",
            justifyContent: "start",
          }}
        >
          <CustomButton
            btnText={t("update")}
            variant={BUTTON_VARIANT.CONTAINED}
            style={{ padding: "8px 0", width: "150px", borderRadius: "8px" }}
            onClick={updateAddress}
          />
        </Box>
      )}
    </Box>
  );
};

export default Address;
