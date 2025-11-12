import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useLocation,
  useNavigate,
  useParams,
} from "react-router";
import { Box, Card, Divider, Typography } from "@mui/material";
import { CircleStar, Rose, ShoppingBag } from "lucide-react";
import useFetch from "../../../hooks/useFetch";
import type { IRestaurant } from "../../../types/restaurant";
import SwipeButtons from "../../../components/common/SwipeButtons";
import FoodCard from "../../../components/common/FoodCard";
import type { IFood } from "../../../types/food";
import { FOOD_CARD_TYPE, PRIVATE_ROUTE, PUBLIC_ROUTE } from "../../../enums";
import type { AppDispatch, RootState } from "../../../redux/store";
import { getAllFoodItems } from "../../../redux/actions/restaurant";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import toast from "react-hot-toast";

const ITEMS_TO_SHOW = 4;

const RestaurantPage = () => {
  const { restaurantId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { response, makeAPICall } = useFetch();
  const restaurantDetails = response?.data as IRestaurant;

  const { getLocalStorage } = useLocalStorage();
  const user = getLocalStorage("user");

  const dispatch = useDispatch<AppDispatch>();

  const foods = useSelector((state: RootState) => state.restaurant.foodItems);
  const cart = useSelector((state: RootState) => state.cart.userCart?.food);
  const cartLength = new Set(cart).size;

  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    makeAPICall(`restaurants/${restaurantId}`, {
      method: "GET",
    });
  }, []);

  useEffect(() => {
    dispatch(getAllFoodItems(Number(restaurantId)));
  }, []);

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1));
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  }, [location]);

  return (
    <>
      <Box sx={{ py: { md: 3, xs: 1, sm: 2 }, px: { md: 4, sm: 2, xs: 1 } }}>
        <Typography sx={{ fontSize: "28px", fontWeight: 700, mb: 3 }}>
          {restaurantDetails?.name}
        </Typography>
        <Card
          sx={{
            p: 2,
            position: "relative",
            zIndex: 1,
            border: "1px solid #ECEDED",
            borderRadius: 8,
            boxShadow: "none",
            display: "flex",
            flexDirection: "column",
            gap: 0.8,
          }}
        >
          <Typography
            variant="body1"
            sx={{
              display: "flex",
              gap: 0.5,
              alignItems: "center",
              fontWeight: 700,
            }}
          >
            <CircleStar size={20} color="green" /> {restaurantDetails?.ratings}{" "}
            <span style={{ color: "grey", fontWeight: 600 }}>•</span>₹
            {restaurantDetails?.rate} for two
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontWeight: 700, color: "#D54545" }}
          >
            {restaurantDetails?.special?.join(", ")}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              display: "flex",
              gap: 1.5,
              alignItems: "center",
              fontWeight: 700,
            }}
          >
            • Outlet
            <span style={{ color: "grey", fontWeight: 600 }}>
              {restaurantDetails?.address}
            </span>
          </Typography>
          <Typography
            variant="body2"
            sx={{
              display: "flex",
              gap: 2,
              alignItems: "center",
              fontWeight: 700,
            }}
          >
            • {restaurantDetails?.time} mins
          </Typography>
          <Box
            sx={{
              position: "absolute",
              p: 0,
              bottom: 0,
              left: 0,
              width: "100%",
              height: "25%",
              borderRadius: "0 0 16px 16px",
              background:
                "linear-gradient(to top, rgb(55 52 52 / 8%), transparent)",
              zIndex: 0,
            }}
          />
        </Card>
        <Typography
          sx={{
            fontSize: "20px",
            fontWeight: 700,
            mt: 3,
            mb: 1.5,
          }}
        >
          Deals for you
        </Typography>
        <Box sx={{ display: "flex", gap: 2, overflowX: "auto" }}>
          {restaurantDetails?.offers?.length > 0 ? (
            restaurantDetails?.offers?.map((offer) => {
              return (
                <Card
                  sx={{
                    width: "340px",
                    display: "flex",
                    gap: 2,
                    alignItems: "center",
                    p: 2,
                    border: "1px solid #ECEDED",
                    borderRadius: 4,
                    boxShadow: "none",
                  }}
                >
                  <img
                    src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_96,h_96/offers/generic"
                    width={50}
                    height={50}
                    loading="lazy"
                  />
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography sx={{ fontWeight: 700, fontSize: "18px" }}>
                      {offer}
                    </Typography>
                    <Typography
                      sx={{ fontWeight: 700, fontSize: "14px", color: "grey" }}
                    >
                      USE RUPAY{(Math.floor(Math.random() * 20) + 1) * 5}
                    </Typography>
                  </Box>
                </Card>
              );
            })
          ) : (
            <Typography sx={{ fontWeight: 600 }}>
              Sorry, No active deals!
            </Typography>
          )}
        </Box>
        <Divider sx={{ mt: 6, mb: 4 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Rose
              size={16}
              color="#828387"
              style={{ transform: "scaleX(-1)" }}
            />
            <Typography
              sx={{
                letterSpacing: 3,
                color: "#828387",
                fontWeight: 600,
                fontSize: "14px",
              }}
            >
              MENU
            </Typography>
            <Rose
              size={16}
              color="#828387"
              style={{ transform: "scaleX(1)" }}
            />
          </Box>
        </Divider>
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
              Top Picks
            </Typography>
            <SwipeButtons
              startIndex={startIndex}
              endIndex={
                foods?.filter((food) => food.isBest === 1)?.length -
                ITEMS_TO_SHOW
              }
              onLeftClick={() =>
                setStartIndex((prev) => prev - ITEMS_TO_SHOW / 2)
              }
              onRightClick={() =>
                setStartIndex((prev) => prev + ITEMS_TO_SHOW / 2)
              }
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 3.7,
            }}
          >
            {foods?.filter((food) => food.isBest === 1)?.length ? (
              foods
                ?.filter((food) => food.isBest === 1)
                ?.slice(startIndex, startIndex + ITEMS_TO_SHOW)
                ?.map((food: IFood) => {
                  return (
                    <FoodCard
                      key={food?.id}
                      type={FOOD_CARD_TYPE.TOP_PICK}
                      foodInfo={food}
                    />
                  );
                })
            ) : (
              <Typography sx={{ fontWeight: 600 }}>
                Sorry, No food items are best
              </Typography>
            )}
          </Box>
        </Box>
        <Box
          sx={{
            border: "2px solid #F2F2F3",
            background: "#F2F2F3",
            borderRadius: "4px",
            p: 1,
            mt: 5,
            mb: 2,
          }}
        />
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
              Recommended ({foods?.length})
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            {foods?.length ? (
              foods?.map((food: IFood) => {
                return (
                  <>
                    <FoodCard type={FOOD_CARD_TYPE.LIST} foodInfo={food} />
                    <Divider sx={{ mt: 2 }} />
                  </>
                );
              })
            ) : (
              <Typography sx={{ fontWeight: 600 }}>
                Sorry, No food available
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
      {cartLength > 0 && (
        <Box
          sx={{
            position: "fixed",
            bottom: 0,
            left: { md: "12%", sm: "8%", xs: 0 },
            right: { md: "12%", sm: "8%", xs: 0 },
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#1ba672",
            p: 2,
            zIndex: 999,
          }}
        >
          <Typography sx={{ color: "white", fontWeight: 700 }}>
            {cartLength} item{cartLength > 1 ? "s" : ""} added
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 0.5,
              color: "white",
              fontWeight: 700,
              cursor: "pointer",
            }}
            onClick={() => {
              if (user?.id) navigate(PRIVATE_ROUTE.CART);
              else {
                toast.error("Please log in first.");
                navigate(PUBLIC_ROUTE.SIGNIN);
              }
            }}
          >
            VIEW CART <ShoppingBag size={18} />
          </Box>
        </Box>
      )}
    </>
  );
};

export default RestaurantPage;
