import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieCast, IMAGE_URL } from '../../redux/movies/getAPI';
import Loader from '../Loader/Loader';
import styles from './Cast.module.css';
import { useDispatch } from 'react-redux';
import noImage from '../Images/no_image.jpg';

const Cast = () => {
  const [movieCredits, setMovieCredits] = useState([]);
  const { movieId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchMovieCredits = async () => {
      setIsLoading(true);
      try {
        const response = await dispatch(getMovieCast(movieId));
        setMovieCredits(response.payload.cast);
      } catch (error) {
        console.error('Error fetching movie credits:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovieCredits();
  }, [dispatch, movieId]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <ul className={styles.castContainer}>
          {movieCredits.length > 0 && movieCredits ? (movieCredits.map(movieCredit => (
            <li key={movieCredit.id} className={styles.actorInfo}>
              <img
                src={movieCredit.profile_path ? IMAGE_URL + movieCredit.profile_path : noImage}
                alt={movieCredit.name}
              />
              <h3>{movieCredit.name}</h3>
              <p>
                <b>Character:</b> {
                movieCredit.character}
              </p>
            </li>
          ))) : (<p>no cast to desplay</p>)}
        </ul>
      )}
    </>
  );
};

export default Cast;