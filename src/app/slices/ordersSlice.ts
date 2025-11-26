import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Order } from "../../types/Order";

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
    clearOrders: (state) => {
      state.orders = [];
    },
    changeOrder: (state, action: PayloadAction<Order>) => {
      for (let i = 0; i < state.orders.length; i++) {
        if (state.orders[i]?.id === action.payload.id) {
          state.orders[i] = action.payload;
          break;
        }
      }
    },
  },
});

export const { setOrders, clearOrders, changeOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
