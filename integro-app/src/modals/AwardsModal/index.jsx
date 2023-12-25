import React, { useState } from 'react';
import toast from 'react-hot-toast';
import InputMask from 'react-input-mask';
import { Button, Icon } from '../../components/ui';
import { useApi } from '../../hooks/useApi';
import { useLocalState } from '../../hooks/useLocalState';
import { $class, formatNumber } from '../../utils';
import './index.scss';

import donateImg from '../../assets/donate.png';

const AwardsModal = ({ data, closeModal }) => {
  const { awards, projectId } = data;

  const [loading, api] = useApi();
  const [expanded, setExpanded] = useState(null);

  const onCreatePayment = (award) => {
    api('payments', {
      body: {
        info: {
          award,
          phone: JSON.parse(localStorage.getItem('userKaspiPhone')),
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
        toast.error('Ошибка при создании заявки');
      },
    });
  };

  const onCreateDonatePayment = () => {
    api('payments', {
      body: {
        info: {
          award: null,
          phone: JSON.parse(localStorage.getItem('userKaspiPhone')),
        },
        projectId: projectId,
        price: -1,
      },
      success: () => {
        toast.success('Заявка создана');
        setExpanded(null);
        closeModal();
      },
      error: () => {
        toast.error('Ошибка при создании заявки');
      },
    });
  };

  return (
    <div className="awards-modal">
      <div className="awards-modal-donate">
        <div>
          <img src={donateImg} alt="" />
          <div className="awards-modal-donate-wrap">
            <h4>Отправить произвольную сумму</h4>
            <Button
              label={expanded === 'donate' ? 'Отмена' : 'Пожертвовать'}
              onClick={() => setExpanded((prev) => (prev === 'donate' ? null : 'donate'))}
              type={expanded === 'donate' ? 'error' : 'main'}
            />
          </div>
        </div>
        <AwardPayment loading={loading} active={expanded === 'donate'} onPay={onCreateDonatePayment} />
      </div>
      {!!awards.length && (
        <div>
          <h1>
            <Icon slug="star" />
            Награды
          </h1>
          <div className="awards-modal-wrap">
            {awards.map((award) => (
              <div className="awards-modal__item" key={award._id}>
                <div
                  className="awards-modal__item-image"
                  style={{ backgroundImage: `url(${award.image})` }}></div>
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
                <AwardPayment
                  loading={loading}
                  active={expanded === award._id}
                  onPay={() => onCreatePayment(award)}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const AwardPayment = ({ loading, onPay, active }) => {
  const [phone, setPhone] = useLocalState('userKaspiPhone', '');

  return (
    <div className={$class('awards-modal__item-payment', ['active', active])}>
      <div className="awards-modal__item-payment-block">
        <div>Ваш номер Kaspi:</div>
        <InputMask
          style={{ borderBottom: '1px solid white', color: 'white', fontSize: 20, width: 160 }}
          maskPlaceholder=" "
          mask="+7 (999) 99 99-99"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          defaultCountry="KZ"
          international
        />
      </div>
      <div className="awards-modal__item-payment-block">
        <div>Данные для перевода:</div>
        <div>+7 (708) 670 86-57</div>
        <div style={{ marginTop: 5 }}>4400 4302 5024 9015</div>
      </div>
      <Button loading={loading} label="Я перевёл" fullWidth onClick={onPay} />
      <div className="disclaimer">
        <Icon slug="fi-rr-exclamation" />
        <span>Дисклеймер</span>
      </div>
      <h5>После подтверждения заявки менеджером, награда зачислиться на ваш аккаунт</h5>
    </div>
  );
};

export default AwardsModal;
