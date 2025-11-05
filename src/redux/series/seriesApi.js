
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { URL, API_KEY } from "../movies/getAPI";

export const seriesDetails = createAsyncThunk(
  'series/seriesDetails',
  async(id, thunkAPI) => {
    try{
      const res = await axios.get(`${URL}/tv/${id}?api_key=${API_KEY}`);
      return res.data;
    } catch(e){
      thunkAPI.rejectWithValue(e.response.message)
    }
  }
)
export const newSeriesFetch = createAsyncThunk(
  'series/newSeriesFetch',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${URL}/tv/airing_today?api_key=${API_KEY}`);
      const seriesList = response.data.results;

      const detailedSeries = await Promise.all(
        seriesList.map(async (serie) => {
          const detailsRes = await axios.get(`${URL}/tv/${serie.id}?api_key=${API_KEY}`);
          return detailsRes.data;
        })
      );
      return detailedSeries;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response?.data || e.message);
    }
  }
);

export const seriesRecommendations = createAsyncThunk(
  'series/seriesRecommendations',
  async(_, thunkAPI) => {
    try{
      const response = await axios.get(`${URL}/tv/119051/recommendations?api_key=${API_KEY}`);
      return response.data
    } catch(e){
      return thunkAPI.rejectWithValue(e.response.data)
    }
  }
)

export const popularSeries = createAsyncThunk(
  'series/popularSeries',
  async(page=1, thunkAPI) => {
    try{
      const res = await axios.get(`${URL}/tv/popular?page=${page}&api_key=${API_KEY}`);
      return res.data;
    } catch(e){
      thunkAPI.rejectWithValue(e.response.message)
    }
  }
)

export const onTvSeries = createAsyncThunk(
  'series/onTvSeries',
  async(page=1, thunkAPI) => {
    try{
      const res = await axios.get(`${URL}/tv/on_the_air?page=${page}&api_key=${API_KEY}`);
      return res.data;
    } catch(e){
      thunkAPI.rejectWithValue(e.response.message)
    }
  }
)

export const topRatedSeries = createAsyncThunk(
  'series/topRatederies',
  async(page=1, thunkAPI) => {
    try{
      const res = await axios.get(`${URL}/tv/top_rated?page=${page}&api_key=${API_KEY}`);
      return res.data;
    } catch(e){
      thunkAPI.rejectWithValue(e.response.message)
    }
  }
)

export const airingTodaySeries = createAsyncThunk(
  'series/airingTodaySeries',
  async(page=1, thunkAPI) => {
    try{
      const res = await axios.get(`${URL}/tv/airing_today?page=${page}&api_key=${API_KEY}`);
      return res.data;
    } catch(e){
      thunkAPI.rejectWithValue(e.response.message)
    }
  }
)

export const getSeriesSeason = createAsyncThunk(
  'series/getSeriesSeason',
  async({id, seasonNumber}, thunkAPI) => {
    try{
      const res = await axios.get(`${URL}/tv/${id}/season/${seasonNumber}?api_key=${API_KEY}`);
      return res.data;
    } catch(e){
      thunkAPI.rejectWithValue(e.response.message);
    }
  }
)