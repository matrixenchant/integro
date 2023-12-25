import React from 'react';
import User from '../../components/User';
import { $class } from '../../utils';
import './index.scss';
import { useApp } from '../../hooks/useApp';

const RatingModal = ({ data }) => {
  const { rating } = data;
  const { user: self } = useApp();

  return (
    <div className="rating-modal">
      {rating.map((user, i) => {
        return (
          <React.Fragment key={user._id}>
            <div className={$class('rating-modal__item', ['self', user._id === self?._id])}>
              <div>{i + 1}.</div>
              <User user={user} />
            </div>
            {(i === rating.length - 4) && <div className="rating-modal-delimiter"></div>}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default RatingModal;
