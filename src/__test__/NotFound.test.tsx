import { expect, test } from "vitest";
import { fireEvent, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { MemoryRouter } from "react-router-dom";
import NotFoundPage from "../pages/NotFound";

test("render Not found form", () => {
  const notFoundPage = render(
    <Provider store={store}>
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    </Provider>
  );
  const title = notFoundPage.getByTestId("header-title");

  expect(title.textContent).toMatch(/404 | page not found\i/);
});

test("click on go back to home button", () => {
  const notFoundPage = render(
    <Provider store={store}>
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    </Provider>
  );
  const button = notFoundPage.getByTestId("go-home-button");
  fireEvent.click(button);
});
