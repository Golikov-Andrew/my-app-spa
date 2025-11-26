import { createAsyncThunk } from "@reduxjs/toolkit";

import { BACKEND_URL } from "../siteConfig";
import axios from "axios";

import type { Order } from "../types/Order";
import { changeOrder, setOrders } from "./slices/ordersSlice";

interface getOrdersListArgs {
  token: string;
}

function mapOrder(order: any): Order {
  return {
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
  };
}

function mapOrders(results: Order[], orders: Order[]) {
  results.forEach((order: any) => {
    orders.push(mapOrder(order));
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

interface changeOrderArgs {
  token: string;
  orderId: number;
  attributeName: string;
  attributeValue: string | boolean;
}

export const changeOrderThunk = createAsyncThunk<void, changeOrderArgs>(
  "orders/changeOrder",
  async (
    { token, orderId, attributeName, attributeValue }: changeOrderArgs,
    { dispatch }
  ) => {
    axios
      .patch(
        `${BACKEND_URL}order/update/`,
        {
          token: token,
          order_id: orderId,
          attribute_name: attributeName,
          attribute_value: attributeValue,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        const order: Order = mapOrder(response.data);
        dispatch(changeOrder(order));
      })
      .catch((response) => {
        console.error(response);
      });
  }
);
