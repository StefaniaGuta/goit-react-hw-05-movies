import { createSlice } from '@reduxjs/toolkit';
import { getAll, 
  getMovieDetails, 
  getMovieCast, 
  getMovieReviews, 
  searchForMovies,
  getTrendingAll,
  moviesRecommendations,
  getGenres,
  getPopularMovies,
  getNowPlayingMovies,
  getUpcomingMovies,
  getTopRatedMovies,
  persorDetails
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
    .addCase(searchForMovies.fulfilled, (state, action) => {
      state.movies = action.payload
      state.isLoading = false;
      state.error = null;
    })
    .addCase(getPopularMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
      state.isLoading = false;
      state.error = null;
    })
    .addCase(getNowPlayingMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
      state.isLoading = false;
      state.error = null;
    })
    .addCase(getUpcomingMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
      state.isLoading = false;
      state.error = null;
    })
    .addCase(getTopRatedMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
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
    .addCase(persorDetails.fulfilled, (state, action) => {
      state.genres = action.payload;
      state.isLoading = false;
      state.error = null;
    })
  },
});

export const moviesReducer = moviesSlice.reducer;