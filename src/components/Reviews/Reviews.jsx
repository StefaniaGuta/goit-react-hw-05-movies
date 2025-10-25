import React, {  useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieReviews } from '../../redux/movies/getAPI';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import noImg from '../Images/no_image.jpg';
import './Reviews.css';

const Reviews = () => {
  const [open, setOpen] = useState()
  const [movieReviews, setMovieReviews] = useState([]);
  const { movieId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchMovieReviews = async () => {
      try {
        const response = await dispatch(getMovieReviews(movieId));
        setMovieReviews(response.payload);
      } catch (error) {
        console.error('Error fetching movie credits:', error);
      }
    }
  fetchMovieReviews();
  }, [dispatch, movieId]);

  const openModal = () => {
    setOpen(!open)
  }
 
  return (
    <section className='reviewsSection'>
      <h3>Reviews</h3>
      <ul className='reviewsList'>
        {movieReviews.length > 0 ? (
          movieReviews.slice(0, 4).map(movieReview => (
            <li className='review' key={movieReview.id}>
              <img src={noImg} alt='author'/>
              <span className='reviewContent'>
                <h2 className='reviewAuthor'>{movieReview.author}</h2>
                <p className='reviewText'>{movieReview.content}</p>
              </span>
            </li>
          ))
        ) : (<p>We do not have any reviews to diplay for this movie!</p>)}
        {movieReviews.length > 4 ? <button className='seeMoreReviwsBtn' onClick={openModal}>See more Reviews</button> : null}
      </ul>

      {open ? (
        <ul className='reviewsModal'>
          {movieReviews.map(movieReview => (
            <li className='reviewModal' key={movieReview.id}>
              <img src={noImg} alt='author'/>
              <span className='modalReviewContent'>
                <h2 className='reviewAuthor'>{movieReview.author}</h2>
                <p className='modalReviewText'>{movieReview.content}</p>
              </span>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
};

export default Reviews;