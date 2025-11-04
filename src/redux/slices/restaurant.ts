import { createSlice } from "@reduxjs/toolkit";
import { getAllFoodItems } from "../actions/restaurant";
import type { IFood } from "../../types/food";

interface IInitialState {
  foodItems: IFood[];
}

const initialState: IInitialState = {
  foodItems: [],
};

const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get Cart Items
      .addCase(getAllFoodItems.pending, (state) => {
        state.foodItems = initialState.foodItems;
      })
      .addCase(getAllFoodItems.fulfilled, (state, action) => {
        const { data } = action.payload;
        state.foodItems = data;
      })
      .addCase(getAllFoodItems.rejected, (state) => {
        state.foodItems = initialState.foodItems;
      });
  },
});


export default restaurantSlice.reducer;
