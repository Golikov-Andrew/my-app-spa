import { createSlice } from "@reduxjs/toolkit";
import type { Product } from "../../types/Product";

export interface wishlistState {
  products: Product[];
}

const initialState: wishlistState = {
  products: [],
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    addProductToWishList: (state, action) => {
      state.products.push(action.payload);
    },
    removeProductFromWishList: (state, action) => {
      for (let i = state.products.length - 1; i >= 0; i--) {
        debugger;
        const product = state.products[i];
        if (product && product.id === action.payload) {
          state.products.splice(i, 1);
          break;
        }
      }
    },
  },
});

export const { setProducts, addProductToWishList, removeProductFromWishList } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
