import React, { useEffect, useState } from "react";
import { Box, Divider, Typography } from "@mui/material";
import FoodSlides from "../components/home/FoodSlides";
import TopRestaurantsPage from "../components/home/TopRestaurants";
import Filters from "../components/home/Filters";
import useFetch from "../hooks/useFetch";
import type { IRestaurant } from "../types/restaurant";
import RestaurantCard from "../components/common/RestaurantCard";

const filters = [
  { id: 1, label: "ratings", title: "Ratings 4.0+" },
  { id: 2, label: "veg", title: "Pure Veg" },
  { id: 3, label: "non-veg", title: "Non Veg" },
  { id: 4, label: "offers", title: "Offers" },
  { id: 5, label: "rateLessThan300", title: "Less Than Rs. 300" },
  { id: 6, label: "rate300to600", title: "Rs. 300-Rs. 600" },
  { id: 7, label: "distanceWithin5km", title: "Within 5km" },
];

const cuisinesOptions = [
  "Kathiyawadi Restaurant Near Me",
  "Chinese Restaurant Near Me",
  "South Indian Restaurant Near Me",
  "Indian Restaurant Near Me",
  "Kerala Restaurant Near Me",
  "Korean Restaurant Near Me",
  "North Indian Restaurant Near Me",
  "Seafood Restaurant Near Me",
  "Bengali Restaurant Near Me",
  "Punjabi Restaurant Near Me",
  "Italian Restaurant Near Me",
];

const nearByOptions = [
  "Explore Restaurants Near Me",
  "Explore Top Restaurants Near Me",
];

const LIMIT = 12;

const HomePage = () => {
  const { response, makeAPICall } = useFetch();
  const allRestaurants = response?.data;

  const [selectedFilter, setSelectedFilter] = useState<any>({});

  useEffect(() => {
    const filterQuery = Object.keys(selectedFilter)
      .filter((key) => selectedFilter?.[key])
      .join(",");
    makeAPICall(`restaurants${filterQuery ? `?filter=${filterQuery}` : ""}`, {
      method: "GET",
    });
  }, [selectedFilter]);

  return (
    <>
      <Box sx={{ px: 3 }}>
        <FoodSlides />
      </Box>
      <Divider sx={{ mt: 6, mb: 4 }} />
      <Box sx={{ px: 3 }}>
        <TopRestaurantsPage restaurants={allRestaurants?.slice(0, LIMIT)} />
      </Box>
      <Divider sx={{ mt: 6, mb: 4 }} />
      <Box sx={{ px: 3 }}>
        <Typography variant="h5" fontWeight={700} data-testid="header-title">
          Restaurants with online food delivery around you
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Filters
            filters={filters}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
          />
          <Box
            sx={{
              mt: 2,
              display: "flex",
              flexWrap: "wrap",
              gap: 5,
            }}
          >
            {allRestaurants?.map((place: IRestaurant) => {
              return <RestaurantCard place={place} />;
            })}
          </Box>
        </Box>
      </Box>
      <Box sx={{ px: 5 }}>
        <Typography variant="h5" fontWeight={700} sx={{ pt: 6 }}>
          Best Cuisines Near Me
        </Typography>
        <Box sx={{ pt: 2, display: "flex", flexWrap: "wrap", gap: 2 }}>
          {cuisinesOptions?.map((cuisine) => (
            <Typography
              key={cuisine}
              variant="body1"
              sx={{
                px: 3,
                py: 2,
                fontWeight: 600,
                border: "1px solid grey",
                borderRadius: "16px",
              }}
            >
              {cuisine}
            </Typography>
          ))}
        </Box>
        <Typography variant="h5" fontWeight={700} sx={{ pt: 10 }}>
          Explore Every Restaurants Near Me
        </Typography>
        <Box sx={{ pt: 2, display: "flex", flexWrap: "wrap", gap: 2 }}>
          {nearByOptions?.map((option) => (
            <Typography
              key={option}
              variant="body1"
              sx={{
                px: 3,
                py: 2,
                fontWeight: 600,
                border: "1px solid grey",
                borderRadius: "16px",
              }}
            >
              {option}
            </Typography>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default HomePage;
