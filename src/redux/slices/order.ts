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
      .addCase(getAllOrdersHistory.pending, (state, _action) => {
        state.isLoading = true;
        state.orders = initialState.orders;
      })
      .addCase(getAllOrdersHistory.fulfilled, (state, action) => {
        const { data } = action.payload;
        state.orders = data;
        state.isLoading = false;
      })
      .addCase(getAllOrdersHistory.rejected, (state, _action) => {
        state.orders = initialState.orders;
        state.isLoading = false;
      });
  },
});

export const {} = orderSlice.actions;

export default orderSlice.reducer;
