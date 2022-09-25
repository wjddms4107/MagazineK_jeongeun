import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProdInCart from './ProdInCart';
import './Cart.scss';

const Cart = ({ toggleCart, modalState, setModalState }) => {
  const [cartData, setCartData] = useState([]);
  const [totalOrderNum, setTotalOrderNum] = useState(0);
  const [priceList, setPriceList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isEmpty, setIsEmpty] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem('login-token') || '';

  const scrollUp = () => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  };

  const decreaseTotalOrderNum = () => {
    if (totalOrderNum < 2) {
      setTotalOrderNum(1);
    } else if (totalOrderNum < cartData.length + 1) {
      setTotalOrderNum(cartData.length);
    } else {
      setTotalOrderNum(totalOrderNum => totalOrderNum - 1);
    }
  };

  const increaseTotalOrderNum = () => {
    setTotalOrderNum(totalOrderNum => totalOrderNum + 1);
  };

  const deleteProduct = (prodIndex, orderNum) => {
    setCartData(
      cartData.filter((prod, idx) => {
        if (prodIndex === idx) {
          setTotalOrderNum(totalOrderNum - orderNum);
        }
        return prodIndex !== idx;
      })
    );
  };

  const deleteCartData = (product_id, prodIndex, orderNum) => {
    if (window.confirm('선택하신 상품을 삭제하시겠습니까?')) {
      fetch(`http://10.58.3.49:8000/orders/cart/${product_id}`, {
        method: 'DELETE',
        headers: {
          AUTHORIZATION: token,
        },
      })
        .then(res => res.json())
        .then(res => {
          if (res.message === 'SUCCESS') {
            deleteProduct(prodIndex, orderNum);
          }
        });
    }
  };

  const getCartData = () => {
    if (token) {
      fetch('http://10.58.3.49:8000/orders/cart', {
        method: 'GET',
        headers: {
          AUTHORIZATION: token,
        },
      })
        .then(res => res.json())
        .then(res => {
          if (res.message === 'EMPTY CART') {
            return;
          } else {
            setCartData(res.result[0].product);
            let sum = 0;
            res.result[0].product.forEach(product => {
              sum = sum + product.quantity;
            });
            setTotalOrderNum(sum);
          }
        });
    }
  };

  const calculateTotalPrice = () => {
    let sum = 0;
    priceList.forEach(el => {
      sum = el + sum;
    });
    setTotalPrice(sum);
  };

  useEffect(() => {
    getCartData();
  }, [modalState]);

  useEffect(() => {
    setPriceList(Array(cartData.length).fill());
    setIsEmpty(cartData.length === 0 ? true : false);
  }, [cartData]);

  useEffect(() => {
    calculateTotalPrice();
  }, [cartData, totalOrderNum, priceList]);

  return (
    <div className={['cartModal', modalState && 'cartModalOn'].join(' ')}>
      <div className="cartNav">
        <span>Cart[{totalOrderNum}]</span>
        <span onClick={toggleCart}>Close</span>
      </div>
      <div className="cartMain">
        {isEmpty && (
          <div className="empty">
            <p>장바구니가 비어 있습니다.</p>
          </div>
        )}
        <div className="prodInCartContainer">
          {cartData.map((cartData, idx) => {
            return (
              <ProdInCart
                key={cartData.product_id}
                cartData={cartData}
                decreaseTotalOrderNum={decreaseTotalOrderNum}
                increaseTotalOrderNum={increaseTotalOrderNum}
                priceList={priceList}
                idx={idx}
                setPriceList={setPriceList}
                deleteCartData={deleteCartData}
                token={token}
                modalState={modalState}
              />
            );
          })}
        </div>
      </div>
      <div
        className="cartFooter"
        onClick={() => {
          if (token) {
            navigate('/Pay');
            scrollUp();
            setModalState(false);
          } else {
            alert('로그인이 필요한 기능입니다.');
            navigate('/Login');
          }
        }}
      >
        <span>₩{totalPrice},000 VIEW ALL</span>
      </div>
    </div>
  );
};

export default Cart;
