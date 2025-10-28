import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import SwipeButtons from "../common/SwipeButtons";
import { PUBLIC_ROUTE } from "../../enums";
import { useNavigate } from "react-router";

const foodOptions = [
  { id: 1, title: "Burger", src: "burger.webp" },
  { id: 2, title: "Biryani", src: "biryani.webp" },
  { id: 3, title: "Snacks", src: "indian-snacks.png" },
  { id: 4, title: "Chinese", src: "chinese.jpg" },
  { id: 5, title: "Khichdi", src: "khichdi.jpg" },
  { id: 6, title: "Kathiyawadi", src: "kathiyawadi.webp" },
  { id: 7, title: "Pizza", src: "pizza.webp" },
  { id: 8, title: "North Indian", src: "north-indian.webp" },
  { id: 9, title: "Coffee", src: "coffee.jpg" },
  { id: 10, title: "Parathas", src: "paratha.png" },
  { id: 11, title: "Sweets", src: "sweets.webp" },
  { id: 12, title: "South Indian", src: "south-indian.png" },
  { id: 13, title: "Shakes", src: "shake.jpg" },
  { id: 14, title: "Tea", src: "tea.png" },
  { id: 15, title: "Deserts", src: "deserts.jpg" },
];

const ITEMS_TO_SHOW = 6;

const FoodSlides = () => {
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
          What's on your mind?
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
                navigate(
                  `${
                    PUBLIC_ROUTE.FOOD_COLLECTION
                  }/${option.title?.toLowerCase()}`
                )
              }
            >
              <img
                src={`../../../public/assets/${option.src}`}
                alt={option.title}
                width={150}
                height={120}
              />
              <Typography fontSize="1rem" color="textSecondary">
                {option.title}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default FoodSlides;
