import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../hooks/useApp';
import { useModal } from '../../hooks/useModal';
import { formatNumber } from '../../utils';
import Button from '../ui/Button';
import './index.scss';
import { Icon } from '../ui';
import User from '../User';

const HomeHeader = () => {
  const { user } = useApp();
  const { openModal } = useModal();
  const navigate = useNavigate();

  return (
    <div className="home-header">
      <User withAvatar withDonations />

      {user && (
        <Button
          className="home-header-balance"
          onClick={() => navigate('profile')}
          label={formatNumber(user.balance)}
          icon='int'
          iconAlign='end'
        />
      )}
      {!user && (
        <Button
          onClick={() => openModal('auth')}
          className="home-header-balance"
          label={'Войти в аккаунт'}
        />
      )}
    </div>
  );
};

export default HomeHeader;
