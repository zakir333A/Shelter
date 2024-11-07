import React, { Suspense, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import Pagination from '../../components/Pagination/Pagination';
import ServicesBanner from './ServicesBanner/ServicesBanner';
import ServicesCard from './ServicesCard/ServicesCard';
import FooterSec from '../FooterSec/FooterSec';
import FootEnd from '../FooterSec/FootEnd';
import { MainContext, useContext } from "../../components/Context";

const Services = () => {
  const [service, setService] = useState(null);
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isNavbarVisible, setIsNavbarVisible] = useState(window.innerWidth >= 768);
  const [backgroundImage, setBackgroundImage] = useState('');
  const [title, setTitle] = useState('');
  const { URLAPI, lang } = useContext(MainContext); 

  const projectsPerPage = 4;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${URLAPI}/api/services?page=${currentPage}&lang=${lang}`); 
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data && data.data) {
          console.log('Fetched projects:', data.data);
          setProjects(data.data);
          setTotalPages(Math.ceil(data.total / projectsPerPage));
        } else {
          console.error('No projects found');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch projects'); 
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [currentPage, URLAPI, lang]); 

  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const response = await fetch(`${URLAPI}/api/static/page/services?lang=${lang}`); 
        if (!response.ok) {
          throw new Error('Failed to fetch service data');
        }
        const data = await response.json();
        if (data) {
          setBackgroundImage(data.hero_image);
          setTitle(data.hero_title);
        }
      } catch (error) {
        console.error('Error fetching service data:', error);
        setError('Failed to fetch service data'); 
      }
    };

    fetchServiceData();
  }, [URLAPI, lang]); 

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsNavbarVisible(window.innerWidth >= 768);
    };

    const debounceResize = () => {
      clearTimeout(window.resizeTimeout);
      window.resizeTimeout = setTimeout(handleResize, 200); 
    };

    window.addEventListener('resize', debounceResize);

    return () => {
      window.removeEventListener('resize', debounceResize);
      clearTimeout(window.resizeTimeout); 
    };
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <motion.div initial="hidden" animate="visible" exit={{ opacity: 0 }}>

        <ServicesBanner image={backgroundImage} name={title} />
        
        {loading ? (
          <div>Loading projects...</div> 
        ) : error ? (
          <div>{error}</div> 
        ) : (
          <>
            <ServicesCard projects={projects} />
            <Pagination currentPage={currentPage} setCurrentPage={handlePageChange} totalPages={totalPages} />
          </>
        )}

    
      </motion.div>
    </Suspense>
  );
};

export default Services;
