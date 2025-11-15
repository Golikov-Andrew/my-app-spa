import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { shopPages } from '../../siteConfig'

export interface sitePagesState {
  currentShopPage: shopPages
}

const initialState: sitePagesState = {
  currentShopPage: shopPages.HOMEPAGE,
}

export const sitePagesSlice = createSlice({
  name: 'sitePages',
  initialState,
  reducers: {
    setCurrentShopPage: (state, action: PayloadAction<shopPages>) => {
      state.currentShopPage = action.payload
    }
  },
})

export const { setCurrentShopPage } = sitePagesSlice.actions
export default sitePagesSlice.reducer