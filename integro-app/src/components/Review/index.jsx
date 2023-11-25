import React from 'react';
import User from '../User';
import Icon from '../ui/Icon';
import './index.scss';

const dateOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('ru-RU', dateOptions);
};

const Review = ({ review, project }) => {
  return (
    <div className="review">
      <User user={review.user} withAvatar withDonations />
      <div className="review-text">{review.text}</div>
      <div className="review-date">{formatDate(review.createdDate)}</div>
      {review.answer && project && (
        <div className="review-answer">
          <Icon slug="fi-rr-arrow-turn-down-right" />
          <div className="review-answer-wrap">
            <div className="review-answer-top">
              <span>{project.author}</span>
              <span>Автор проекта</span>
            </div>
            <div className="review-text">{review.answer}</div>
            <div className="review-date">{formatDate(review.answerDate)}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Review;
