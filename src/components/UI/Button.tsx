import React, { type ReactNode } from "react";
import { Button, type SxProps, type Theme } from "@mui/material";
import { BUTTON_TYPE, BUTTON_VARIANT, COLOR } from "../../enums";

interface IProps {
  btnText: string;
  type?: BUTTON_TYPE;
  variant?: BUTTON_VARIANT;
  color?: COLOR;
  style?: SxProps<Theme>;
  className?: string;
  loading?: boolean;
  icon?: ReactNode;
  disabled?: boolean;
  testId?: string;
  onClick?: (event: any) => void;
}

const CustomButton = (props: IProps) => {
  const {
    btnText,
    className,
    style,
    type = BUTTON_TYPE.BUTTON,
    variant = BUTTON_VARIANT.CONTAINED,
    color = COLOR.PRIMARY,
    loading = false,
    icon,
    disabled = false,
    testId = "",
    onClick,
  } = props;

  return (
    <Button
      type={type}
      variant={variant}
      color={color}
      className={className}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 0.5,
        ...style,
      }}
      fullWidth
      onClick={onClick}
      loading={loading}
      loadingPosition="start"
      disabled={loading || disabled}
      data-testid={testId}
    >
      {icon ? icon : null}
      {btnText}
    </Button>
  );
};

export default CustomButton;
