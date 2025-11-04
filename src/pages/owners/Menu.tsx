import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import CommonTable from "../../components/UI/Table";
import useFetch from "../../hooks/useFetch";
import { TABLE_NAME } from "../../enums";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import type { IRestaurant } from "../../types/restaurant";
import toast from "react-hot-toast";

const RestaurantMenu = () => {
  const { getLocalStorage } = useLocalStorage();
  const user = getLocalStorage("user");

  const { error, makeAPICall } = useFetch();

  const [restaurantDetails, setRestaurantDetails] = React.useState(
    {} as IRestaurant
  );
  const [allFoods, setAllFoods] = React.useState([]);

  const fetchRestaurants = async () => {
    const res = await makeAPICall(`restaurants?created_by=${user.id}`, {
      method: "GET",
    });
    const restaurantDetails = res?.data?.[0];
    setRestaurantDetails(restaurantDetails);
  };

  const fetchFoods = async () => {
    const res = await makeAPICall(`foods`, {
      method: "GET",
    });
    setAllFoods(res?.data);
  };

  useEffect(() => {
    fetchRestaurants();
    fetchFoods();
  }, []);

  return (
    <Box sx={{ py: { md: 3, xs: 1, sm: 2 } }}>
      <Typography sx={{ fontSize: "28px", fontWeight: 700 }}>Menu</Typography>
      <Typography variant="body1" sx={{ color: "text.secondary", mb: 2 }}>
        All Foods are listed with required details
      </Typography>

      <CommonTable
        tableName={TABLE_NAME.MENU}
        headers={[
          { id: "name", label: "Name", align: "left" },
          { id: "description", label: "Description", align: "left" },
          { id: "price", label: "Price", align: "left" },
          { id: "type", label: "Food Type", align: "center" },
          { id: "ratings", label: "Ratings", align: "center" },
          { id: "food-actions", label: "Actions", align: "center" },
        ]}
        listData={allFoods}
        restaurant={restaurantDetails}
        isPagination={false}
        rowsToShow={allFoods?.length}
        handleEdit={async (id: number) => {
          console.log("sss", [id, ...restaurantDetails?.food]);
          const res = await makeAPICall(
            restaurantDetails.id > 0
              ? `restaurants/${restaurantDetails.id}`
              : `restaurants`,
            {
              method: restaurantDetails.id > 0 ? "PUT" : "POST",
              data: {
                ...restaurantDetails,
                food: [...restaurantDetails?.food, id],
              },
            }
          );
          if ([200, 201].includes(res?.status)) {
            toast.success(res?.message);
          } else {
            toast.error(error);
          }
          setTimeout(() => {
            fetchRestaurants();
          }, 0);
        }}
        handleDelete={async (id: number) => {
          const res = await makeAPICall(
            restaurantDetails.id > 0
              ? `restaurants/${restaurantDetails.id}`
              : `restaurants`,
            {
              method: restaurantDetails.id > 0 ? "PUT" : "POST",
              data: {
                ...restaurantDetails,
                food: restaurantDetails?.food?.filter(
                  (foodId) => foodId !== id
                ),
              },
            }
          );
          if ([200, 201].includes(res?.status)) {
            toast.success(res?.message);
          } else {
            toast.error(error);
          }
          setTimeout(() => {
            fetchRestaurants();
          }, 0);
        }}
      />
    </Box>
  );
};

export default RestaurantMenu;
