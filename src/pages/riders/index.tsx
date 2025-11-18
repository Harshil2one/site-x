import { useEffect } from "react";
import {
  Avatar,
  Box,
  Card,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import {
  Chart as ChartJS,
  ArcElement,
  LinearScale,
  Tooltip,
  Legend,
  CategoryScale,
  LineElement,
  PointElement,
} from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import useFetch from "../../hooks/useFetch";
import { useTranslation } from "react-i18next";
import type { IOrder } from "../../types/order";
import moment from "moment";
import type { IFood } from "../../types/food";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement
);

const RidersDashboard = () => {
  const { t } = useTranslation();

  const { getLocalStorage } = useLocalStorage();
  const user = getLocalStorage("user");

  const { response, makeAPICall } = useFetch();

  const fetchDashboardData = async () => {
    await makeAPICall(`riders/get-dashboard-details/${user?.id}`, {
      method: "GET",
    });
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const dashboardData = response?.data || {
    totalRevenue: 0,
    totalOrders: 0,
    ratings: 0.0,
    orders: {},
    dailyRevenue: {},
    recentOrders: [],
    revenueGrowth: 0,
  };

  return (
    <Box sx={{ pt: 1, pb: 3 }}>
      <Box
        sx={{
          background: "url(../../../public/assets/background.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          p: 3,
          borderRadius: 2,
        }}
      >
        <Typography
          sx={{
            fontSize: "28px",
            fontWeight: 700,
            mb: 1,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          {t("heyText")}, {user?.name}! {t("welcomeText")} Bigbite Partners
          <img
            src="../../../public/assets/waving.svg"
            width={45}
            height={45}
            loading="lazy"
          />
        </Typography>
        <Typography variant="body1" sx={{ fontSize: 18, fontWeight: 600 }}>
          {t("ridersDashboardHeader")}
        </Typography>
      </Box>
      <Grid container spacing={3} sx={{ mt: 3 }}>
        {[
          {
            label: "totalEarn",
            value: dashboardData?.totalRevenue?.toFixed(2),
            color: "green",
          },
          {
            label: "successRate",
            value: dashboardData?.revenueGrowth?.toFixed(2) + "%",
            color: "navy",
          },
          {
            label: "ratingsText",
            value: dashboardData?.ratings?.toFixed(2),
            color: "orange",
          },
          {
            label: "ordersCompleted",
            value: dashboardData?.totalOrders,
            color: "red",
          },
        ]?.map((card) => (
          <Grid
            key={card.label}
            size={{ md: 3, sm: 6, xs: 12 }}
            component={Card}
            sx={{
              p: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{ fontSize: 34, fontWeight: 600, color: card.color }}
            >
              {card.value}
            </Typography>
            <Typography sx={{ fontWeight: 600 }}>{t(card.label)}</Typography>
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid size={{ md: 8, sm: 12 }}>
          <Card sx={{ p: 3 }}>
            <Typography
              fontWeight={700}
              mb={2}
              display="flex"
              alignItems="center"
              gap={1}
            >
              {t("orders")}
            </Typography>
            <Line
              data={{
                labels: Object.keys(dashboardData?.orders),
                datasets: [
                  {
                    label: t("orders"),
                    data: Object.values(dashboardData?.orders),
                    borderColor: "#42A5F5",
                  },
                ],
              }}
              options={{
                plugins: { legend: { display: false } },
                scales: {
                  y: {
                    beginAtZero: true,
                    grace: 2,
                  },
                },
              }}
            />
          </Card>
        </Grid>

        <Grid size={{ md: 4, sm: 12 }}>
          <Card sx={{ p: 3 }}>
            <Typography
              fontWeight={700}
              mb={2}
              display="flex"
              alignItems="center"
              gap={1}
            >
              {t("earnings")}
            </Typography>
            <Doughnut
              data={{
                labels: Object.keys(dashboardData?.dailyRevenue),
                datasets: [
                  {
                    label: "Revenue",
                    data: Object.values(dashboardData?.dailyRevenue),
                    backgroundColor: Object.values(
                      dashboardData?.dailyRevenue
                    )?.map((_revenue) => {
                      const letters = "0123456789ABCDEF";
                      let color = "#";
                      for (let i = 0; i < 6; i++) {
                        color += letters[Math.floor(Math.random() * 16)];
                      }
                      return color;
                    }),
                    hoverOffset: 4,
                    borderWidth: 0,
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: { position: "bottom" },
                },
              }}
            />
          </Card>
        </Grid>
      </Grid>
      <Card sx={{ p: 3, mt: 3 }}>
        <Typography sx={{ fontWeight: 700 }}>{t("recentOrders")}</Typography>
        <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
          {dashboardData?.recentOrders?.map((order: IOrder, index: number) => (
            <Box
              key={index}
              sx={{
                border: "1px solid #E0E0E0",
                borderRadius: 2,
                px: 2,
                py: 2,
                bgcolor: "white",
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                transition: "all 0.2s ease-in-out",
              }}
            >
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar
                  src={order.user?.image}
                  alt={order.user?.name || "User"}
                  sx={{ width: 40, height: 40 }}
                />
                <Box>
                  <Typography sx={{ fontWeight: 600, color: "#2F2F2F" }}>
                    {order.user?.name || "Deleted Account"}
                  </Typography>
                  <Typography sx={{ fontSize: 13, color: "#7A7A7A" }}>
                    {order.user?.email || "No email"}
                  </Typography>
                  {order.user?.contact && (
                    <Typography sx={{ fontSize: 13, color: "#7A7A7A" }}>
                      📞 {order.user.contact}
                    </Typography>
                  )}
                </Box>
              </Stack>

              <Divider sx={{ my: 1.5 }} />

              <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                {order.food?.map(
                  (f: IFood, i: number) => (
                    <Typography key={i} sx={{ fontSize: 14, color: "#333" }}>
                      {f.count} × {f.name}
                    </Typography>
                  )
                )}
              </Box>

              <Divider sx={{ my: 1.5 }} />

              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography sx={{ fontSize: 14, color: "#555" }}>
                  Delivered on{" "}
                  {moment(order.delivered_time * 1000).format(
                    "DD MMM YYYY, hh:mm A"
                  )}
                </Typography>

                <Typography
                  sx={{
                    color: "#27AE60",
                    fontSize: 16,
                    fontWeight: 700,
                  }}
                >
                  ₹{Number(order.delivery_fee)?.toFixed(2)}
                </Typography>
              </Stack>
            </Box>
          ))}
        </Box>
      </Card>
    </Box>
  );
};

export default RidersDashboard;
