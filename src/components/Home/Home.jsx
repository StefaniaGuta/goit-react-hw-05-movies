import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import {  IMAGE_URL,  theNewRealedMovie, getMovieDetails } from '../../redux/movies/getAPI';
import { newSeriesFetch } from '../../redux/series/seriesApi';
import {useDispatch, useSelector} from 'react-redux';
import Recommendations from '../Recommendations/Recommendations';
import url from '../Images/icons.svg'
import './Home.css';

const Home = () => {
  const [series, setSeries] = useState([]);
  const [releasedMovie, setReleasedMovie] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(null);
  const recentMovies = useSelector(state => state?.movies.recentMovies.results) || [];

  useEffect(() => { 
    const newReleasedMovies = async () => {
      try{
        const response = await dispatch(theNewRealedMovie());
        const allMovies = response.payload.results;
        
        const detailsArray = [];
        for (const m of allMovies) {
          const detailsResponse = await dispatch(getMovieDetails(m.id));
          detailsArray.push(detailsResponse.payload);
        }
        setReleasedMovie(detailsArray)
      } catch(e) {
        console.log(e)
      }
    }
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
    navigate(`/movies/${type}`, { state: { type } });
  };

  const navigateToSeriesPage = (seriesType) => {
    navigate(`/series/${seriesType}`, { state: { seriesType } });
  }

  console.log(activeTab)
  const navigateToRemmendationPage = () => {
    if(activeTab === "movies") {
      navigate(`/movies/moviesrecommended/1038392`)
    } else {
       navigate(`/series/recommendations/71912`);
    }

  }

  return (
    <section className="homeSection">
      <div className="recentlyUpdatesContainer">
        <h2 className='sectionTitle'>Recently Updated</h2>
        <ul className='recentryMoviesList'>
        {recentMovies ? (recentMovies.filter(m => m.poster_path)
        .sort((a, b) => b.release_date - a.release_date)
        .slice(0, 5)
        .map(movie => (
          <>
          <li key={movie.id}>
            <Link className="recentMovie" to={`/movie/${movie.id}`}>
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

      <div className='newReleasedContainer'>
        <span className='title_viewAll'>
          <h2 className='sectionTitle'>New Release - Movies</h2>
          <button onClick={() => handlerNavigate("newReleaseMovie")}>View all &#10230;</button>
        </span>
        <ul className='newReleasedList'>
          {releasedMovie.filter(m => m.poster_path)
          .sort((a, b) => b.vote_average - a.vote_average)
          .slice(0, 4)
          .map((movie, i) => (
            <>
            
              <Link key={i} className="newReleasedItem" to={`/movie/${movie.id}`}>
                <img
                  src={IMAGE_URL + movie.poster_path}
                  alt={movie.title || movie.name}
                />
                <div className='runtime_vote'>
                  <span style={{alignItems: "end"}}>
                    <svg><use xlinkHref={`${url}#clock`}/></svg>
                    {formatRuntime(movie.runtime)}
                  </span>
                  <span style={{alignItems: "center"}}>
                    <svg><use xlinkHref={`${url}#star`}/></svg>
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
            
            </>
          ))}
        </ul>
      </div>    
      
      <div className='newReleasedContainer'>
          <span className='title_viewAll'>
            <h2 className='sectionTitle'>New Release - Series</h2>
            <button onClick={() => navigateToSeriesPage("newReleaseSeries")}>View all &#10230;</button>
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
                <span className='epNumber'>Ep. {s.last_episode_to_air.episode_number}</span>
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
        <button onClick={navigateToRemmendationPage} className='viewAll'>View all &#10230;</button>
        <Recommendations activeTab={activeTab} setActiveTab={setActiveTab}/>
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