import { createSlice } from '@reduxjs/toolkit';
import {postItemInTheList, getList, deleteItemFromTheList} from './listOperantions';

const initialState = {
  list: [],
  isLoading: false,
  error: null,
};

const listSlice = createSlice({
  name: 'list',
  initialState,
  extraReducers: builder => {
    builder
    .addCase(postItemInTheList.fulfilled, (state, action) => {
      state.movies = action.payload
      state.isLoading = false;
      state.error = null;
    })
		.addCase(getList.fulfilled, (state, action) => {
      state.movies = action.payload
      state.isLoading = false;
      state.error = null;
    })
    .addCase(deleteItemFromTheList.fulfilled, (state, action) => {
      state.movies = action.payload
      
      console.log("state.movies", state.movies)
      console.log("action.payload", action.payload)
      state.isLoading = false;
      state.error = null;
    })
  },
});

export const listReducer = listSlice.reducer;