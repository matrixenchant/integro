import React from 'react';
import { useApp } from '../../hooks/useApp';
import Avatar from '../Avatar';
import './index.scss';
import { Icon } from '../ui';

const User = ({ user, withAvatar, withDonations, withEdit, donationsText }) => {
  const { user: thisUser, getRankBySlug } = useApp();

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
          <span className="user-rank"><Icon slug={getRankBySlug(targetUser?.rank)?.icon} /></span>
        </div>
        {withDonations && <div className="user-donations">{donationsText ? donationsText : `${targetUser.donationsNum || 0} пожертвований`}</div>}
        {withEdit && <div className="user-edit">редактировать</div>}
      </div>
    </div>
  );
};

export default User;
