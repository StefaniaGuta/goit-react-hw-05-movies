import React, { useEffect, useState, Suspense } from 'react';
import { useParams, useLocation, Outlet, Link } from 'react-router-dom';
import { BackLink } from '../API/Link.styled';
import { getMovieDetails, IMAGE_URL } from '../../redux/movies/getAPI';
import Loader from '../Loader/Loader';
import styles from './MovieDetails.module.css';
import { useDispatch } from 'react-redux';
import noImage from '../Images/no_image.jpg'

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const dispatch = useDispatch();
  const params = new URLSearchParams(location.search);
  const page = params.get("page") || 1;

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setIsLoading(true);
      try {
        const response = await dispatch(getMovieDetails(movieId));
        setMovie(response.payload);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovieDetails();
  }, [dispatch, movieId]);

  return (
    <>
      <BackLink to={`/?page=${page}`}>❮ Go Back</BackLink>
      {isLoading ? (
        <Loader />
      ) : (
        movie && (
          <div className={styles.movieDetailsContainer}>
            <div className={styles.movieInfo}>
                  <img
                    src={movie.poster_path || movie.poster_path ? IMAGE_URL + movie.poster_path : noImage}
                    alt={movie.title || movie.name}
                  />
              <div>
                <h1>{movie.title}</h1>
                <p>User score: {movie.vote_average.toFixed(1)}%</p>
                <h4>Overview</h4>
                <p>{movie.overview}</p>
                <p>
                  <b>Genre:</b>{' '}
                  {movie.genres && movie.genres.length > 0
                    ? movie.genres.map(genre => genre.name).join(", ")
                    : "Other"}
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
