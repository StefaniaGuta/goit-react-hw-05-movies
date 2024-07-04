import axios from 'axios';

const URL = 'https://api.themoviedb.org/3';
const API_KEY = '046ac13b969fd43f0e6a6ee26ddbba59';
export const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';


export async function getMovies() {
  const fetchMoviesURL = `${URL}/trending/all/day?language=en-US&api_key=${API_KEY}`;
  try {
    const response = await fetch(fetchMoviesURL);
    const data = await response.json();
    console.log(response.data);
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getMovieDetails(movieId) {
  const fetchMoviesURL = `${URL}/movie/${movieId}?language=en-US&api_key=${API_KEY}`;
  try {
    const response = await axios.get(fetchMoviesURL);
    if (response.status !== 200) {
      throw new Error('Error fetching credits movies!');
    }
   // return response.data;
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
}

export const getMovieCredits = async movieId => {
  const fetchMoviesURL = `${URL}/movie/${movieId}/credits?language=en-US&api_key=${API_KEY}`;
  try {
    const response = await axios.get(fetchMoviesURL);
   // return response.data;
   console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

export const getMovieReviews = async movieId => {
  const fetchMoviesURL = `${URL}/movie/${movieId}/reviews?language=en-US&api_key=${API_KEY}`;
  try {
    const response = await axios.get(fetchMoviesURL);
    //return response.data;
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

export const getSearchMovies = async query => {
  const fetchMoviesURL = `${URL}/search/movie?language=en-US&query=${query}&api_key=${API_KEY}`;
  try {
    const response = await axios.get(fetchMoviesURL);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};