import React from 'react';
import { useNavigate } from 'react-router-dom';
import ShopCard from '../../components/ShopCard';
import { Button, Icon } from '../../components/ui';
import { useApp } from '../../hooks/useApp';
import './index.scss';

const Shop = () => {
  const { shopCollections, getShopCollectionItems } = useApp();
  const navigate = useNavigate();

  return (
    <div className="shop page">
      <div className="shop-decor">
        <Icon slug="fi-rr-trophy" />
      </div>
      <div className="shop-top">
        <Button icon="fi-rr-arrow-left" type="text" onClick={() => navigate(-1)}></Button>
        <h2>Каталог наград</h2>
      </div>
      {shopCollections.map((x) => (
        <div className="shop-collection" key={x.slug}>
          <div className="shop-collection-top">
            <div className="shop-collection-logo">
              <img src={x.logo} />
            </div>
            <h3>{x.name}</h3>
            <h4>- 50% скидка</h4>
          </div>
          <div className="shop-collection-wrap">
            {getShopCollectionItems(x.slug).map((item) => (
              <ShopCard showCollection={false} key={item._id} item={item} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Shop;
