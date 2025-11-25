import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  addProductToCartList,
  setCartItemQty,
  removeProductFromCartList,
  setProducts,
  type cartlistState,
  resetNewOrderForm,
} from "./slices/cartlistSlice";
import { BACKEND_URL } from "../siteConfig";
import axios from "axios";
import type { CartItem } from "../types/Product";
import { resetLoader, setLoading } from "./slices/preloaderSlice";

interface getCartListArgs {
  token: string;
}
interface toogleCartListItemArgs {
  token: string | null;
  productId: number;
}
interface changeQtyCartListItemArgs {
  token: string | null;
  productId: number;
  isIncrement: boolean;
}

export const getCartListProducts = createAsyncThunk<
  void,
  getCartListArgs,
  { rejectValue: string }
>("cartlist/getProducts", async ({ token }: getCartListArgs, { dispatch }) => {
  axios
    .get(`${BACKEND_URL}cart/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      const results: CartItem[] = [];
      console.log(response);

      response.data.results.forEach(
        (item: { qty: number; product: CartItem }) => {
          item.product.quantity = item.qty;
          results.push(item.product);
        }
      );
      dispatch(setProducts(results));
    })
    .catch((response) => {
      console.error(response);
    });
});

export const addProductToCartListThunk = createAsyncThunk<
  void,
  toogleCartListItemArgs,
  { rejectValue: string }
>(
  "cartlist/addProduct",
  async ({ token, productId }: toogleCartListItemArgs, { dispatch }) => {
    axios
      .post(
        `${BACKEND_URL}cart/product/add/`,
        {
          product_id: productId,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        dispatch(addProductToCartList(response.data.product));
      })
      .catch((response) => {
        console.error(response);
      });
  }
);

export const removeProductFromCartListThunk = createAsyncThunk<
  void,
  toogleCartListItemArgs,
  { rejectValue: string }
>(
  "cartlist/removeProduct",
  async ({ token, productId }: toogleCartListItemArgs, { dispatch }) => {
    axios
      .delete(`${BACKEND_URL}cart/product/remove/${productId}/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        dispatch(removeProductFromCartList(productId));
      })
      .catch((response) => {
        console.error(response);
      });
  }
);

export const changeCartItemQtyThunk = createAsyncThunk<
  void,
  changeQtyCartListItemArgs,
  { rejectValue: string }
>(
  "cartlist/changeQtyItem",
  async (
    { token, productId, isIncrement }: changeQtyCartListItemArgs,
    { dispatch }
  ) => {
    axios
      .patch(
        `${BACKEND_URL}cart/product/change-qty/`,
        {
          product_id: productId,
          is_increment: isIncrement,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        dispatch(setCartItemQty(response.data));
      })
      .catch((response) => {
        console.error(response);
      });
  }
);

export interface createNewOrderArgs {
  token: string;
  newOrderData: cartlistState;
}

export const createNewOrderThunk = createAsyncThunk<
  void,
  createNewOrderArgs,
  { rejectValue: string }
>(
  "cartlist/createNewOrder",
  async ({ token, newOrderData }: createNewOrderArgs, { dispatch }) => {
    dispatch(
      setLoading({
        loading: true,
        preloaderMessage: "Процесс сохранения заказа...",
        postloaderMessage: null,
      })
    );
    axios
      .post(`${BACKEND_URL}order/create/`, newOrderData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        
        dispatch(setProducts([]));
        dispatch(resetNewOrderForm());
        dispatch(
          setLoading({
            loading: false,
            preloaderMessage: null,
            postloaderMessage: "Спасибо! Заказ успешно оформлен! Через некоторое время с вами свяжется наш менеджер.",
          })
        );
        setTimeout(()=>{
          dispatch(resetLoader());
        }, 5000);
      })
      .catch((response) => {
        
        console.error(response);
        
        dispatch(
          setLoading({
            loading: false,
            preloaderMessage: null,
            postloaderMessage: response.response.data.error,
          })
        );
        setTimeout(()=>{
          dispatch(resetLoader());
        }, 5000);
      });
  }
);
