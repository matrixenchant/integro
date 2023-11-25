import React from 'react';
import Button from '../ui/Button';
import './index.scss';

const ShopCard = ({ award }) => {
  return (
    <Button className="shop-card">
      <div className="shop-card-hero">{award.image}</div>
      <div className="shop-card-cost">{award.cost || '--'}</div>
    </Button>
  );
};

export default ShopCard;
