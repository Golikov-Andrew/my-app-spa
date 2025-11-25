import { configureStore } from '@reduxjs/toolkit'
import catalogReducer from './slices/catalogSlice';
import authReducer from './slices/authSlice';
import shopReducer from './slices/shopSlice';
import productPageReducer from './slices/productPageSlice';
import wishlistReducer from './slices/wishlistSlice';
import cartlistReducer from './slices/cartlistSlice';
import preloaderReducer from './slices/preloaderSlice';
import ordersReducer from './slices/ordersSlice';
import orderPageReducer from './slices/orderPageSlice';

export const store = configureStore({
  reducer: {
    catalog: catalogReducer,
    auth: authReducer,
    shop: shopReducer,
    productPage: productPageReducer,
    wishlist: wishlistReducer,
    cartlist: cartlistReducer,
    preloader: preloaderReducer,
    orders: ordersReducer,
    order: orderPageReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch