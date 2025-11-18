import { useRef, useEffect, useState, type KeyboardEvent, type ClipboardEvent } from "react";
import { Box, TextField } from "@mui/material";
import { INPUT_TYPE, INPUT_VARIANT } from "../../enums";

interface IProps {
  isFocused?: boolean;
  length?: number;
  testId?: string;
  onChange?: (value: string) => void;
}

const OtpInput = ({ isFocused = false, length = 6, testId = "", onChange }: IProps) => {
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp] as string[];
    newOtp[index] = value;
    setOtp(newOtp);
    onChange?.(newOtp.join(""));

    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: KeyboardEvent<HTMLDivElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("Text").trim();
    if (!/^\d{1,6}$/.test(pasteData)) return;

    const pasteDigits = pasteData.split("");
    const newOtp = [...otp] as string[];
    for (let i = 0; i < length; i++) {
      newOtp[i] = pasteDigits[i] || "";
    }
    setOtp(newOtp);
    onChange?.(newOtp.join(""));

    const nextIndex =
      pasteDigits.length < length ? pasteDigits.length : length - 1;
    inputRefs.current[nextIndex]?.focus();
  };

  useEffect(() => {
    onChange?.(otp.join(""));
  }, [otp]);

  useEffect(() => {
    if (isFocused && inputRefs.current) {
      inputRefs.current?.[0]?.focus();
    }
  }, [isFocused]);

  return (
    <Box display="flex" justifyContent="space-between" onPaste={handlePaste}>
      {otp.map((digit, idx) => (
        <TextField
          key={idx}
          value={digit}
          onChange={(e) => handleChange(e.target.value, idx)}
          onKeyDown={(e) => handleKeyDown(e, idx)}
          inputRef={(el) => (inputRefs.current[idx] = el)}
          variant={INPUT_VARIANT.OUTLINED}
          type={INPUT_TYPE.TEL}
          data-testid={testId}
          inputProps={{
            maxLength: 1,
            style: {
              textAlign: "center",
              fontSize: "18px",
              width: "44px",
              height: "44px",
              padding: 0,
            },
          }}
        />
      ))}
    </Box>
  );
};

export default OtpInput;
