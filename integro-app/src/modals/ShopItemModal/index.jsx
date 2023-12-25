import { animated, useSpring } from '@react-spring/web';
import React, { useEffect, useState } from 'react';
import Balance from '../../components/Balance';
import { Button, Icon } from '../../components/ui';
import { useApp } from '../../hooks/useApp';
import { $class, formatNumber } from '../../utils';
import './index.scss';
import { useApi } from '../../hooks/useApi';
import toast from 'react-hot-toast';

const ShopItemModal = ({ data, open, closeModal }) => {
  const { item } = data;
  const { getCollectionBySlug } = useApp();
  const [loading, api] = useApi();
  const [gallery, setGallery] = useState(item.variants[0].imgs);
  const [variant, setVariant] = useState(0);
  const [activeImg, setActiveImg] = useState(0);
  const collection = getCollectionBySlug(item.collection);

  const { x } = useSpring({
    x: -activeImg * window.innerWidth + activeImg * 30,
  });

  useEffect(() => {
    setVariant(0);
    setActiveImg(0);
    setGallery(item.variants[variant].imgs);
  }, [data]);

  useEffect(() => {
    setActiveImg(0);
    setGallery(item.variants[variant].imgs);
  }, [variant]);

  const onChangeActiveImg = (i) => {
    if (i < 0) i = 0;
    if (i > gallery.length - 1) return gallery.length - 1;
    setActiveImg(i);
  };

  const onBuyHandler = () => {
    api(`awards/buy`, {
      body: {
        award: item,
        variant
      },
      success: (res) => {
        console.log(res);
        toast.success('Вы получили награду! Проверьте в профиле')
      },
      error: (e) => {
        console.warn(e);
        if (e.message === 'AWARD.ERROR.NOT_ENOUGH_BALANCE') return toast.error('Недостаточно баланса')
        if (e.message === 'AWARD.ERROR.EMPTY') return toast.error('Товара нет в наличии')
        toast.error('Произошла ошибка')
      }
    })
  }

  return (
    <div className="si-modal">
      <div className="si-modal-gallery">
        <Button
          onClick={() => onChangeActiveImg(activeImg - 1)}
          type="text"
          className={$class('si-modal-gallery-nav', ['hide', activeImg === 0])}>
          <Icon slug="fi-rr-angle-small-left" />
        </Button>
        <Button
          onClick={() => onChangeActiveImg(activeImg + 1)}
          type="text"
          className={$class('si-modal-gallery-nav', ['hide', activeImg === gallery.length - 1])}>
          <Icon slug="fi-rr-angle-small-right" />
        </Button>
        {gallery.map((el, i) => (
          <animated.div
            key={i}
            className="si-modal-gallery__item"
            style={{ backgroundImage: `url(${el})`, x }}></animated.div>
        ))}
        {!!gallery.length && (
          <div className="si-modal-gallery-thumbs">
            {gallery.map((el, i) => (
              <Button
                key={i}
                onClick={() => setActiveImg(i)}
                className={$class(['active', activeImg === i])}
                style={{ backgroundImage: `url(${el})` }}></Button>
            ))}
          </div>
        )}
      </div>

      <h2 className="si-modal-name">{item.name}</h2>
      {item.description && <div className="si-modal-description">{item.description}</div>}
      {collection?.name && (
        <div className="si-modal-collection">
          Коллекция <b>{collection?.name}</b>
        </div>
      )}

      <div className="si-modal-variants">
        <h3>Варианты:</h3>
        <div className="si-modal-variants-wrap">
          {item.variants.map((v, i) => (
            <Button
              type="text"
              onClick={() => setVariant(i)}
              className={$class('si-modal-variants__item', ['active', variant === i])}
              key={v.type}
              style={{ background: v.background }}></Button>
          ))}
        </div>
      </div>

      <div className="si-modal-block">
        <h3>В наличии:</h3>
        <div style={{ color: item.variants[variant].quantity <= 0 && 'var(--error)' }}>{item.variants[variant].quantity}</div>
      </div>

      <Button disabled={item.variants[variant].quantity <= 0} fullWidth authCheck className="si-modal-btn" onClick={onBuyHandler}>
        <span>Получить</span>
        <Balance value={formatNumber(item.cost / 2)} />
      </Button>
    </div>
  );
};

export default ShopItemModal;
