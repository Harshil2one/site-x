import { createAsyncThunk } from "@reduxjs/toolkit";
import { restaurantService } from "../services/restaurant";

export const getAllFoodItems = createAsyncThunk(
  "restaurant/get-all-food-items",
  async (restaurantId: number, { rejectWithValue }) => {
    try {
      const response = await restaurantService.getAllFoodItems(restaurantId);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ?? "Error while fetching food items!"
      );
    }
  }
);
