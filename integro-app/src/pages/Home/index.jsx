import React from 'react';
import HomeHeader from '../../components/HomeHeader';
import ProjectCard from '../../components/ProjectCard';
import ShopCard from '../../components/ShopCard';
import Button from '../../components/ui/Button';
import Icon from '../../components/ui/Icon';
import { useApp } from '../../hooks/useApp';
import './index.scss';

const Home = () => {
  const { projects } = useApp();

  return (
    <div className="home page">
      <HomeHeader />

      <div className="decor decor2">
        <Icon slug="triangle" />
      </div>
      <div className="decor decor1">
        <Icon slug="triangle" />
      </div>

      <div className="home-shop">
        <div className="home-shop-top">
          <h2>Магазин</h2>
          <Button style={{ display: 'none' }} type="neutral" icon="fi-rr-arrow-right" />
        </div>
        <div className="home-list-wrap">
          <div>
            {[1, 2, 3].map((x, i) => (
              <ShopCard key={i} award={x} />
            ))}
            <div className="home-shop-future">
              <span>
                Скоро появится больше предложений <br /> :)
              </span>
            </div>
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
