import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import FooterSec from '../FooterSec/FooterSec';
import FootEnd from '../FooterSec/FootEnd';
import '../../Pages/ProjectsTotal/ProjectDetails.css';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import ServicesBanner from '../ServicesPage/ServicesBanner/ServicesBanner';
import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';

const ProjectsDetails = React.memo(() => {
  const { id } = useParams();
  const [projects, setProjects] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/db.json');
        if (!response.ok) {
          throw new Error('not ok');
        }
        const { projectsDetails } = await response.json();
        setProjects(projectsDetails);
        const index = projectsDetails.findIndex(p => p.id === parseInt(id));
        setCurrentIndex(index !== -1 ? index : 0);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [id]);

  const handleIndexChange = useCallback((delta) => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex === null || projects.length === 0) return prevIndex;
      return (prevIndex + delta + projects.length) % projects.length;
    });
  }, [projects.length]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading project: {error.message}</p>;
  if (currentIndex === null || projects.length === 0) return <p>Project not found.</p>;

  const { imageUrl, dateTitle, date, clientTitle, client, locationTitle, location, categoryTitle, category, detailTitle, description } = projects[currentIndex];
  const customImage = '../xid.jpg'; 
  const customName = 'Sığınacaqlarımız'; 
  return (
    <>
    
    <Header /> 
    <Navbar/>
      <ServicesBanner image={customImage} name={customName} />
    
      <section className="projectDetails container">
        <div className="details-content">
          <div className="content-head">
            <div className="head-image">
              <img src={imageUrl} alt="Project Image" />
            </div>
            <div className="head-history">
              <h3>{dateTitle}</h3>
              <p>{date}</p>
              <h3>{clientTitle}</h3>
              <p>{client}</p>
              <h3>{locationTitle}</h3>
              <p>{location}</p>
              <h3>{categoryTitle}</h3>
              <p>{category}</p>
            </div>
          </div>
          <div className="content-bottom">
            <h2>{detailTitle}</h2>
            <p>{description}</p>
          </div>
          <div className="arrow-detail">
            <a href="#" onClick={(e) => { e.preventDefault(); handleIndexChange(-1); }}>
              <FaAngleLeft /> Previous
            </a>
            <a href="#" onClick={(e) => { e.preventDefault(); handleIndexChange(1); }}>
              Next <FaAngleRight />
            </a>
          </div>
        </div>
      </section>
      <FooterSec />
      <FootEnd />
    </>
  );
});

export default ProjectsDetails;
