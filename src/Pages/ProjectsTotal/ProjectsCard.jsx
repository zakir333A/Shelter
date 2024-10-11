import React, { useState, useEffect, useMemo } from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function ProjectsCard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/db.json')
      .then(response => response.json())
      .then(data => {
        if (data.ProjectsCard) {
          setProjects(data.ProjectsCard);
        } else {
          console.warn('No projects found.');
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Data Error', error);
        setError(error);
        setLoading(false);
      });
  }, []);

  const renderedProjects = useMemo(() => (
    projects.map(project => (
      <motion.div
        key={project.id}
        className="pro-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link to={`/projects/${project.id}`}> 
          <img
            src={project.mainImageUrl}
            alt={`Project ${project.id}`}
            className="pro-image"
          />
          <div className="pro-link">
            {project.linkText}
            <IoIosArrowForward />
          </div>
        </Link>
      </motion.div>
    ))
  ), [projects]);

  if (loading) {
    return <p>Waiting...</p>;
  }

  if (error) {
    return <p>Error  projects: {error.message}</p>;
  }

  return (
    <section className="pro-wrapper container">
      <div className="pro-list">
        {renderedProjects}
      </div>
    </section>
  );
}

export default ProjectsCard;
