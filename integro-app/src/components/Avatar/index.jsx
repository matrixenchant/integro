import React from 'react';
import './index.scss';

const Avatar = ({ user, size }) => {
  return <div className="avatar" style={{ width: size, height: size, backgroundImage: `url(${user.avatar})` }}>{!user.avatar && user.name[0]}</div>;
};

export default Avatar;
