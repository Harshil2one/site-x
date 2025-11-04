import React, { useEffect, useRef, useState, type ReactNode } from "react";
import {
  InputAdornment,
  TextField,
  type SxProps,
  type Theme,
} from "@mui/material";
import { COLOR, INPUT_SIZE, INPUT_TYPE, INPUT_VARIANT } from "../../enums";

interface IProps {
  label?: string;
  placeholder?: string;
  name?:string;
  type?: INPUT_TYPE;
  variant?: INPUT_VARIANT;
  size?: INPUT_SIZE;
  color?: COLOR;
  style?: SxProps<Theme>;
  className?: string;
  value?: string;
  isFocused?: boolean;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  clearIcon?: ReactNode;
  bounceTime?: number;
  disabled?: boolean;
  multiline?: boolean;
  required?: boolean;
  error?: string | boolean | undefined;
  isReset?:boolean;
  testId?: string;
  onDebounce?: (value: string) => void;
  onStartClick?: () => void;
  onEndClick?: () => void;
}

const Input = (props: IProps) => {
  const {
    label = "",
    placeholder,
    name = "",
    className,
    style,
    type = INPUT_TYPE.TEXT,
    variant = INPUT_VARIANT.OUTLINED,
    size = INPUT_SIZE.MEDIUM,
    color = COLOR.PRIMARY,
    value = "",
    isFocused = false,
    startAdornment,
    endAdornment,
    clearIcon,
    bounceTime = 3000,
    disabled = false,
    multiline = false,
    required = false,
    error = false,
    isReset = false,
    testId = "",
    onDebounce,
    onStartClick,
    onEndClick,
  } = props;

  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState("");
  const [backFlag, setBackFlag] = useState(false);

  useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (onDebounce && inputValue?.length) {
        setBackFlag(true);
        onDebounce(inputValue);
      }
    }, bounceTime);

    return () => clearTimeout(handler);
  }, [inputValue]);

  useEffect(() => {
    if (isReset) setInputValue(value);
  }, [value, isReset]);

  const endIcon = inputValue?.length
    ? clearIcon
      ? clearIcon
      : endAdornment
    : endAdornment;

  const onStartIconClick = () => {
    setInputValue("");
    if (onStartClick) onStartClick();
    setBackFlag(false);
  };

  const onEndIconClick = () => {
    if (onEndClick) onEndClick();
    if (backFlag && bounceTime !== 0) {
      setInputValue("");
      setBackFlag(false);
    } else if (inputValue?.length && onDebounce) {
      onDebounce(inputValue);
    }
  };

  return (
    <TextField
      label={label}
      placeholder={placeholder}
      color={color}
      name={name}
      variant={variant}
      type={type}
      size={size}
      value={bounceTime === 0 ? value : inputValue}
      // value={isReset ? value : inputValue}
      className={className}
      sx={style}
      inputRef={inputRef}
      disabled={disabled}
      multiline={multiline}
      minRows={3}
      required={required}
      error={Boolean(error)}
      data-testid={testId}
      slotProps={{
        input: {
          startAdornment: startAdornment ? (
            <InputAdornment
              position="start"
              sx={{ cursor: "pointer" }}
              onClick={onStartIconClick}
            >
              {startAdornment}
            </InputAdornment>
          ) : null,
          endAdornment: endIcon ? (
            <InputAdornment
              position="end"
              sx={{ cursor: "pointer" }}
              onClick={onEndIconClick}
            >
              {endIcon}
            </InputAdornment>
          ) : null,
        },
      }}
      onChange={(event) => setInputValue(event.target.value)}
    />
  );
};

export default Input;
