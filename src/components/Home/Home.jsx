import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getMovies, IMAGE_URL } from '../API/getAPI';
import styles from './Home.module.css';

const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await getMovies();
        setMovies(response.results);
      } catch (error) {
        console.error('Error fetching trending movies:', error);
      } finally {
      }
    }
    fetchMovies();
  }, []);

  return (
    <div className={styles.trendingContainer}>
      <>
        <h1>In tranding today</h1>
        <ul>
          {movies.map(movie => (
            <li key={movie.id}>
              <Link to={`/movies/${movie.id}`}>
                <img src={IMAGE_URL + movie.backdrop_path} alt={movie.title || movie.name} />
                <p>{movie.title || movie.name}</p>
              </Link>
            </li>
          ))}
        </ul>
      </>
    </div>
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