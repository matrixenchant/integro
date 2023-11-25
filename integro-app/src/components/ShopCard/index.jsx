import React from 'react';
import Button from '../ui/Button';
import './index.scss';
import { formatNumber } from '../../utils';
import { Icon } from '../ui';
import toast from 'react-hot-toast';

const ShopCard = ({ award }) => {
  return (
    <Button className="shop-card" onClick={() => toast('Пока это нельзя получить')}>
      <div className="shop-card-hero" style={{ backgroundImage: `url(${award.img})` }}></div>
      <div className="shop-card-cost">{formatNumber(award.cost) || '--'}<Icon slug='int' /></div>
    </Button>
  );
};

export default ShopCard;
