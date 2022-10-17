import React, { useState, useEffect } from 'react';
import './Main.scss';
import MainSlide from './MainSlide/MainSlide';
import MainSectionMenu from './MainSectionMenu/MainSectionMenu';
import MainSectionVideo from './MainSectionVideo/MainSectionVideo';

function Main() {
  const [slide, setSlide] = useState(1);
  const [mainSlideData, setMainSlideData] = useState([]);

  const getSlideData = async () => {
    const res = await fetch('/data/MainSlideData.json').then(res => res.json());
    const sameNumData = res.filter(data => {
      return data.id === slide;
    });
    setMainSlideData(sameNumData);
  };

  useEffect(() => {
    getSlideData();
    const interval = setInterval(() => {
      setSlide(slide => (slide > 2 ? 1 : slide + 1));
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  }, [slide]);

  const prevSlide = () => {
    setSlide(slide => slide - 1);
  };

  const nextSlide = () => {
    setSlide(slide => slide + 1);
  };

  const isFirstSlide = slide === 1;
  const isLastSlide = slide === 3;

  return (
    <>
      <main className="slideContainer">
        <section className="slideImg">
          <img src={`/images/main/mainSlide${slide}.jpg`} alt="mainSlide" />
          {mainSlideData.length > 0 && (
            <MainSlide
              mainSlideData={mainSlideData[0]}
              prevSlide={prevSlide}
              nextSlide={nextSlide}
              isFirstSlide={isFirstSlide}
              isLastSlide={isLastSlide}
              slide={slide}
            />
          )}
        </section>
      </main>
      <MainSectionMenu />
      <MainSectionVideo />
    </>
  );
}

export default Main;
