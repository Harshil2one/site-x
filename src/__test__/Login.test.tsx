import { expect, test } from "vitest";
import { fireEvent, render } from "@testing-library/react";
import LoginPage from "../pages/auth/Login";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { MemoryRouter } from "react-router-dom";

test("render Login form", () => {
  const loginForm = render(
    <Provider store={store}>
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    </Provider>
  );
  const title = loginForm.getByTestId("header-title");

  expect(title.textContent).toBe("Welcome back!");
});

test("submit a form", () => {
  const loginForm = render(
    <Provider store={store}>
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    </Provider>
  );

  const email = loginForm.getByTestId("email-input");
  const password = loginForm.getByTestId("password-input");
  expect(email.textContent).toHaveLength(1);
  expect(password.textContent).toHaveLength(1);
});

test("click on login button", () => {
  const loginForm = render(
    <Provider store={store}>
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    </Provider>
  );

  const loginBtn = loginForm.getByTestId("login-button");
  fireEvent.click(loginBtn);
});
