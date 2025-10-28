import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import { getAllOrdersHistory } from "../redux/actions/order";
import { useLocalStorage } from "../hooks/useLocalStorage";
import CustomButton from "../components/UI/Button";
import { PRIVATE_ROUTE, PUBLIC_ROUTE } from "../enums";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { CircleCheck } from "lucide-react";
import Loader from "../components/UI/Loader";
import type { IOrder } from "../types/order";
import { reorderCart } from "../redux/actions/cart";

const OrderHistoryPage = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const orderState = useSelector((state: RootState) => state.order);
  const { isLoading, orders } = orderState;

  const { getLocalStorage } = useLocalStorage();
  const user = getLocalStorage("user");

  const handleReorder = (order: IOrder) => {
    const food = order.food?.flatMap((item) => Array(item.count).fill(item.id));
    dispatch(
      reorderCart({
        userId: user.id,
        data: { food, restaurant: order.restaurant.id },
      })
    );
    navigate(PRIVATE_ROUTE.CART);
  };

  useEffect(() => {
    dispatch(getAllOrdersHistory(user.id));
  }, []);

  return (
    <Box sx={{ py: 3, px: 4 }}>
      <Loader fullScreen loading={isLoading}>
        {orders?.length > 0 ? (
          <>
            <Typography sx={{ fontSize: "28px", fontWeight: 700, mb: 2 }}>
              Past Orders
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {orders.map((order) => (
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
                    }}
                  >
                    <Box sx={{ display: "flex", gap: 2 }}>
                      <img
                        src={order.restaurant.images?.[0]}
                        width={160}
                        height={100}
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
                              `${PUBLIC_ROUTE.RESTAURANT}/${order.restaurant?.id}`
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
                    <Typography
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        color: "#4D5070",
                        fontSize: 14,
                        fontWeight: 600,
                      }}
                    >
                      Delivered on{" "}
                      {moment(order.created_at * 1000)
                        .add(10, "m")
                        .format("ddd, MMM DD, YYYY, hh:mm A")}{" "}
                      <CircleCheck fill="#1BA672" color="white" size={24} />
                    </Typography>
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
                      {order.food
                        ?.map((f) => `${f.name} x ${f.count}`)
                        .join(", ")}
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
                  <CustomButton
                    btnText="REORDER"
                    style={{
                      width: "max-content",
                      fontWeight: 700,
                      mt: 1,
                    }}
                    onClick={() => handleReorder(order)}
                  />
                </Box>
              ))}
            </Box>
          </>
        ) : (
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
                You've not ordered anything so far!
              </Typography>
              <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
                You can find restaurants worthy your first bite
              </Typography>
            </Box>
            <CustomButton
              btnText="ORDER SOMETHING"
              style={{ width: "max-content", fontWeight: 700 }}
              onClick={() => navigate(PUBLIC_ROUTE.HOME)}
            />
          </Box>
        )}
      </Loader>
    </Box>
  );
};

export default OrderHistoryPage;
