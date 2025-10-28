import { createAsyncThunk } from "@reduxjs/toolkit";
import { cartService } from "../services/cart";

export const getAllCartItems = createAsyncThunk(
  "cart/get-all-cart-items",
  async (userId: number, { rejectWithValue }) => {
    try {
      const response = await cartService.getAllCartItems(userId);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ?? "Error while fetching cart items!"
      );
    }
  }
);

export const updateCartItems = createAsyncThunk(
  "cart/update-cart-items",
  async (
    { userId, data }: { userId: number; data: any },
    { rejectWithValue }
  ) => {
    try {
      const response = await cartService.updateCartItems(userId, data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ?? "Error while updating cart items!"
      );
    }
  }
);

export const reorderCart = createAsyncThunk(
  "cart/reorder",
  async (
    { userId, data }: { userId: number; data: any },
    { rejectWithValue }
  ) => {
    try {
      const response = await cartService.reorderCart(userId, data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ?? "Error while reordering!"
      );
    }
  }
);

export const emptyCartItems = createAsyncThunk(
  "cart/empty-cart-items",
  async (userId: number, { rejectWithValue }) => {
    try {
      const response = await cartService.emptyCartItems(userId);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ?? "Error while clearing cart items!"
      );
    }
  }
);
