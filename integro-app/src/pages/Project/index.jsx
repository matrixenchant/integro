import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../components/ui';
import { useApp } from '../../hooks/useApp';
import './index.scss';

import { animated, useSpring } from '@react-spring/web';
import toast from 'react-hot-toast';
import Review from '../../components/Review';
import useGetApi from '../../hooks/useGetApi';
import { useModal } from '../../hooks/useModal';
import { $class, formatNumber } from '../../utils';
import { useApi } from '../../hooks/useApi';

const Project = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { openModal } = useModal();
  const { getProjectById, token } = useApp();
  const [loading12, api] = useApi();

  const [isVideoActive, setIsVideoActive] = useState(false);
  const [activeTab, setActiveTab] = useState(null);
  const videoRef = useRef(null);

  const project = getProjectById(id);
  const content = project.content || {};
  const [loading, reviews, mutateReviews] = useGetApi(
    project?._id ? `projects/${project._id}/reviews` : null,
    []
  );

  useEffect(() => {
    setActiveTab(Object.keys(project.content)[0])
  }, [project])

  const $addReview = (newReview) => {
    mutateReviews([...reviews, newReview]);
  };

  const onAddReview = () => {
    if (token === null) {
      return toast('Войдите в аккаунт');
    }

    openModal('addReview', { project, $addReview });
  };

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
  };

  useEffect(() => {
    const onScroll = () => {};

    document.body.addEventListener('scroll', onScroll);
    return () => document.body.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="project page">
      {/* <Button onClick={() => {
        api(`projects/${project._id}`, {
          method: 'PUT',
          body: {
            content: {"Story":[{"img":"https://ksr-ugc.imgix.net/assets/043/038/892/d6bf0b39e27e2fe27359981d259824e0_original.jpg?ixlib=rb-4.1.0&w=680&fit=max&v=1699863695&gif-q=50&q=92&s=9cd66e16c59efef5aedba5cadad0ab5b"},{"img":"https://ksr-ugc.imgix.net/assets/043/055/598/a92149832d78512fe5b393514774b166_original.png?ixlib=rb-4.1.0&w=680&fit=max&v=1699962013&gif-q=50&lossless=true&s=7301d3559e579f5c5d7a6a52d1b6b612"},{"img":"https://ksr-ugc.imgix.net/assets/043/055/598/a92149832d78512fe5b393514774b166_original.png?ixlib=rb-4.1.0&w=680&fit=max&v=1699962013&gif-q=50&lossless=true&s=7301d3559e579f5c5d7a6a52d1b6b612"}],"Risks and challenges":[{"text":"Graphene-X debuted at Kickstarter in November 2019, just as the pandemic began. Yet, here we are, launching our 8th campaign. We've made a tradition of timely deliveries, maintaining impeccable quality each time. Our dedication to meeting deadlines, even when it strains our finances, is evident in our 4.95 out of 5 rating."},{"text":"Production: We work exclusively with top-tier manufacturers and suppliers. While this ensures quality, there's always a slight chance of delays from their side. Yet, our faith is unwavering since these partners were active even during the pandemic's peak."},{"text":"Shipping: Our collaboration with leading fulfillment companies aims to stave off shipping delays. Nonetheless, unpredictable factors, like pandemic-induced flight restrictions, can still play a role."}],"Environmental commitments":[{"text":"Visit our Environmental Resources Center to learn how Kickstarter encourages sustainable practices."}]},
            // content: {"Story":[{"img":"https://ksr-ugc.imgix.net/assets/042/826/569/46953a10ded0f0b85f4dfcc5e91d936a_original.png?ixlib=rb-4.1.0&w=680&fit=max&v=1698243262&gif-q=50&lossless=true&s=1e7f1c20149dadaad0b994c8620cc670"},{"img":"https://ksr-ugc.imgix.net/assets/043/056/589/03b87be4435d773ae5703239551d285e_original.png?ixlib=rb-4.1.0&w=680&fit=max&v=1699968195&gif-q=50&lossless=true&s=daa61e365c0dd35f7af71c13509eebc9"}],"The Problem & Solution":[{"img":"https://ksr-ugc.imgix.net/assets/042/704/014/6ad9eb3b852d36e1a74955664a75f19f_original.png?ixlib=rb-4.1.0&w=680&fit=max&v=1697447260&gif-q=50&lossless=true&s=2e122e57ddfb3e279dbf16d9ee8971b1"},{"img":"https://ksr-ugc.imgix.net/assets/042/619/220/107d22db3f47baadb01af58eec7d321c_original.png?ixlib=rb-4.1.0&w=680&fit=max&v=1696880937&gif-q=50&lossless=true&s=2815b9b25ef1d91f62882be004e5c218"}],"Add-ons":[{"img":"https://ksr-ugc.imgix.net/assets/042/837/563/16f12a695165a9a357b83296447ca0e2_original.png?ixlib=rb-4.1.0&w=680&fit=max&v=1698309881&gif-q=50&lossless=true&s=f02020754a258579c2f3dabc1ac2920b"},{"img":"https://ksr-ugc.imgix.net/assets/042/837/559/4c17a287852a76f6c66a31e2b560f919_original.png?ixlib=rb-4.1.0&w=680&fit=max&v=1698309863&gif-q=50&lossless=true&s=d8bb0665ba7365ca3fa85c37c5e24ac3"}],"The Team":[{"img":"https://ksr-ugc.imgix.net/assets/042/793/409/a0f0d6b517c629e24d35634a5ac500b1_original.png?ixlib=rb-4.1.0&w=680&fit=max&v=1698053607&gif-q=50&lossless=true&s=a8a787192060d39c653d7771a026e7e7"}],"Risks":[{"text":"Venturing into a crowdfunding campaign inevitably comes with its fair share of risks and challenges, from potential manufacturing hiccups to unforeseen shipping delays. However, the Lumicard project is backed by our extensive experience, marking our 10th crowdfunding campaign and 9th on Kickstarter."},{"text":"Over the years, we’ve navigated through various learning curves and have fine-tuned our approach in addressing and mitigating these challenges. Our track record speaks to our commitment to delivering on our promises and ensuring that our backers are satisfied with the end product. While we anticipate a smooth journey, we are prepared and well-equipped to tackle any hurdles that come our way, ensuring transparency and regular updates every step of the way."}]}
          }
        })
      }} /> */}
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
            <h5>донатов</h5>
          </div>
          <div className="project-stat">
            <h3>{getDays(project.expiredAt) || '--'}</h3>
            <h5>дней до конца</h5>
          </div>
        </div>
        <div className="project-section project-about">
          <div className="project-about-tabs">
            <div className="project-about-tabs-wrap">
              {Object.keys(content).map((x, i) => (
                <Button
                  key={i}
                  label={x}
                  onClick={() => setActiveTab(x)}
                  type={activeTab === x ? 'main' : 'text'}
                />
              ))}
            </div>
          </div>
          <div className="project-about-content">
            {content[activeTab]?.map((block, i) => (
              <div key={`${i}-${activeTab}`} className="project-about-content__item">
                {block.img && <img src={block.img} />}
                {block.text && <p>{block.text}</p>}
              </div>
            ))}
          </div>
        </div>
        <div className="project-section project-comments">
          <div className="project-comments-title">
            <h2>Мнения</h2>
            <h4>{reviews.length}</h4>
          </div>
          <Button
            onClick={onAddReview}
            fullWidth
            label="Оставить комментарий"
            icon="fi-rr-comment"
            type="secondary"
          />
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


/*

{"Story":[{"img":"https://ksr-ugc.imgix.net/assets/042/826/569/46953a10ded0f0b85f4dfcc5e91d936a_original.png?ixlib=rb-4.1.0&w=680&fit=max&v=1698243262&gif-q=50&lossless=true&s=1e7f1c20149dadaad0b994c8620cc670"},{"img":"https://ksr-ugc.imgix.net/assets/043/056/589/03b87be4435d773ae5703239551d285e_original.png?ixlib=rb-4.1.0&w=680&fit=max&v=1699968195&gif-q=50&lossless=true&s=daa61e365c0dd35f7af71c13509eebc9"}],"The Problem & Solution":[{"img":"https://ksr-ugc.imgix.net/assets/042/704/014/6ad9eb3b852d36e1a74955664a75f19f_original.png?ixlib=rb-4.1.0&w=680&fit=max&v=1697447260&gif-q=50&lossless=true&s=2e122e57ddfb3e279dbf16d9ee8971b1"},{"img":"https://ksr-ugc.imgix.net/assets/042/619/220/107d22db3f47baadb01af58eec7d321c_original.png?ixlib=rb-4.1.0&w=680&fit=max&v=1696880937&gif-q=50&lossless=true&s=2815b9b25ef1d91f62882be004e5c218"}],"Add-ons":[{"img":"https://ksr-ugc.imgix.net/assets/042/837/563/16f12a695165a9a357b83296447ca0e2_original.png?ixlib=rb-4.1.0&w=680&fit=max&v=1698309881&gif-q=50&lossless=true&s=f02020754a258579c2f3dabc1ac2920b"},{"img":"https://ksr-ugc.imgix.net/assets/042/837/559/4c17a287852a76f6c66a31e2b560f919_original.png?ixlib=rb-4.1.0&w=680&fit=max&v=1698309863&gif-q=50&lossless=true&s=d8bb0665ba7365ca3fa85c37c5e24ac3"}],"The Team":[{"img":"https://ksr-ugc.imgix.net/assets/042/793/409/a0f0d6b517c629e24d35634a5ac500b1_original.png?ixlib=rb-4.1.0&w=680&fit=max&v=1698053607&gif-q=50&lossless=true&s=a8a787192060d39c653d7771a026e7e7"}],"Risks":[{"text":"Venturing into a crowdfunding campaign inevitably comes with its fair share of risks and challenges, from potential manufacturing hiccups to unforeseen shipping delays. However, the Lumicard project is backed by our extensive experience, marking our 10th crowdfunding campaign and 9th on Kickstarter."},{"text":"Over the years, we’ve navigated through various learning curves and have fine-tuned our approach in addressing and mitigating these challenges. Our track record speaks to our commitment to delivering on our promises and ensuring that our backers are satisfied with the end product. While we anticipate a smooth journey, we are prepared and well-equipped to tackle any hurdles that come our way, ensuring transparency and regular updates every step of the way."}]}

{"Story":[{"img":"https://ksr-ugc.imgix.net/assets/043/038/892/d6bf0b39e27e2fe27359981d259824e0_original.jpg?ixlib=rb-4.1.0&w=680&fit=max&v=1699863695&gif-q=50&q=92&s=9cd66e16c59efef5aedba5cadad0ab5b"},{"img":"https://ksr-ugc.imgix.net/assets/043/055/598/a92149832d78512fe5b393514774b166_original.png?ixlib=rb-4.1.0&w=680&fit=max&v=1699962013&gif-q=50&lossless=true&s=7301d3559e579f5c5d7a6a52d1b6b612"},{"img":"https://ksr-ugc.imgix.net/assets/043/055/598/a92149832d78512fe5b393514774b166_original.png?ixlib=rb-4.1.0&w=680&fit=max&v=1699962013&gif-q=50&lossless=true&s=7301d3559e579f5c5d7a6a52d1b6b612"}],"Risks and challenges":[{"text":"Graphene-X debuted at Kickstarter in November 2019, just as the pandemic began. Yet, here we are, launching our 8th campaign. We've made a tradition of timely deliveries, maintaining impeccable quality each time. Our dedication to meeting deadlines, even when it strains our finances, is evident in our 4.95 out of 5 rating."},{"text":"Production: We work exclusively with top-tier manufacturers and suppliers. While this ensures quality, there's always a slight chance of delays from their side. Yet, our faith is unwavering since these partners were active even during the pandemic's peak."},{"text":"Shipping: Our collaboration with leading fulfillment companies aims to stave off shipping delays. Nonetheless, unpredictable factors, like pandemic-induced flight restrictions, can still play a role."}],"Environmental commitments":[{"text":"Visit our Environmental Resources Center to learn how Kickstarter encourages sustainable practices."}]}
*/