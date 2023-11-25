import React from 'react';
import Button from '../ui/Button';
import './index.scss';
import { useNavigate } from 'react-router-dom';

const ProjectCard = ({ project }) => {
  const { _id, name, description, author, poster, aim, current } = project;
  const progress = (current / aim) * 100;
  const navigate = useNavigate()

  return (
    <div className="project-card" style={{ backgroundImage: `url(${poster})` }}>
      <div className="project-card-title">{name}</div>
      <div className="project-card-wrap">
        <div className="project-card-author">{author}</div>
        <div className="project-card-description">{description}</div>
        <div className="project-card-footer">
          <div className="project-card-progress">{progress.toFixed(1)}% собрано</div>
          <Button onClick={() => navigate(`/projects/${_id}`)} label="Читать" />
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
