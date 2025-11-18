import { Box, Card, CardContent, Chip, Typography } from "@mui/material";
import Slider from "react-slick";
import { BadgePercent, CalendarCheck, CircleStar } from "lucide-react";
import type { IRestaurant } from "../../types/restaurant";
import { PUBLIC_ROUTE } from "../../enums";
import { useNavigate } from "react-router";

interface IProps {
  place: IRestaurant;
}

const DineoutCard = ({ place }: IProps) => {
  const navigate = useNavigate();

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Card
      key={place.id}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 0.5,
        alignItems: "start",
        cursor: "pointer",
        width: "360px",
        overflow: "hidden",
        borderRadius: "12px",
      }}
      onClick={() => navigate(`${PUBLIC_ROUTE.DINE_IN_RESTAURANT}/${place.id}`)}
    >
      <Box sx={{ width: "100%", height: 200 }}>
        <Slider {...sliderSettings}>
          {place.images.map((img, index) => (
            <Box key={index}>
              <img
                src={img}
                alt={place.name}
                style={{
                  width: "100%",
                  height: 200,
                  objectFit: "cover",
                  borderRadius: "12px 12px 0 0",
                }}
                loading="lazy"
              />
            </Box>
          ))}
        </Slider>
        <Box
          sx={{
            position: "relative",
            bottom: 85,
            left: 0,
            height: "40%",
            background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
          }}
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 1.5,
            color: "white",
            position: "relative",
            bottom: 120,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "250px",
            }}
          >
            {place.name}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 0.5,
              fontWeight: 600,
            }}
          >
            <CircleStar size={18} /> {place.ratings}
          </Typography>
        </Box>
        {place.isSpecial ? (
          <Box
            sx={{
              position: "relative",
              left: 12,
              top: -310,
            }}
          >
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: "14px",
                color: "white",
                width: "max-content",
                background:
                  "radial-gradient(circle, rgba(213, 69, 69, 0.74) 25%, rgba(255, 255, 255, 0) 100%)",
              }}
            >
              Special
            </Typography>
          </Box>
        ) : null}
      </Box>

      <CardContent
        sx={{
          width: "-webkit-fill-available",
          padding: "6px 12px 12px 12px !important",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="caption"
            color="textSecondary"
            sx={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "250px",
            }}
          >
            {place.special.join(" • ")}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            ₹{place.rate} for two
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="caption"
            color="textSecondary"
            sx={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "250px",
            }}
          >
            {place.address}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            {place.distance} km
          </Typography>
        </Box>
        <Chip
          label="Table booking"
          icon={<CalendarCheck size={14} />}
          sx={{ height: "auto !important", py: 0.2, pl: 0.5, fontSize: "12px" }}
        />
        <Box
          sx={{
            my: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#1BA672",
            color: "white",
            px: 1,
            py: 0.5,
            borderRadius: "4px",
          }}
        >
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 700,
              display: "flex",
              gap: 0.5,
              alignItems: "center",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "250px",
            }}
          >
            <BadgePercent size={14} color="white" />
            {place.offers[0]}
          </Typography>
          {place?.offers?.length > 1 ? (
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 700,
              }}
            >
              +{place.offers.length - 1} more
            </Typography>
          ) : null}
        </Box>
        <Box
          sx={{
            my: 1,
            backgroundColor: "#C8F9E5",
            color: place.bankOffers ? "#1BA672" : "red",
            px: 1,
            py: 0.5,
            borderRadius: "4px",
          }}
        >
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 500,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "250px",
            }}
          >
            {place.bankOffers ? place.bankOffers : "No active bank offers!"}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default DineoutCard;
