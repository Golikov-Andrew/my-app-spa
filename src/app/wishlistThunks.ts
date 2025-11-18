import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  addProductToWishList,
  removeProductFromWishList,
  setProducts,
} from "./slices/wishlistSlice";
import { BACKEND_URL } from "../siteConfig";
import axios from "axios";
import type { Product } from "../types/Product";

interface getWishListArgs {
  token: string;
}
interface toogleWishListItemArgs {
  token: string | null;
  productId: number;
}

export const getWishListProducts = createAsyncThunk<
  void,
  getWishListArgs,
  { rejectValue: string }
>("wishlist/getProducts", async ({ token }: getWishListArgs, { dispatch }) => {
  axios
    .get(`${BACKEND_URL}wishlist/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      const results: Product[] = [];
      response.data.results.forEach((item: { product: Product }) => {
        results.push(item.product);
      });
      dispatch(setProducts(results));
    })
    .catch((response) => {
      console.error(response);
    });
});

export const addProductToWishListThunk = createAsyncThunk<
  void,
  toogleWishListItemArgs,
  { rejectValue: string }
>(
  "wishlist/addProduct",
  async ({ token, productId }: toogleWishListItemArgs, { dispatch }) => {
    axios
      .post(
        `${BACKEND_URL}wishlist/add/`,
        {
          product_id: productId,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        dispatch(addProductToWishList(response.data.product));
      })
      .catch((response) => {
        console.error(response);
      });
  }
);

export const removeProductFromWishListThunk = createAsyncThunk<
  void,
  toogleWishListItemArgs,
  { rejectValue: string }
>(
  "wishlist/removeProduct",
  async ({ token, productId }: toogleWishListItemArgs, { dispatch }) => {
    axios
      .delete(
        `${BACKEND_URL}wishlist/remove/${productId}/`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        dispatch(removeProductFromWishList(productId));
      })
      .catch((response) => {
        console.error(response);
      });
  }
);
