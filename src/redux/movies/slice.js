import { createSlice } from '@reduxjs/toolkit';
import { getAll, 
  getMovieDetails, 
  getMovieCast, 
  getMovieReviews, 
  getSearchMovies,
  getTrendingAll,
  moviesRecommendations,
  getGenres,
 } from './getAPI';

const initialState = {
  movies: [],
  recentMovies: [],
  isLoading: false,
  error: null,
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  extraReducers: builder => {
    builder
    .addCase(getAll.fulfilled, (state, action) => {
      state.movies = action.payload
      state.isLoading = false;
      state.error = null;
    })
    .addCase(getMovieDetails.fulfilled, (state, action) => {
      state.movies = action.payload
      state.isLoading = false;
      state.error = null;
    })
    .addCase(getMovieCast.fulfilled, (state, action) => {
      state.movies = action.payload
      state.isLoading = false;
      state.error = null;
    })
    .addCase(getMovieReviews.fulfilled, (state, action) => {
      state.movies = action.payload
      state.isLoading = false;
      state.error = null;
    })
    .addCase(getSearchMovies.fulfilled, (state, action) => {
      state.movies = action.payload
      state.isLoading = false;
      state.error = null;
    })
    .addCase(getTrendingAll.fulfilled, (state, action) => {
      state.recentMovies = action.payload
      state.isLoading = false;
      state.error = null;
    })
    .addCase(moviesRecommendations.fulfilled, (state, action) => {
      state.recentMovies = action.payload
      state.isLoading = false;
      state.error = null;
    })
    .addCase(getGenres.fulfilled, (state, action) => {
      state.genres = action.payload;
      state.isLoading = false;
      state.error = null;
    })
  },
});

export const moviesReducer = moviesSlice.reducer;