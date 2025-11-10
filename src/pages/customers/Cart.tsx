import React, { useEffect, useState } from "react";
import { Box, Card, Divider, Grid, Tooltip, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  emptyCartItems,
  getAllCartItems,
  updateCartItems,
} from "../../redux/actions/cart";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { type AppDispatch, type RootState } from "../../redux/store";
import {
  BUTTON_VARIANT,
  PRIVATE_ROUTE,
  PUBLIC_ROUTE,
  RESTAURANT_TYPE,
} from "../../enums";
import { Link, useNavigate } from "react-router";
import Address from "../../components/common/AddressField";
import type { IAddress } from "../../types/common";
import useFetch from "../../hooks/useFetch";
import Input from "../../components/UI/Input";
import CustomButton from "../../components/UI/Button";
import { Info, Tag, Trash2 } from "lucide-react";
import RenderRazorpay from "../../components/payments/RenderRazorpay";
import axiosInstance from "../../utils/axiosInstance";
import Loader from "../../components/UI/Loader";
import FoodCounterButton from "../../components/common/FoodCounterButton";
import type { IFood } from "../../types/food";
import { addToCart, removeFromCart } from "../../redux/slices/cart";
import toast from "react-hot-toast";

export const GST_PCT = 0.18;

const paymentMethods = [
  { id: 1, label: "Cards", icon: "card.png", value: "card" },
  { id: 2, label: "Net Banking", icon: "net-banking.png", value: "netbanking" },
  { id: 3, label: "Wallets", icon: "wallet.jpg", value: "wallet" },
  { id: 4, label: "Pay Later", icon: "pay-later.png", value: "paylater" },
];

const CartPage = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const { getLocalStorage, setLocalStorage } = useLocalStorage();
  const user = getLocalStorage("user");
  const { response, error, setError, makeAPICall } = useFetch();

  const [couponCode, setCouponCode] = useState("");
  const [codeApplied, setCodeApplied] = useState(false);
  const [displayRazor, setDisplayRazor] = useState(false);
  const [orderDetails, setOrderDetails] = useState({
    method: "card",
    amount: 0,
    orderId: "",
  });
  const [address, setAddress] = useState(
    user?.address || {
      line1: "",
      line2: "",
      city: "",
      state: "",
      pin: "",
    }
  );

  const cartItems = useSelector((state: RootState) => state.cart);
  const { isLoading, cartDetails, userCart } = cartItems;
  const { cart, restaurant } = cartDetails;
  const { food } = userCart || { food: [] };

  const countMap: Record<number, number> = {};
  food?.forEach((id: number) => {
    countMap[id] = (countMap[id] || 0) + 1;
  });

  const cartTotal = cart?.reduce((total, item) => {
    const count = countMap[item.id] || 0;
    return total + item.price * count;
  }, 0);

  const deliveryCharge = Number(restaurant?.distance) * 10;

  const gstCharge = cartTotal * GST_PCT;

  const discount = (cartTotal * Number(response?.data)) / 100;

  const addToCartHandler = (food: IFood) => {
    const data = {
      food: food.id,
      restaurant: restaurant.id,
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

  const removeFromCartHandler = (food: IFood) => {
    const data = {
      food: food.id,
      restaurant: restaurant.id,
    };
    dispatch(removeFromCart(data));
    dispatch(
      updateCartItems({
        userId: user.id,
        data: { ...data, action: "remove" },
      })
    );
  };

  const validateCouponCode = () => {
    setDisplayRazor(false);
    if (codeApplied || error) {
      setCouponCode("");
      setCodeApplied(false);
      setError("");
      return;
    }
    if (couponCode) {
      makeAPICall(`coupon/${user.id}`, {
        method: "POST",
        data: { code: couponCode },
      });
      setCodeApplied(true);
    }
  };

  const handleCreateOrder = async (amount: number) => {
    if (!user?.address) {
      toast.error("Please fill the address before placing order.");
      return;
    }
    const data: any = await makeAPICall("orders/createOrder", {
      method: "POST",
      data: {
        amount,
        userId: user.id,
        orderInfo: { email: user.email, food, restaurant: restaurant.id },
      },
    });

    if (data) {
      const { order_id, amount } = data.data;
      setOrderDetails({
        ...orderDetails,
        orderId: order_id,
        amount: amount,
      });
      makeAPICall(`coupon/redeem/${user.id}`, {
        method: "POST",
        data: { code: couponCode },
      });
      setDisplayRazor(true);
    }
  };

  const handlePaymentFailure = async (error: { payment_id: string }) => {
    setDisplayRazor(false);
    await axiosInstance.post(
      `/orders/capturePaymentFailure/${orderDetails.orderId}`,
      {
        payment_id: error.payment_id,
      },
      {
        headers: {
          "x-razorpay-signature": import.meta.env.VITE_RAZORPAY_KEY_SECRET,
        },
      }
    );
  };

  const updateAddress = () => {
    makeAPICall(`profile/address/${user?.id}`, {
      method: "PATCH",
      data: { address: JSON.stringify(address) },
    }).finally(() => setLocalStorage("user", { ...user, address }));
  };

  useEffect(() => {
    dispatch(getAllCartItems(user.id));
  }, []);

  if (!food?.length) {
    return (
      <Box
        sx={{
          pt: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <img
          src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_yfxml0"
          width={350}
          height={350}
          loading="lazy"
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Typography sx={{ fontWeight: 700, fontSize: 20 }}>
            Your cart is empty
          </Typography>
          <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
            You can go to home page to view more restaurants
          </Typography>
        </Box>
        <CustomButton
          btnText="SEE RESTAURANTS NEAR YOU"
          style={{ width: "max-content", fontWeight: 700 }}
          onClick={() => navigate(PUBLIC_ROUTE.HOME)}
        />
      </Box>
    );
  }

  return (
    <Loader fullScreen loading={isLoading}>
      <Card
        sx={{
          py: { md: 3, xs: 1, sm: 2 },
          px: { md: 4, sm: 2, xs: 1 },
          boxShadow: "none",
          border: "1px solid #8080802e",
        }}
      >
        <Box sx={{ display: "flex", gap: 2, alignItems: "start" }}>
          <img
            src={restaurant?.images?.[0]}
            width={60}
            height={60}
            style={{
              objectFit: "cover",
            }}
            loading="lazy"
          />
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.8 }}>
              <Typography
                sx={{
                  fontSize: "20px",
                  fontWeight: 600,
                  lineHeight: "1rem",
                  cursor: "pointer",
                }}
                onClick={() =>
                  navigate(`${PRIVATE_ROUTE.RESTAURANT}/${restaurant.id}`)
                }
              >
                {restaurant?.name}
              </Typography>
              <Typography sx={{ fontSize: "14px", fontWeight: 400 }}>
                {restaurant?.address}
              </Typography>
              <Box sx={{ border: "1px solid black", width: "50px", mt: 1.2 }} />
            </Box>
            <CustomButton
              btnText="Remove"
              variant={BUTTON_VARIANT.OUTLINED}
              style={{ width: "max-content" }}
              icon={<Trash2 size={20} />}
              onClick={() => dispatch(emptyCartItems(user.id))}
            />
          </Box>
        </Box>
        <Box sx={{ mt: 4, display: "flex", flexDirection: "column", gap: 3 }}>
          <Box sx={{ mt: 4, display: "flex", flexDirection: "column", gap: 3 }}>
            {food &&
              (() => {
                return cart?.map((f) => {
                  if (!countMap[f.id]) return null;
                  return (
                    <Box
                      key={f.id}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Box
                        sx={{ display: "flex", gap: 2, alignItems: "center" }}
                      >
                        <img
                          src={`../../../public/assets/${
                            f?.type == RESTAURANT_TYPE.VEG
                              ? "veg-icon.png"
                              : "non-veg-icon.png"
                          }`}
                          width={16}
                          height={16}
                          loading="lazy"
                        />
                        <Typography sx={{ fontWeight: 500 }}>
                          {f?.name} x {countMap[f.id]}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: 5,
                        }}
                      >
                        <FoodCounterButton
                          item={f}
                          cart={food}
                          style={{
                            position: "initial",
                          }}
                          addToCart={() => addToCartHandler(f)}
                          removeFromCart={() => removeFromCartHandler(f)}
                        />
                        <Typography sx={{ fontSize: "16px", fontWeight: 600 }}>
                          ₹{f.price * countMap[f.id]}
                        </Typography>
                      </Box>
                    </Box>
                  );
                });
              })()}
          </Box>
        </Box>
        <Divider sx={{ my: 4 }} />
        <Grid container spacing={2}>
          <Grid size={{ md: 6, xs: 12 }}>
            <Typography sx={{ fontWeight: 600, fontSize: "14px", mb: 1 }}>
              Bill Details
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                my: 0.5,
              }}
            >
              <Typography
                sx={{ fontSize: "13px", color: "grey", fontWeight: 600 }}
              >
                Item Total
              </Typography>
              <Typography
                sx={{ fontSize: "14px", color: "grey", fontWeight: 600 }}
              >
                ₹{cartTotal?.toFixed(2)}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                my: 0.5,
              }}
            >
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  fontSize: "13px",
                  color: "grey",
                  fontWeight: 600,
                }}
              >
                Delivery Fee | {restaurant?.distance} kms{" "}
                <Tooltip
                  title="Delivery fee breakup for this order"
                  placement="top"
                  arrow
                >
                  <Info
                    color="grey"
                    size={14}
                    style={{
                      cursor: "pointer",
                    }}
                  />
                </Tooltip>
              </Typography>
              <Typography
                sx={{ fontSize: "14px", color: "grey", fontWeight: 600 }}
              >
                ₹{deliveryCharge?.toFixed(2)}
              </Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                my: 0.5,
              }}
            >
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  fontSize: "13px",
                  color: "grey",
                  fontWeight: 600,
                }}
              >
                GST & Other Charges
                <Tooltip
                  title="Platform fee + Restaurant GST + GST on delivery fee"
                  placement="top"
                  arrow
                >
                  <Info
                    color="grey"
                    size={14}
                    style={{
                      cursor: "pointer",
                    }}
                  />
                </Tooltip>
              </Typography>
              <Typography
                sx={{ fontSize: "14px", color: "grey", fontWeight: 600 }}
              >
                ₹{gstCharge?.toFixed(2)}
              </Typography>
            </Box>
            <Divider
              sx={{ my: 2, backgroundColor: "black", height: "0.5px" }}
            />
            {codeApplied && !error && response?.message && (
              <>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    my: 0.5,
                  }}
                >
                  <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
                    Total
                  </Typography>
                  <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
                    ₹{(cartTotal + deliveryCharge + gstCharge)?.toFixed(2)}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    my: 0.5,
                  }}
                >
                  <Typography
                    sx={{ fontSize: "14px", fontWeight: 600, color: "#1BA672" }}
                  >
                    Coupon Applied
                  </Typography>
                  <Typography
                    sx={{ fontSize: "14px", fontWeight: 600, color: "#1BA672" }}
                  >
                    - ₹{discount?.toFixed(2)}
                  </Typography>
                </Box>
              </>
            )}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                my: 0.5,
                mt: 1,
              }}
            >
              <Typography sx={{ fontSize: "16px", fontWeight: 700 }}>
                TO PAY
              </Typography>
              <Typography sx={{ fontSize: "16px", fontWeight: 700 }}>
                ₹
                {(
                  cartTotal +
                  deliveryCharge +
                  gstCharge -
                  (codeApplied && !error && response?.message ? discount : 0)
                )?.toFixed(2)}
              </Typography>
            </Box>
          </Grid>
          <Grid
            size={{ md: 1, xs: 0 }}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Divider orientation="vertical" />
          </Grid>
          <Grid size={{ md: 5, xs: 12 }}>
            <Typography sx={{ fontWeight: 600, fontSize: "14px", mb: 1 }}>
              Pay Via
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              {paymentMethods?.map((method) => (
                <Box
                  sx={{
                    borderColor:
                      orderDetails.method === method.value
                        ? "#639ef7"
                        : "#E1E1E1",
                    borderWidth: orderDetails.method === method.value ? 3 : 1,
                    borderStyle: "solid",
                    borderRadius: "8px",
                    p: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setOrderDetails({
                      ...orderDetails,
                      method: method.value,
                    });
                    setDisplayRazor(false);
                  }}
                >
                  <img
                    src={`../../../public/assets/${method.icon}`}
                    width={80}
                    height={80}
                    loading="lazy"
                  />
                  <Typography
                    sx={{
                      fontWeight:
                        orderDetails.method === method.value ? 600 : 400,
                      fontSize: "14px",
                    }}
                  >
                    {method.label}
                  </Typography>
                </Box>
              ))}
              <CustomButton
                btnText="Pay Now"
                style={{
                  mt: 1.5,
                }}
                onClick={() =>
                  handleCreateOrder(
                    cartTotal +
                      deliveryCharge +
                      gstCharge -
                      (codeApplied && !error && response?.message
                        ? discount
                        : 0)
                  )
                }
              />
            </Box>
          </Grid>
        </Grid>
      </Card>
      <Card
        sx={{
          mt: 2,
          px: 4,
          py: 3,
          boxShadow: "none",
          border: "1px solid #8080802e",
        }}
      >
        <Typography
          sx={{
            fontSize: "20px",
            fontWeight: 700,
            lineHeight: "1rem",
            color: "grey",
          }}
        >
          Savings Corner
        </Typography>
        <Input
          placeholder="Enter Coupon Code"
          style={{
            mt: 2,
            width: "100%",
            ".MuiInputBase-input": {
              textTransform: "uppercase !important",
            },
          }}
          value={couponCode}
          bounceTime={0}
          onDebounce={(code) => setCouponCode(code)}
          startAdornment={<Tag size={20} />}
          disabled={codeApplied}
          isFocused={!codeApplied}
          endAdornment={
            <Typography
              sx={{
                fontSize: "0.8rem",
                fontWeight: 600,
                color: codeApplied ? "red" : "grey",
                opacity: couponCode ? 1 : 0.6,
                cursor: couponCode ? "pointer" : "not-allowed",
              }}
              onClick={validateCouponCode}
            >
              {codeApplied ? "REMOVE" : "APPLY"}
            </Typography>
          }
        />
        {codeApplied && error && (
          <Typography
            sx={{
              px: 1,
              pt: 0.5,
              color: "red",
              fontWeight: 600,
              fontSize: "15px",
            }}
          >
            {error}
          </Typography>
        )}
        {codeApplied && !error && response?.message && (
          <Typography
            sx={{
              px: 1,
              pt: 0.5,
              color: "#1BA672",
              fontWeight: 600,
              fontSize: "15px",
            }}
          >
            Yay! You have got ₹{discount} off.
          </Typography>
        )}
      </Card>
      <Card
        sx={{
          mt: 2,
          px: 4,
          py: 3,
          boxShadow: "none",
          border: "1px solid #8080802e",
        }}
      >
        <Address
          address={address}
          isAutoUpdate={true}
          handleChange={(key, value) =>
            setAddress((prev: IAddress) => {
              return {
                ...prev,
                [key]: value,
              };
            })
          }
          updateAddress={updateAddress}
        />
      </Card>
      <Card
        sx={{
          mt: 2,
          px: 4,
          py: 3,
          boxShadow: "none",
          border: "1px solid #8080802e",
        }}
      >
        <Typography sx={{ fontSize: "18px", fontWeight: 700 }}>
          Review your order and address details to avoid cancellations
        </Typography>
        <Typography sx={{ fontSize: "14px", mt: 1, mb: 1.5 }}>
          <b>Note:</b> Please ensure your address and order details are correct.
          This order, if cancelled, is non-refundable.
        </Typography>
        <Link style={{ color: "red" }} to={PUBLIC_ROUTE.PRIVACY_POLICY}>
          Read Policy
        </Link>
      </Card>
      <RenderRazorpay
        displayRazor={displayRazor}
        orderDetails={orderDetails}
        onFailure={handlePaymentFailure}
      />
    </Loader>
  );
};

export default CartPage;
