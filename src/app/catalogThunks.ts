import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Product } from "../types/Product";
import {
  setLoading,
  setProducts,
  setTotalPages,
  setError,
} from "./slices/catalogSlice";
import { PRODUCTS_PER_PAGE } from "../siteConfig";

interface FetchProductsArgs {
  page: number;
}
export const fetchProducts = createAsyncThunk<
  Product[],
  FetchProductsArgs,
  { rejectValue: string }
>(
  "catalog/fetchProducts", async ({ page }: FetchProductsArgs, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading());
      const response = await fetch(
        `http://localhost:62417/api/v1/products/?page=${page}`
      );

      if (!response.ok) {
        throw new Error("Ошибка загрузки продуктов");
      }
      const data = await response.json();
      dispatch(setProducts(data.results));
      dispatch(setTotalPages(Math.ceil(data.count / PRODUCTS_PER_PAGE)));
      return data.results;
    } catch (err) {
      if (err instanceof Error) {
        dispatch(setError(err.message));
        return rejectWithValue(err.message);
      }
      return rejectWithValue("Неизвестная ошибка");
    }
  }
);
