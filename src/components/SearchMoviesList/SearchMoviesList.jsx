import { useLocation } from 'react-router-dom';
import { IMAGE_URL } from '../../redux/movies/getAPI';
import './SearchMoviesList.css';
import { useNavigate } from 'react-router-dom';
import noImage from '../Images/no_image.jpg'

const SearchMoviesList = ({ searchResults}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigateToSpecificPage = (movie) => {
    if(movie.media_type === "tv"){
      navigate(`/serie/${movie.id}`, { state: { from: location } });
    } else if(movie.media_type === "movie"){
      navigate(`/movie/${movie.id}`, { state: { from: location } });
    } else if (movie.media_type === "person"){
      navigate(`/people/${movie.id}`, { state: { from: location } });
    } else {
      navigate(`/`);
    }
  }
  return (
    <>
      <div className="searchResultsContainer">
        {searchResults.map(movie => (
          <li
            onClick={() => handleNavigateToSpecificPage(movie)}
            state={{ from: location }}
            key={movie.id}
            className="searchResultsList"
          >
            <div>
              {movie.media_type === "person" ? (
                <img src={movie.profile_path ? 
                IMAGE_URL + movie.profile_path : 
                noImage} 
                alt={movie.title || movie.name} />) : (
              <img src={(movie.poster_path || movie.backdrop_path) ? 
                IMAGE_URL + (movie.poster_path || movie.backdrop_path) : 
                noImage} 
                alt={movie.title || movie.name} />
                )}
            </div>
            <div>
              <h3>{movie.title || movie.name}</h3>
            </div>
          </li>
        ))}
      </div>
    </>
  );
};

export default SearchMoviesList;