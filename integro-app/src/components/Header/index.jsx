import React from 'react';
import { useApp } from '../../hooks/useApp';
import './index.scss';

const Header = () => {
  const { user } = useApp();

  if (!user) return <div className="header"></div>;

  return (
    <div className="header">
      <div className="header-user">
        <div className="header-user-avatar">{user.logo}</div>
        <div className="header-user-name">{user.name}</div>
      </div>

      <div className="header-balance">{user.balance}</div>
    </div>
  );
};

export default Header;
