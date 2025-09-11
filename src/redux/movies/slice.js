import { createSlice } from '@reduxjs/toolkit';
import { getMovies, 
  getMovieDetails, 
  getMovieCast, 
  getMovieReviews, 
  getSearchMovies,
  getMostRecentMovie,
  moviesRecommendations
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
    .addCase(getMovies.fulfilled, (state, action) => {
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
    .addCase(getMostRecentMovie.fulfilled, (state, action) => {
      state.recentMovies = action.payload
      state.isLoading = false;
      state.error = null;
    })
    .addCase(moviesRecommendations.fulfilled, (state, action) => {
      state.recentMovies = action.payload
      state.isLoading = false;
      state.error = null;
    })
  },
});

export const moviesReducer = moviesSlice.reducer;