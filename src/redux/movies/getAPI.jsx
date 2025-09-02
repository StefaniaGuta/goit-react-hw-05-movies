import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const URL = 'https://api.themoviedb.org/3';
const API_KEY = '046ac13b969fd43f0e6a6ee26ddbba59';
export const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

export const getMovies = createAsyncThunk(
  'movies/getMovies',
  async(page = 1, thunkAPI) => {
    try{
      const response = await axios.get(`${URL}/trending/movie/week?page=${page}&api_key=${API_KEY}`);
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
        console.log(response.data)
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
    '<movies/getSearchMovies',
    async (query, thunkAPI) => {
    try {
      const response = await axios.get(`${URL}/search/movie?query=${query}&api_key=${API_KEY}`);
      return response.data.results;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);