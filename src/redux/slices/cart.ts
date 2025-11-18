import { createSlice } from "@reduxjs/toolkit";
import { emptyCartItems, getAllCartItems, reorderCart } from "../actions/cart";
import type { IRestaurant } from "../../types/restaurant.ts";
import type { IFood } from "../../types/food.ts";

interface IInitialState {
  isLoading: boolean;
  userCart: { restaurant: number; food: number[] } | null;
  cartDetails: { cart: IFood[]; restaurant: IRestaurant };
}

const initialState: IInitialState = {
  isLoading: false,
  userCart: null,
  cartDetails: { cart: [], restaurant: {} as IRestaurant },
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { restaurant, food } = action.payload || {
        restaurant: 0,
        food: [],
      };
      if (state.userCart?.restaurant !== restaurant) {
        state.userCart = {
          restaurant,
          food: Array.isArray(food) ? food : [food],
        };
      } else {
        state.userCart = {
          restaurant,
          food: [
            ...(state.userCart?.food ? state.userCart.food : []),
            Number(food),
          ],
        };
      }
    },
    removeFromCart: (state, action) => {
      const { restaurant, food } = action.payload;

      if (state.userCart && state.userCart?.restaurant === restaurant) {
        state.userCart.food = (() => {
          const index = state.userCart.food.findIndex(
            (id: number) => id === food
          );
          if (index === -1) return state.userCart.food;
          const newCart = [...state.userCart.food];
          newCart.splice(index, 1);
          return newCart;
        })();
        if (state.userCart?.food?.length === 0) {
          state.userCart = null;
        }
      }
    },
    emptyCart: (state) => {
      state.userCart = null;
      state.cartDetails = initialState.cartDetails;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Cart Items
      .addCase(getAllCartItems.pending, (state) => {
        state.isLoading = true;
        state.cartDetails = initialState.cartDetails;
      })
      .addCase(getAllCartItems.fulfilled, (state, action) => {
        const { data } = action.payload;
        state.cartDetails = data;
        state.isLoading = false;
      })
      .addCase(getAllCartItems.rejected, (state) => {
        state.cartDetails = initialState.cartDetails;
        state.isLoading = false;
      })

      // Reorder
      .addCase(reorderCart.pending, (state) => {
        state.isLoading = true;
        state.userCart = initialState.userCart;
      })
      .addCase(reorderCart.fulfilled, (state, action) => {
        const { data } = action.payload;
        state.userCart = data;
        state.isLoading = false;
      })
      .addCase(reorderCart.rejected, (state) => {
        state.userCart = initialState.userCart;
        state.isLoading = false;
      })

      // Empty Cart Items
      .addCase(emptyCartItems.pending, (state) => {
        state.isLoading = true;
        state.cartDetails = initialState.cartDetails;
      })
      .addCase(emptyCartItems.fulfilled, (state) => {
        state.userCart = null;
        state.cartDetails = initialState.cartDetails;
        state.isLoading = false;
      })
      .addCase(emptyCartItems.rejected, (state) => {
        state.cartDetails = initialState.cartDetails;
        state.isLoading = false;
      });
  },
});

export const { addToCart, removeFromCart, emptyCart } = cartSlice.actions;

export default cartSlice.reducer;
