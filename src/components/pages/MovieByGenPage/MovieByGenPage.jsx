import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAll, IMAGE_URL } from '../../../redux/movies/getAPI';
import { useDispatch } from 'react-redux';
import Pagination from '../../Pagination/Pagination';
import noImage from '../../Images/no_image.jpg';
import { useParams } from 'react-router-dom';
import findPagesWithGenre from './findPagesWithGenre';
import Loader from 'components/Loader/Loader';
import './MovieByGenPage.css';


const ITEMS_PER_PAGE = 20;

const MovieByGenPage = () => {
  const [allFilteredMovies, setAllFilteredMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  const params = useParams();
  const genId = params.genId;
  const genreName = params.genName;

  const filterByGenre = (items, genId) => {
    const genreId = parseInt(genId);
    return items.filter(item => (
      item.genre_ids && item.genre_ids.includes(genreId)
    ));
  };

  useEffect(() => {
    const fetchAndAggregateMovies = async () => {
      setIsLoading(true);
      try {
        const relevantPages = await findPagesWithGenre(dispatch, genId, 500);

        if (relevantPages.length === 0) {
          setAllFilteredMovies([]);
          setTotalPages(1);
          return;
        }

        const responses = await Promise.all(
          relevantPages.map(page => dispatch(getAll(page)))
        );

        let aggregatedMovies = [];

        responses.forEach(response => {
          if (response.payload?.results) {
            const filtered = filterByGenre(response.payload.results, genId);
            aggregatedMovies = [...aggregatedMovies, ...filtered];
          }
        });

        setAllFilteredMovies(aggregatedMovies);
        const newTotalPages = Math.ceil(aggregatedMovies.length / ITEMS_PER_PAGE);
        setTotalPages(newTotalPages);
        setCurrentPage(1);
        
      } catch (error) {
        console.error("Error fetching and aggregating movies:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndAggregateMovies();
  }, [dispatch, genId]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const moviesToShow = allFilteredMovies.slice(startIndex, endIndex);
    
    setMovies(moviesToShow);
  }, [allFilteredMovies, currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <section className='page'>
      <h1>Gen: {genreName}</h1>
      
      {isLoading ? 
        <Loader/> 
      : (
        <>
          {allFilteredMovies.length === 0 ? (
            <p>Nu au fost găsite rezultate pentru acest gen.</p>
          ) : (
            <ul className='pageList'>
              {movies.map((movie, i) => (
                <Link className='pageItem' key={i} to={`/movie/${movie.id}`}>
                  <img
                    src={movie.poster_path ? IMAGE_URL + movie.poster_path : noImage}
                    alt={movie.title || movie.name}
                  />
                  <h2>{movie.title || movie.name}</h2>
                </Link>
              ))}
            </ul>
          )}

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </section>
  );
};

export default MovieByGenPage;



