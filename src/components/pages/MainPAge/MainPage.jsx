import { useEffect } from "react";
import { getMostRecentMovie, getMovieDetails, day, IMAGE_URL } from "../../../redux/movies/getAPI";
import { useState } from "react";
import { useDispatch } from "react-redux";
import "./MainPage.css";
import { useNavigate } from "react-router-dom";
import Loader from "components/Loader/Loader";

const MainPage = () => {
  const dispatch = useDispatch();
  const [recentMovie, setRecentMovie] = useState(null);
  const navigate = useNavigate();


 useEffect(() => {
  const fetchMostRecentMovie = async () => {
    try {
      const response = await dispatch(getMostRecentMovie(day));
      const moviesFiltered = response.payload.results.filter(m => m.poster_path);

      let foundMovie = null;

      for (const movie of moviesFiltered) {
        const detailsResponse = await dispatch(getMovieDetails(movie.id));
        const details = detailsResponse.payload;

        if (details.poster_path) {
          foundMovie = details;
        }
      }

      if (foundMovie) {
        setRecentMovie(foundMovie);
      } else {
        console.warn("Nu există niciun film cu poster_path valid în detalii.");
      }
    } catch (e) {
      console.error("Eroare la fetch:", e);
    }
  };

  fetchMostRecentMovie();
}, [dispatch]);



  const watchTheTrailer = () => {
  if (recentMovie?.homepage) {
    window.open(recentMovie.homepage, "_blank", "noopener,noreferrer");
    console.log(recentMovie.homepage);
  } else {
    navigate("*");
  }
};


  return (
    <section className="mainSection">
      {recentMovie ? (
        <>
          <img className="imgCover"
              src={IMAGE_URL + recentMovie.poster_path || recentMovie.backdrop_path}
              alt={recentMovie.title || recentMovie.name}
          />
          <div className="recentMovieInfos">
            <h2 className="releasedToday">released today</h2>
            <h1 className="movieTitle">{recentMovie.title}</h1>
            <p className="movieOverview">{recentMovie.overview}</p>
            <div className="movieButtons">
              <button type="button" onClick={() => navigate(`/login`)}>Watch now</button>
              <button type="button" onClick={() => watchTheTrailer()}>watch the trailer</button>
            </div>
          </div>
        </>
      ) : (
        <Loader/>
      )}
    </section>
  );
};

export default MainPage;