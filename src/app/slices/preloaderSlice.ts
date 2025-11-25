import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface preloaderState {
  loading: boolean;
  preloaderMessage: string | null;
  postloaderMessage: string | null;
}

const initialState: preloaderState = {
  loading: false,
  preloaderMessage: null,
  postloaderMessage: null
};


export const preloaderSlice = createSlice({
  name: "preloader",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<preloaderState>) => {
      state.loading = action.payload.loading;
      state.preloaderMessage = action.payload.preloaderMessage;
      state.postloaderMessage = action.payload.postloaderMessage;
    },
    setPostLoaderMessage: (state, action: PayloadAction<string>) => {
      state.postloaderMessage = action.payload;
    },
    resetLoader: (state) => {
      state.loading = false;
      state.preloaderMessage = null;
      state.postloaderMessage = null;
    },
  },
});

export const {
  setLoading,
  setPostLoaderMessage,
  resetLoader
} = preloaderSlice.actions;
export default preloaderSlice.reducer;
