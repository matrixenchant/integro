import React from 'react';
import './index.scss';

import { useNavigate } from 'react-router-dom';
import background from '../../assets/welcome-screen.png';
import { Button } from '../../components/ui';
import { useModal } from '../../hooks/useModal';

const Welcome = () => {
  const navigate = useNavigate();
  const { openModal } = useModal();

  return (
    <div className="welcome page">
      <img className="welcome-background" src={background} alt="" />

      <div className="welcome-wrap">
        <h1>Построй свое будущее вместе с нами</h1>
        <h4>Специальное место для студентов, где они могут реализовать свои мечты.</h4>

        <Line />

        <Button
          onClick={() => {
            openModal('auth', { view_: 'reg' })
          }}
          fullWidth
          label="Создать аккаунт"
          icon="fi-rr-arrow-right"
          iconAlign="end"
        />
        <Button
          onClick={() => navigate('/')}
          style={{ marginTop: 10 }}
          fullWidth
          label="Продолжить без авторизации"
          type="text"
        />
      </div>
    </div>
  );
};

const Line = () => (
  <svg
    className="welcome-wrap-line"
    width="390"
    height="159"
    viewBox="0 0 390 159"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_d_3_35)">
      <path
        d="M-18 136.968C-0.833334 148.968 35.5 161.168 43.5 113.968C53.5 54.9675 70.7676 -2.88782 196 13.9675C347.5 34.3583 403.5 113.968 451 146.358"
        stroke="#01C38D"
        strokeWidth="2"
      />
    </g>
    <defs>
      <filter
        id="filter0_d_3_35"
        x="-28.5729"
        y="0.00038147"
        width="490.136"
        height="158.858"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="5" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.00392157 0 0 0 0 0.764706 0 0 0 0 0.552941 0 0 0 1 0"
        />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3_35" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3_35" result="shape" />
      </filter>
    </defs>
  </svg>
);

export default Welcome;
