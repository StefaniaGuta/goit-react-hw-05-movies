import { createSlice } from '@reduxjs/toolkit';
import {createWishList, getWishList, getOneWishList, deleteWishList, updateWishList} from './wishList';

const initialState = {
  wishlist: [],
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
      state.wishlist = action.payload;
      state.isLoading = false;
      state.error = null;
    })
    .addCase(getOneWishList.fulfilled, (state, action) => {
      state.wishlist = action.payload
      state.isLoading = false;
      state.error = null;
    })
    .addCase(deleteWishList.fulfilled, (state, action) => {
      const deletedId = action.meta.arg;
        state.wishlist.wishLists =
          state.wishlist.wishLists.filter(
            list => list._id !== deletedId
          );
        state.isLoading = false;
        state.error = null;
    })
    .addCase(updateWishList.fulfilled, (state, action) => {
    const updatedWishList = action.payload;

    const index = state.wishlist.wishLists.findIndex(
      list => list._id === updatedWishList._id
    );

    if (index !== -1) {
      state.wishlist.wishLists[index] = updatedWishList;
    }

    state.isLoading = false;
    state.error = null;
  })
  },
});

export const wishListReducer = wishListSlice.reducer;