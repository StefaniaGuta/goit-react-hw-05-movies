import { useEffect, useState, useRef } from "react";
import { getMovies, getMostPopular, day, getGenres, popularActors, IMAGE_URL } from "../../../redux/movies/getAPI";

import { useDispatch } from "react-redux";
import SphereScroll from "components/SphereScroll/SphereScroll";
import url from '../../Images/icons.svg';
import MainPoster from "components/MainPoster/MainPoster";
import "./MainPage.css";

const MainPage = () => {
  const dispatch = useDispatch();
  const [recentMovie, setRecentMovie] = useState([]);
  const [genres, setGenres] = useState([]);
  const [actors, setActors] = useState([]);
  const [trending, setTrending] = useState([]);
  const ref = useRef(null);
  const [scrollAmount, setScrollAmount] = useState(0);

 useEffect(() => {
  const fetchMostRecentMovie = async () => {
    try {
      const response = await dispatch(getMostPopular(day));
      const moviesFiltered = response.payload.results.filter(m => m.poster_path);
        setRecentMovie(moviesFiltered);

     
      
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
  const fetchTrending = async () => {
    const response = await dispatch(getMovies())
    const sorted = response.payload.results
      .filter(m => m.poster_path || m.backdrop_path)
      .sort((a, b) => b.vote_average - a.vote_average)
      .slice(0, 3);
    
    setTrending(sorted);
  }
const updateScrollAmount = () => {
      const width = window.innerWidth;
      setScrollAmount(Math.floor(width));
    };

    updateScrollAmount();
    window.addEventListener("resize", updateScrollAmount);
    fetchMostRecentMovie();
    fetchGenres();
    fetchActors();
    fetchTrending();
    return () => window.removeEventListener("resize", updateScrollAmount);
}, [dispatch]);

const scroll = (dir) => {
    if (!ref.current) return;
    ref.current.scrollBy({
      left: dir === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="mainSection">
       <MainPoster/>
      <div className="genresSection">
        <div>
          <h2 className="sectionTitle">choose the type of film you liked</h2>
          <p className="sectionText">We present many films from various main categories, let's chooose and search film of you liked</p>
        </div>
        <ul className="genresList">
          {genres
          .map(gen => (
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

      <div className="popularCelebritiesSection">
        <h2>Most popular celebrities</h2>
        <div className="moveBtn">
          <button type="button" onClick={() => scroll("left")}>
            &lsaquo;
          </button>
          <button type="button" onClick={() => scroll("right")}>
            &rsaquo;
          </button>
        </div>
        <ul className="actorsList" ref={ref}>
          {actors.map(a => (
            <li key={a.id}>
              <img src={IMAGE_URL + a.profile_path} alt={a.name}/>
              <h3>{a.name}</h3>
              <p>{a.known_for_department}</p>
            </li>
          ))}
        </ul>
      </div>    

      <div className="trendingSection">
        <h2>Top 3 the most wanted movies this week</h2>
        <ul className="trendingList">
          {trending 
            .map(t => (
              <li key={t.id} className="recentMovie" to={`/movies/${t.id}`}>
                <svg viewBox="0 0 300 150" className="titleArc">
                  <defs>
                    <path id={`arcPath-${t.id}`} d="M 20 130 A 130 130 0 0 1 280 130" />
                  </defs>
                  <text fill="white" fontSize="16" fontWeight="bold">
                    <textPath href={`#arcPath-${t.id}`} startOffset="50%" textAnchor="middle">
                      {t.title || t.name}
                    </textPath>
                  </text>
                </svg>
                <img
                  src={IMAGE_URL + t.poster_path || t.backdrop_path
                  }
                  alt={t.title || t.name}
                />
              </li>
            ))
          }
        </ul>
      </div>

      <div className="isPopularSection">
        <h2>What's Popular</h2> 
        <SphereScroll  movies={recentMovie}/>
      </div>

    </section>
  );
};

export default MainPage;