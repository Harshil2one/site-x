import React from "react";
import { Box, IconButton } from "@mui/material";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface IProps {
  startIndex: number;
  endIndex: number;
  onLeftClick: () => void;
  onRightClick: () => void;
}

const SwipeButtons = (props: IProps) => {
  const { startIndex, endIndex, onLeftClick, onRightClick } = props;
  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <IconButton
        sx={{
          width: "35px",
          height: "35px",
          backgroundColor: "#80808052",
          "&:hover": {
            backgroundColor: "#80808052",
          },
          "&:disabled": {
            backgroundColor: "#8080802B",
          },
        }}
        onClick={onLeftClick}
        disabled={startIndex === 0}
      >
        <ArrowLeft />
      </IconButton>
      <IconButton
        sx={{
          width: "35px",
          height: "35px",
          backgroundColor: "#80808052",
          "&:hover": {
            backgroundColor: "#80808052",
          },
          "&:disabled": {
            backgroundColor: "#8080802B",
          },
        }}
        onClick={onRightClick}
        disabled={startIndex >= endIndex}
      >
        <ArrowRight />
      </IconButton>
    </Box>
  );
};

export default SwipeButtons;
