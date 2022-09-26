import React from 'react';
import './ReviewStar.scss';

const ReviewStar = ({ rating, setRating, hover, setHover }) => {

  return (
    <div className="reviewTitle">
      <div className="review">REVIEW</div>
      <div className="reviewH1">이 Megazine에 대해 리뷰해주세요!</div>
      <div className="starRating">
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <button
              type="button"
              id={index}
              key={index}
              className={index <= (hover || rating) ? 'on' : 'off'}
              onClick={() => setRating(index)}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(rating)}
            >
              <span className="star">&#9733;</span>
            </button>
          );
        })}
      </div>
      <hr />
    </div>
  );
};

export default React.memo(ReviewStar);
