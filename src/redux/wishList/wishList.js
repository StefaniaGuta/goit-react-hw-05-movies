import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const URL = "http://localhost:5000/api/wishList";

export const createWishList = createAsyncThunk(
	'wishList/createWishList',
	async(credentials, thunkAPI) => {
		try{
			const res = await axios.post(`${URL}/wishListCreate`, credentials);
			return res.data
		}catch(e){
			console.log(e)
			return thunkAPI.rejectWithValue(e.response.data);
		}
	}
)

export const getWishList = createAsyncThunk(
	'wishList/getWishList',
	async(_, thunkAPI) => {
		try{
			const res = await axios.get(`${URL}/myWishList`);
			return res.data
		}catch(e){
			console.log(e)
			return thunkAPI.rejectWithValue(e.response.data);
		}
	}
)

export const getOneWishList = createAsyncThunk(
	'wishList/getOneWishList',
	async(listId, thunkAPI) =>{
		try{
			const res = await axios.get(`${URL}/${listId}`);
			return res.data
		} catch(e){
			console.log(e);
			return thunkAPI.rejectWithValue(e.response.data);
		}
	}
)

export const deleteWishList = createAsyncThunk(
	'wishList/deleteWishList',
	async(listId, thunkAPI) => {
		try{
			const res = await axios.delete(`${URL}/${listId}`);
			return res.data
		} catch(e){
			return thunkAPI.rejectWithValue(e.response.data)
		}
	}
)

export const updateWishList = createAsyncThunk(
  'wishList/updateWishList',
  async ({ id, name, description }, thunkAPI) => {
    try {
      const res = await axios.put(`${URL}/${id}`, {
        name,
        description
      });
      return res.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(
        e.response?.data || { message: 'Server error' }
      );
    }
  }
);