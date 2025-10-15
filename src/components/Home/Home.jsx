import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { getAll, IMAGE_URL, getMovieDetails, theNewRealedMovie } from '../../redux/movies/getAPI';
import { newSeriesFetch } from '../../redux/series/seriesApi';
import {useDispatch, useSelector} from 'react-redux';
import time from '../Images/time.png';
import star from '../Images/star.png';
import Recommendations from '../Recommendations/Recommendations';
import './Home.css';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [releasedMovie, setReleasedMovie] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const recentMovies = useSelector(state => state?.movies.recentMovies.results) || [];

  useEffect(() => { 
    const fetchMovies = async () => {
      try {
        const response = await dispatch(getAll());
        const allMovies = response.payload.results;
        
        const detailsArray = [];
        for (const m of allMovies) {
          const detailsResponse = await dispatch(getMovieDetails(m.id));
          detailsArray.push(detailsResponse.payload);
        }
        setMovies(detailsArray);
      } catch (error) {
        console.error('Error fetching trending movies:', error);
      }
    };

    const newReleasedMovies = async () => {
      try{
        const response = await dispatch(theNewRealedMovie());
        setReleasedMovie(response.payload.results)
      } catch(e) {
        console.log(e)
      }
    }
    fetchMovies();
    newReleasedMovies();
  }, [dispatch]);

  const formatRuntime = (minutes) => {
    if (!minutes || minutes <= 0) return "N/A";
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}h ${m}m`;
  };

  useEffect(() => {
    const fetchSeries = async () => {
      const res = await dispatch(newSeriesFetch());
      setSeries(res.payload)
    }
    fetchSeries();
  }, [dispatch])

  const handlerNavigate = (type) => {
  navigate("/movies", { state: { type } });
};
  
  return (
    <section className="homeSection">
      <div className="recentlyUpdatesContainer">
        <h2 className='sectionTitle'>Recently Updated</h2>
        <ul className='recentryMoviesList'>
        {recentMovies ? (recentMovies.filter(m => m.poster_path)
        .slice(0, 5)
        .map(movie => (
          <>
          <li key={movie.id}>
            <Link className="recentMovie" to={`/movies/${movie.id}`}>
              <img
                src={IMAGE_URL + movie.poster_path}
                alt={movie.title || movie.name}
              />
              <div>
              <h2 className='movieTitle'>{movie.title || movie.name}</h2>
              </div>
            </Link>
          </li>
          
          </>
        )) ) : (<p>no</p>)}
        <button onClick={() => handlerNavigate("popular")} className='recentMovieButton' type='button'>&#10230;</button>
      </ul>
      </div>

      <div className='trendingContainer'>
        <span className='title_viewAll'>
          <h2 className='sectionTitle'>In trending today</h2>
          <button onClick={() => handlerNavigate("inTrending")}>View all &#10230;</button>
        </span>
        <ul className="movieInTrendingList">
          {movies
          .filter(m => m.poster_path && m.genres.length > 0)
          .sort((a, b) => b.vote_average - a.vote_average)
          .slice(0, 4)
          .map(movie => (
           
            <li key={movie.id}>
              <Link className='movieInTrending' to={`/movies/${movie.id}`}>
                <img
                  src={IMAGE_URL + movie.poster_path}
                  alt={movie.title || movie.name}
                />
                <div className='runtime_vote'>
                  <span style={{alignItems: "center"}}>
                    <img src={time} alt='a clock'/>
                    {formatRuntime(movie.runtime)}
                  </span>
                  <span style={{alignItems: "first baseline"}}>
                    <img src={star} alt='a white star'/>
                    {movie.vote_average.toFixed(1)}
                  </span>
                </div>
                <div className='titleSection'>
                  <h2 className='movieTitle'>{movie.title || movie.name}</h2>
                  <ul>
                    {movie.genres
                    .slice(0, 1)
                    .map(gen => (
                      <li className='movieGenre' key={gen.id}>{gen.name}</li>
                    ))}
                  </ul>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>  

      <div className='newReleasedContainer'>
        <span className='title_viewAll'>
          <h2 className='sectionTitle'>New Release - Movies</h2>
          <button onClick={() => handlerNavigate("newReleaseMovie")}>View all &#10230;</button>
        </span>
        <ul className='newReleasedList'>
          {releasedMovie.filter(m => m.poster_path)
          .sort((a, b) => b.vote_average - a.vote_average)
          .slice(0, 4)
          .map(movie => (
            <>
            <li key={movie.id}>
              <Link className="newReleasedItem" to={`/movies/${movie.id}`}>
                <img
                  src={IMAGE_URL + movie.poster_path}
                  alt={movie.title || movie.name}
                />
                <h2 className='movieTitle'>{movie.title || movie.name}</h2>
              </Link>
            </li>
            </>
          ))}
        </ul>
      </div>    
      
      <div className='newReleasedContainer'>
          <span className='title_viewAll'>
            <h2 className='sectionTitle'>New Release - Series</h2>
            <button>View all &#10230;</button>
        </span>
        <ul className='newReleasedList'>
          {series.filter(m => m.poster_path)
          .sort((a, b) => b.popularity - a.popularity)
          .slice(0, 4)
          .map(s => (
            <>
            <li key={s.id}>
              <Link className="newReleasedItem" to={`/tv/${s.id}`}>
                <img
                  src={IMAGE_URL + s.poster_path}
                  alt={s.title || s.name}
                />
                <div className='titleSection'>
                  <h2 className='movieTitle'>{s.title || s.name}</h2>
                  <p className='seasonNumber'>Season {s.last_episode_to_air.season_number}</p>
                </div>
              </Link>
            </li>
            </>
          ))}
        </ul>
      </div>

      <div className='RecommendationContainer'>
        <button className='viewAll'>View all &#10230;</button>
        <Recommendations/>
      </div>
    </section>
  );
};

Home.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      backdrop_path: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ),
};

export default Home;