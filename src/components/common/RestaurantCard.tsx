import React from "react";
import { Box, Typography } from "@mui/material";
import type { IRestaurant } from "../../types/restaurant";
import { CircleStar } from "lucide-react";
import { useNavigate } from "react-router";
import { PUBLIC_ROUTE } from "../../enums";
import { useTranslation } from "react-i18next";

interface IProps {
  place: IRestaurant;
  width?: number;
}

const RestaurantCard = (props: IProps) => {
  const { t } = useTranslation();

  const { place, width = 245 } = props;
  const navigate = useNavigate();

  return (
    <Box
      key={place.id}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        cursor: "pointer",
      }}
      onClick={() => navigate(`${PUBLIC_ROUTE.RESTAURANT}/${place.id}`)}
    >
      <Box>
        <img
          src={place.images[0]}
          width={width}
          height={160}
          style={{
            borderRadius: "16px",
          }}
          loading="lazy"
        />
        {place?.offers?.length > 0 && (
          <Box
            sx={{
              position: "relative",
              bottom: 85,
              left: 0,
              height: "79px",
              borderRadius: "0 0 16px 16px",
              background:
                "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
            }}
          />
        )}
        {place?.offers?.length > 0 && (
          <Typography
            variant="h6"
            textTransform="uppercase"
            sx={{
              px: 1.5,
              color: "white",
              fontWeight: 700,
              position: "relative",
              bottom: 120,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "220px",
            }}
          >
            {place.offers[0]}
          </Typography>
        )}
      </Box>
      <Box
        sx={{
          mt: place?.offers?.length ? -14 : 0,
          px: 1,
          display: "flex",
          flexDirection: "column",
          gap: 0.3,
        }}
      >
        <Typography
          variant="body1"
          fontWeight={700}
          sx={{
            fontSize: "17.5px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "220px",
          }}
        >
          {place.name}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            display: "flex",
            gap: 0.5,
            alignItems: "center",
            fontWeight: 500,
          }}
        >
          <CircleStar size={20} color="green" /> {place.ratings} • {place.time}{" "}
          {t("mins")}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "220px",
          }}
        >
          {place.special.join(", ")}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "220px",
          }}
        >
          {place.address}
        </Typography>
      </Box>
    </Box>
  );
};

export default RestaurantCard;
