import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import {searchForMovies} from '../../redux/movies/getAPI';
import url from '../Images/icons.svg';
import SearchMoviesList from "../SearchMoviesList/SearchMoviesList";
import { useDispatch } from 'react-redux';
import './Searchbar.css';

const Searchbar = ({ onSubmit, resetQuery }) => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState(searchParams.get('query') ?? '');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    setInputValue('');
  }, [resetQuery]);

  const handleInputChange =async event => {
    const query = event.target.value;
    console.log(query)
    console.log(inputValue)
    setInputValue(query);
    const nextParams = query !== '' ? { query } : {};
    setSearchParams(nextParams);
    const res = await dispatch(searchForMovies(query));
    setSearchResults(res.payload)
    return res.payload;
  };
  
  const handleSubmit = async event => {
    event.preventDefault();
  };
  
  console.log("results", searchResults)
  return (
    <section className='searchBarSection'>
      <form className="searcbarForm">
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Type a movie to watch"
          name="inputValue"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button onSubmit={handleSubmit} type="submit">
          <svg width="20" height="20"><use xlinkHref={`${url}#magnifying`}/></svg>
        </button>
      </form>
      {searchResults.length > 0 ? <SearchMoviesList searchResults={searchResults}/> : null}
    </section>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
  resetQuery: PropTypes.bool,
};

export default Searchbar;