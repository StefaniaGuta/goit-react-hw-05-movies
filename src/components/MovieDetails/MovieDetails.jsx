import React, { useEffect, useState, Suspense } from 'react';
import { useParams, useLocation, Outlet, Link } from 'react-router-dom';
import { BackLink } from '../API/Link.styled';
import { getMovieDetails, IMAGE_URL } from '../API/getAPI';
import Loader from '../Loader/Loader';
import styles from './MovieDetails.module.css';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const backLinkHref = location.state?.from ?? '/';

  useEffect(() => {
    async function fetchMovieDetails() {
      setIsLoading(true);
      try {
        const response = await getMovieDetails(movieId);
        setMovie(response);
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
      <BackLink to={backLinkHref}>❮ Go Back</BackLink>
      {isLoading ? (
        <Loader />
      ) : (
        movie && (
          <div className={styles.movieDetailsContainer}>
            <div className={styles.movieInfo}>
              <img
                src={`${IMAGE_URL}/${movie.poster_path}`}
                alt={movie.title}
              />
              <div>
                <h1>{movie.title}</h1>
                <p>User score: {movie.vote_average.toFixed(1)}%</p>
                <h4>Overview</h4>
                <p>{movie.overview}</p>
                <p>
                  <b>Genre:</b>{' '}
                  {movie.genres.map(genre => genre.name).join(', ')}
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
        )
      )}
    </>
  );
};

export default MovieDetails;
