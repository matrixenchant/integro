import React from 'react';
import { useApp } from '../../hooks/useApp';
import Avatar from '../Avatar';
import './index.scss';

const User = ({ user, withAvatar, withDonations, withEdit }) => {
  const { user: thisUser } = useApp();

  const targetUser = user || thisUser;

  if (!targetUser)
    return (
      <div className="user">
        <div className="user-notauth">Не авторизован</div>
      </div>
    );

  return (
    <div className="user">
      {withAvatar && <Avatar user={targetUser} />}
      <div>
        <div className="user-name">
          <span>{targetUser.name}</span>
          <span className="user-rank">{targetUser?.rank}</span>
        </div>
        {withDonations && <div className="user-donations">{targetUser.donations || 0} пожертвований</div>}
        {withEdit && <div className="user-edit">редактировать</div>}
      </div>
    </div>
  );
};

export default User;
