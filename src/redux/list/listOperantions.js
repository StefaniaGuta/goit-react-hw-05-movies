import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const URL = "http://localhost:5000/api/list";

export const postItemInTheList = createAsyncThunk(
	'list/postItemInTheList',
	async(credentials, thunkAPI) => {
		try{
			const res = await axios.post(`${URL}/movies`, credentials);
			console.log(res)
			return res.data
		}catch(e){
			console.log(e)
      console.log("eroare")
			return thunkAPI.rejectWithValue(e);
		}
	}
)

export const getList = createAsyncThunk(
	'list/getList',
	async(_, thunkAPI) => {
		try{
			const res = await axios.get(`${URL}/movies`);
      console.log(res)
			return res.data;
		} catch(e){
			return thunkAPI.rejectWithValue(e)
		}
	}
)

export const deleteItemFromTheList = createAsyncThunk(
	'list/deleteItemFromTheList',
	async({movieId, mediaType, type}, thunkAPI) => {
		try{
			const res = await axios.delete(`${URL}/movies/${movieId}?mediaType=${mediaType}&type=${type}`)
			return res.data
		} catch(e){
			return thunkAPI.rejectWithValue(e)
		}
	}
)