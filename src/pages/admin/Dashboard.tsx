import React, { useEffect } from "react";
import { Box, Card, Grid, Typography } from "@mui/material";
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
import { Doughnut, Line, Pie } from "react-chartjs-2";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import useFetch from "../../hooks/useFetch";
import { Cpu, Glasses, MemoryStick, Timer } from "lucide-react";
import { keyframes } from "@mui/system";

const scrollUp = keyframes`
  0% { transform: translateY(100%); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateY(-100%); opacity: 0; }
`;

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement
);

const Dashboard = () => {
  const { getLocalStorage } = useLocalStorage();
  const user = getLocalStorage("user");

  const { response, makeAPICall } = useFetch();
  const monitorDetails = response?.data;
  const usedHeap = monitorDetails?.usedHeap || 0;
  const totalHeap = monitorDetails?.totalHeap || 1;
  const usedPercent = Math.min((usedHeap / totalHeap) * 100, 100);
  const remainingPercent = 100 - usedPercent;
  const rss = monitorDetails?.rss || 100;
  const points = Array.from({ length: 8 }, (_, i) => Math.round((rss / 7) * i));

  useEffect(() => {
    makeAPICall(`auth/monitors`, {
      method: "GET",
    });
  }, []);

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
          Hey, {user?.name?.split(" ")?.[1]}!
          <img
            src="../../../public/assets/waving.svg"
            width={45}
            height={45}
            loading="lazy"
          />
        </Typography>
        <Typography variant="body1" sx={{ fontSize: 18, fontWeight: 600 }}>
          Take a look at your application stats
        </Typography>
      </Box>
      <Card sx={{ mt: 3, p: 2, fontSize: 20, fontWeight: 500 }}>
        APIs are running since last{" "}
        <span
          style={{
            fontWeight: 700,
            color:
              monitorDetails?.uptime >= 120
                ? "#d76161"
                : monitorDetails?.uptime > 60
                ? "#6189d7"
                : "#61d763",
          }}
        >
          {monitorDetails?.uptime}
        </span>{" "}
        minutes.
        {monitorDetails?.uptime >= 120 && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography
              sx={{
                color: "red",
                fontWeight: 700,
                animation: "glow 1.5s ease-in-out infinite alternate",
                "@keyframes glow": {
                  from: { textShadow: "0 0 5px rgba(255, 0, 0, 0.6)" },
                  to: { textShadow: "0 0 20px rgba(255, 0, 0, 1)" },
                },
              }}
            >
              Warning:
            </Typography>
            <Typography>
              Please close and restart your API servers to keep your data up to
              date.
            </Typography>
          </Box>
        )}
      </Card>
      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid size={{ md: 8, sm: 12 }}>
          <Grid container spacing={3}>
            <Grid size={{ md: 6, sm: 12 }}>
              <Card sx={{ p: 2 }}>
                <Typography
                  fontWeight={700}
                  mb={2}
                  display="flex"
                  alignItems="center"
                  gap={1}
                >
                  <MemoryStick size={20} /> Heap Usage (MB)
                </Typography>
                <Doughnut
                  data={{
                    labels: ["Occupied", "Remaining"],
                    datasets: [
                      {
                        label: "Usage (%)",
                        data: [usedPercent, remainingPercent],
                        backgroundColor: ["#FFA084", "rgb(54, 162, 235)"],
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
            <Grid size={{ md: 6, sm: 12 }}>
              <Card sx={{ p: 2 }}>
                <Typography
                  fontWeight={700}
                  mb={2}
                  display="flex"
                  alignItems="center"
                  gap={1}
                >
                  <Cpu size={20} /> CPU Usage (MB)
                </Typography>
                <Pie
                  data={{
                    labels: ["User", "System"],
                    datasets: [
                      {
                        label: "Usage",
                        data: [
                          monitorDetails?.cpu?.user,
                          monitorDetails?.cpu?.system,
                        ],
                        backgroundColor: ["#FFA084", "rgb(54, 162, 235)"],
                        hoverOffset: 4,
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
            <Grid size={12}>
              <Card sx={{ p: 3 }}>
                <Typography
                  fontWeight={700}
                  mb={2}
                  display="flex"
                  alignItems="center"
                  gap={1}
                >
                  <Timer size={20} /> RSS (MB)
                </Typography>
                <Line
                  data={{
                    labels: points,
                    datasets: [
                      {
                        label: "Memory",
                        data: points.map(
                          () => Math.random() * 10 + monitorDetails?.uptime
                        ),
                        borderColor: "#42A5F5",
                        tension: 0.3,
                      },
                    ],
                  }}
                  options={{
                    plugins: { legend: { display: false } },
                    scales: { y: { beginAtZero: true } },
                  }}
                />
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid size={{ md: 4, sm: 12 }}>
          <Card sx={{ p: 2, fontSize: 20, fontWeight: 500 }}>
            <Typography
              fontWeight={700}
              mb={2}
              display="flex"
              alignItems="center"
              gap={1}
            >
              <Glasses size={20} /> Specifications
            </Typography>
            <Box
              sx={{
                height: "110vh",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  animation: `${scrollUp} 12s linear infinite`,
                }}
              >
                {[
                  "Bigbite helps users to order their favorite foods by any restaurants easily and get it delivered within just 10-15 minutes.",
                  "It is built upon considering every use cases based on the user experiences. Team have used the application their self so they can understand better way about the flows and UI experience.",
                  "Delivery boys are also verified by their respective teams and have proper behavioral manners. So, If they by any how do the improper things to any user, they directly need to take the responsibility about the action and provide proper details if they are not at fault.",
                  "Bigbite is the application to make users life easier and better in case they do not have time or not want to visit the restaurants as many restaurants does not provide much sitting areas for much people.",
                  "We are working 24x7 to help customers resolve their queries and doubts related to the orders or the application. Customers can contact us via email or our contact information. Bigbite team will reach to them within 10-12 working hours.",
                  "If any customers found to be report false issues or dummy queries to take benefits from application, Immediate actions are going to be taken by the team and user might end up being blocked if team finds users fault into the queries or reports.",
                ].map((text, idx) => (
                  <Typography key={idx} sx={{ py: 0.5, textAlign: "left" }}>
                    {text}
                  </Typography>
                ))}
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
