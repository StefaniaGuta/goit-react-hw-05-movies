import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './Searchbar.module.css';

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
        <button type="submit">Search</button>
      </form>
    </>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  resetQuery: PropTypes.bool.isRequired,
};

export default Searchbar;