import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import SwipeButtons from "../common/SwipeButtons";
import { PUBLIC_ROUTE } from "../../enums";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

const foodOptions = [
  { id: 1, title: "burger", src: "burger.webp" },
  { id: 2, title: "biryani", src: "biryani.webp" },
  { id: 3, title: "snacks", src: "indian-snacks.png" },
  { id: 4, title: "chinese", src: "chinese.jpg" },
  { id: 5, title: "khichdi", src: "khichdi.jpg" },
  { id: 6, title: "kathiyawadi", src: "kathiyawadi.webp" },
  { id: 7, title: "pizza", src: "pizza.webp" },
  { id: 8, title: "northIndian", src: "north-indian.webp" },
  { id: 9, title: "coffee", src: "coffee.jpg" },
  { id: 10, title: "parathas", src: "paratha.png" },
  { id: 11, title: "sweets", src: "sweets.webp" },
  { id: 12, title: "southIndian", src: "south-indian.png" },
  { id: 13, title: "shakes", src: "shake.jpg" },
  { id: 14, title: "tea", src: "tea.png" },
  { id: 15, title: "deserts", src: "deserts.jpg" },
];

const ITEMS_TO_SHOW = 6;

const FoodSlides = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
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
          {t("foodSlidesHeader")}
        </Typography>
        <SwipeButtons
          startIndex={startIndex}
          endIndex={5}
          onLeftClick={() => setStartIndex((prev) => prev - 1)}
          onRightClick={() => setStartIndex((prev) => prev + 1)}
        />
      </Box>

      <Box sx={{ overflow: "hidden", position: "relative" }}>
        <Box
          sx={{
            display: "flex",
            gap: 0.5,
            transform: `translateX(-${(startIndex * 183.5) / ITEMS_TO_SHOW}%)`,
            transition: "transform 0.5s ease-in-out",
          }}
        >
          {foodOptions.map((option) => (
            <Box
              key={option.id}
              sx={{
                flex: `0 0 ${100 / ITEMS_TO_SHOW}%`,
                display: "flex",
                flexDirection: "column",
                gap: 0.5,
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() =>
                navigate(`${PUBLIC_ROUTE.FOOD_COLLECTION}/${option.title}`)
              }
            >
              <img
                src={`../../../public/assets/${option.src}`}
                alt={option.title}
                width={150}
                height={120}
                loading="lazy"
              />
              <Typography fontSize="1rem" color="textSecondary">
                {t(option.title)}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default FoodSlides;
