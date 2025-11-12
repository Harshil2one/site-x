import React, { useEffect, useRef, useState } from "react";
import {
  Avatar,
  Box,
  Card,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Rating,
  Typography,
} from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import Lottie from "lottie-react";
import waitingAnim from "../../../public/assets/waiting.json";
import cookingAnim from "../../../public/assets/cooking.json";
import packageAnim from "../../../public/assets/package.json";
import deliveryAnim from "../../../public/assets/delivery.json";
import successAnim from "../../../public/assets/success.json";
import failedAnim from "../../../public/assets/failed.json";
import cancelledOrderAnim from "../../../public/assets/order-cancelled.json";
import {
  BUTTON_VARIANT,
  ORDER_STATUS,
  PRIVATE_ROUTE,
  PUBLIC_ROUTE,
} from "../../enums";
import moment from "moment";
import { GST_PCT } from "./Cart";
import CustomButton from "../../components/UI/Button";
import { Copy, Download, Share2, Star, X } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import toast from "react-hot-toast";
import useFetch from "../../hooks/useFetch";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import Input from "../../components/UI/Input";
import socketService from "../../utils/socketService";

const PlaceOrder = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const { getLocalStorage } = useLocalStorage();
  const token = getLocalStorage("token");

  const { makeAPICall } = useFetch();

  const cardRef = useRef<HTMLDivElement>(null);
  const [order, setOrder] = useState<any>(null);
  const [shareLink, setShareLink] = useState<string | null>(null);
  const [ratingOpen, setRatingOpen] = useState(false);
  const [ratings, setRatings] = useState<number | null>(0);
  const [ratingsText, setRatingsText] = useState("");

  const fetchOrderDetails = async () => {
    try {
      const res = await axiosInstance.get(`/orders/status/${orderId}`, {
        headers: {
          token: shareLink?.split("token=")[1],
        },
      });
      const data = res?.data?.data;
      setOrder(data);
      if (
        data?.order_status === ORDER_STATUS.DELIVERED &&
        !data?.ratings &&
        !data?.ratingsText
      ) {
        setTimeout(() => {
          setRatingOpen(true);
        }, 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getAnimation = () => {
    switch (order?.order_status) {
      case ORDER_STATUS.PREPARING:
        return cookingAnim;
      case ORDER_STATUS.READY_FOR_PICKUP:
        return packageAnim;
      case ORDER_STATUS.OUT_FOR_DELIVERY:
        return deliveryAnim;
      case ORDER_STATUS.DELIVERED:
        return successAnim;
      case ORDER_STATUS.CANCELLED:
        return cancelledOrderAnim;
      default:
        return waitingAnim;
    }
  };

  const cancelOrder = async () => {
    if (!order?.id) {
      toast.error("No order found. Please try reloading the tab");
      return;
    }

    makeAPICall(`orders/cancel/${order?.id}`, {
      method: "POST",
      data: {
        paymentId: order?.payment_id,
        amount: moment(cancellationTime).isAfter(moment.now())
          ? order?.amount
          : 0,
      },
    });
    setTimeout(() => {
      fetchOrderDetails();
    }, 0);
  };

  const handleDownload = async () => {
    if (!order?.id) {
      toast.error("No order found. Please try reloading the tab");
      return;
    }

    if (!cardRef.current) return;

    const canvas = await html2canvas(cardRef.current, {
      scale: 2,
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${orderId}.pdf`);
  };

  const handleShare = async () => {
    setShareLink(window.location.href + "?token=" + token);
  };

  const handleCopy = async () => {
    if (!shareLink) return;
    await navigator.clipboard.writeText(shareLink);
    toast.success("Link copied to clipboard!");
  };

  const handlePartnerRatings = async () => {
    if (!order?.id) {
      toast.error("No order found. Please try reloading the tab");
      return;
    }
    makeAPICall(`orders/ratings/${order?.id}`, {
      method: "POST",
      data: {
        ratings,
        ratingsText,
      },
    });
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setTimeout(() => {
      setRatingOpen(false);
    }, 0);
  };

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  useEffect(() => {
    socketService.on("update_order_status", (payload: any) => {
      setOrder(payload);
    });

    return () => {
      socketService.off("update_order_status");
    };
  });

  if (order?.order_status === ORDER_STATUS.ORDER_REJECTED) {
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

  const restaurant = order?.restaurant;

  const itemsTotal = order?.food?.reduce(
    (total: number, item: any) => total + item.price * item.count,
    0
  );

  const deliveryCharge = Number(restaurant?.distance) * 10;

  const gstCharge = itemsTotal * GST_PCT;

  const cancellationTime = moment(order?.created_at * 1000)
    .add(10, "minutes")
    .format("MMM DD, YYYY, hh:mm A");

  return (
    <Box sx={{ py: { md: 3, xs: 1, sm: 2 }, px: { md: 4, sm: 2, xs: 1 } }}>
      <Dialog open={shareLink !== null} onClose={() => setShareLink(null)}>
        <DialogTitle>Share URL</DialogTitle>
        <DialogContent>
          <Input
            value={shareLink || ""}
            endAdornment={<Copy />}
            bounceTime={0}
            style={{ width: { md: "500px", sm: "auto", xs: "auto" } }}
            onEndClick={handleCopy}
          />
        </DialogContent>
      </Dialog>
      <Dialog open={ratingOpen} onClose={() => setRatingOpen(false)}>
        <DialogTitle>
          Rate delivery by{" "}
          <span style={{ color: "#d54545" }}>{order?.pickup_by?.name}</span>
        </DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Avatar
            src={"../../../public/assets/delivery-partner.avif"}
            sx={{ width: 100, height: 120 }}
          />
          <Rating
            name="order-rating"
            emptyIcon={<Star size={32} />}
            icon={<Star fill="orange" size={32} />}
            sx={{ display: "flex", gap: 3 }}
            value={ratings}
            onChange={(_, newValue) => setRatings(newValue)}
            precision={1}
          />
          <Box>
            <Input
              multiline
              bounceTime={0}
              style={{
                width: { md: "400px", sm: "auto", xs: "auto" },
                backgroundColor: "#F2F2F2",
              }}
              isReset
              value={ratingsText}
              onDebounce={(ratingsText) => setRatingsText(ratingsText)}
              placeholder={`Tell us what you ${
                !ratings
                  ? "observe"
                  : ratings && ratings <= 2
                  ? "feel"
                  : ratings > 2 && ratings <= 4
                  ? "liked"
                  : "loved"
              }...`}
            />
            <Typography sx={{ color: "grey", fontSize: 12 }}>
              Your word makes Bigbite a better place. You are the influence!
            </Typography>
          </Box>
          <CustomButton
            btnText="SUBMIT YOUR FEEDBACK"
            style={{
              marginTop: "8px",
              borderRadius: "18px",
            }}
            onClick={handlePartnerRatings}
          />
        </DialogContent>
      </Dialog>
      {order?.order_status !== ORDER_STATUS.DELIVERED &&
        order?.order_status !== ORDER_STATUS.CANCELLED && (
          <>
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
          </>
        )}

      <Box
        mt={
          order?.order_status !== ORDER_STATUS.DELIVERED &&
          order?.order_status !== ORDER_STATUS.CANCELLED
            ? 6
            : 2
        }
        textAlign="center"
      >
        <Lottie
          animationData={getAnimation()}
          loop={order?.order_status !== ORDER_STATUS.DELIVERED}
          style={{ width: 250, margin: "auto" }}
        />

        {order?.order_status === ORDER_STATUS.DELIVERED ? (
          <>
            <Typography variant="h4" fontWeight="bold" mt={2}>
              Order Delivered
            </Typography>
            <Typography color="text.secondary" mt={1}>
              Enjoy your meal from <b>{order?.restaurant?.name}</b>!
            </Typography>
          </>
        ) : order?.order_status === ORDER_STATUS.PREPARING ? (
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
        ) : order?.order_status === ORDER_STATUS.READY_FOR_PICKUP ? (
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
        ) : order?.order_status === ORDER_STATUS.OUT_FOR_DELIVERY ? (
          <>
            <Typography variant="h6" fontWeight="bold" color="primary" mb={1}>
              Out for Delivery
            </Typography>
            <Typography color="text.secondary">
              Your order is on the way! Get ready to enjoy your meal.
            </Typography>
            <Typography mt={1} color="text.secondary">
              Estimated time: {order?.estimatedTime || "12 mins"}
            </Typography>
          </>
        ) : order?.order_status === ORDER_STATUS.CANCELLED ? (
          <>
            <Typography variant="h6" fontWeight="bold" color="error" mb={1}>
              Order cancelled
            </Typography>
            <Box
              sx={{
                my: 3,
                border: "1px solid grey",
                borderRadius: 4,
                px: 3,
                py: 2,
                display: "flex",
                flexDirection: "column",
                gap: 0.5,
                alignItems: "start",
                width: "40%",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <Typography color="text.secondary" fontWeight={600} fontSize={18}>
                Cancellation fee ₹
                {moment().isAfter(cancellationTime) ? order?.amount : 0}
              </Typography>
              <Typography color="text.secondary" mb={1} textAlign="left">
                Your order from {restaurant?.name} has been cancelled.{" "}
                {`A fee has ${moment().isAfter(cancellationTime) ? "" : "not"}
                been charged as the order was cancelled ${
                  moment().isAfter(cancellationTime) ? "after" : "before"
                } 10 minutes from
                placing the order.`}
              </Typography>
              <Typography color="text.secondary" fontWeight={600} fontSize={18}>
                Refund amount ₹
                {moment().isAfter(cancellationTime) ? 0 : order?.amount}
              </Typography>
            </Box>
            <Link
              to={PUBLIC_ROUTE.HOME}
              style={{
                marginTop: "20px",
                textDecoration: "none",
                color: "white",
                padding: "8px 16px",
                background: "black",
                fontWeight: 600,
                borderRadius: "8px",
              }}
            >
              Go to Home
            </Link>
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
      {order?.order_status !== ORDER_STATUS.CANCELLED && (
        <Card>
          <Box ref={cardRef} sx={{ mt: 3, p: 2 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: { md: "row", sm: "column", xs: "column" },
                gap: 3,
              }}
            >
              <img src={restaurant?.images?.[0]} width={250} />
              <Box>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <Typography
                    sx={{
                      fontSize: "26px",
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
                  <Typography
                    sx={{ fontSize: "18px", fontWeight: 400, mt: 0.5 }}
                  >
                    {restaurant?.address}
                  </Typography>
                  <Box sx={{ border: "1px solid black", width: "100px" }} />
                </Box>
                <Typography sx={{ fontSize: 16, mt: 2 }}>
                  <b>ORDER: </b> {order?.order_id}
                </Typography>
                <Typography sx={{ fontSize: 16, mt: 1 }}>
                  {moment(order?.created_at * 1000).format(
                    "ddd, MMM DD, YYYY, hh:mm A"
                  )}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                mt: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  width: "100%",
                }}
              >
                {order?.food?.map(
                  (f: { name: string; count: number; price: number }) => (
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography
                        sx={{
                          color: "#4D5070",
                          fontSize: 14,
                          fontWeight: 600,
                        }}
                      >
                        {f?.name} x {f?.count}
                      </Typography>
                      <Typography
                        sx={{
                          color: "#4D5070",
                          fontSize: 14,
                          fontWeight: 600,
                        }}
                      >
                        ₹{(f?.count * f?.price)?.toFixed(2)}
                      </Typography>
                    </Box>
                  )
                )}
              </Box>
            </Box>
            <Box
              sx={{ mt: 3, border: "1px solid #d3d3d3", p: 2, borderRadius: 2 }}
            >
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
                  ₹{itemsTotal?.toFixed(2)}
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
                    fontSize: "13px",
                    color: "grey",
                    fontWeight: 600,
                  }}
                >
                  Delivery Fee | {restaurant?.distance} kms
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
                    fontSize: "13px",
                    color: "grey",
                    fontWeight: 600,
                  }}
                >
                  GST & Other Charges
                </Typography>
                <Typography
                  sx={{ fontSize: "14px", color: "grey", fontWeight: 600 }}
                >
                  ₹{gstCharge?.toFixed(2)}
                </Typography>
              </Box>
              <Divider
                sx={{ my: 1.5, backgroundColor: "black", height: "0.5px" }}
              />
              {Number((itemsTotal + gstCharge + deliveryCharge)?.toFixed(2)) -
                order?.amount >
                0 && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
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
                    - ₹
                    {(
                      itemsTotal +
                      gstCharge +
                      deliveryCharge -
                      order?.amount
                    )?.toFixed(2)}
                  </Typography>
                </Box>
              )}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  my: 0.5,
                }}
              >
                <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
                  Total Paid
                </Typography>
                <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
                  ₹{order?.amount}
                </Typography>
              </Box>
            </Box>
          </Box>
          {order?.order_status !== ORDER_STATUS.DELIVERED && (
            <Box sx={{ px: 3, pb: 2 }}>
              <Typography
                sx={{ color: "#d54545", fontSize: 16, fontWeight: 600 }}
              >
                Cancellation Policy
              </Typography>
              <Typography sx={{ mt: 0.5, color: "grey", fontSize: 14 }}>
                100% Refund if you cancel before {cancellationTime}
              </Typography>
            </Box>
          )}
          <Box
            sx={{
              mx: 2,
              mb: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {order?.order_status !== ORDER_STATUS.DELIVERED &&
              typeof token === "string" && (
                <CustomButton
                  btnText="Cancel Order"
                  icon={<X size={18} />}
                  style={{ width: "max-content" }}
                  onClick={cancelOrder}
                />
              )}
            <Box sx={{ display: "flex", gap: 2 }}>
              <CustomButton
                btnText="Share"
                variant={BUTTON_VARIANT.OUTLINED}
                icon={<Share2 size={18} />}
                style={{ width: "max-content" }}
                onClick={handleShare}
              />
              <CustomButton
                btnText="Download"
                icon={<Download size={18} />}
                style={{ width: "max-content" }}
                onClick={handleDownload}
              />
            </Box>
          </Box>
        </Card>
      )}
    </Box>
  );
};

export default PlaceOrder;
