import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import Lottie from "lottie-react";
import waitingAnim from "../../../public/assets/waiting.json";
import cookingAnim from "../../../public/assets/cooking.json";
import packageAnim from "../../../public/assets/package.json";
import deliveryAnim from "../../../public/assets/delivery.json";
import successAnim from "../../../public/assets/success.json";
import failedAnim from "../../../public/assets/failed.json";

const PlaceOrder = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState<any>(null);

  const fetchOrderDetails = async () => {
    try {
      const res = await axiosInstance.get(`/orders/status/${orderId}`);
      setOrder(res?.data?.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
    const interval = setInterval(fetchOrderDetails, 10000);
    return () => clearInterval(interval);
  }, []);

  const getAnimation = () => {
    switch (order?.order_status) {
      case 1:
        return cookingAnim;
      case 2:
        return packageAnim;
      case 3:
        return deliveryAnim;
      case 4:
        return successAnim;
      default:
        return waitingAnim;
    }
  };

  if (order?.order_status === 7) {
    return (
      <Box
        sx={{
          py: { md: 3, xs: 1, sm: 2 },
          px: { md: 4, sm: 2, xs: 1 },
          mt: 6,
          textAlign: "center",
        }}
      >
        <Lottie
          animationData={failedAnim}
          loop={false}
          style={{ width: 350, margin: "auto" }}
        />
        <Typography variant="h4" mt={2} color="error">
          Order Failed
        </Typography>
        <Typography color="text.secondary" mt={1}>
          Your order could not be processed. Please contact support or try
          again.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ py: { md: 3, xs: 1, sm: 2 }, px: { md: 4, sm: 2, xs: 1 } }}>
      <Typography
        variant="h5"
        fontWeight="bold"
        textAlign="center"
        gutterBottom
      >
        Tracking your order 🚴‍♂️
      </Typography>
      <Typography textAlign="center" color="text.secondary" mb={4}>
        Order ID: {orderId}
      </Typography>

      <Box mt={6} textAlign="center">
        <Lottie
          animationData={getAnimation()}
          loop={order?.order_status !== 4}
          style={{ width: 250, margin: "auto" }}
        />

        {order?.order_status === 4 ? (
          <>
            <Typography variant="h4" fontWeight="bold" mt={2}>
              Order Delivered
            </Typography>
            <Typography color="text.secondary" mt={1}>
              Enjoy your meal from <b>{order?.restaurant?.name}</b>!
            </Typography>
          </>
        ) : order?.order_status === 1 ? (
          <>
            <Typography variant="h6" fontWeight="bold" color="primary" mb={1}>
              Preparing your food
            </Typography>
            <Typography color="text.secondary">
              {order?.restaurant?.name} is cooking your meal.
            </Typography>
            <Typography mt={1} color="text.secondary">
              Estimated time: {order?.estimatedTime || "25 mins"}
            </Typography>
          </>
        ) : order?.order_status === 2 ? (
          <>
            <Typography variant="h6" fontWeight="bold" color="primary" mb={1}>
              Ready for Pickup
            </Typography>
            <Typography color="text.secondary">
              Waiting for delivery partner to pick it up.
            </Typography>
            <Typography mt={1} color="text.secondary">
              Remaining time: {order?.estimatedTime || "18 mins"}
            </Typography>
          </>
        ) : order?.order_status === 3 ? (
          <>
            <Typography variant="h6" fontWeight="bold" color="primary" mb={1}>
              Out for Delivery
            </Typography>
            <Typography color="text.secondary">
              Your order is on the way! Get ready to enjoy your meal.
            </Typography>
            <Typography mt={1} color="text.secondary">
              Remaining time: {order?.estimatedTime || "12 mins"}
            </Typography>
          </>
        ) : (
          <>
            <Typography variant="h6" fontWeight="bold" color="primary" mb={1}>
              Waiting for confirmation
            </Typography>
            <Typography color="text.secondary">
              {order?.restaurant?.name} hasn’t accepted your order yet.
            </Typography>
            <Typography mt={1} color="text.secondary">
              Estimated time: {order?.estimatedTime || "30 mins"}
            </Typography>
          </>
        )}
      </Box>
    </Box>
  );
};

export default PlaceOrder;
