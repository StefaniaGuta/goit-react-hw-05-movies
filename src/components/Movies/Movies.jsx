import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { BackLink } from '../API/Link.styled';
import { getSearchMovies } from '../API/getAPI';
import Loader from '../Loader/Loader';
import Searchbar from '../Searchbar/Searchbar';
import SearchMoviesList from '../SearchMoviesList/SearchMoviesList';
import Notiflix from 'notiflix';
import styles from './Movies.module.css';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [resetQuery, setResetQuery] = useState(false);
  const location = useLocation();
  const backLinkHref = location.state?.from ?? '/';

  useEffect(() => {
    async function searchMovies() {
      if (query === '') {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const response = await getSearchMovies(query);
        if (response.results.length === 0) {
          Notiflix.Notify.failure('No movies found with the given title!');
        }
        setMovies(response.results);
      } catch (error) {
        console.error('Error fetching trending movies:', error);
        Notiflix.Notify.failure('An error occurred while searching for movies!');
      } finally {
        setIsLoading(false);
        setResetQuery(true); 
      }
    }
    searchMovies();
  }, [query]);

  const handleSubmit = newQuery => {
    setMovies([]);
    setQuery(newQuery);
    setResetQuery(false);
  };

  return (
    <>
      <div className={styles.back}>
        <BackLink to={backLinkHref}>❮ Go Back</BackLink>
        <Searchbar onSubmit={handleSubmit} resetQuery={resetQuery} />
      </div>

      {isLoading ? <Loader /> : <SearchMoviesList movies={movies} />}
    </>
  );
};

Movies.propTypes = {
  movies: PropTypes.array,
};

export default Movies;