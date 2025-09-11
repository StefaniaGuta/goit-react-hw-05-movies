import { createSlice } from '@reduxjs/toolkit';
import { newSeriesFetch, seriesDetails, seriesRecommendations } from './seriesApi';

const initialState = {
  series: [],
  recentSeries: [],
  isLoading: false,
  error: null,
};

const seriesSlice = createSlice({
  name: 'series',
  initialState,
  extraReducers: builder => {
    builder
    .addCase(newSeriesFetch.fulfilled, (state, action) => {
      state.movies = action.payload
      state.isLoading = false;
      state.error = null;
    })
    .addCase(seriesDetails.fulfilled, (state, action) => {
      state.movies = action.payload
      state.isLoading = false;
      state.error = null;
    })
    .addCase(seriesRecommendations.fulfilled, (state, action) => {
      state.movies = action.payload
      state.isLoading = false;
      state.error = null;
    })
  },
});

export const seriesReducer = seriesSlice.reducer;