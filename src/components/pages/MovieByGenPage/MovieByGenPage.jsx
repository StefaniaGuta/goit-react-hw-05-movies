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


const ITEMS_PER_PAGE = 20; // Numărul de elemente pe care dorești să le afișezi

const MovieByGenPage = () => {
  // Stări
  const [allFilteredMovies, setAllFilteredMovies] = useState([]); // 🔥 NOU: Toate filmele filtrate, colectate
  const [movies, setMovies] = useState([]); // Filmele afișate pe pagina curentă (20 bucăți)
  const [currentPage, setCurrentPage] = useState(1); // Indexul paginii locale (1, 2, 3...)
  const [totalPages, setTotalPages] = useState(1); // Total pagini locale
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  const params = useParams();
  const genId = params.genId;
  const genreName = params.genName; // Presupunând că ai și genName în params

  // Funcție ajutătoare pentru filtrare (preluată din soluția anterioară)
  const filterByGenre = (items, genId) => {
    const genreId = parseInt(genId);
    return items.filter(item => (
      // Verifică pentru Filme: 'genre_ids'
      item.genre_ids && item.genre_ids.includes(genreId)
    ));
  };

  // 1. Colectarea tuturor filmelor filtrate (se rulează o singură dată)
  useEffect(() => {
    const fetchAndAggregateMovies = async () => {
      setIsLoading(true);
      try {
        // A. Găsește paginile relevante din API
        const relevantPages = await findPagesWithGenre(dispatch, genId, 500);

        if (relevantPages.length === 0) {
          setAllFilteredMovies([]);
          setTotalPages(1);
          return;
        }

        // B. Descarcă datele de pe TOATE paginile relevante în paralel
        const responses = await Promise.all(
          relevantPages.map(page => dispatch(getAll(page)))
        );

        let aggregatedMovies = [];
        
        // C. Filtrează și colectează toate filmele într-o singură matrice
        responses.forEach(response => {
          if (response.payload?.results) {
            const filtered = filterByGenre(response.payload.results, genId);
            aggregatedMovies = [...aggregatedMovies, ...filtered];
          }
        });

        // D. Setează lista totală și calculează paginarea locală
        setAllFilteredMovies(aggregatedMovies);
        const newTotalPages = Math.ceil(aggregatedMovies.length / ITEMS_PER_PAGE);
        setTotalPages(newTotalPages);
        setCurrentPage(1); // Reset la prima pagină după o nouă căutare
        
      } catch (error) {
        console.error("Error fetching and aggregating movies:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndAggregateMovies();
  }, [dispatch, genId]);

  // 2. Afișarea filmelor pentru pagina curentă (se rulează la schimbarea paginii sau a listei totale)
  useEffect(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const moviesToShow = allFilteredMovies.slice(startIndex, endIndex);
    
    setMovies(moviesToShow);
  }, [allFilteredMovies, currentPage]);


  // 3. Funcția pentru schimbarea paginii locale
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
              {movies.map(movie => (
                <Link className='pageItem' key={movie.id} to={`/movie/${movie.id}`}>
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
              onPageChange={handlePageChange} // Trimitem direct indexul paginii
            />
          )}
        </>
      )}
    </section>
  );
};

export default MovieByGenPage;



