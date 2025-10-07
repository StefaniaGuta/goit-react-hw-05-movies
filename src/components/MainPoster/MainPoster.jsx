import { useEffect, useState} from "react";
import {  newSeriesFetch } from "../../redux/series/seriesApi";
import { useDispatch } from "react-redux";
import star from '../../components/Images/star.png';
import calendar from '../../components/Images/calendar.png';
import { useNavigate } from "react-router-dom";
import Trailers from "components/Trailer/Trailer";
import "./MainPoster.css";

const MainPoster = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [main, setMain] = useState([]);
  const [highlight, setHighlight] = useState(null);
  const [index, setIndex] = useState(0);

 
  useEffect(() => {
    const fetchSeries = async () => {
      const ser = await dispatch(newSeriesFetch());
      if (ser?.payload?.length) {
        setMain(ser.payload.filter(s =>s.backdrop_path));
        setHighlight(ser.payload[0]);
      }
    };
    fetchSeries();
  }, [dispatch]);

  useEffect(() => {
    if (!main.length) return;

    const interval = setInterval(() => {
      setIndex((prev) => {
        const newIndex = (prev + 1) % main.length;
        setHighlight(main[newIndex]);
        return newIndex;
      });
    }, 8000);

    return () => clearInterval(interval);
  }, [main]);

  console.log(index)

  return (
    <section className="mainPosterSection">
      {highlight ? (
        <div className="imageWrapper">
          <img
            className="mainImgCover"
            src={
              "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces" +
              highlight.backdrop_path
            }
            alt={highlight.name}
          />
          <div className="movieInfos">
            <div className="movieButtons">
              <button type="button" onClick={() => navigate(`/login`)}>
                Watch now
              </button>
              <Trailers id={highlight} />
            </div>
            <div>
              <h1 className="movieTitle">{highlight.name}</h1>
              <div className="gen_rating_time">
                <ul className="movieGen">
                  {highlight.genres.map(g => (
                    <li key={g.id}>{g.name}</li>
                  ))}
                </ul>
                <span className="rating">
                  <img src={star} alt="star" />
                  {highlight.vote_average?.toFixed(1)}
                </span>
                <span>
                  <img src={calendar} alt="calendar" />
                  {new Date(highlight.first_air_date).getFullYear()}
                </span>
              </div>
              <p className="movieOverview">{highlight.overview}</p>
              <ul className="movieSeasons">
                {highlight.seasons?.slice(0, 3).map((s) => (
                  <li key={s.id}>{s.name}</li>
                ))}
                {highlight.seasons.length > 3 ? <li className="moSeasonsBtn">More Seasons</li> : null}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="imageWrapper"></div>
      )}
    </section>
  );
};

export default MainPoster;