import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './Searchbar.module.css';
import finder from '../Images/finder.png';

const Searchbar = ({ onSubmit, resetQuery }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState(searchParams.get('query') ?? '');

  useEffect(() => {
    setInputValue('');
  }, [resetQuery]);

  const handleInputChange = event => {
    const query = event.target.value;
    setInputValue(query);
    const nextParams = query !== '' ? { query } : {};
    setSearchParams(nextParams);
  };

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(inputValue);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.searcbarForm}>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Type a movie to watch"
          name="inputValue"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button type="submit">
          <img height="20px" width="20px" src={finder} alt='magnifying glass'/>
        </button>
      </form>
    </>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
  resetQuery: PropTypes.bool,
};

export default Searchbar;