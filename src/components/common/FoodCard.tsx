import { Box, Typography } from "@mui/material";
import { Star } from "lucide-react";
import { FOOD_CARD_TYPE, RESTAURANT_TYPE } from "../../enums";
import type { IFood } from "../../types/food";
import FoodCounterButton from "./FoodCounterButton";
import { addToCart, removeFromCart } from "../../redux/slices/cart";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../../redux/store";
import { useParams } from "react-router";
import { updateCartItems } from "../../redux/actions/cart";
import { useLocalStorage } from "../../hooks/useLocalStorage";

interface IProps {
  type: FOOD_CARD_TYPE;
  foodInfo: IFood;
}

const FoodCard = (props: IProps) => {
  const { type, foodInfo } = props;

  const { restaurantId } = useParams();

  const { getLocalStorage } = useLocalStorage();
  const user = getLocalStorage("user");

  const dispatch = useDispatch<AppDispatch>();
  const food = useSelector((state: RootState) => state.cart.userCart?.food);

  const addToCartHandler = () => {
    const data = {
      food: foodInfo.id,
      restaurant: Number(restaurantId),
    };
    dispatch(addToCart(data));
    dispatch(
      updateCartItems({
        userId: user.id,
        data: {
          ...data,
          action: "add",
        },
      })
    );
  };

  const removeFromCartHandler = () => {
    const data = {
      food: foodInfo.id,
      restaurant: Number(restaurantId),
    };
    dispatch(removeFromCart(data));
    dispatch(
      updateCartItems({
        userId: user.id,
        data: { ...data, action: "remove" },
      })
    );
  };

  if (type === FOOD_CARD_TYPE.LIST) {
    return (
      <Box
        id={foodInfo?.id?.toString()}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: {md: 0, sm: 2, xs: 1}
        }}
      >
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <img
              src={`../../../public/assets/${
                foodInfo?.type == RESTAURANT_TYPE.VEG
                  ? "veg-icon.png"
                  : "non-veg-icon.png"
              }`}
              width={18}
              height={18}
              loading="lazy"
            />
            {foodInfo?.isBest === 1 && (
              <Typography
                sx={{
                  color: "#FF6E5A",
                  fontWeight: 600,
                  fontSize: "14px",
                  textDecoration: "underline",
                }}
              >
                Bestseller
              </Typography>
            )}
          </Box>
          <Typography
            sx={{
              fontSize: "18px",
              fontWeight: 700,
            }}
          >
            {foodInfo?.name}
          </Typography>
          <Typography
            sx={{
              fontWeight: 600,
            }}
          >
            ₹{foodInfo?.price}
          </Typography>
          {foodInfo?.ratings ? (
            <Typography
              sx={{
                mt: 1,
                fontWeight: 700,
                fontSize: "12px",
                display: "flex",
                alignItems: "center",
                gap: 0.2,
              }}
            >
              <Star size={18} color="white" fill="#30AC7F" />
              <span style={{ color: "#30AC7F" }}>{foodInfo?.ratings}</span>
              <span style={{ color: "#676A6D" }}>
                ({foodInfo?.ratingsCount})
              </span>
            </Typography>
          ) : null}
          <Typography
            sx={{
              mt: 1.3,
              textWrap: "wrap",
              maxWidth: "800px",
              color: "#676A7A",
            }}
          >
            {foodInfo?.description}
          </Typography>
        </Box>
        <Box>
          <Box
            sx={{
              position: "relative",
              display: "inline-block",
            }}
          >
            {foodInfo?.image && (
              <img
                src={foodInfo?.image}
                width={180}
                height={180}
                style={{ objectFit: "cover", borderRadius: 16 }}
                loading="lazy"
              />
            )}
            <FoodCounterButton
              item={foodInfo}
              cart={food}
              addToCart={addToCartHandler}
              removeFromCart={removeFromCartHandler}
            />
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      id={foodInfo?.id?.toString()}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: 250,
          height: 230,
          borderRadius: "16px",
          overflow: "hidden",
        }}
      >
        <img
          src={foodInfo?.image}
          width="100%"
          height="100%"
          style={{ objectFit: "cover" }}
          loading="lazy"
        />

        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "radial-gradient(circle,rgba(238, 174, 202, 0) 0%, rgba(0, 0, 0, 0.59) 100%)",
          }}
        />

        <img
          src={`../../../public/assets/${
            foodInfo?.type == RESTAURANT_TYPE.VEG
              ? "veg-icon.png"
              : "non-veg-icon.png"
          }`}
          width={14}
          height={14}
          style={{
            position: "absolute",
            top: 12,
            left: 12,
          }}
          loading="lazy"
        />

        <Typography
          sx={{
            position: "absolute",
            bottom: 180,
            left: 12,
            color: "white",
            fontWeight: 700,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "220px",
          }}
        >
          {foodInfo?.name}
        </Typography>

        <Typography
          sx={{
            position: "absolute",
            bottom: 25,
            left: 15,
            color: "white",
            fontWeight: 600,
            fontSize: "18px",
          }}
        >
          ₹{foodInfo?.price}
        </Typography>

        <FoodCounterButton
          item={foodInfo}
          cart={food}
          addToCart={addToCartHandler}
          removeFromCart={removeFromCartHandler}
        />
      </Box>
    </Box>
  );
};

export default FoodCard;
