import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getMovies, IMAGE_URL } from '../../../redux/movies/getAPI';
import { useDispatch } from 'react-redux';
import Pagination from '../../Pagination/Pagination';
import noImage from '../../Images/no_image.jpg';
import { useParams } from 'react-router-dom';
import './MovieByGenPage.css';


const MovieByGenPage = () => {
  const [movies, setMovies] = useState([]);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromUrl = parseInt(searchParams.get("page")) || 1;
  const [page, setPage] = useState(pageFromUrl);
  const [totalPages, setTotalPages] = useState(1);
  const params = useParams();
  const genId = params.genId;
  const genreName = params.genName;

  useEffect(() => {
  const fetchMovies = async () => {
    try {
      const response = await dispatch(getMovies(page));
      const allMovies = response.payload.results;

      const genreIdNumber = parseInt(genId);

      const filteredMovies = allMovies.filter(movie =>
        movie.genre_ids.includes(genreIdNumber)
      );

      setMovies(filteredMovies);
      setTotalPages(response.payload.total_pages);
    } catch (error) {
      console.error('Error fetching trending movies:', error);
    }
  };

  fetchMovies();
}, [dispatch, page, genId]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    setSearchParams({ page: newPage });
  };



  return (
    <section className='movieByGenSection'>
      <h1 >Movie gen: {genreName}</h1>
      <ul className='movies'>
        {movies.map(movie => (
            <Link className='movie' key={movie.id} to={`/movies/${movie.id}`}>
              <img
                src={movie.poster_path || movie.poster_path ? IMAGE_URL + movie.poster_path : noImage}
                alt={movie.title || movie.name}
              />
              <h2>{movie.title || movie.name}</h2>
            </Link>
        ))}
      </ul>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </section>
  );
}

export default MovieByGenPage;



