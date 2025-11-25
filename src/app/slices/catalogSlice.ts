import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../../types/Product";
// import { fetchProducts } from "../catalogThunks";

export interface FiltersForm {
  priceFrom: number;
  priceTo: number;
}

export interface catalogState {
  currentCatalogPage: number;
  products: Product[];
  totalPages: number;
  loading: boolean;
  error: string | null;
  filtersForm: FiltersForm;
}

const initialState: catalogState = {
  currentCatalogPage: 1,
  products: [],
  totalPages: 1,
  loading: false,
  error: null,
  filtersForm: {
    priceFrom: 0,
    priceTo: 30000
  },
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
      state.loading = false;
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
    setFiltersFormData: (state, action) => {
      state.filtersForm = action.payload;
    },
  }
});

export const {
  setCurrentCatalogPage,
  setProducts,
  setTotalPages,
  setLoading,
  setError,
  setFiltersFormData
} = catalogSlice.actions;
export default catalogSlice.reducer;
