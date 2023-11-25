import React from 'react';
import './index.scss';

const Avatar = ({ user, size }) => {
  return <div className="avatar" style={{ width: size, height: size }}></div>;
};

export default Avatar;
