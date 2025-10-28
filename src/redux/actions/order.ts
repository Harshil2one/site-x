import { createAsyncThunk } from "@reduxjs/toolkit";
import { orderService } from "../services/order";

export const getAllOrdersHistory = createAsyncThunk(
  "cart/get-all-cart-items",
  async (userId: number, { rejectWithValue }) => {
    try {
      const response = await orderService.getAllOrdersHistory(userId);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ?? "Error while fetching order history!"
      );
    }
  }
);