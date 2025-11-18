import React, { useEffect, useState } from 'react';
import { useParams,  Link, useNavigate } from 'react-router-dom';
import { IMAGE_URL, formatDate } from '../../redux/movies/getAPI';
import {seriesDetails, seriesRecommendations, getSeriesSeason} from "../../redux/series/seriesApi";
import Loader from '../Loader/Loader';
import { useDispatch } from 'react-redux';
import noImage from '../Images/no_image.jpg';
import Reviews from 'components/Reviews/Reviews';
import Cast from 'components/Cast/Cast';
import url from '../Images/icons.svg';
import Trailers from 'components/Trailer/Trailer';
import RatingStars from 'components/RatingStars/RatingStars';
import "./SeriesDetails.css";

const SeriesDetails = () => {
  const id = useParams();
  const [series, setSeries] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const [recommendation, setRecommendation] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [openSeason, setOpenSeason] = useState(null);
  const [openEpisode, setOpenEpisode] = useState(null);
  const [visibleHeight, setVisibleHeight] = useState(218);
  const navigate = useNavigate();
  const [recommendationId, setRecommendationId] = useState(id.movieId);
  const fallbackId = "71912";
  
  const handleSeeMore = () => {
    const maxHeight = recommendation.slice(0, 15).length * 43;
    setVisibleHeight(prev =>
      Math.min(prev + 218, maxHeight)
    );
    if(maxHeight === visibleHeight){
      setVisibleHeight(218)
    }
  };

  useEffect(() => {
    const fetchseriesDetails = async () => {
      setIsLoading(true);
      try {
        const response = await dispatch(seriesDetails({id: id.movieId}));
        setSeries(response.payload);
      } catch (error) {
        console.error('Error fetching series details:', error);
      } finally {
        setIsLoading(false);
      }
    }

    const getseries = async () => {
      const res = await dispatch(seriesRecommendations({id: id.movieId}));
      const secondRes = await dispatch(seriesRecommendations({id: fallbackId}));
      if(res.payload.results.length !== 0) {
        setRecommendation(res.payload.results);
        setRecommendationId(id.movieId);
      } else{
        setRecommendation(secondRes.payload.results);
        setRecommendationId(fallbackId);
      }
    };    
    fetchseriesDetails();
    getseries();
}, [dispatch, id]);

const getSeasonsEpisodes = async (seasonNumber) => {
  if (openSeason === seasonNumber) {
    setOpenSeason(null);
    return;
  }

  if (!episodes[seasonNumber]) {
    const res = await dispatch(getSeriesSeason({ id: id.movieId, seasonNumber }));
    setEpisodes(prev => ({
      ...prev,
      [seasonNumber]: res.payload.episodes
    }));
  }
  setOpenSeason(seasonNumber);
};
  const handleEpisodeClick = (episodeNumber) => {
  if (openEpisode === episodeNumber) {
    setOpenEpisode(null);
  } else {
    setOpenEpisode(episodeNumber);
  }
};

  const navigateToSeriesPage = (seriesType) => {
  if (seriesType === "recommendations" && recommendationId) {
    navigate(`/series/${seriesType}/${recommendationId}`);
  } else {
    navigate(`/series/${seriesType}`);
  }

};
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        series && (
          <div className="seriesDetailsContainer">
            <div className="seriesInfo" style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${series.poster_path})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}>
              <span className='title-watchlist-container'>
                <h1 className='seriesName'>
                  {series.name || series.title}   ({new Date(series.first_air_date).getFullYear()})
                </h1>
                <span>
                  <svg className='addToListSvg' width="30" height="30"><use xlinkHref={`${url}#heart`}/></svg>
                  <svg className='addToListSvg' width="22" height="25" ><use xlinkHref={`${url}#favorite`}/></svg>
                </span>
              </span>
              <div className='infoAbtseries'>
                <div className='poster_trailer_network_series_wrapper'>
                  <img className='infoAbtseriesImg'
                    src={series.poster_path || series.backdrop_path ? IMAGE_URL + series.poster_path : noImage}
                    alt={series.title || series.name}
                  />
                  <Trailers id={series} show={"tv"}/>
                  <div className='networkSection'>
                    <p>You can watch on:</p>
                    {series.networks && series.networks.slice(0, 2).map((net, i) => (
                        <li key={i} className='network_company_name'>
                            <img  height="25"
                              src={'https://image.tmdb.org/t/p/w500' + net.logo_path}
                              alt={net.title || net.name}
                            />
                        </li>
                    ))}
                  </div>
                </div>
                <div>
                  <h2 className='seriesName'>{series.name || series.title}</h2>
                  <p>{series.tagline || "One step. One decision. A new world."}</p>
                  <div className='series-in-numbers'>
                    
                    <RatingStars voteAverage={series.vote_average.toFixed(1)} />
                    <p>
                      <svg width="20" height="20"><use xlinkHref={`${url}#eye`}/></svg>
                      {series.vote_count}
                    </p>
                      <p>
                        {series.genres && series.genres.length > 0
                          ? series.genres.map(genre => genre.name).join(", ")
                          : "Other"}
                      </p>
                  </div>

                  <div className='series-details-cast'>
                    <div className='series-details'>
                      <h3 className='seriesDetailsContainerSectionTitle'>DETAILS</h3>
                      <p>
                        <b>Country:</b> 
                        {series.production_countries[0].name}
                      </p>
                      <p>
                        <b>Language:</b>
                        {series.spoken_languages && series.spoken_languages.length > 0
                          ? series.spoken_languages.map(lang => lang.english_name).join(", ")
                          : "Other"}
                      </p>
                      <p>
                        <b>Date Release:</b> 
                        {formatDate(series.first_air_date)}
                      </p>
                      <div className="productionWrapper">
                        <p className="productionText">
                          <b>Production:</b>{" "}
                          {series.production_companies && series.production_companies.length > 0
                            ? series.production_companies.slice(0, 2).map(prod => prod.name).join(", ")
                            : "Not specified"}
                        </p>

                        {series.production_companies?.length > 2 && (
                          <div className="productionTooltip">
                            {series.production_companies.map((prod, i) => (
                              <span key={i}>{prod.name}</span>
                            ))}
                          </div>
                        )}
                      </div>

                      <p>
                        <b>Creator:</b>
                        {series.created_by && series.created_by.length > 0
                          ? series.created_by.map(creator => creator.name).join(", ")
                          : "Not specified"}
                      </p>
                      <p>
                        <b>Status:</b>
                        {series.status}
                      </p>
                      {series.in_production === true ?
                      <p>
                        <b>Next episode:</b>    
                      {series.next_episode_to_air 
                      ? formatDate(series.next_episode_to_air.air_date)
                      : "no informations"}
                      </p>
                      : null}
                    </div>
                    <div className='series-cast'>
                      <h3 className='seriesDetailsContainerSectionTitle'>CAST</h3>
                      <Cast show={"tv"}/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="seriesExtraInfo">
              <span className='storyLine'>
                <h3 className='seriesDetailsContainerSectionTitle'>Storyline</h3>
                {series.overview}
              </span>

              <div className='seriesSeasons'>
                <h3 className='seriesDetailsContainerSectionTitle'>Seasons</h3>
                {series.seasons.map((season, i) => (
                    <>
                    <button className='seriesSeason' onClick={() => getSeasonsEpisodes(season.season_number)}>
                        {season.name}
                        <svg width="25" height="15"><use xlinkHref={`${url}#down-arrow`}/></svg>
                    </button>

                        <ul key={i} className='seriesEpisodesList'>
                        {openSeason === season.season_number ? (
                            episodes[season.season_number] ? (
                            episodes[season.season_number].map((ep, i) => (
                              <li className='seriesEpisodes'>
                                <h4 key={i} className='seriesEpisodName' onClick={() => handleEpisodeClick(ep.episode_number)}>
                                    <svg width="14" height="14"><use xlinkHref={`${url}#full-arrow`}/></svg>
                                    Episode {ep.episode_number}: {ep.name}
                                    </h4>
                                    {openEpisode === ep.episode_number && (
                                      <div className="episodeDetails">
                                        <span>
                                          <p><strong>Air date:</strong> {formatDate(ep.air_date)}</p>
                                          <p><strong>StoryLine</strong><br></br>{ep.overview}</p>
                                          <p><strong>Rating:</strong> {ep.vote_average}</p>

                                        </span>
                                        <img className='episodeImg'
                                        src={IMAGE_URL + ep.still_path}
                                        alt={ep.title || ep.name}
                                        />
                                    </div>
                                  )}
                              </li>
                              ))
                            ) : (
                            <Loader/>
                            )
                        ) : null}
                        </ul>
                    </>
                ))}
              </div>
              <div>
                <h3 className='seriesDetailsContainerSectionTitle'>
                  Similar series
                   <button className='viewAll' onClick={() => navigateToSeriesPage("recommendations", id.movieId)}>View all &#10230;</button>  
                </h3>
                <ul className='recommendationList' style={{ height: `${visibleHeight}px` }}>
                  {recommendation
                    .filter(m => m.poster_path)
                    .slice(0, 15)
                    .map((m, i) => (
                      <Link key={i} to={`/serie/${m.id}`}>
                        <img className='seriesExtraInfoImg'
                          src={IMAGE_URL + m.poster_path}
                          alt={m.title || m.name}
                        />
                        <h2 className='specificseriesTitle'>{m.title || m.name}</h2>
                      </Link>
                  ))}
                </ul>
                  <button className='viewMoreRecommendationseriess' onClick={handleSeeMore}>
                    <svg width="27" height="15"><use xlinkHref={`${url}#down-btn`}/></svg>
                    View more
                  </button>
              </div>
              <Reviews show={"tv"}/>
            </div>
          </div>
        )
      )}
    </>
  )
}

export default SeriesDetails;