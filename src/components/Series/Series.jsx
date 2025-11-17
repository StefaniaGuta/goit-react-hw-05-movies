import {
  airingTodaySeries,
  popularSeries,
  onTvSeries, 
  topRatedSeries,
  seriesRecommendations
 } from '../../redux/series/seriesApi';
import React from "react";
import {  Link, useParams } from "react-router-dom";
import { usePaginatedFetch } from "../Pagination/usePaginatedFetch";
import Pagination from "components/Pagination/Pagination";
import { IMAGE_URL } from "../../redux/movies/getAPI";
import './Series.css';

const Series = () => {
  const param = useParams();
  const id = param.id;
  const type = param.type;
  const category = type || "popularSeries";
  
  const fetchAction =
    category === "popularSeries" ? popularSeries :
    category === "airingTodaySeries" ? airingTodaySeries :
    category === "onTvSeries" ? onTvSeries :
    category === "topRatedSeries" ? topRatedSeries :
    category === "recommendations" ? seriesRecommendations :
    popularSeries;
  
  const { data: series, totalPages, page, setPage } = usePaginatedFetch(fetchAction, category, id);

return (
  <section className='seriesPage'> 
    <ul className='seriesPageList'>
      {series.map((s, i) => (
          <Link to={`/serie/${s.id}`} 
          key={i}
          className="seriesPageItem">
            <img
              src={IMAGE_URL + s.poster_path || s.backdrop_path}
              alt={s.title || s.name}
            />
            <h2>{s.title || s.name}</h2>
          </Link>
        )
      )}
    </ul>
  
    <Pagination
      currentPage={page}
      totalPages={totalPages}
      onPageChange={setPage}
    />
  
  </section>
)
}

export default Series;