import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Detail from './Detail/Detail';
import Review from './Review';

const ProductDetail = ({ setModalState }) => {
  const [prdDetailData, setPrdDetailData] = useState([]);
  const { product_id } = useParams();

  const getPrdDetailData = async () => {
    const res = await fetch('/data/ProductDetailData.json').then(res =>
      res.json()
    );
    // const res = await fetch(`http://10.58.3.49:8000/products/${product_id}`).then(res =>
    //   res.json()
    setPrdDetailData(res);
  };

  useEffect(() => {
    getPrdDetailData();
  }, []);

  return (
    <>
      {prdDetailData.map(prdDetailData => {
        return (
          <Detail
            key={prdDetailData.issue_number}
            prdDetailData={prdDetailData}
            product_id={product_id}
            setModalState={setModalState}
          />
        );
      })}
      <Review />
    </>
  );
};
export default ProductDetail;
