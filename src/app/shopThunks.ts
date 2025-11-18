import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  setTitle, setDescription, setBalance
} from "./slices/shopSlice";
import { BACKEND_URL } from "../siteConfig";
import axios from "axios";

interface getShopsArgs {
  shopId: number;

}

export const getShopDetails = createAsyncThunk<
  void,
  getShopsArgs,
  { rejectValue: string }
>(
  "shop/getDetails",
  async ({shopId}: getShopsArgs, { dispatch }) => {
    
    axios
      .get(`${BACKEND_URL}shop/details/${shopId}/`)
      .then((response) => {
        dispatch(setTitle(response.data.title));
        dispatch(setDescription(response.data.description));
        dispatch(setBalance(response.data.balance));
      })
      .catch((response) => {
        console.error(response)
      });
  }
);
