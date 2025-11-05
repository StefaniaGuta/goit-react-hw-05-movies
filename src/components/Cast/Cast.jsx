import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getMovieCast, IMAGE_URL } from '../../redux/movies/getAPI';
import noImage from '../Images/no_image.jpg';
import url from '../Images/icons.svg';
import './Cast.css';

const Cast = (show) => {
  const [movieCredits, setMovieCredits] = useState([]);
  const [open, setOpen] = useState();
  const { movieId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMovieCredits = async () => {
      try {
        const response = await dispatch(getMovieCast({show: show.show, movieId: movieId}));
        setMovieCredits(response.payload.cast);
      } catch (error) {
        console.error('Error fetching movie credits:', error);
      }
    }
    fetchMovieCredits();
  }, [dispatch, movieId, show]);

const openModal = () => {
    setOpen(!open)
  }

  return (
    <section className='movie-cast'>
      <ul>
        {movieCredits.length > 0 && movieCredits ? 
          (movieCredits.slice(0, 5).map(movieCredit => (
            <li className='movieCastActor' key={movieCredit.id} >
            <img className='actorPhoto'
              src={movieCredit.profile_path ? IMAGE_URL + movieCredit.profile_path : noImage}
              alt={movieCredit.name}
            />
            <h3 className='movieActorName'>{movieCredit.name}</h3>
          </li>
        ))) : (<p>We do not have any information to display about this production!</p>)}
        {movieCredits.length > 5 
        ? <button onClick={openModal} className='viewMoreCastBtn'>
          <svg width="27" height="15"><use xlinkHref={`${url}#down-btn`}/></svg>
          View more
          </button>
        : null }
      </ul>
      {open ? (
        <ul className='castModal'>
          {movieCredits.map(cast => (
            <li className='castModalActor' key={cast.id} >
            <img className='castModalActorPhoto'
              src={cast.profile_path ? IMAGE_URL + cast.profile_path : noImage}
              alt={cast.name}
            />
            <h3 className='movieActorName'>
              {cast.name}
              <p className='movieActorCharacterName'>Character: {cast.character}</p>
            </h3>
          </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
};

export default Cast;