import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getMovies, IMAGE_URL } from '../../redux/movies/getAPI';
import styles from './Home.module.css';
import {useDispatch} from 'react-redux';
import Pagination from 'components/Pagination/Pagination';
import { useSearchParams } from "react-router-dom";
import noImage from '../Images/no_image.jpg';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromUrl = parseInt(searchParams.get("page")) || 1;
  const [page, setPage] = useState(pageFromUrl);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await dispatch(getMovies(page));
        setMovies(response.payload.results);
        setTotalPages(response.payload.total_pages);
      } catch (error) {
        console.error('Error fetching trending movies:', error);
      }
    }
    fetchMovies();
  }, [dispatch, page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    setSearchParams({ page: newPage });
  };

  return (
    <div className={styles.trendingContainer}>
      <h1>In trending today</h1>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}?page=${page}`}>
              <img
                src={movie.poster_path || movie.poster_path ? IMAGE_URL + movie.poster_path : noImage}
                alt={movie.title || movie.name}
              />
              <p>{movie.title || movie.name}</p>
            </Link>
          </li>
        ))}
      </ul>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
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