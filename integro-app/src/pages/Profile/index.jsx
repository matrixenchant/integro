import React from 'react';
import { useNavigate } from 'react-router-dom';
import User from '../../components/User';
import { Button, Icon } from '../../components/ui';
import { useApi } from '../../hooks/useApi';
import { useApp } from '../../hooks/useApp';
import useGetApi from '../../hooks/useGetApi';
import './index.scss';
import { $class, formatNumber } from '../../utils';

const ranks = [
  {
    slug: 'newbie',
    label: 'Новичок',
    icon: 'fi-rr-medical-star',
    value: 0,
  },
  {
    slug: 'empathy',
    label: 'Энтузиаст Эмпатии',
    icon: 'fi-rr-hand-heart',
    value: 10000,
  },
  {
    slug: 'angel',
    label: 'Бизнес Ангел',
    icon: 'fi-rr-angel',
    value: 20000,
  },
  {
    slug: 'star',
    label: 'Звезда Содействия',
    icon: 'fi-rr-star-christmas',
    value: 30000,
  },
  {
    slug: 'inspiration',
    label: 'Меценат Вдохновения',
    icon: 'fi-rr-star-shooting',
    value: 40000,
  },
];

const getNextRank = (curr) => {
  const index = ranks.findIndex(x => x.slug === curr);
  return ranks[index + 1];
}

const Profile = () => {
  const navigate = useNavigate();
  const [loading, payments, mutate] = useGetApi('payments', []);
  const [_, api] = useApi();
  const { user, logout } = useApp();

  const userRank = ranks.find((x) => x.slug === user.rank) || ranks[0];

  const rankIndex = ranks.findIndex(x => x.slug === userRank.slug);

  const nextRank = getNextRank(userRank.slug)

  const onClosePayment = (_id) => {
    api('payments/close', {
      body: {
        paymentId: _id,
      },
      success: (newPay) => {
        mutate(payments.map((x) => (x._id === _id ? newPay : x)));
      },
    });
  };

  return (
    <div className="profile page">
      <div className="decor1">
        <Icon slug="triangle" />
      </div>
      <Button
        onClick={() => navigate('/')}
        icon="fi-rr-arrow-left"
        type="text"
        className="profile-back"
      />
      <Button
        onClick={() => logout()}
        icon="fi-rr-exit"
        type="text"
        className="profile-exit"
      />


      <div className="profile-user">
        <User withAvatar withDonations withEdit />
      </div>

      <div className="profile-rank">
        <div className="profile-rank-main">
          <div className="profile-rank-balance">
            <h4>Текущие бонусы</h4>
            <div>
              <span>{user.balance}</span>
              <Icon slug="int" />
            </div>
          </div>
          <div className="profile-rank-current">
            <Icon slug={userRank.icon} />
            <h5>{userRank.label}</h5>
          </div>
        </div>
        <h4>ещё {formatNumber(nextRank.value - user.balance)} до ранга "{nextRank.label}"</h4>
      </div>

      <div className="profile-rank-progress">
        <div className="profile-rank-progress-wrap">
          <div className="profile-rank-progress-line">
            <div style={{ width: '30%' }}></div>
          </div>
          {ranks.map((rank, i) => (
            <div className={$class('profile-rank-progress__item', ['active', i <= rankIndex ])} key={rank.slug}>
              <Icon slug={rank.icon} />
              <div>{rank.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="profile-payments">
        <h2>Заявки</h2>
        <div className="profile-payments-wrap">
          {payments.map(({ _id, info, status, createdAt }) => (
            <div className="profile-payments__item" key={_id}>
              <div>
                <div className="profile-payments__item-title" onClick={() => onClosePayment(_id)}>
                  <h3>{info.award.title}</h3>
                  {status === 'confirm' && (
                    <div
                      className="profile-payments__item-status"
                      style={{ color: 'var(--green)' }}>
                      <Icon slug="fi-rr-check" />
                      <span>Подтверждена</span>
                    </div>
                  )}
                  {status === 'pending' && (
                    <div
                      className="profile-payments__item-status"
                      style={{ color: 'var(--alert)' }}>
                      <Icon slug="fi-rr-time-quarter-to" />
                      <span>Ожидание</span>
                    </div>
                  )}
                  {status === 'reject' && (
                    <div
                      className="profile-payments__item-status"
                      style={{ color: 'var(--error)' }}>
                      <Icon slug="fi-rr-cross" />
                      <span>Отклонена</span>
                    </div>
                  )}
                </div>
                <div
                  className="profile-payments__item-image"
                  style={{ backgroundImage: `url(${info.award.image})` }}></div>
              </div>

              <div className="profile-payments__item-footer">
                <div>подробности</div>
                <div>{new Date(createdAt).toLocaleString()}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
