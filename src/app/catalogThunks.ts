import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Product } from "../types/Product";
import {
  setLoading,
  setProducts,
  setTotalPages,
  setError,
  setProductQty,
} from "./slices/catalogSlice";
import { BACKEND_URL, PRODUCTS_PER_PAGE } from "../siteConfig";
import axios from "axios";

interface FetchProductsArgs {
  page: number;
  priceFrom: number | null;
  priceTo: number | null;
}

export const fetchProducts = createAsyncThunk<
  void,
  FetchProductsArgs,
  { rejectValue: string }
>(
  "catalog/fetchProducts",
  async (query_params: FetchProductsArgs, { dispatch, rejectWithValue }) => {
    dispatch(setLoading());
    axios
      .get(`${BACKEND_URL}products/`, {
        params: {
          page: query_params.page,
          final_price__gte: query_params.priceFrom,
          final_price__lte: query_params.priceTo,
        },
      })
      .then((response) => {
        dispatch(
          setTotalPages(Math.ceil(response.data.count / PRODUCTS_PER_PAGE))
        );
        dispatch(setProducts(response.data.results));
      })
      .catch((response) => {
        if (response.status === 404) {
          dispatch(setError("Товар не найден!"));
        } else {
          dispatch(setError(response.message));
        }
      });
  }
);

interface changeAdminProductQtyArgs {
  token: string | null;
  productId: number;
  isIncrement: boolean;
}

export const changeAdminProductQtyThunk = createAsyncThunk<
  void,
  changeAdminProductQtyArgs,
  { rejectValue: string }
>(
  "product/changeQty",
  async (
    { token, productId, isIncrement }: changeAdminProductQtyArgs,
    { dispatch }
  ) => {
    axios
      .patch(
        `${BACKEND_URL}shop-admin/product/change-qty/`,
        {
          product_id: productId,
          is_increment: isIncrement,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        dispatch(setProductQty(response.data));
      })
      .catch((response) => {
        console.error(response);
      });
  }
);
