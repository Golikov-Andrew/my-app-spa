import { createSlice } from "@reduxjs/toolkit";
import type { Order } from "../../types/Product";

export interface OrderPage {
  order: Order;
}

const initialState: OrderPage = {
  order: {
    id: 0,
    orderStatus: "",
    deliveryStatus: "",
    deliveryAddress: "",
    deliveryContact: "",
    deliveryName: "",
    deliveryComment: "",
    totalPrice: 0,
    createdAt: "",
    updatedAt: "",
    isOrderPaid: false,
    orderItems: [],
  },
};

export const orderPageSlice = createSlice({
  name: "orderPage",
  initialState,
  reducers: {
    setOrder: (state, action) => {
      state.order = action.payload;
    },
  },
});

export const { setOrder } = orderPageSlice.actions;
export default orderPageSlice.reducer;
