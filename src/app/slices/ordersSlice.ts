import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Order } from "../../types/Product";

export interface ordersState {
  orders: Order[];
}

const initialState: ordersState = {
  orders: [],
};

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<ordersState>) => {
      state.orders = action.payload.orders;
    },
  },
});

export const { setOrders } = ordersSlice.actions;
export default ordersSlice.reducer;
