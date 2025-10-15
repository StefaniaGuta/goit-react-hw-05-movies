import React from "react";
import { useLocation, Link } from "react-router-dom";
import { usePaginatedFetch } from "../Pagination/usePaginatedFetch";
import { getAll, getTrendingAll, IMAGE_URL, theNewRealedMovie } from "../../redux/movies/getAPI";
import Pagination from "components/Pagination/Pagination";
//import { noImage } from "../Images/no_image.jpg";
import "./Movies.css";

const Movies = () => {
  const location = useLocation();
  const category = location.state?.type || "popular";

  const fetchAction =
    category === "popular" ? getTrendingAll :
    category === "inTrending" ? getAll :
    category === "newReleaseMovie" ? theNewRealedMovie :
    getAll;

  const { data: movies, totalPages, page, setPage } = usePaginatedFetch(fetchAction, category);
  return (
    <>
    <section className="moviesPage">
      <h1 className="sectionTitle">Movies - {category.toUpperCase()}</h1>
      <ul className="moviesList">
        {movies.map((movie) => (
          <li
          key={movie.id}
          className="movieItem"
          >
              <Link to={`/movies/${movie.id}`}>
                <img
                  src={IMAGE_URL + movie.poster_path}
                  alt={movie.title || movie.name}
                  />
                <h2>{movie.title || movie.name}</h2>
              </Link>
            </li>
          )
        )}
      </ul>

      
    </section>

  <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
        />
        </>
      );
};

export default Movies;
