import React from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import { Link } from 'react-router-dom';
import './ServicesCard.css';

const ServicesCard = ({ projects }) => {
  if (!Array.isArray(projects) || projects.length === 0) {
    return <p className="loading">Gözləyin...</p>; 
  }

  return (
    <section className="pro-wrapper container">
      <div className="pro-list">
        {projects.map((project) => (
          <Link to={`/services/${project.id}`} className="pro-card" key={project.id}>
            <img
              src={project.src}
              alt={project.title}
              className="pro-image"
              onError={(e) => {
                e.target.onerror = null; 
                e.target.src = '/path/to/fallback-image.jpg'; 
              }}
            />
            <h2>{project.title}</h2>
            <span className="pro-link">
              {project['text-title']}
              <IoIosArrowForward />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default ServicesCard;
