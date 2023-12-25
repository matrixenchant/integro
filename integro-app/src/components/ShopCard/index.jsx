import React from 'react';
import toast from 'react-hot-toast';
import { useApp } from '../../hooks/useApp';
import { useModal } from '../../hooks/useModal';
import { formatNumber } from '../../utils';
import { Icon } from '../ui';
import Button from '../ui/Button';
import './index.scss';

const ShopCard = ({ item, showCollection = true }) => {
  const { openModal } = useModal();
  const { token } = useApp();
  const { getCollectionBySlug } = useApp();
  const { imgs } = item.variants[0];
  const collection = getCollectionBySlug(item.collection);

  const outOfStock = item.variants.reduce((sum, x) => sum + +x.quantity, 0) <= 0;

  return (
    <div className="shop-card">
      {showCollection && collection?.logo && (
        <div className="shop-card-collection">
          <img src={collection.logo} alt={collection.name} />
        </div>
      )}
      <Button
        className="shop-card-hero"
        style={{ backgroundImage: `url(${imgs[0]})` }}
        onClick={() =>
          token ? openModal('shopItem', { item }) : toast('Необходимо войти в аккаунт')
        }>
        {outOfStock && (
          <div className="shop-card-empty">
            <Icon slug="fi-rr-times-hexagon" />
          </div>
        )}
        <div className="shop-card-cost">
          <span>
            {formatNumber(item.cost / 2) || '--'}
            <span className="shop-card-cost-old">{formatNumber(item.cost)}</span>
          </span>
          <Icon slug="int" />
        </div>
      </Button>
      <div className="shop-card-name">{item.name}</div>
    </div>
  );
};

export default ShopCard;
