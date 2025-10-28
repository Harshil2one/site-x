import { Box, IconButton, type SxProps, type Theme } from "@mui/material";
import CustomButton from "../UI/Button";
import { BUTTON_VARIANT } from "../../enums";
import { Minus, Plus } from "lucide-react";

interface IProps {
  item: {
    id: number;
    name: string;
    price: number;
  };
  cart?: number[];
  style?: SxProps<Theme>;
  addToCart: () => void;
  removeFromCart: () => void;
}

const FoodCounterButton = ({
  item,
  cart = [],
  style,
  addToCart,
  removeFromCart,
}: IProps) => {
  const count = cart.filter((id) => id === item.id).length;

  return (
    <div style={{ position: "relative" }}>
      {count === 0 ? (
        <CustomButton
          btnText="ADD"
          variant={BUTTON_VARIANT.CONTAINED}
          style={{
            position: "absolute",
            bottom: 15,
            right: 15,
            color: "#1BABA5 !important",
            backgroundColor: "white !important",
            border: "1px solid #E5E6E6 !important",
            fontWeight: 700,
            fontSize: "16px",
            borderRadius: "8px",
            width: "max-content",
            padding: "4px 16px",
            px: 4,
            ...style,
          }}
          onClick={addToCart}
        />
      ) : (
        <Box
          sx={{
            position: "absolute",
            bottom: 15,
            right: 15,
            display: "flex",
            alignItems: "center",
            gap: "8px",
            backgroundColor: "white",
            border: "1px solid #E5E6E6",
            borderRadius: "8px",
            px: 1,
            py: 0.4,
            ...style,
          }}
        >
          <IconButton
            size="small"
            onClick={removeFromCart}
            style={{ color: "#1BABA5" }}
          >
            <Minus size={20} />
          </IconButton>
          <span style={{ fontWeight: 700 }}>{count}</span>
          <IconButton
            size="small"
            style={{ color: "#1BABA5" }}
            onClick={addToCart}
          >
            <Plus size={20} />
          </IconButton>
        </Box>
      )}
    </div>
  );
};

export default FoodCounterButton;
