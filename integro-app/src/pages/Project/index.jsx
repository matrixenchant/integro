import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../components/ui';
import { useApp } from '../../hooks/useApp';
import './index.scss';

import { animated, useSpring } from '@react-spring/web';
import Review from '../../components/Review';
import { useModal } from '../../hooks/useModal';
import { $class, formatNumber } from '../../utils';
import useGetApi from '../../hooks/useGetApi';

const Project = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { openModal } = useModal();
  const { getProjectById } = useApp();

  const [isVideoActive, setIsVideoActive] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const videoRef = useRef(null);

  const project = getProjectById(id);
  const [loading, reviews, mutateReviews] = useGetApi(project?._id ? `projects/${project._id}/reviews` : null, []);

  const $addReview = (newReview) => {
    mutateReviews([...reviews, newReview])
  }

  const [headerSpring, apiSpring] = useSpring(() => ({
    titleX: 20,
    titleY: 117,
    titleSize: 1,

    height: 200,
  }));

  const onVideoClick = () => {
    setIsVideoActive(true);
  };
  const onVideoClose = () => {
    setIsVideoActive(false);
    videoRef.current.pause();
  }

  useEffect(() => {
    const onScroll = () => {};

    document.body.addEventListener('scroll', onScroll);
    return () => document.body.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="project page">
      <div className={$class('project-video', ['active', isVideoActive])}>
        <Button onClick={onVideoClose} type="text" icon="fi-rr-cross-small" />
        <video ref={videoRef} controls>
          <source src={project.video} />
        </video>
      </div>
      <animated.div
        className="project-header"
        style={{
          background: `linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.80) 100%), url(${project.poster}), lightgray 50% / cover no-repeat`,
        }}>
        <Button
          type="text"
          className="project-back"
          icon="fi-rr-arrow-left"
          onClick={() => navigate(-1)}
        />
        <Button type="text" className="project-share" icon="fi-rr-share" onClick={null} />

        <animated.div
          style={{
            top: headerSpring.titleY,
            left: headerSpring.titleX,
            transform: headerSpring.titleSize.to((x) => `scale(${x})`),
          }}
          className="project-name">
          <h1>{project.name}</h1>
          <Button className="project-play" icon="fi-rr-play" onClick={onVideoClick} />
        </animated.div>
      </animated.div>

      <div className="project-wrap">
        <div className="project-section">
          <h4>Собрано средств</h4>
          <div className="project-donated">
            <h1>₸{formatNumber(project.current)}</h1>
            <h4>из ₸{formatNumber(project.aim)}</h4>
          </div>
          <Button
            onClick={() => openModal('awards', { awards: project.awards, projectId: project._id })}
            className="project-donate-btn"
            fullWidth
            icon="star"
            label="Поддержать"
          />
        </div>
        <div className="project-section project-stats">
          <div className="project-stat">
            <h3>{project.donations ?? '--'}</h3>
            <h5>спонсоров</h5>
          </div>
          <div className="project-stat">
            <h3>{getDays(project.expiredAt) || '--'}</h3>
            <h5>дней до конца</h5>
          </div>
        </div>
        <div className="project-section">
          <div className="project-about-tabs">
            <div className="project-about-tabs-wrap">
              {[1, 2, 3, 4, 5].map((x, i) => (
                <Button
                  key={i}
                  label="история"
                  onClick={() => setActiveTab(i)}
                  type={activeTab === i ? 'main' : 'text'}
                />
              ))}
            </div>
          </div>
          <div className="project-about-content"></div>
        </div>
        <div className="project-section project-comments">
          <div className="project-comments-title">
            <h2>Мнения</h2>
            <h4>{reviews.length}</h4>
          </div>
          <Button onClick={() => openModal('addReview', { project, $addReview })} fullWidth label="Оставить комментарий" icon="fi-rr-comment" type="secondary" />
          <div className="project-comments-wrap">
            {reviews.map((review, i) => (
              <Review key={i} review={review} project={project} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

function getDays(endDate) {
  if (!endDate) return null;
  endDate = new Date(endDate);

  // Convert both dates to milliseconds since Epoch
  var startMillis = Date.now();
  var endMillis = endDate.getTime();

  // Calculate the difference in milliseconds
  var millisDifference = endMillis - startMillis;

  // Convert the difference to days
  var daysDifference = millisDifference / (1000 * 60 * 60 * 24);

  // Round to the nearest whole number
  daysDifference = Math.round(daysDifference);

  return daysDifference;
}

export default Project;
