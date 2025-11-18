import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  setProduct
} from "./slices/productPageSlice";
import { BACKEND_URL } from "../siteConfig";
import axios from "axios";

interface getProductArgs {
  productId: number;
}

export const getProductDetails = createAsyncThunk<
  void,
  getProductArgs,
  { rejectValue: string }
>(
  "productPage/getProductDetails",
  async ({productId}: getProductArgs, { dispatch }) => {
    
    axios
      .get(`${BACKEND_URL}products/details/${productId}/`)
      .then((response) => {
        dispatch(setProduct(response.data));
      })
      .catch((response) => {
        console.error(response)
      });
  }
);
