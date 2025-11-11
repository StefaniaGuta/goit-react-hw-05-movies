import React from "react";
import { useParams, Link } from "react-router-dom";
import { usePaginatedFetch } from "../Pagination/usePaginatedFetch";
import { getAll, getTrendingAll, IMAGE_URL, theNewRealedMovie,
  getPopularMovies,
  getNowPlayingMovies,
  getUpcomingMovies,
  getTopRatedMovies,
  moviesRecommendations
 } from "../../redux/movies/getAPI";
import Pagination from "components/Pagination/Pagination";
import "../pages/MovieByGenPage/MovieByGenPage.css";

const Movies = () => {
  const param = useParams();
  const id = param.id;
  const type = param.type;
  const category = type || "popularSeries";

  const fetchAction =
    category === "popular" ? getTrendingAll :
    category === "inTrending" ? getAll :
    category === "newReleaseMovie" ? theNewRealedMovie :
    category === "popularMovies" ? getPopularMovies :
    category === "nowPlayingMovies" ? getNowPlayingMovies :
    category === "upcomingMovies" ? getUpcomingMovies :
    category === "topRatedMovies" ? getTopRatedMovies :
    category === "moviesrecommended" ? moviesRecommendations :
    getAll;

  const { data: movies, totalPages, page, setPage } = usePaginatedFetch(fetchAction, category, id);
  return (
    <>
    <section className="page">
      <ul className="pageList">
        {movies.map((movie) => (
              <Link 
                to={`/movie/${movie.id}`} 
                key={movie.id}
                className="pageItem"
              >
                <img
                  src={IMAGE_URL + movie.poster_path}
                  alt={movie.title || movie.name}
                  />
                <h2>{movie.title || movie.name}</h2>
              </Link>
          )
        )}
      </ul>

      
    </section>
    {totalPages > 1 ? (
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
        />
        ) : null}
        </>
      );
};

export default Movies;
