import { useEffect, useState } from "react";
import { getMostPopular, day, getGenres, popularActors, IMAGE_URL } from "../../../redux/movies/getAPI";
import { seriesDetails } from "../../../redux/series/seriesApi";
import { useDispatch } from "react-redux";
import SphereScroll from "components/SphereScroll/SphereScroll";
import { useNavigate } from "react-router-dom";
import star from '../../Images/star.png';
import calendar from '../../Images/calendar.png';
import Trailers from "components/Trailer/Trailer";
import "./MainPage.css";


const MainPage = () => {
  const dispatch = useDispatch();
  const [recentMovie, setRecentMovie] = useState([]);
  const [mainImag, setMainImag] = useState();
  const [genres, setGenres] = useState([]);
  const [actors, setActors] = useState([])
  const navigate = useNavigate();

 useEffect(() => {
  const fetchMostRecentMovie = async () => {
    try {
      const response = await dispatch(getMostPopular(day));
      const moviesFiltered = response.payload.results.filter(m => m.poster_path);
        setRecentMovie(moviesFiltered);

      const res = await dispatch(seriesDetails("194766"));
      setMainImag(res.payload)
      
    } catch (e) {
      console.error("Eroare la fetch:", e);
    }
  };

  const fetchGenres = async () => {
    try{
      const res = await dispatch(getGenres());
      setGenres(res.payload.genres)
    } catch(e) {
      console.log(e)
    }
  }

  const fetchActors = async () => {
    try{
      const res = await dispatch(popularActors());
      setActors(res.payload.results)
    } catch(e) {
      console.log(e)
    }
  }

  fetchMostRecentMovie();
  fetchGenres();
  fetchActors();
}, [dispatch]);


  return (
    <section className="mainSection">

    {mainImag ? (
      <div className="imageWrapper">
          <img className="mainImgCover"
              src={"https://image.tmdb.org/t/p/w1920_and_h800_multi_faces" + mainImag.backdrop_path}
              alt={mainImag.name}
          />
          <div className="movieInfos">
            <div className="movieButtons">
              <button type="button" onClick={() => navigate(`/login`)}>Watch now</button>
              <Trailers id={mainImag}/>
            </div>
            <div>
              <h1 className="movieTitle">{mainImag.name}</h1>
              <div className="gen_rating_time">
                <p className="movieGen">{mainImag.genres[0].name}</p>
                <span className="rating">
                  <img src={star} alt="star"/>
                  {mainImag.vote_average.toFixed(1)}
                </span>
                <span>
                  <img src={calendar} alt="calendar"/>
                  {new Date(mainImag.first_air_date).getFullYear()}
                </span>
              </div>
              <p className="movieOverview">{mainImag.overview}</p>
              <ul className="movieSeasons">
                {mainImag.seasons.map(s => (
                  <li key={s.id}>
                    {s.name}
                  </li>
                ))}
              </ul>
            </div>
            
          </div>
        </div>
    ) : (<p>no</p>)}
    <ul className="genresList">
      {genres.map(gen => (
        <li key={gen.id}>{gen.name}</li>
      ))}
    </ul>
      <h2>Popular People</h2>
    <ul className="actorsList">
      {actors.map(a => (
        <li key={a.id}>
          <img src={IMAGE_URL + a.profile_path}
          alt={a.name}
          />
          {a.name}
          </li>
        
      ))}
    </ul>

    <h2>What's Popular</h2> 
    <SphereScroll  movies={recentMovie}/>

      
    </section>
  );
};

export default MainPage;