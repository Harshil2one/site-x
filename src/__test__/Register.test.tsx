import { expect, test } from "vitest";
import { fireEvent, render } from "@testing-library/react";
import RegisterPage from "../pages/auth/Register";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { MemoryRouter } from "react-router-dom";

test("render Register form", () => {
  const registerForm = render(
    <Provider store={store}>
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>
    </Provider>
  );
  const title = registerForm.getByTestId("header-title");

  expect(title.textContent).toBe("Welcome to Bigbite!");
});

test("submit a form", () => {
  const registerForm = render(
    <Provider store={store}>
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>
    </Provider>
  );

  const name = registerForm.getByTestId("name-input");
  const email = registerForm.getByTestId("email-input");
  const password = registerForm.getByTestId("password-input");
  const confirmPassword = registerForm.getByTestId("confirm-password-input");
  expect(name.textContent).toHaveLength(1);
  expect(email.textContent).toHaveLength(1);
  expect(password.textContent).toHaveLength(1);
  expect(confirmPassword.textContent).toHaveLength(1);
});

test("click on register button", () => {
  const registerForm = render(
    <Provider store={store}>
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>
    </Provider>
  );

  const registerBtn = registerForm.getByTestId("register-button");
  fireEvent.click(registerBtn);
});
