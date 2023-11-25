import React, { useState } from 'react';
import { Button, Icon } from '../../components/ui';
import { $class, formatNumber } from '../../utils';
import './index.scss';
import { useApi } from '../../hooks/useApi';
import toast from 'react-hot-toast';

const AwardsModal = ({ data, closeModal }) => {
  const { awards, projectId } = data;
  
  const [loading, api] = useApi();
  const [phone, setPhone] = useState({});
  const [expanded, setExpanded] = useState(null);

  const onCreatePayment = (award) => {
    api('payments', {
      body: {
        info: {
          award,
        },
        projectId: projectId,
        price: award.price,
      },
      success: () => {
        toast.success('Заявка создана');
        setExpanded(null);
        closeModal();
      },
      error: () => {
        toast.error('Ошибка при создании заявки')
      }
    })
  }

  return (
    <div className="awards-modal">
      <h1>
        <Icon slug="star" />
        Награды
      </h1>
      <div className="awards-modal-wrap">
        {awards.map((award) => (
          <div className="awards-modal__item" key={award._id}>
            <div className="awards-modal__item-image"></div>
            <div className="awards-modal__item-wrap">
              <div className="awards-modal__item-top">
                <div>{award.title}</div>
                <div>₸{formatNumber(award.price)}</div>
              </div>
              <div className="awards-modal__item-include">
                <h6>Включает в себя:</h6>
                <div>{award.includes.join(', ')}</div>
              </div>
              <Button
                label={expanded === award._id ? 'Отмена' : 'Пожертвовать'}
                onClick={() => setExpanded((prev) => (prev === award._id ? null : award._id))}
                type={expanded === award._id ? 'error' : 'main'}
              />
            </div>
            <div className={$class('awards-modal__item-payment', ['active', expanded === award._id])}>
              <div className="awards-modal__item-payment-block">
                <div>Ваш номер:</div>
                <div style={{ textDecoration: 'underline' }}>+7 (711) 113 54 00</div>
              </div>
              <div className="awards-modal__item-payment-block">
                <div>Номер для перевода:</div>
                <div>+7 (111) 248 11 99</div>
              </div>
              <Button loading={loading} label='Я перевёл' fullWidth onClick={() => onCreatePayment(award)} />
              <h5>После подтверждения заявки менеджером, награда зачислиться на ваш аккаунт</h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AwardsModal;
