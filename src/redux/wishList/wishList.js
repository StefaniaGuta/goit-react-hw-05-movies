import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const URL = "http://localhost:5000/api/wishList";

export const createWishList = createAsyncThunk(
	'wishList/createWishList',
	async(credentials, thunkAPI) => {
		try{
			const res = await axios.post(`${URL}/wishListCreate`, credentials);
			console.log(res)
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
			console.log(res)
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
			console.log(res.data)
			return res.data
		} catch(e){
			console.log(e);
			return thunkAPI.rejectWithValue(e.response.data);
		}
	}
)