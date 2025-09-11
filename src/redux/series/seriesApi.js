
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { URL, API_KEY } from "../movies/getAPI";

export const seriesDetails = createAsyncThunk(
  'series, seriesDetails',
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

