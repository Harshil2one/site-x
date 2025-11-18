import { useEffect } from "react";
import { useParams } from "react-router";
import { Box, Typography } from "@mui/material";
import useFetch from "../../hooks/useFetch";
import RestaurantCard from "../../components/common/RestaurantCard";
import type { IRestaurant } from "../../types/restaurant";

const FoodCollectionPage = () => {
  const { food } = useParams();
  const { response, makeAPICall } = useFetch();
  const foodRestaurants = response?.data;

  useEffect(() => {
    makeAPICall(`restaurants?type=collection&search=${food}`, {
      method: "GET",
    });
  }, []);

  return (
    <Box sx={{ py: 6 }}>
      <Typography
        sx={{ fontSize: "40px", fontWeight: 600, textTransform: "capitalize" }}
      >
        {food ? food : ""}
      </Typography>
      <Typography sx={{ fontSize: "18px", fontWeight: 500 }}>
        Taste these delectable classics, delectable {food}s to make your day.
      </Typography>
      <Typography sx={{ mt: 3, fontSize: "24px", fontWeight: 700 }}>
        Restaurants to explore
      </Typography>
      <Box
        sx={{
          mt: 2,
          display: "flex",
          flexWrap: "wrap",
          gap: 5,
        }}
      >
        {foodRestaurants?.length ? (
          foodRestaurants?.map((place: IRestaurant) => {
            return <RestaurantCard key={place.id} place={place} width={258} />;
          })
        ) : (
          <Typography sx={{ fontSize: "18px" }}>
            No Restaurants are nearby.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default FoodCollectionPage;
