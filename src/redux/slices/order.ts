import { createSlice } from "@reduxjs/toolkit";
import type { IOrder } from "../../types/order";
import { getAllOrdersHistory } from "../actions/order";

interface IInitialState {
  isLoading: boolean;
  orders: IOrder[];
}

const initialState: IInitialState = {
  isLoading: false,
  orders: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get Cart Items
      .addCase(getAllOrdersHistory.pending, (state) => {
        state.isLoading = true;
        state.orders = initialState.orders;
      })
      .addCase(getAllOrdersHistory.fulfilled, (state, action) => {
        const { data } = action.payload;
        state.orders = data;
        state.isLoading = false;
      })
      .addCase(getAllOrdersHistory.rejected, (state) => {
        state.orders = initialState.orders;
        state.isLoading = false;
      });
  },
});

export default orderSlice.reducer;
