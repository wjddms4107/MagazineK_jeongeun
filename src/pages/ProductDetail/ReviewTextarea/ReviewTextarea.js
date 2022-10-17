import React from 'react';
import './ReviewTextarea.scss';

const ReviewTextarea = ({ getCommentText, commentText, addReview }) => {
  return (
    <>
      <div className="reviewForm">
        <div className="textarea">
          <textarea
            id="reviewTextarea"
            name="reviewTextarea"
            onChange={getCommentText}
            value={commentText}
            rows="5"
            placeholder="리뷰를 작성해주세요."
          />
        </div>
        <div className="click">
          <button className="reviewSubmit" onClick={addReview}>
            리뷰등록
          </button>
        </div>
      </div>
      <div className="reviewHr">
        <hr />
      </div>
    </>
  );
};

export default React.memo(ReviewTextarea);
