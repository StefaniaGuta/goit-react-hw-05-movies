import { createSlice } from '@reduxjs/toolkit';
import {createWishList, getWishList, getOneWishList} from './wishList';

const initialState = {
  list: [],
  isLoading: false,
  error: null,
};

const wishListSlice = createSlice({
  name: 'wishlist',
  initialState,
  extraReducers: builder => {
    builder
    .addCase(createWishList.fulfilled, (state, action) => {
      state.wishlist = action.payload
      state.isLoading = false;
      state.error = null;
    })
    .addCase(getWishList.fulfilled, (state, action) => {
      state.wishlist = action.payload
      state.isLoading = false;
      state.error = null;
    })
    .addCase(getOneWishList.fulfilled, (state, action) => {
      state.wishlist = action.payload
      state.isLoading = false;
      state.error = null;
    })
  },
});

export const wishListReducer = wishListSlice.reducer;