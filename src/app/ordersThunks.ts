import { createAsyncThunk } from "@reduxjs/toolkit";

import { BACKEND_URL } from "../siteConfig";
import axios, { type AxiosResponse } from "axios";

import { resetLoader, setLoading } from "./slices/preloaderSlice";
import type { Order } from "../types/Product";
import { setOrders } from "./slices/ordersSlice";

interface getOrdersListArgs {
  token: string;
}

function mapOrders(results: Order[], orders: Order[]) {
  results.forEach((order: any) => {
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
      orderItems: order.order_items,
    });
  });
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
      mapOrders(response.data.results, orders);
      dispatch(setOrders({ orders: orders }));
    })
    .catch((response) => {
      console.error(response);
    });
});

export const getAdminOrdersThunk = createAsyncThunk<
  void,
  getOrdersListArgs,
  { rejectValue: string }
>("orders/getOrders", async ({ token }: getOrdersListArgs, { dispatch }) => {
  axios
    .get(`${BACKEND_URL}shop-admin/orders/list/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log(response);
      const orders: Order[] = [];
      mapOrders(response.data.results, orders);
      dispatch(setOrders({ orders: orders }));
    })
    .catch((response) => {
      console.error(response);
    });
});
