import { expect, test, vi } from "vitest";
import { render } from "@testing-library/react";
import HomePage from "../pages/customers/Home";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { MemoryRouter } from "react-router-dom";

// ✅ Mock FoodSlides to avoid useNavigate error
vi.mock("../components/home/FoodSlides", () => ({
  default: () => <div data-testid="food-slides">Mocked FoodSlides</div>,
}));

test("render Home form", () => {
  const homePage = render(
    <Provider store={store}>
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    </Provider>
  );
  const title = homePage.getByTestId("header-title");

  expect(title.textContent).toBe(
    "Restaurants with online food delivery around you"
  );
});
