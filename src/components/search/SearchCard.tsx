import { Link, useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { ArrowRight, Star } from "lucide-react";
import { PRIVATE_ROUTE, RESTAURANT_TYPE } from "../../enums";

interface IProps {
  type: string;
  place: any;
}

const SearchCard = (props: IProps) => {
  const { type, place } = props;

  const navigate = useNavigate();

  if (type === "dishes") {
    return (
      <Box
        sx={{
          backgroundColor: "#80808017",
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          justifyContent: "center",
          p: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography
              variant="body1"
              sx={{ fontWeight: 600, fontSize: "14px" }}
            >
              By {place?.restaurantName}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                display: "flex",
                gap: 0.5,
                alignItems: "center",
                fontWeight: 500,
                fontSize: "13px",
              }}
            >
              <Star size={13} color="grey" fill="grey" />
              {place?.ratings} • {place?.time} MINS
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color:
                  (new Date().getHours() < 9 && new Date().getHours() > 21) ||
                  place.open === 0
                    ? "red"
                    : "grey",
                fontSize: "13px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: "215px",
              }}
            >
              {(new Date().getHours() < 9 && new Date().getHours() > 21) ||
              place.open === 0
                ? "Closed"
                : "Opens till 9:00 PM"}
            </Typography>
          </Box>
          <Link
            to={
              (new Date().getHours() < 9 && new Date().getHours() > 21) ||
              place.open === 0
                ? ``
                : `${PRIVATE_ROUTE.RESTAURANT}/${place?.restaurantId}#${place.foodId}`
            }
          >
            <ArrowRight
              size={24}
              color="grey"
              style={{
                cursor:
                  (new Date().getHours() < 9 && new Date().getHours() > 21) ||
                  place.open === 0
                    ? "not-allowed"
                    : "pointer",
              }}
            />
          </Link>
        </Box>
        <Box sx={{ borderTop: "1px dashed grey" }} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <img
              src={`../../../public/assets/${
                place?.type == RESTAURANT_TYPE.VEG
                  ? "veg-icon.png"
                  : "non-veg-icon.png"
              }`}
              width={18}
              height={18}
              loading="lazy"
            />
            <Typography
              variant="body1"
              sx={{ fontWeight: 600, fontSize: "18px" }}
            >
              {place?.foodName}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: "215px",
              }}
            >
              ₹{place?.price}
            </Typography>
          </Box>
          <img
            src={place.image}
            style={{
              width: "130px",
              height: "130px",
              borderRadius: "8px",
              objectFit: "cover",
            }}
            loading="lazy"
          />
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        backgroundColor: "#80808017",
        borderRadius: "8px",
        display: "flex",
        gap: 2,
        alignItems: "center",
        p: 2,
        cursor: "pointer",
      }}
      onClick={() => navigate(`${PRIVATE_ROUTE.RESTAURANT}/${place.id}`)}
    >
      <img
        src={place.images?.[0]}
        style={{
          width: "100px",
          height: "100px",
          borderRadius: "8px",
          objectFit: "cover",
        }}
        loading="lazy"
      />
      <Box>
        <Typography variant="body1" sx={{ fontWeight: 600 }}>
          {place?.name}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            display: "flex",
            gap: 0.5,
            alignItems: "center",
            fontWeight: 500,
            fontSize: "14px",
          }}
        >
          <Star size={14} color="grey" fill="grey" />
          {place?.ratings} • {place?.time} MINS • ₹{place?.rate} for two
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "grey",
            fontSize: "14px",
            whiteSpace: "pre-wrap",
          }}
        >
          {place?.special?.join(", ")}
        </Typography>
      </Box>
    </Box>
  );
};

export default SearchCard;
