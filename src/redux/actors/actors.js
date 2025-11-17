import axios from "axios";
import {URL, API_KEY} from '../movies/getAPI';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const popularActors = createAsyncThunk(
    'actors/popularActors',
  async(_, thunkAPI) => {
    try{
      const response = await axios.get(`${URL}/person/popular?api_key=${API_KEY}`);
      return response.data
    } catch(e){
      return thunkAPI.rejectWithValue(e.response.data)
    }
  }
)

export const getActorDetails = createAsyncThunk(
  'actors/getActorDetails',
  async(id, thunkAPI) => {
    try{
      const response = await axios.get(`${URL}/person/${id}?api_key=${API_KEY}`);
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
)

export const getActorCredits = createAsyncThunk(
  'actors/getActorCredits',
  async(id, thunkAPI) => {
    try{
      const response = await axios.get(`${URL}/person/${id}/combined_credits?api_key=${API_KEY}`);
      return response.data
    } catch(error){
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
)

export const getActorImages = createAsyncThunk(
  'actors/getActorImages',
  async(id, thunkAPI) => {
    try{
      const response = await axios.get(`${URL}/person/${id}/images?api_key=${API_KEY}`);
      return response.data
    } catch(error){
        return thunkAPI.rejectWithValue(error.response.data);
    }
  }
)

export const getActorExternalIds = createAsyncThunk(
  'actors/getActorExternalIds',
  async(id, thunkAPI) => {
    try{
      const response = await axios.get(`${URL}/person/${id}/external_ids?api_key=${API_KEY}`);
      return response.data
    } catch(error){
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
)