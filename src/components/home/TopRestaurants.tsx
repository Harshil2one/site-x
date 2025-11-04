import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import RestaurantCard from "../common/RestaurantCard";
import SwipeButtons from "../common/SwipeButtons";
import type { IRestaurant } from "../../types/restaurant";
import { useTranslation } from "react-i18next";

interface IProps {
  restaurants: IRestaurant[];
}

const ITEMS_TO_SHOW = 4;

const TopRestaurantsPage = ({ restaurants }: IProps) => {
  const { t } = useTranslation();

  const [startIndex, setStartIndex] = useState(0);

  return (
    <Box>
      <Box
        sx={{
          py: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" fontWeight={700}>
          {t("topRestaurantsHeader")}
        </Typography>
        <SwipeButtons
          startIndex={startIndex}
          endIndex={4}
          onLeftClick={() => setStartIndex((prev) => prev - 1)}
          onRightClick={() => setStartIndex((prev) => prev + 1)}
        />
      </Box>
      <Box sx={{ overflow: "hidden", position: "relative" }}>
        <Box
          sx={{
            mt: 1,
            display: "flex",
            gap: 0.6,
            transform: `translateX(-${(startIndex * 204) / ITEMS_TO_SHOW}%)`,
            transition: "transform 0.5s ease-in-out",
          }}
        >
          {restaurants?.map((place: IRestaurant) => {
            return (
              <Box
                sx={{
                  flex: `0 0 ${100 / ITEMS_TO_SHOW}%`,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <RestaurantCard place={place} />
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default TopRestaurantsPage;
