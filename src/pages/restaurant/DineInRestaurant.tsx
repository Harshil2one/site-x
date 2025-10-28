import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  Divider,
  Modal,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useParams } from "react-router";
import { motion } from "framer-motion";
import useFetch from "../../hooks/useFetch";
import type { IRestaurant } from "../../types/restaurant";
import {
  Calendar,
  CheckCircle2,
  CircleStar,
  Clock3,
  Dot,
  MapPin,
  PhoneCall,
} from "lucide-react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import toast from "react-hot-toast";

const DineInRestaurantPage = () => {
  const { restaurantId } = useParams();
  const { loading, error, makeAPICall } = useFetch();

  const { getLocalStorage } = useLocalStorage();
  const user = getLocalStorage("user");

  const [selectedTab, setSelectedTab] = useState(0);
  const [isBooked, setIsBooked] = useState(false);
  const [restaurantDetails, setRestaurantDetails] = useState({} as IRestaurant);

  const handleBookTable = async () => {
    const res = await makeAPICall(`restaurants/book-table`, {
      method: "POST",
      data: {
        email: user?.email,
        restaurantId,
      },
    });
    if ([200, 201].includes(res?.status)) {
      setIsBooked(true);
    } else {
      toast.error(error);
    }
  };

  useEffect(() => {
    (async () => {
      const response: any = await makeAPICall(`restaurants/${restaurantId}`, {
        method: "GET",
      });
      setRestaurantDetails(response.data);
    })();
  }, []);

  return (
    <Box sx={{ py: 3, px: 4 }}>
      <Modal open={isBooked && !loading}>
        <Box
          component={motion.div}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          sx={{
            position: "absolute",
            top: "25%",
            left: "35%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            borderRadius: 3,
            boxShadow: 24,
            p: 5,
            textAlign: "center",
            width: 400,
          }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ duration: 0.6 }}
            style={{
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#E7F8ED",
              borderRadius: "50%",
              width: 80,
              height: 80,
              marginBottom: 20,
            }}
          >
            <CheckCircle2 size={50} color="#4CAF50" />
          </motion.div>

          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
            Table Booked Successfully!
          </Typography>
          <Typography variant="body1" sx={{ color: "gray", mb: 3 }}>
            Your reservation at <b>{restaurantDetails?.name}</b> has been
            confirmed. Please check your email for details.
          </Typography>

          <Button
            variant="contained"
            color="success"
            onClick={() => setIsBooked(false)}
            sx={{
              textTransform: "none",
              px: 4,
              py: 1,
              borderRadius: "8px",
              fontWeight: 600,
            }}
          >
            Okay
          </Button>
        </Box>
      </Modal>
      <Typography sx={{ fontSize: "28px", fontWeight: 700, mb: 3 }}>
        {restaurantDetails?.name}
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 4 }}>
        <Tabs
          value={selectedTab}
          onChange={(_event, newValue) => setSelectedTab(newValue)}
        >
          <Tab label="Dineout" />
          <Tab label="Menu" />
        </Tabs>
      </Box>
      <img
        src={restaurantDetails?.images?.[0]}
        style={{
          width: "100%",
          height: "290px",
          borderRadius: "24px",
          objectFit: "cover",
        }}
      />
      <Card
        sx={{
          width: "500px",
          px: 3,
          pt: 3,
          pb: 2,
          position: "absolute",
          top: 285,
          left: 255,
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
        <Typography variant="body1" sx={{ fontWeight: 700 }}>
          Continental, Suspicious
        </Typography>
        <Typography
          variant="body1"
          sx={{
            display: "flex",
            gap: 1.5,
            alignItems: "center",
            fontWeight: 700,
            color: "grey",
          }}
        >
          Location
          <span style={{ color: "black", fontWeight: 600 }}>
            {restaurantDetails?.address}
          </span>
        </Typography>
        <Typography
          variant="body1"
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "center",
            fontWeight: 700,
            color:
              new Date().getHours() < 9 && new Date().getHours() > 21
                ? "red"
                : "green",
          }}
        >
          {new Date().getHours() < 9 && new Date().getHours() > 21
            ? "CLOSED • CLOSED, OPENS AT 9AM"
            : "OPEN • OPEN, CLOSES AT 9PM"}
        </Typography>
        <Divider sx={{ mt: 1, mb: 1 }} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              color: "#D54545",
              display: "flex",
              gap: 1,
              alignItems: "center",
              fontWeight: 700,
              cursor: "pointer",
            }}
            onClick={handleBookTable}
          >
            <Calendar size={22} />
            Book Table
          </Typography>
          <Divider
            orientation="vertical"
            variant="middle"
            flexItem
            sx={{ height: "20px" }}
          />
          <Typography
            sx={{
              color: "#D54545",
              display: "flex",
              gap: 1,
              alignItems: "center",
              fontWeight: 700,
            }}
          >
            <PhoneCall size={22} />
            Call
          </Typography>
        </Box>
      </Card>
      <Box
        sx={{
          border: "2px solid #E1E1E1",
          background: "#E1E1E1",
          borderRadius: "4px",
          p: 0.2,
          mt: 4,
          mb: 2,
        }}
      />
      {selectedTab === 0 && (
        <>
          <Typography
            sx={{
              fontSize: "22px",
              fontWeight: 700,
              mt: 3,
              mb: 1.5,
            }}
          >
            Offers
          </Typography>
          <Box sx={{ display: "flex", gap: 2, overflowX: "auto" }}>
            <Card
              sx={{
                width: "340px",
                display: "flex",
                flexDirection: "column",
                gap: 2,
                py: 2,
                px: 3,
                border: "1px solid #ECEDED",
                borderRadius: 4,
                boxShadow: "none",
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography sx={{ fontWeight: 700, fontSize: "18px" }}>
                  Flat 35% Off
                </Typography>
                <Typography
                  sx={{ fontWeight: 600, fontSize: "14px", color: "grey" }}
                >
                  on total bill
                </Typography>
                <Typography
                  sx={{ fontWeight: 700, fontSize: "14px", color: "black" }}
                >
                  @ ₹25/guest
                </Typography>
              </Box>
              <Box sx={{ borderBottom: "1px dashed grey" }} />
              <Box>
                <Typography sx={{ fontSize: 12, fontWeight: 700 }}>
                  Pre-book offer
                </Typography>
                <Typography
                  sx={{ fontSize: 12, fontWeight: 600, color: "navy" }}
                >
                  Limited slots, buy offer and book your table
                </Typography>
              </Box>
            </Card>
            <Card
              sx={{
                width: "340px",
                display: "flex",
                flexDirection: "column",
                gap: 2,
                py: 2,
                px: 3,
                border: "1px solid #ECEDED",
                borderRadius: 4,
                boxShadow: "none",
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography sx={{ fontWeight: 700, fontSize: "18px" }}>
                  Flat 25% Off
                </Typography>
                <Typography
                  sx={{ fontWeight: 600, fontSize: "14px", color: "grey" }}
                >
                  on total bill
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: "14px",
                    color: "black",
                    opacity: 0,
                  }}
                >
                  1
                </Typography>
              </Box>
              <Box sx={{ borderBottom: "1px dashed grey" }} />
              <Box>
                <Typography sx={{ fontSize: 12, fontWeight: 700 }}>
                  Walk-in offers
                </Typography>
                <Typography
                  sx={{ fontSize: 12, fontWeight: 600, color: "navy" }}
                >
                  Pay restaurant bill via Bigbite to avail the offer
                </Typography>
              </Box>
            </Card>
          </Box>
          <Typography
            sx={{
              fontSize: "18px",
              fontWeight: 700,
              mt: 3,
              mb: 1.5,
            }}
          >
            Additional Offers
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
                    />
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Typography sx={{ fontWeight: 700, fontSize: "18px" }}>
                        {offer}
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: 700,
                          fontSize: "14px",
                          color: "grey",
                        }}
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
          <Divider sx={{ mt: 6, mb: 4 }} />
        </>
      )}
      <Box>
        <Typography variant="h6" fontWeight={700} fontSize={22} sx={{ py: 1 }}>
          Food
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 3.7,
          }}
        >
          {["menu-1.jpg", "menu-2.jpg", "menu-3.webp"]?.map((menu) => (
            <img
              src={`../../../public/assets/${menu}`}
              width={300}
              height={350}
            />
          ))}
        </Box>
      </Box>
      {selectedTab === 0 && (
        <>
          <Box sx={{ my: 2 }}>
            <Typography sx={{ fontWeight: 700, fontSize: 18 }}>
              Popular dishes
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              {restaurantDetails?.special?.join(", ")}
            </Typography>
          </Box>
          <Box sx={{ my: 3 }}>
            <Typography sx={{ fontWeight: 700, fontSize: 18 }}>
              Cuisines
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              Continental, Suspicious
            </Typography>
          </Box>
          <Divider sx={{ my: 4 }} />
          <Box>
            <Typography
              variant="h6"
              fontWeight={700}
              fontSize={22}
              marginBottom={1}
            >
              Location
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <MapPin size={22} color="grey" />
              {restaurantDetails?.address}
            </Typography>
          </Box>
          <Box sx={{ my: 4 }}>
            <Typography
              variant="h6"
              fontWeight={700}
              fontSize={22}
              marginBottom={1}
            >
              Timings
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Clock3 size={22} color="grey" />
              {new Date().getHours() < 9 && new Date().getHours() > 21
                ? "CLOSED • CLOSED, OPENS AT 9AM"
                : "OPEN • OPEN, CLOSES AT 9PM"}
            </Typography>
          </Box>
          <Divider />
          <Box sx={{ mt: 4 }}>
            <Typography
              variant="h6"
              fontWeight={700}
              fontSize={22}
              marginBottom={1}
            >
              Facilities
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Dot size={22} />
              BigbitePay accepted
            </Typography>
          </Box>
        </>
      )}
    </Box>
  );
};

export default DineInRestaurantPage;
