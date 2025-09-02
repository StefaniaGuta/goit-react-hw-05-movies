import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieReviews } from '../../redux/movies/getAPI';
import Loader from '../Loader/Loader';
import { useDispatch } from 'react-redux';

const Reviews = () => {
  const [movieReviews, setMovieReviews] = useState([]);
  const { movieId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMovieReviews = async () => {
      setIsLoading(true);
      try {
        const response = await dispatch(getMovieReviews(movieId));
        setMovieReviews(response.payload);
      } catch (error) {
        console.error('Error fetching movie credits:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovieReviews();
  }, [dispatch, movieId]);
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
        <p>No reviews for this movie</p>
      )}
    </>
  );
};

export default Reviews;