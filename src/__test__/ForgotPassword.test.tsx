import { expect, test } from "vitest";
import { fireEvent, render } from "@testing-library/react";
import ForgotPasswordPage from "../pages/auth/ForgotPassword";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { MemoryRouter } from "react-router-dom";

test("render Forgot password form", () => {
  const forgotPasswordForm = render(
    <Provider store={store}>
      <MemoryRouter>
        <ForgotPasswordPage />
      </MemoryRouter>
    </Provider>
  );
  const title = forgotPasswordForm.getByTestId("header-title");

  expect(title.textContent).toBe("Welcome to Bigbite!");
});

test("send email otp", () => {
  const forgotPasswordForm = render(
    <Provider store={store}>
      <MemoryRouter>
        <ForgotPasswordPage />
      </MemoryRouter>
    </Provider>
  );

  const email = forgotPasswordForm.getByTestId("email-input");
  const sendOtpBtn = forgotPasswordForm.getByTestId("otp-button");

  expect(email.textContent).toHaveLength(1);
  fireEvent.click(sendOtpBtn);
});

test("click on verify otp button", () => {
  const forgotPasswordForm = render(
    <Provider store={store}>
      <MemoryRouter>
        <ForgotPasswordPage />
      </MemoryRouter>
    </Provider>
  );

  const sendOtpBtn = forgotPasswordForm.getByTestId("otp-button");
  fireEvent.click(sendOtpBtn);

  const otpInputs = forgotPasswordForm.getAllByTestId("otp-input");
  expect(otpInputs.length).toBeGreaterThan(1);

  const verifyOtp = forgotPasswordForm.getByTestId("otp-button");
  fireEvent.click(verifyOtp);
});

test("click on update password button", () => {
  const forgotPasswordForm = render(
    <Provider store={store}>
      <MemoryRouter>
        <ForgotPasswordPage />
      </MemoryRouter>
    </Provider>
  );
  const sendOtpBtn = forgotPasswordForm.getByTestId("otp-button");
  fireEvent.click(sendOtpBtn);

  const verifyOtp = forgotPasswordForm.getByTestId("otp-button");
  fireEvent.click(verifyOtp);
  
  const password = forgotPasswordForm.getByTestId("password-input");
  expect(password.textContent).toHaveLength(1);

  const updatePasswordBtn = forgotPasswordForm.getByTestId(
    "update-password-button"
  );
  fireEvent.click(updatePasswordBtn);
});
