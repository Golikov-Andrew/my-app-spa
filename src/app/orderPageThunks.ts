import { createAsyncThunk } from "@reduxjs/toolkit";

import { setOrder } from "./slices/orderPageSlice";
import { BACKEND_URL } from "../siteConfig";
import axios from "axios";
import type { OrderItem } from "../types/Product";

interface getOrderArgs {
  orderId: number;
  token: string;
}

export const getOrderDetailsThunk = createAsyncThunk<
  void,
  getOrderArgs,
  { rejectValue: string }
>(
  "orderPage/getOrderDetails",
  async ({ orderId, token }: getOrderArgs, { dispatch }) => {
    axios
      .get(`${BACKEND_URL}order/details/${orderId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const order = response.data;
        
        const orderItems: OrderItem[] = [];
        order.order_items.forEach((item: any) => {
          orderItems.push({
            product: item.product,
            qty: item.qty,
            blackPrice: item.black_price,
            finalPrice: item.final_price,
            totalCost: item.total_cost,
          });
        });

        const orderMapped = {
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
          orderItems: orderItems,
        };
        dispatch(setOrder(orderMapped));
      })
      .catch((response) => {
        console.error(response);
      });
  }
);
