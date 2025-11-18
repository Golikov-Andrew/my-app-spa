import { createSlice } from "@reduxjs/toolkit";
import type { Product } from "../../types/Product";

export interface ProductPage {
  product: Product;
}

const initialState: ProductPage = {
  product: {
    id: 1,
    title: "",
    description: "",
    image_url: undefined,
    black_price: 0,
    final_price: 0,
    quantity: 0,
  }
};

export const productPageSlice = createSlice({
  name: "productPage",
  initialState,
  reducers: {
    setProduct: (state, action) => {
      state.product = action.payload;
    },
  },
});

export const { setProduct } = productPageSlice.actions;
export default productPageSlice.reducer;
