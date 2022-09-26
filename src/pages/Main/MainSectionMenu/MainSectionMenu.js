import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MainSectionMenu.scss';

function MainSectionMenu() {
  const [mainMenuData, setMainMenuData] = useState([]);
  const navigate = useNavigate();

  const scrollUp = () => {
    window.scroll({
      top: 0,
    });
  };

  useEffect(() => {
    fetch('/data/MainMenuData.json')
      .then(res => res.json())
      .then(data => {
        setMainMenuData(() => data);
      });
  }, []);

  return (
    <div className="mainSectionMenu">
      <p className="sectionTitle">shop</p>
      <span className="sectionMenu">
        <span className="mainMenu">
          <span className="mainMenuTitle">Magazine K</span>
          <span> , </span>
        </span>
        <span className="subMenu">
          <span className="subMenu1">Design&Lifestyle</span>
          <span> , </span>
          <span className="subMenu2">Fashion</span>
        </span>
      </span>
      <div className="menuInfo">
        {mainMenuData.map(
          ({ id, img, main_category_name, issue_number, title, desc }, i) => {
            return (
              <div key={id} className="info">
                <img
                  className={i === 1 ? 'halfImg' : undefined}
                  src={img}
                  alt="menuImage"
                  onClick={() => {
                    navigate(`Products/${issue_number}`);
                    scrollUp();
                  }}
                />
                <div className="category">
                  <span className="cate">{main_category_name}</span>
                  <span className="issueNum">ISSUE NO.{issue_number}</span>
                </div>
                <div className="title">{title}</div>
                <p className="desc">{desc}</p>
              </div>
            );
          }
        )}
      </div>
      <div
        className="sectionShopLink"
        onClick={() => {
          navigate(`/ProductList?category=1`);
          scrollUp();
        }}
      >
        Shop<span className="Arrow">➡️</span>
      </div>
    </div>
  );
}

export default React.memo(MainSectionMenu);
