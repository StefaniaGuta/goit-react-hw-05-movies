import React, { useEffect, useState } from 'react';
import { useParams,  Link } from 'react-router-dom';
import { getMovieDetails, IMAGE_URL, moviesRecommendations } from '../../redux/movies/getAPI';
import Loader from '../Loader/Loader';
import { useDispatch } from 'react-redux';
import noImage from '../Images/no_image.jpg';
import Reviews from 'components/Reviews/Reviews';
import Cast from 'components/Cast/Cast';
import url from '../Images/icons.svg';
import Trailers from 'components/Trailer/Trailer';
import './MovieDetails.css';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const [recommendation, setRecommendation] = useState([]);

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

    const getMovies = async () => {
      const res = await dispatch(moviesRecommendations(movieId));
      setRecommendation(res.payload.results);
    };    
    fetchMovieDetails();
    getMovies();
  }, [dispatch, movieId]);


  const formatRuntime = (minutes) => {
    if (!minutes || minutes <= 0) return "N/A";
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}h ${m}m`;
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        movie && (
          <div className="movieDetailsContainer">
            <div className="movieInfo" style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${movie.poster_path})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}>
              <span className='title-watchlist-container'>
                <h1 className='movieName'>
                  {movie.name || movie.title}   ({new Date(movie.release_date).getFullYear()})
                </h1>
                <span>
                  <svg className='addToListSvg' width="30" height="30"><use xlinkHref={`${url}#heart`}/></svg>
                  <svg className='addToListSvg' width="22" height="25" ><use xlinkHref={`${url}#favorite`}/></svg>
                </span>
              </span>
              <div className='infoAbtMovie'>
                <div>
                  <img className='infoAbtMovieImg'
                    src={movie.poster_path || movie.backdrop_path ? IMAGE_URL + movie.poster_path : noImage}
                    alt={movie.title || movie.name}
                  />
                  <Trailers id={movie} show={"movie"}/>
                </div>
                <div>
                  <h2 className='movieName'>{movie.name || movie.title}</h2>
                  <p>{movie.tagline || "One step. One decision. A new world."}</p>
                  <div className='movie-in-numbers'>
                    <p>
                      <svg width="15" height="15"><use xlinkHref={`${url}#clock`}/></svg>
                      {formatRuntime(movie.runtime)}
                    </p>
                    <p><svg width="15" height="15"><use xlinkHref={`${url}#star`}/></svg>{movie.vote_average.toFixed(1)}</p>
                    <p>
                      <svg width="20" height="20"><use xlinkHref={`${url}#eye`}/></svg>
                      {movie.vote_count}
                    </p>
                  </div>

                  <div className='movie-details-cast'>
                    <div className='movie-details'>
                      <h3 className='movieDetailsContainerSectionTitle'>DETAILS</h3>
                      <p>
                        <b>Country:</b> 
                        {movie.production_countries[0].name}
                      </p>
                      <p>
                        <b>Genre:</b>    
                        {movie.genres && movie.genres.length > 0
                          ? movie.genres.map(genre => genre.name).join(", ")
                          : "Other"}
                      </p>
                      <p>
                        <b>Language:</b>
                        {movie.spoken_languages && movie.spoken_languages.length > 0
                          ? movie.spoken_languages.map(lang => lang.english_name).join(", ")
                          : "Other"}
                      </p>
                      <p>
                        <b>Date Release:</b> 
                        {movie.release_date}
                      </p>
                      <p>
                        <b>Production: </b>
                        {movie.production_companies && movie.production_companies.length > 0
                          ? movie.production_companies.map(prod => prod.name).join(", ")
                          : "Not specified"}
                      </p>
                      <p>
                        <b>Colection:</b>
                        {movie.belongs_to_collection
                          ? movie.belongs_to_collection.name
                          : "Not specified"}
                      </p>
                    </div>
                    <div className='movie-cast'>
                      <h3 className='movieDetailsContainerSectionTitle'>CAST</h3>
                      <Cast/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="movieExtraInfo">
              <span className='storyLine'>
                <h3 className='movieDetailsContainerSectionTitle'>Storyline</h3>
                {movie.overview}
              </span>
              <div>
                <h3 className='movieDetailsContainerSectionTitle'>Similar Movies</h3>
                <ul className='recommendationList'>
                  {recommendation
                    .filter(m => m.poster_path)
                    .slice(0, 5)
                    .map((m) => (
                      <Link key={m.id} to={`/movie/${m.id}`}>
                        <img className='movieExtraInfoImg'
                          src={IMAGE_URL + m.poster_path}
                          alt={m.title || m.name}
                        />
                        <h2 className='specificMovieTitle'>{m.title || m.name}</h2>
                      </Link>
                  ))}
                  <button className='viewMoreRecommendationMovies'>View more</button>
                </ul>
              </div>
              <Reviews/>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default MovieDetails;
