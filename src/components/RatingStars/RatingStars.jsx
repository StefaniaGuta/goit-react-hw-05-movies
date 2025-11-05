import React from 'react';
import './RatingStars.css';


const RatingStars = ({ voteAverage }) => {
  const rating = voteAverage || 0;
  const ratingPercentage = (rating / 10) * 100;

  return (
    <div className="star-rating">
      <div 
        className="stars-filled" 
        style={{ width: `${ratingPercentage}%` }}
      >
        <span>★</span>
        <span>★</span>
        <span>★</span>
        <span>★</span>
        <span>★</span>
      </div>
      <div className="stars-empty">
        <span>★</span>
        <span>★</span>
        <span>★</span>
        <span>★</span>
        <span>★</span>
      </div>
    </div>
  );
};

export default RatingStars;
