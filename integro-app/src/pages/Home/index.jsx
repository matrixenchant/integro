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
            {[
              {
                img: 'https://media.discordapp.net/attachments/759453474487271432/1177934497254223903/Frame_59.png?ex=65744ffd&is=6561dafd&hm=affb57fe62d077269e79247539232f92c12429b215757820b3595d335d7e35a7&=&format=webp',
                cost: 5000,
              },
              {
                img: 'https://media.discordapp.net/attachments/759453474487271432/1177934497010958356/Frame_58.png?ex=65744ffd&is=6561dafd&hm=0e42ef5b7e901be6467eca8d111600a1b8654ee8f8b4a7aa0f2c5960b0d094cf&=&format=webp',
                cost: 25000,
              },
              {
                img: 'https://media.discordapp.net/attachments/759453474487271432/1177934496771887104/Frame_60.png?ex=65744ffc&is=6561dafc&hm=67c80bf0da20474220b7edf871b02020fc171b41dad2f46222ce2f11f086af16&=&format=webp&width=564&height=600',
                cost: 1000,
              },
            ].map((x, i) => (
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
