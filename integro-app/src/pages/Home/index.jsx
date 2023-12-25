import React from 'react';
import { useNavigate } from 'react-router-dom';
import HomeHeader from '../../components/HomeHeader';
import ProjectCard from '../../components/ProjectCard';
import ShopCard from '../../components/ShopCard';
import User from '../../components/User';
import Button from '../../components/ui/Button';
import Icon from '../../components/ui/Icon';
import { useApp } from '../../hooks/useApp';
import useGetApi from '../../hooks/useGetApi';
import './index.scss';
import { useModal } from '../../hooks/useModal';

const Home = () => {
  const { projects, shop } = useApp();
  const { openModal } = useModal();
  const [loading, rating] = useGetApi('users/rating', []);
  const navigate = useNavigate();

  return (
    <div className="home page">
      <HomeHeader />

      <div className="decor decor2">
        <Icon slug="triangle" />
      </div>
      <div className="decor decor1">
        <Icon slug="triangle" />
      </div>

      <div className="home-rating">
        <Button fullWidth type="secondary" onClick={() => openModal('rating', { rating })}>
          <div className="home-rating-top">
            <Icon slug="fi-rr-trophy" />
            Топ донатеров
          </div>
          <div className="home-rating-wrap">
            <User user={rating[1]} withAvatar />
            <User user={rating[0]} withAvatar />
            <User user={rating[2]} withAvatar />
          </div>
        </Button>
      </div>

      <div className="home-shop">
        <div className="home-shop-top">
          <h2>Магазин</h2>
          <Button type="text" icon="fi-rr-shop" onClick={() => navigate('/shop')} />
        </div>
        <div className="home-list-wrap">
          <div>
            {shop.map((x, i) => (
              <ShopCard key={i} item={x} />
            ))}
            <Button
              onClick={() => navigate('/shop')}
              className="home-shop-future"
              type="text"
              icon="fi-rr-arrow-right"
              iconAlign="end">
              <span>Другие вещи</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="home-new-projects">
        <h2>Новые проекты</h2>
        <div className="home-list-wrap">
          <div>
            {projects.map((x) => (
              <ProjectCard key={x._id} project={x} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
