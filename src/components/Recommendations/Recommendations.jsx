import {moviesRecommendations, IMAGE_URL} from '../../redux/movies/getAPI';
import {seriesRecommendations} from '../../redux/series/seriesApi';
import { useDispatch } from 'react-redux';
import { useState  } from 'react';
//import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import './Recommendations.css';

const Recommendations = () => {
  const dispatch = useDispatch();
  const [recommMovies, setRecommMovie] = useState([]);
  const [recommSeries, setRecommSeries] = useState([]);
  const [activeTab, setActiveTab] = useState(null);

  const getMovies = async () => {
    const res = await dispatch(moviesRecommendations());
    setRecommMovie(res.payload.results);
    setActiveTab("movies");
  };

  const getSeries = async () => {
    const res = await dispatch(seriesRecommendations());
    setRecommSeries(res.payload.results);
    setActiveTab("series");
  };

 useEffect(() => {
  
    getSeries()
 })

  return (
    <section className='RecommendationSection'>
      <div className='title_filters'>
        <h2 className='sectionTitle'>Recommended</h2>
        <button type="button" onClick={getMovies}>
          Movies
        </button>
        <button type="button" onClick={getSeries}>
          Series
        </button>
      </div>

      <ul className='recommendationList'>
        {activeTab === "movies" &&
          recommMovies
          .filter(m => m.poster_path)
          .map((m) => (
            <li key={m.id}>
            <Link className="Item" to={`/movies/${m.id}`}>
              <img
                src={IMAGE_URL + m.poster_path}
                alt={m.title || m.name}
              />
              <h2 className='movieTitle'>{m.title || m.name}</h2>
            </Link>
            </li>
          ))}

        {
        activeTab === "series" &&
          recommSeries
          .filter(s => s.poster_path)
          .map((s) => (
            <li key={s.id}>
              <Link className="Item" to={`/tv/${s.id}`}>
                <img
                  src={IMAGE_URL + s.poster_path}
                  alt={s.title || s.name}
                />
                <div className='titleSection'>
                  <h2 className='movieTitle'>{s.title || s.name}</h2>
                </div>
              </Link>
            </li>
          ))}
      </ul>
    </section >
  );
};



export default Recommendations;