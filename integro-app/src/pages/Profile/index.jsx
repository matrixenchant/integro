import React from 'react';
import { useNavigate } from 'react-router-dom';
import User from '../../components/User';
import { Button, Icon } from '../../components/ui';
import { useApi } from '../../hooks/useApi';
import { useApp } from '../../hooks/useApp';
import useGetApi from '../../hooks/useGetApi';
import { $class, formatNumber } from '../../utils';
import './index.scss';

const Profile = () => {
  const navigate = useNavigate();
  const [loading, payments, mutate] = useGetApi('payments', []);
  const [_, api] = useApi();
  const { user, logout, changeUser, ranks } = useApp();

  if (!user) return null;

  const userRank = ranks.find((x) => x.slug === user.rank) || ranks[0];

  const getNextRank = (curr) => {
    const index = ranks.findIndex((x) => x.slug === curr);
    return ranks[index + 1];
  };

  const rankIndex = ranks.findIndex((x) => x.slug === userRank.slug);

  const nextRank = getNextRank(userRank.slug);

  const onClosePayment = (_id) => {
    api('payments/close', {
      body: {
        paymentId: _id,
      },
      success: ({ payment: newPay, user: newUser }) => {
        mutate(payments.map((x) => (x._id === _id ? newPay : x)));
        changeUser({ balance: newUser.balance, donations: newUser.donationsNum });
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
      <Button onClick={() => logout()} icon="fi-rr-exit" type="text" className="profile-exit" />

      <div className="profile-user">
        <User withAvatar withDonations withEdit />
      </div>

      <div className="profile-rank">
        <div className="profile-rank-main">
          <div className="profile-rank-balance">
            <div>
              <h4>Текущие бонусы</h4>
              <div>
                <span>{formatNumber(user.balance)}</span>
                <Icon slug="int" />
              </div>
            </div>

            <div>
              <h4>Сумма пожертвований</h4>
              <div>
                <span>₸ {formatNumber(user.donations)}</span>
              </div>
            </div>
          </div>
          <div className="profile-rank-current">
            <Icon slug={userRank.icon} />
            <h5>{userRank.label}</h5>
          </div>
        </div>
        {nextRank && (
          <h4>
            ещё {formatNumber(nextRank.value - user.donations)} до ранга "{nextRank.label}"
          </h4>
        )}
      </div>

      <div className="profile-rank-progress">
        <div className="profile-rank-progress-wrap">
          {ranks.map((rank, i, arr) => (
            <React.Fragment key={rank.slug}>
              <div className={$class('profile-rank-progress__item', ['active', i <= rankIndex])}>
                <Icon slug={rank.icon} />
                <div>{rank.label}</div>
              </div>
              {i < ranks.length - 1 && (
                <div className="profile-rank-progress-line">
                  <div
                    style={{
                      width:
                        i <= rankIndex
                          ? `${Math.min((user.donations / arr[i + 1].value) * 100, 100)}%`
                          : 0,
                    }}></div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="profile-awards">
        <div className="profile-awards-top">
          <h2>Награды</h2>
        </div>
        {!!user?.awards?.length && (
          <div className="profile-awards-wrap">
            <div>
              {user.awards.map((award, i) => (
                <div className="profile-awards__item" key={i}>
                  <div style={{ backgroundImage: `url(${award.image})` }}></div>
                  <div>{award.title}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!user?.awards?.length && <h4 className="profile-awards-empty">У вас пока нет наград</h4>}
      </div>

      <div className="profile-payments">
        <h2>Заявки</h2>
        <div className="profile-payments-wrap">
          {payments.map(({ _id, info, status, createdAt, price }) => (
            <div className="profile-payments__item" key={_id}>
              <div>
                <div className="profile-payments__item-title">
                  <h3>{info.award ? info.award.title : `Донат ₸${formatNumber(price)}`}</h3>
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
                {/* <div
                  className="profile-payments__item-image"
                  style={{ backgroundImage: `url(${info.award ? info.award.image : ''})` }}></div> */}
              </div>

              <div className="profile-payments__item-footer">
                <div>подробности</div>
                <div>{new Date(createdAt).toLocaleString()}</div>
              </div>
            </div>
          ))}
          {payments.length === 0 && <h4 className="profile-awards-empty">У вас пока нет заявок</h4>}
        </div>
      </div>
    </div>
  );
};

export default Profile;
