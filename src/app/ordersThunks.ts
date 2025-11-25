import { createAsyncThunk } from "@reduxjs/toolkit";

import { BACKEND_URL } from "../siteConfig";
import axios from "axios";

import { resetLoader, setLoading } from "./slices/preloaderSlice";
import type { Order } from "../types/Product";
import { setOrders } from "./slices/ordersSlice";

interface getOrdersListArgs {
  token: string;
}

export const getOrdersThunk = createAsyncThunk<
  void,
  getOrdersListArgs,
  { rejectValue: string }
>("orders/getOrders", async ({ token }: getOrdersListArgs, { dispatch }) => {
  axios
    .get(`${BACKEND_URL}orders/list/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log(response);
      const orders: Order[] = [];
      response.data.results.forEach((order: any) => {
        orders.push({
          id: order.id,
          orderStatus: order.order_status_title,
          deliveryStatus: order.delivery_status_title,
          deliveryAddress: order.delivery_address,
          deliveryContact: order.delivery_contact,
          deliveryName: order.delivery_name,
          deliveryComment: order.delivery_comment,
          totalPrice: order.total_cost,
          createdAt: order.created_at,
          updatedAt: order.updated_at,
          isOrderPaid: order.is_paid,
        });
      });
      dispatch(setOrders({ orders: orders }));
    })
    .catch((response) => {
      console.error(response);
    });
});
