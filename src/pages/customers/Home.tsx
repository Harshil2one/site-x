import { useEffect, useState } from "react";
import { Box, Divider, Typography } from "@mui/material";
import FoodSlides from "../../components/home/FoodSlides";
import TopRestaurantsPage from "../../components/home/TopRestaurants";
import Filters from "../../components/home/Filters";
import useFetch from "../../hooks/useFetch";
import type { IRestaurant } from "../../types/restaurant.ts";
import RestaurantCard from "../../components/common/RestaurantCard";
import { useTranslation } from "react-i18next";

const filters = [
  { id: 1, label: "ratings" },
  { id: 2, label: "veg" },
  { id: 3, label: "nonVeg" },
  { id: 4, label: "offers" },
  { id: 5, label: "rateLessThan300" },
  { id: 6, label: "rate300to600" },
  { id: 7, label: "distanceWithin5km" },
];

const cuisinesOptions = [
  "cuisine1",
  "cuisine2",
  "cuisine3",
  "cuisine4",
  "cuisine5",
  "cuisine6",
  "cuisine7",
  "cuisine8",
  "cuisine9",
  "cuisine10",
  "cuisine11",
];

const nearByOptions = ["nearBy1", "nearBy2"];

const LIMIT = 12;

const HomePage = () => {
  const { response, makeAPICall } = useFetch();
  const allRestaurants = response?.data;

  const { t } = useTranslation();

  const [selectedFilter, setSelectedFilter] = useState<any>({});

  const fetchRestaurants = () => {
    const filterQuery = Object.keys(selectedFilter)
      .filter((key) => selectedFilter?.[key])
      .join(",");
    makeAPICall(
      `restaurants?requests=approved${
        filterQuery ? `&filter=${filterQuery}` : ""
      }`,
      {
        method: "GET",
      }
    );
  };

  useEffect(() => {
    if (Object.values(selectedFilter)?.length > 0) fetchRestaurants();
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
          {t("homeHeader")}
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
              justifyContent: { md: "", xs: "center" },
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
          {t("cuisineTitle")}
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
              {t(cuisine)}
            </Typography>
          ))}
        </Box>
        <Typography variant="h5" fontWeight={700} sx={{ pt: 10 }}>
          {t("nearByTitle")}
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
              {t(option)}
            </Typography>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default HomePage;
