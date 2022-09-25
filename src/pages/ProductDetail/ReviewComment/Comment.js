import React from 'react';
import './Comment.scss';

function Comment({ data: { content, username, rating } }) {
  const changeNum = Number(rating);

  return (
    <div className="commentBox">
      <div className="commentItem">
        <div className="userInfo">
          <div className="star">{STAR[changeNum - 1]}</div>
          <div className="comment">{content}</div>
          <p className="userId">아이디 : {username}</p>
        </div>
      </div>
      <hr />
    </div>
  );
}

export default Comment;

const STAR = ['⭑', '⭑⭑', '⭑⭑⭑', '⭑⭑⭑⭑', '⭑⭑⭑⭑⭑'];
