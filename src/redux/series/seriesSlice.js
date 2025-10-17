import { createSlice } from '@reduxjs/toolkit';
import { newSeriesFetch, 
  seriesDetails, 
  seriesRecommendations,
  popularSeries,
  onTvSeries,
  topRatedSeries,
  airingTodaySeries
 } from './seriesApi';

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
      state.series = action.payload
      state.isLoading = false;
      state.error = null;
    })
    .addCase(seriesDetails.fulfilled, (state, action) => {
      state.series = action.payload
      state.isLoading = false;
      state.error = null;
    })
    .addCase(seriesRecommendations.fulfilled, (state, action) => {
      state.series = action.payload
      state.isLoading = false;
      state.error = null;
    })
     .addCase(popularSeries.fulfilled, (state, action) => {
      state.series = action.payload
      state.isLoading = false;
      state.error = null;
    })
     .addCase(onTvSeries.fulfilled, (state, action) => {
      state.series = action.payload
      state.isLoading = false;
      state.error = null;
    })
     .addCase(topRatedSeries.fulfilled, (state, action) => {
      state.series = action.payload
      state.isLoading = false;
      state.error = null;
    })
    .addCase(airingTodaySeries.fulfilled, (state, action) => {
      state.series = action.payload
      state.isLoading = false;
      state.error = null;
    })
  },
});

export const seriesReducer = seriesSlice.reducer;