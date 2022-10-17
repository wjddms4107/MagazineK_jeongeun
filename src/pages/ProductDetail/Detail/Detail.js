import React, { useState } from 'react';
import './Detail.scss';
import { useNavigate } from 'react-router-dom';

const Detail = ({ prdDetailData, product_id, setModalState }) => {
  const navigate = useNavigate();
  const {
    published_date,
    description,
    product_image_url,
    isbn,
    issue_number,
    language,
    category,
    pages,
    price,
    size,
    title,
  } = prdDetailData;

  const [orderQuantity, setOrderQuantity] = useState(1);

  const priceThousand = price.toString().slice(0, 2);

  function minusOrderQuantity() {
    if (orderQuantity < 2) {
      setOrderQuantity(1);
      alert('최소 주문수량은 1개 입니다.');
    } else {
      setOrderQuantity(orderQuantity => orderQuantity - 1);
    }
  }

  function plusOrderQuantity() {
    setOrderQuantity(orderQuantity => orderQuantity + 1);
  }

  const PRD_META_INFO = [
    { id: 1, title: 'LANGUAGE', value: language },
    { id: 2, title: 'SIZE', value: size },
    { id: 3, title: 'PAGES', value: pages },
    { id: 4, title: 'DATE', value: published_date },
    { id: 5, title: 'ISBN', value: isbn },
  ];

  return (
    <article className="prdDetailPage">
      <div className="prdDetailContainer">
        <div className="prdDetailLeft">
          <div className="prdCategoryBox">
            <span className="prdCategory">{category}</span>
            <span className="prdNumber">ISSUE NO.{issue_number}</span>
          </div>
          <h1 className="prdTitle">{title}</h1>
          <span className="prdPrice">₩{priceThousand},000</span>
          <div className="prdCount">
            <span onClick={minusOrderQuantity}>-</span>
            <span>{orderQuantity}</span>
            <span onClick={plusOrderQuantity}>+</span>
          </div>
          <div className="prdMetaInfo">
            {PRD_META_INFO.map(({ id, title, value }) => {
              return (
                <span key={id}>
                  <span>{title}</span>
                  <span>{value}</span>
                </span>
              );
            })}
          </div>
        </div>
        <div className="prdDetailRight">
          <button
            onClick={() => {
              const token = localStorage.getItem('login-token') || '';

              if (token) {
                fetch(`http://10.58.3.49:8000/orders/cart/${product_id}`, {
                  method: 'POST',
                  headers: {
                    AUTHORIZATION: token,
                  },
                  body: JSON.stringify({ quantity: orderQuantity }),
                })
                  .then(res => res.json())
                  .then(res => {
                    if (res.result === 'SUCCESS') {
                      setModalState(true);
                    }
                  });
              } else {
                alert('로그인이 필요한 기능입니다.');
                navigate('/Login');
              }
            }}
          >
            ₩{priceThousand * orderQuantity},000 ADD TO CART
          </button>
          <div className="prdDescription">
            <p>DESCRIPTION</p>
            <p>{description}</p>
          </div>
        </div>
      </div>
      <div className="prdImg">
        <img src={product_image_url} alt="ARC" />
      </div>
    </article>
  );
};

export default Detail;
