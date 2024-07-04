import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieCredits, IMAGE_URL } from '../API/getAPI';
import Loader from '../Loader/Loader';
import styles from './Cast.module.css';

const Cast = () => {
  const [movieCredits, setMovieCredits] = useState([]);
  const { movieId } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchMovieCredits() {
      setIsLoading(true);
      try {
        const response = await getMovieCredits(movieId);
        setMovieCredits(response.cast);
      } catch (error) {
        console.error('Error fetching movie credits:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovieCredits();
  }, [movieId]);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <ul className={styles.castContainer}>
          {movieCredits.map(movieCredit => (
            <li key={movieCredit.id} className={styles.actorInfo}>
              <img
                src={IMAGE_URL + movieCredit.profile_path}
                alt={movieCredit.name}
              />
              <h3>{movieCredit.name}</h3>
              <p>
                <b>Character:</b> {movieCredit.character}
              </p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Cast;