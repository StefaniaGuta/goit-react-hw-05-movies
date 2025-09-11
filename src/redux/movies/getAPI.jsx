import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const URL = 'https://api.themoviedb.org/3';
export const API_KEY = '046ac13b969fd43f0e6a6ee26ddbba59';
export const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';
export const day = new Date().toISOString().split("T")[0];

export const getMovies = createAsyncThunk(
  'movies/getMovies',
  async(page = 1, thunkAPI) => {
    try{
      const response = await axios.get(`${URL}/trending/all/week?page=${page}&api_key=${API_KEY}`);
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
)
  
  export const getMovieDetails = createAsyncThunk(
    'movies/getMovieDelails',  
    async (movieId, thunkAPI) => {
      try {
        const response = await axios.get(`${URL}/movie/${movieId}?api_key=${API_KEY}`);
        if (response.status !== 200) {
          throw new Error('Error fetching credits movies!');
        }
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
)
  
  export const getMovieCast = createAsyncThunk(
    'movies/getMovieCredits',
    async (movieId, thunkAPI) => {
    try {
      const response = await axios.get(`${URL}/movie/${movieId}/credits?api_key=${API_KEY}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
  
  export const getMovieReviews = createAsyncThunk(
    'movies/getMovieReviews',
    async (movieId, thunkAPI) => {
    try {
      const response = await axios.get(`${URL}/movie/${movieId}/reviews?api_key=${API_KEY}`);
      return response.data.results;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
  
  export const getSearchMovies = createAsyncThunk(
    'movies/getSearchMovies',
    async (query, thunkAPI) => {
    try {
      const response = await axios.get(`${URL}/search/movie?query=${query}&api_key=${API_KEY}`);
      return response.data.results;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getMostRecentMovie = createAsyncThunk(
  'movies/getMostRecentMovie',
  async(_, thunkAPI) => {
    try{
      const response = await axios.get(`${URL}/discover/movie?api_key=${API_KEY}&sort_by=release_date.desc&release_date.lte=${day}`);
      return response.data
    }catch(e){
      return thunkAPI.rejectWithValue(e.response.data)
    }
  }
)

export const moviesRecommendations = createAsyncThunk(
  'movies/moviesRecommendations',
  async(_, thunkAPI) => {
    try{
      const response = await axios.get(`${URL}/movie/1242011/recommendations?api_key=${API_KEY}`);
      return response.data
    } catch(e){
      return thunkAPI.rejectWithValue(e.response.data)
    }
  }
)
