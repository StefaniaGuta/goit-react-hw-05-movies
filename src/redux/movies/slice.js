import { createSlice } from '@reduxjs/toolkit';
import { getMovies, getMovieDetails, getMovieCast, getMovieReviews, getSearchMovies} from './getAPI';

const initialState = {
  movies: [],
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
  },
});

export const moviesReducer = moviesSlice.reducer;