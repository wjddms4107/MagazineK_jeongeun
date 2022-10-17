import React from 'react';
import './MainSlide.scss';

function MainSlide({
  mainSlideData,
  prevSlide,
  nextSlide,
  isFirstSlide,
  isLastSlide,
  slide,
}) {
  return (
    <>
      <button onClick={prevSlide} className="numLeft" disabled={isFirstSlide}>
        prev
      </button>
      <button onClick={nextSlide} className="numRight" disabled={isLastSlide}>
        next
      </button>
      <div className="num">
        <span className="prevNum">{slide}</span>
        <span className="nextNum">3</span>
      </div>
      <div className="slideInfo">
        <span className="title">{mainSlideData.main_category_name}</span>
        <span className="issueNum">ISSUE NO.{mainSlideData.issue_number}</span>
        <div>{mainSlideData.title}</div>
        <p>
          {mainSlideData.p1}
          <br />
          {mainSlideData.p2}
        </p>
        <span className="shopNow">SHOP NOW</span>
      </div>
    </>
  );
}

export default MainSlide;
