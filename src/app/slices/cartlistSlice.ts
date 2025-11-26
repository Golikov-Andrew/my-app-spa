import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartItem } from "../../types/Product";

export interface cartlistState {
  products: CartItem[];
  totalPrice: number;
  deliveryAddress: string;
  deliveryContact: string;
  deliveryName: string;
  deliveryComment: string;
  isOrderPaid: boolean;
}
export interface payloadIncDec {
  product: CartItem;
  qty: number;
}

const initialState: cartlistState = {
  products: [],
  totalPrice: 0,
  deliveryAddress: "",
  deliveryContact: "",
  deliveryName: "",
  deliveryComment: "",
  isOrderPaid: false,
};

export type OrderFormTextField =
  | "deliveryAddress"
  | "deliveryContact"
  | "deliveryName"
  | "deliveryComment";
export type OrderFormBooleanField = "isOrderPaid";

export interface newOrderFormTextFieldArgs {
  attrName: OrderFormTextField;
  value: string;
}

export interface newOrderFormBooleanFieldArgs {
  attrName: OrderFormBooleanField;
  value: boolean;
}

export const cartlistSlice = createSlice({
  name: "cartlist",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
      state.totalPrice = 0;
      state.products.forEach((element) => {
        state.totalPrice += element.quantity * element.final_price;
      });
    },
    addProductToCartList: (state, action: PayloadAction<CartItem>) => {
      const product = action.payload;
      product.quantity = 1;
      state.products.push(action.payload);
    },
    removeProductFromCartList: (state, action) => {
      for (let i = state.products.length - 1; i >= 0; i--) {
        const product = state.products[i];
        if (product && product.id === action.payload) {
          state.products.splice(i, 1);
          break;
        }
      }
    },

    setCartItemQty: (state, action: PayloadAction<payloadIncDec>) => {
      for (let i = state.products.length - 1; i >= 0; i--) {
        const product = state.products[i];
        if (product && product.id === action.payload.product.id) {
          if (action.payload.qty > 0) {
            product.quantity = action.payload.qty;
          } else {
            state.products.splice(i, 1);
          }
          break;
        }
      }
      state.totalPrice = 0;
      state.products.forEach((element) => {
        state.totalPrice += element.quantity * element.final_price;
      });
    },
    setNewOrderFormTextData: (
      state,
      action: PayloadAction<newOrderFormTextFieldArgs>
    ) => {
      const attr = action.payload.attrName;
      const val = action.payload.value;
      state[attr] = val;
    },
    setNewOrderFormBooleanData: (
      state,
      action: PayloadAction<newOrderFormBooleanFieldArgs>
    ) => {
      const attr = action.payload.attrName;
      const val = action.payload.value;
      state[attr] = val;
    },
    resetNewOrderForm: (state) => {
      state.deliveryAddress = "";
      state.deliveryContact = "";
      state.deliveryName = "";
      state.deliveryComment = "";
      state.isOrderPaid = false;
    },
    clearCart: (state) => {
      state.products = [];
    },
  },
});

export const {
  setProducts,
  addProductToCartList,
  removeProductFromCartList,
  setCartItemQty,
  setNewOrderFormTextData,
  setNewOrderFormBooleanData,
  resetNewOrderForm,
  clearCart
} = cartlistSlice.actions;
export default cartlistSlice.reducer;
