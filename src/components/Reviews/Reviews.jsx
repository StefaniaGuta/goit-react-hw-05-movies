import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieReviews } from '../API/getAPI';
import Loader from '../Loader/Loader';

const Reviews = () => {
  const [movieReviews, setMovieReviews] = useState([]);
  const { movieId } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchMovieReviews() {
      setIsLoading(true);
      try {
        const response = await getMovieReviews(movieId);
        setMovieReviews(response.results);
      } catch (error) {
        console.error('Error fetching movie credits:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovieReviews();
  }, [movieId]);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : movieReviews.length > 0 ? (
        <ul>
          {movieReviews.map(movieReview => (
            <li key={movieReview.id}>
              <p>
                <b>{movieReview.author}</b>
              </p>
              <p>{movieReview.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Sorry, we don't have any reviews for this movie</p>
      )}
    </>
  );
};

export default Reviews;