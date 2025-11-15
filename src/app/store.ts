import { configureStore } from '@reduxjs/toolkit'
import sitePagesReducer from './slices/sitePagesSlice';
import catalogReducer from './slices/catalogSlice';

export const store = configureStore({
  reducer: {
    sitePages: sitePagesReducer,
    catalog: catalogReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch