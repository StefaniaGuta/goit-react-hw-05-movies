import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const URL = 'https://api.themoviedb.org/3';
export const API_KEY = '522a85804afc455b1edd9d5e4b52e3fb';
export const IMAGE_URL = 'https://media.themoviedb.org/t/p/w220_and_h330_face/';
export const day = new Date().toISOString().split("T")[0];

export const getAll = createAsyncThunk(
  'movies/getAll',
  async(page=1, thunkAPI) => {
    try{
      const response = await axios.get(`${URL}/trending/all/week?page=${page}&api_key=${API_KEY}`);
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
)

export const getTrendingAll = createAsyncThunk(
  'movies/getTrendingAll',
  async(_, thunkAPI) => {
    try{
      const response = await axios.get(`${URL}/trending/all/day?api_key=${API_KEY}`);
      return response.data
    }catch(e){
      return thunkAPI.rejectWithValue(e.response.data)
    }
  }
)

export const theNewRealedMovie = createAsyncThunk(
  'movies/getTheNewReleasedMovie',
  async(page=1, thunkAPI) => {
    try{
      const response = await axios.get(`${URL}/movie/now_playing?page=${page}&api_key=${API_KEY}`);
      return response.data
    } catch(e)  {
      return thunkAPI.rejectWithValue(e.response.data)
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
    async ({show, movieId}, thunkAPI) => {
    try {
      const response = await axios.get(`${URL}/${show}/${movieId}/credits?api_key=${API_KEY}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
  
  export const getMovieReviews = createAsyncThunk(
    'movies/getMovieReviews',
    async ({show, movieId}, thunkAPI) => {
    try {
      const response = await axios.get(`${URL}/${show}/${movieId}/reviews?api_key=${API_KEY}`);
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


export const moviesRecommendations = createAsyncThunk(
  'movies/moviesRecommendations',
  async({id, page=1}, thunkAPI) => {
    try{
      const response = await axios.get(`${URL}/movie/${id}/recommendations?page=${page}&api_key=${API_KEY}`);
      return response.data
    } catch(e){
      return thunkAPI.rejectWithValue(e.response.data)
    }
  }
)

export const getGenres = createAsyncThunk(
  'movies/getGenres',
  async(_, thunkAPI) => {
    try{
      const response = await axios.get(`${URL}/genre/movie/list?api_key=${API_KEY}`);
      return response.data
    } catch(e){
      return thunkAPI.rejectWithValue(e.response.data)
    }
  }
)

export const popularActors = createAsyncThunk(
    'movies/popularActors',
  async(_, thunkAPI) => {
    try{
      const response = await axios.get(`${URL}/person/popular?api_key=${API_KEY}`);
      return response.data
    } catch(e){
      return thunkAPI.rejectWithValue(e.response.data)
    }
  }
)

export const getTrailer = createAsyncThunk(
  'series/getTrailer',
  async({id,show }, thunkAPI) => {
    try{
      const response = await axios.get(`${URL}/${show}/${id}/videos?api_key=${API_KEY}`);
      return response.data;
    } catch(e){
      return thunkAPI.rejectWithValue(e.response.data)
    }
  }
)

export const getPopularMovies = createAsyncThunk(
  'movies/getPopularMovies',
  async({page=1}, thunkAPI) => {
    try{
      const response = await axios.get(`${URL}/movie/popular?page=${page}&api_key=${API_KEY}`);
      return response.data;
    } catch(e){
      return thunkAPI.rejectWithValue(e.response.data)
    }
  }
)

export const getNowPlayingMovies = createAsyncThunk(
  'movies/getMowPlayingMovies',
  async(page=1, thunkAPI) => {
    try{
      const response = await axios.get(`${URL}/movie/now_playing?region=RO&api_key=${API_KEY}`);
      return response.data;
    } catch(e){
      return thunkAPI.rejectWithValue(e.response.data)
    }
  }
)

export const getUpcomingMovies = createAsyncThunk(
  'movies/getUpcomingMovies',
  async(page=1, thunkAPI) => {
    try{
      const response = await axios.get(`${URL}/movie/upcoming?region=RO&api_key=${API_KEY}`);
      return response.data;
    } catch(e){
      return thunkAPI.rejectWithValue(e.response.data)
    }
  }
)

export const getTopRatedMovies = createAsyncThunk(
  'movies/getTopRatedMovies',
  async({page=1}, thunkAPI) => {
    try{
      const response = await axios.get(`${URL}/movie/top_rated?page=${page}&region=RO&api_key=${API_KEY}`);
      return response.data;
    } catch(e){
      return thunkAPI.rejectWithValue(e.response.data)
    }
  }
)