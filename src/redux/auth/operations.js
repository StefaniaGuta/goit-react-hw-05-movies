import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import Notiflix from 'notiflix';


const API_URL =  'https://backend-pro-beige.vercel.app/';

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};


export const register = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    try {

      const res = await axios.post(`${API_URL}api/auth/register`, credentials);

      if (res.status === 201) {
        console.log('Registration successfully!');

        const loginResponse = await axios.post(`${API_URL}api/auth/login`, {
          email: credentials.email,
          password: credentials.password
        });

        if (loginResponse.status === 200 && loginResponse.data.token) {
          localStorage.setItem('authToken', loginResponse.data.token);

          setAuthHeader(loginResponse.data.token) 
          return loginResponse.data;
        }
      }
      console.log(res)

      return res.data;
    } catch (error) {

      if (error.response && error.response.status === 409) {
        Notiflix.Notify.failure('Email already registered!');
      } else {
        Notiflix.Notify.failure('Registration failed.');
      }
      console.log(error)
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const logIn = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}api/auth/login`, credentials);
      const { token } = response.data;
      setAuthHeader(token);
      localStorage.setItem('token', token);
      return response.data;
    } catch (error) {
      if(error.response.status === 401){
        return Notiflix.Notify.failure("Email or password is wrog")
      }
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


export const logOut = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token || localStorage.getItem('token');

    if (!token) {
      return thunkAPI.rejectWithValue('No token available for logout');
    }

    try {
      await axios.get(`${API_URL}api/auth/logout`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      clearAuthHeader();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const currentUser = createAsyncThunk(
  'auth/current',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;
  
    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }
  
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_URL}api/auth/current`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);