import React, { useEffect, useState } from "react";
import { Box, Grid, Tab, Tabs, Typography } from "@mui/material";
import Filters from "../../components/home/Filters";
import type { IRestaurant } from "../../types/restaurant";
import RestaurantCard from "../../components/common/RestaurantCard";
import DineoutCard from "../../components/offers/DineoutCard";
import useFetch from "../../hooks/useFetch";

const dineoutFilters = [
  { id: 1, label: "distanceWithin5km", title: "Within 5km" },
  { id: 2, label: "offers", title: "Offers" },
  { id: 3, label: "ratings", title: "Ratings 4.0+" },
  { id: 4, label: "veg", title: "Pure Veg" },
  { id: 5, label: "nonVeg", title: "Non Veg" },
];

const onlineFilters = [
  { id: 1, label: "ratings", title: "Ratings 4.0+" },
  { id: 2, label: "veg", title: "Pure Veg" },
  { id: 3, label: "nonVeg", title: "Non Veg" },
  { id: 4, label: "offers", title: "Offers" },
  { id: 5, label: "new", title: "New on Bigbite" },
  { id: 6, label: "rateLessThan300", title: "Less Than Rs. 300" },
  { id: 7, label: "rate300to600", title: "Rs. 300-Rs. 600" },
];

const OffersPage = () => {
  const { response, setResponse, makeAPICall } = useFetch();
  const [selectedTab, setSelectedTab] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState<any>({});

  const fetchRestaurants = () => {
    setResponse([]);
    const filterQuery = Object.keys(selectedFilter)
      .filter((key) => selectedFilter?.[key])
      .join(",");
    makeAPICall(
      `restaurants?requests=approved&filter=${
        filterQuery ? filterQuery : "offers"
      }&mode=${selectedTab ? "dine" : "online"}`,
      {
        method: "GET",
      }
    );
  };

  useEffect(() => {
    if (Object.values(selectedFilter)?.length > 0) fetchRestaurants();
  }, [selectedTab, selectedFilter]);

  return (
    <Box sx={{ py: { md: 3, xs: 1, sm: 2 }, px: { md: 4, sm: 2, xs: 1 } }}>
      <img
        src={`../../../public/assets/${selectedTab ? "offers" : "food"}.jpg`}
        style={{
          borderRadius: "16px",
          width: "100%",
          height: "400px",
          objectFit: "cover",
          marginBottom: "16px",
        }}
        loading="lazy"
      />
      <Typography
        variant="h5"
        sx={{
          px: 1.5,
          color: "white",
          fontWeight: 600,
          position: "absolute",
          top: { md: 150, sm: 100, xs: 100 },
          left: { md: 230, sm: 30, xs: 30 },
          whiteSpace: "wrap",
          maxWidth: "400px",
        }}
      >
        {selectedTab
          ? "Restaurants With Great Offers Near Me"
          : "Great Food Offers Near You - Order Online Now!"}
      </Typography>
      <Typography
        variant="h6"
        sx={{
          px: 1.5,
          color: "white",
          fontWeight: 600,
          position: "absolute",
          bottom: 290,
          left: 230,
          whiteSpace: "wrap",
          maxWidth: "400px",
          display: "flex",
          gap: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            border: "1px solid white",
            px: 1.5,
            py: 1,
            fontWeight: 700,
            fontSize: "26px",
            lineHeight: "1.5rem",
            borderRadius: "8px",
            fontFamily: "auto",
          }}
        >
          B
        </Typography>
        {selectedTab ? "Dineout" : "Food"}
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={selectedTab}
          onChange={(_event, newValue) => setSelectedTab(newValue)}
        >
          <Tab label="Order Online" />
          <Tab label="Dineout" />
        </Tabs>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Filters
          filters={selectedTab ? dineoutFilters : onlineFilters}
          defaultSelected={["offers"]}
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
        />
      </Box>
      <Grid
        container
        spacing={2}
        sx={{
          mt: 4,
        }}
      >
        {selectedTab ? (
          response?.data?.length > 0 ? (
            response?.data?.map((restaurant: IRestaurant) => {
              return (
                <Grid size={{ md: 4, sm: 6, xs: 12 }}>
                  <DineoutCard place={restaurant} />
                </Grid>
              );
            })
          ) : (
            <Typography sx={{ fontSize: "18px", color: "grey" }}>
              No Restaurants Found.
            </Typography>
          )
        ) : response?.data?.length > 0 ? (
          response?.data?.map((restaurant: IRestaurant) => {
            return (
              <Grid size={{ md: 3, sm: 6, xs: 12 }}>
                <RestaurantCard place={restaurant} width={258} />
              </Grid>
            );
          })
        ) : (
          <Typography sx={{ fontSize: "18px", color: "grey" }}>
            No Restaurants Found.
          </Typography>
        )}
      </Grid>
      <Box
        sx={{
          mt: 10,
          border: "1px solid #e1e0e0",
          borderRadius: "8px",
          px: 3,
          py: 4,
        }}
      >
        <Typography variant="h5" fontWeight={700} sx={{ color: "#676A6D" }}>
          Get the Best Offers on Food from Top Restaurants Near You
        </Typography>
        <Typography
          variant="body1"
          fontSize={16}
          marginTop={1}
          sx={{ color: "#756A6D" }}
        >
          Get ready for a scrumptious adventure filled with unbeatable offers on
          your favourite foods and restaurants. Whether you're in the mood for a
          cheesy pizza, a sizzling burger, or a delightful bowl of pasta, now is
          the perfect time to satisfy your cravings while saving big.
        </Typography>
        <Typography
          variant="body1"
          fontSize={16}
          marginTop={0.8}
          sx={{ color: "#756A6D" }}
        >
          All the top-rated restaurants and popular eateries are rolling out
          enticing deals and discounts that are too good to resist. From
          mouthwatering buy-one-get-one-free offers to irresistible combo meals,
          there's something for everyone on Bigbite to relish without breaking
          the bank.
        </Typography>
        <Typography
          variant="body1"
          fontSize={16}
          marginTop={0.8}
          sx={{ color: "#756A6D" }}
        >
          Imagine biting into a juicy burger paired with a side of crispy fries,
          all at a fraction of the regular price. Or how about treating yourself
          to a cheesy, oven-fresh pizza with your favourite toppings without
          worrying about the bill? With these incredible food offers near me,
          indulging in your beloved dishes has never been more budget-friendly.
        </Typography>
        <Typography
          variant="body1"
          fontSize={16}
          marginTop={0.8}
          sx={{ color: "#756A6D" }}
        >
          So, whether you're planning a cozy night in, a family feast, or a fun
          dinner with friends, take advantage of these fantastic deals. It's
          time to savour the flavours you adore without emptying your wallet.
          Order now, support your local restaurants, and make every meal a
          delightful and cost-effective experience. Don’t miss out – let your
          taste buds rejoice, and your savings grow with these irresistible food
          offers near me on Bigbite!
        </Typography>
      </Box>
    </Box>
  );
};

export default OffersPage;
