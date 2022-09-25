import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Review.scss';
import ReviewStar from './ReviewStar/ReviewStar';
import ReviewTextarea from './ReviewTextarea/ReviewTextarea';
import Comment from './ReviewComment/Comment';

function Review() {
  const { product_id } = useParams();
  const [reviewData, setReviewData] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [commentObj, setCommentObj] = useState([]);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const getReviewData = async () => {
    const res = await fetch('/data/ReviewData.json').then(res => res.json());
    // const res = await fetch(`http://10.58.3.49:8000/products/${product_id}/reviews`).then(res =>
    //   res.json()
    // );
    setReviewData(res.RESULTS);
  };

  useEffect(() => {
    getReviewData();
  }, []);

  useEffect(() => {
    setCommentObj(reviewData);
  }, [reviewData]);

  const getCommentText = e => {
    setCommentText(e.target.value);
  };

  const addReview = () => {
    const token = localStorage.getItem('login-token') || '';

    if (commentText.length < 6) {
      alert('5글자 이상을 입력해주세요');
      setCommentText('');
    } else if (rating === 0) {
      alert('별점을 선택해주세요.');
    } else {
      const textareaObj = {
        content: commentText,
        rating: rating,
      };
      fetch(`http://10.58.3.49:8000/products/${product_id}/reviews`, {
        method: 'POST',
        headers: {
          Authorization: token,
        },
        body: JSON.stringify({
          content: commentText,
          rating: rating,
        }),
      })
        .then(res => res.json())
        .then(data => {
          if (data.MESSAGE === 'SUCCESS') {
            const copyComment = [...commentObj, textareaObj];
            setCommentObj(copyComment);
            setCommentText('');
          } else {
            alert('구매하셔야 리뷰등록 가능합니다!');
            setCommentText('');
          }
        });
    }
  };

  return (
    <div className="reviewContainer">
      <ReviewStar
        rating={rating}
        setRating={setRating}
        hover={hover}
        setHover={setHover}
      />
      <ReviewTextarea
        getCommentText={getCommentText}
        commentText={commentText}
        addReview={addReview}
      />
      {commentObj.map((data, i) => {
        return <Comment key={i} data={data} />;
      })}
    </div>
  );
}

export default Review;
