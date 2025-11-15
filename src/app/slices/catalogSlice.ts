import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../../types/Product";
import { fetchProducts } from "../catalogThunks";

export interface catalogState {
  currentCatalogPage: number;
  products: Product[];
  totalPages: number;
  loading: boolean;
  error: string | null;
}

const initialState: catalogState = {
  currentCatalogPage: 1,
  products: [],
  totalPages: 1,
  loading: false,
  error: null,
};

export const catalogSlice = createSlice({
  name: "catalog",
  initialState,
  reducers: {
    setCurrentCatalogPage: (state, action: PayloadAction<number>) => {
      state.currentCatalogPage = action.payload;
    },
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    setTotalPages: (state, action: PayloadAction<number>) => {
      state.totalPages = action.payload;
    },
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.error = action.payload ?? 'Ошибка загрузки';
        state.loading = false;
      });
  },
});

export const {
  setCurrentCatalogPage,
  setProducts,
  setTotalPages,
  setLoading,
  setError,
} = catalogSlice.actions;
export default catalogSlice.reducer;
