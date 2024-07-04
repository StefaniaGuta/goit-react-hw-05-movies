import React, { useEffect, useState, Suspense } from 'react';
import { useParams, useLocation, Outlet, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { BackLink } from '../API/Link.styled';
import { getMovieDetails, IMAGE_URL } from '../API/getAPI';
import Loader from '../Loader/Loader';
import styles from './MovieDetails.module.css';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const backLinkHref = location.state?.from ?? '/';
  console.log(movieDetails);

  useEffect(() => {
    async function fetchMovieDetails() {
      setIsLoading(true);
      try {
        const response = await getMovieDetails(movieId);
        setMovieDetails(response);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovieDetails();
  }, [movieId]);

  return (
    <>
      <BackLink to={backLinkHref}> ❮ Go Back</BackLink>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.movieDetailsContainer}>
          <div className={styles.movieInfo}>
            <img
              /*src={IMAGE_URL + movieDetails.backdrop_path}*/
              alt={movieDetails.title || movieDetails.name}
            />
            <div>
              <h1>{movieDetails.title || movieDetails.name}</h1>
              <p>User score: {movieDetails.vote_average.toFixed(1)} %</p>
              <h4>Overview</h4>
              <p>{movieDetails.overview}</p>
              <p>
                <b>Genre:</b>{' '}
                {movieDetails.genres.map(genre => genre.name).join(' ')}
              </p>
            </div>
          </div>
          <div className={styles.movieExtraInfo}>
            <h3>Additional information</h3>
            <div className={styles.castReviewDiv}>
              <ul>
                <li>
                  <Link to="cast">Cast</Link>
                </li>
                <li>
                  <Link to="reviews">Reviews</Link>
                </li>
              </ul>
            </div>
            <Suspense fallback={<div>Loading subpage...</div>}>
              <Outlet />
            </Suspense>
          </div>
        </div>
      )}
    </>
  );
};

MovieDetails.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      backdrop_path: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      overview: PropTypes.string.isRequired,
      vote_average: PropTypes.string.isRequired,
      genres: PropTypes.string.isRequired,
    })
  ),
};

export default MovieDetails;