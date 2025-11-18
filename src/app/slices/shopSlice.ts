import { createSlice } from "@reduxjs/toolkit";

export interface Shop {
  title: string;
  description: string;
  balance: number;
}

const initialState: Shop = {
  title: "",
  description: "",
  balance: 0,
};

export const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setBalance: (state, action) => {
      state.balance = action.payload;
    },
  },
});

export const {
  setTitle, setDescription, setBalance
} = shopSlice.actions;
export default shopSlice.reducer;
