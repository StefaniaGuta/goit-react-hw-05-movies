import { useEffect, useState } from "react";
import { getMostPopular, day, getGenres, popularActors, IMAGE_URL } from "../../../redux/movies/getAPI";
import { seriesDetails } from "../../../redux/series/seriesApi";
import { useDispatch } from "react-redux";
import SphereScroll from "components/SphereScroll/SphereScroll";
import { useNavigate } from "react-router-dom";
import star from '../../Images/star.png';
import calendar from '../../Images/calendar.png';
import Trailers from "components/Trailer/Trailer";
import url from '../../Images/icons.svg';
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
    ) : (<p></p>)}

    <div className="genresSection">
      <div>
        <h2 className="sectionTitle">choose the type of film you liked</h2>
        <p className="sectionText">We present many films from various main categories, let's chooose and search film of you liked</p>
      </div>
      <ul className="genresList">
        {genres.map(gen => (
          <li key={gen.id}>
            <svg width="29" height="32"><use xlinkHref={`${url}#${gen.name}`}/></svg>
            <span>
            {gen.name}
            <a href="/">View more</a>
            </span>
            </li>
        ))}
      </ul>
    </div>

    <div className="devicesSection">
        <h2 className="title">Any time, Anywhere</h2>
        <p className="text">Watch your favorite movie or TV series on all types of devices<br></br>
        Stream and enjoy your favorites on your device
        </p>
        <ul className="devicesList">
          <li>
            <svg width="60" height="60"><use xlinkHref={`${url}#TV`}/></svg>
            TV
          </li>
          <li>
            <svg width="60" height="60"><use xlinkHref={`${url}#laptop`}/></svg>
            Laptop & Desktop
          </li>
          <li>
            <svg width="60" height="60"><use xlinkHref={`${url}#mobil`}/></svg>
            Tablet & Mobil
          </li>
        </ul>
    </div>

      <h2>Most popular celebrities</h2>
      <ul className="actorsList">
        {actors.map(a => (
          <li key={a.id}>
            <img src={IMAGE_URL + a.profile_path}
            alt={a.name}
            />
            <h3>{a.name}</h3>
            <p>{a.known_for_department}</p>
            </li>
          
        ))}
      </ul>

    <h2>What's Popular</h2> 
    <SphereScroll  movies={recentMovie}/>
    </section>
  );
};

export default MainPage;