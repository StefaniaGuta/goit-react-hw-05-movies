import {
  airingTodaySeries,
  popularSeries,
  onTvSeries, 
  topRatedSeries
 } from '../../redux/series/seriesApi';
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { usePaginatedFetch } from "../Pagination/usePaginatedFetch";
import Pagination from "components/Pagination/Pagination";
import { IMAGE_URL } from "../../redux/movies/getAPI";
import './Series.css';

const Series = () => {
  const location = useLocation();
  const pathParts = location.pathname.split('/');
  const categoryFromPath = pathParts[pathParts.length - 1]; 
  const category = location.state?.seriesType || categoryFromPath || "popularSeries";
  
  const fetchAction =
    category === "popularSeries" ? popularSeries :
    category === "airingTodaySeries" ? airingTodaySeries :
    category === "onTvSeries" ? onTvSeries :
    category === "topRatedSeries" ? topRatedSeries :
    popularSeries;
  
  const { data: series, totalPages, page, setPage } = usePaginatedFetch(fetchAction, category);

return (
  <section className='seriesPage'> 
    <ul className='seriesPageList'>
      {series.map((s) => (
          <Link to={`/series/${s.id}`} 
          key={s.id}
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