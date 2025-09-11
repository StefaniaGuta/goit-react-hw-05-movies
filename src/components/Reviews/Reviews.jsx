import React, {  useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieReviews } from '../../redux/movies/getAPI';
import Loader from '../Loader/Loader';
import { useDispatch } from 'react-redux';

const Reviews = () => {
  const [open, setOpen] = useState()
  const [movieReviews, setMovieReviews] = useState([]);
  const { movieId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

    const fetchMovieReviews = async () => {
      setIsLoading(true);
      setOpen(!open)
      try {
        const response = await dispatch(getMovieReviews(movieId));
        setMovieReviews(response.payload);
      } catch (error) {
        console.error('Error fetching movie credits:', error);
      } finally {
        setIsLoading(false);
    }
    }

 
  return (
    <>
      <button onClick={() => fetchMovieReviews()}>Reviews</button>
      {open && 
        (isLoading ? ( <Loader/> ) : (<ul>
          {movieReviews.length > 0 ? (
            movieReviews.map(movieReview => (
              <li key={movieReview.id}>
                <p>
                  <b>{movieReview.author}</b>
                </p>
                <p>{movieReview.content}</p>
              </li>
            ))
          ) : (<p>We do not have any reviews to diplay for this movie!</p>)}
        </ul>)
      )}
    </>
  );
};

export default Reviews;