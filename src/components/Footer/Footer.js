import React from "react";
import "./Footer.scss";

function Footer() {
  return (
    <div className="footerContainer">
      <div className="footerMain">
        <div className="footerLogo">K</div>
        <div className="footerMenu">
          {FOOTER_DATA.map(
            ({ id, title, item1, item2, item3, item4, item5 }) => {
              return (
                <ul className="naviList" key={id}>
                  <li className="naviTitle">{title}</li>
                  <li className="naviItem">{item1}</li>
                  <li className="naviItem">{item2}</li>
                  <li className="naviItem">{item3}</li>
                  <li className="naviItem">{item4}</li>
                  <li className="naviItem">{item5}</li>
                </ul>
              );
            }
          )}
        </div>
      </div>

      <ul className="footerSubInfo">
        <li className="company">© Megazine K Company</li>
        <li>주소: 서울시 강남구 테헤란로 427 위워크</li>
        <li>회사명: 위코드</li>
        <li>대표자: Megazine K</li>
        <li>사업자등록번호: 123-45-7689</li>
        <li>통신판매업 신고번호: 제1111-서울용산-111호</li>
        <li>개인정보처리방침</li>
        <li>이용약관</li>
        <li>site by Megazine K</li>
      </ul>
    </div>
  );
}

const FOOTER_DATA = [
  {
    id: 1,
    title: "ABOUT US",
    item1: "Company",
    item2: "Contact",
    item3: "Media & Service",
    item4: "Partnership",
    item5: "Stockists",
  },
  {
    id: 2,
    title: "CUSTOMER SERVICE",
    item1: "Inquiry",
    item2: "FAQ",
    item3: "Notice",
  },
  {
    id: 3,
    title: "SNS",
    item1: "Instagram",
    item2: " Facebook",
    item3: "Youtube",
  },
  {
    id: 4,
    title: "FOLLOW US",
    item1: "K Cast",
    item2: "K Playlist",
    item3: "Subscribe",
  },
];

export default Footer;
