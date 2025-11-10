import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import axiosInstance from "../../utils/axiosInstance";
import CustomButton from "../../components/UI/Button";
import type { IOrder } from "../../types/order";
import { ORDER_STATUS, PRIVATE_ROUTE } from "../../enums";
import moment from "moment";
import { AlarmClock, CircleCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useLocalStorage } from "../../hooks/useLocalStorage";

const RidesPage = () => {
  const navigate = useNavigate();

  const { makeAPICall } = useFetch();

  const { getLocalStorage } = useLocalStorage();
  const user = getLocalStorage("user");

  const [pickupRequests, setPickupRequests] = useState<IOrder[]>([]);

  const fetchRideRequests = async () => {
    const response = await axiosInstance.get(`/orders/rides`);
    setPickupRequests(response?.data?.data);
  };

  const handleOrderRequest = async (orderId: number, status: ORDER_STATUS) => {
    await makeAPICall("orders/update-status", {
      method: "POST",
      data: {
        orderId,
        status,
        pickupBy: user?.id,
      },
    });
    fetchRideRequests();
  };

  useEffect(() => {
    fetchRideRequests();
  }, []);

  return (
    <Box sx={{ py: { md: 3, xs: 1, sm: 2 } }}>
      <Typography sx={{ fontSize: "28px", fontWeight: 700 }}>
        Pickup Requests
      </Typography>
      <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 3 }}>
        {pickupRequests?.length > 0 ? (
          pickupRequests.map((order) => (
            <Box
              sx={{
                p: 2.5,
                border: "1px solid #E1E1E1",
                borderRadius: "8px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "start",
                  flexDirection: { md: "row", sm: "row", xs: "column" },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    flexDirection: { md: "row", sm: "row", xs: "column" },
                  }}
                >
                  <img
                    src={order.restaurant.images?.[0]}
                    width={160}
                    height={100}
                    loading="lazy"
                  />
                  <Box>
                    <Typography
                      sx={{
                        fontWeight: 600,
                        fontSize: 20,
                        cursor: "pointer",
                        width: "max-content",
                        "&:hover": {
                          color: "#d54545",
                        },
                      }}
                      onClick={() =>
                        navigate(
                          `${PRIVATE_ROUTE.RESTAURANT}/${order.restaurant?.id}`
                        )
                      }
                    >
                      {order.restaurant?.name}
                    </Typography>
                    <Typography
                      sx={{
                        color: "#4D5070",
                        fontSize: 14,
                        fontWeight: 600,
                      }}
                    >
                      {order.restaurant?.address}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <Typography sx={{ fontSize: 13 }}>
                        ORDER #{order.order_id}
                      </Typography>
                      <Typography sx={{ fontSize: 13 }}>|</Typography>
                      <Typography sx={{ fontSize: 13 }}>
                        {moment(order.created_at * 1000).format(
                          "ddd, MMM DD, YYYY, hh:mm A"
                        )}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                {order?.order_status === ORDER_STATUS.OUT_FOR_DELIVERY &&
                !order?.pickup_by?.id ? (
                  <Typography
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      color: "#4D5070",
                      fontSize: 14,
                      fontWeight: 600,
                      gap: 0.5,
                      mt: { md: 0, sm: 2, xs: 2 },
                    }}
                  >
                    Waiting to be picked up
                    <AlarmClock color="#d54545" size={24} />
                  </Typography>
                ) : order?.order_status === ORDER_STATUS.DELIVERED ? (
                  <Typography
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      color: "#4D5070",
                      fontSize: 14,
                      fontWeight: 600,
                      gap: 0.5,
                      mt: { md: 0, sm: 2, xs: 2 },
                    }}
                  >
                    Delivered by {order?.pickup_by?.name} at{" "}
                    {moment(order?.delivered_time * 1000).format(
                      "MMM DD, YYYY hh:mm A"
                    )}
                    <CircleCheck fill="green" color="white" size={24} />
                  </Typography>
                ) : (
                  <Typography
                    sx={{
                      fontSize: 14,
                      fontWeight: 600,
                      mt: { md: 0, sm: 2, xs: 2 },
                    }}
                  >
                    Picked up by {order?.pickup_by?.name} at{" "}
                    {moment(order?.pickup_time * 1000).format(
                      "MMM DD, YYYY hh:mm A"
                    )}
                  </Typography>
                )}
              </Box>
              <Box sx={{ mt: 2, mb: 1, borderTop: "1px dashed #E1E1E1" }} />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "start",
                }}
              >
                <Typography sx={{ fontWeight: 500 }}>
                  {order.food?.map((f) => `${f.name} x ${f.count}`).join(", ")}
                </Typography>
                <Typography
                  sx={{
                    color: "#4D5070",
                    fontSize: 14,
                    fontWeight: 600,
                  }}
                >
                  Total Paid: ₹{order.amount}
                </Typography>
              </Box>
              {order?.order_status === ORDER_STATUS.OUT_FOR_DELIVERY &&
              !order?.pickup_by?.id ? (
                <CustomButton
                  btnText="Pick up"
                  style={{
                    display: "flex",
                    justifySelf: "end",
                    width: "max-content",
                    fontWeight: 700,
                    mt: 1,
                  }}
                  onClick={() =>
                    handleOrderRequest(order?.id, ORDER_STATUS.OUT_FOR_DELIVERY)
                  }
                />
              ) : order?.order_status !== ORDER_STATUS.DELIVERED ? (
                <CustomButton
                  btnText="Delivered"
                  style={{
                    display: "flex",
                    justifySelf: "end",
                    width: "max-content",
                    fontWeight: 700,
                    mt: 1,
                  }}
                  onClick={() =>
                    handleOrderRequest(order?.id, ORDER_STATUS.DELIVERED)
                  }
                />
              ) : null}
            </Box>
          ))
        ) : (
          <Typography
            textAlign="center"
            color="grey"
            fontSize={22}
            marginTop={2}
          >
            No Requests found.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default RidesPage;
