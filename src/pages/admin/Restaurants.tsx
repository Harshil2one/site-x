import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { Box, Typography } from "@mui/material";
import CommonTable from "../../components/UI/Table";
import useFetch from "../../hooks/useFetch";
import { PRIVATE_ROUTE, STATUS, TABLE_NAME } from "../../enums";
import toast from "react-hot-toast";

const Restaurants = () => {
  const navigate = useNavigate();

  const { error, makeAPICall } = useFetch();

  const [allRestaurants, setAllRestaurants] = React.useState([]);

  const fetchRestaurants = async () => {
    const res = await makeAPICall(`restaurants`, {
      method: "GET",
    });
    setAllRestaurants(res?.data);
  };

  const handleReject = async (id: number) => {
    const res = await makeAPICall(`restaurants/${id}`, {
      method: "PATCH",
      data: {
        status: STATUS.REJECTED,
      },
    });
    if (res?.status === 200) {
      toast.success(res?.message);
    } else {
      toast.error(error);
    }
    setTimeout(() => {
      fetchRestaurants();
    }, 0);
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  return (
    <Box sx={{ py: { md: 3, xs: 1, sm: 2 } }}>
      <Typography sx={{ fontSize: "28px", fontWeight: 700 }}>
        Restaurants
      </Typography>
      <Typography variant="body1" sx={{ color: "text.secondary", mb: 2 }}>
        All Restaurants are listed with required details
      </Typography>

      <CommonTable
        tableName={TABLE_NAME.RESTAURANTS}
        headers={[
          { id: "isSpecial", label: "Sp.", align: "center" },
          { id: "name", label: "Name", align: "left" },
          { id: "address", label: "Address", align: "left" },
          { id: "special", label: "Special Dishes", align: "left" },
          { id: "time", label: "Waiting Time", align: "center" },
          { id: "mode", label: "Service Mode", align: "center" },
          { id: "ratings", label: "Ratings", align: "center" },
          { id: "restaurant-actions", label: "Actions", align: "center" },
        ]}
        listData={allRestaurants}
        handleNameClick={(id: number) =>
          navigate(`${PRIVATE_ROUTE.RESTAURANT}/${id}`)
        }
        handleEdit={async (id: number) => {
          await makeAPICall(`restaurants/${id}`, {
            method: "PATCH",
            data: {
              status: STATUS.APPROVED,
            },
          });
          fetchRestaurants();
        }}
        handleDelete={handleReject}
      />
    </Box>
  );
};

export default Restaurants;
