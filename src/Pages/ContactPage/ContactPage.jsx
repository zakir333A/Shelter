import React, { Suspense, useEffect, useState, lazy } from 'react';
import { motion } from 'framer-motion';
import ServicesBanner from '../ServicesPage/ServicesBanner/ServicesBanner';
import Map from '../../components/Map/Map';
import ContactTeam from './ContactTeam';
import { useNavigate } from 'react-router-dom';

const Navbar = lazy(() => import('../../components/Navbar/Navbar'));

const ContactPage = () => {
  const [customImage, setCustomImage] = useState('');  
  const [customName, setCustomName] = useState(''); 
  const navigate = useNavigate(); 
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const response = await fetch('http://192.168.88.225:8000/api/static/page/contact'); 
        if (!response.ok) {
          throw new Error('Failed to fetch contact data');
        }
        const data = await response.json();
        setCustomImage(data.hero_image);
        setCustomName(data.hero_title);
      } catch (error) {
        console.error('Error fetching contact data:', error);
      }
    };

    fetchContactData();

    const handleResize = () => {
      setIsNavbarVisible(window.innerWidth > 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleLogoClick = () => {
    // navigate('/'); 
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <>
        <div onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
          <motion.div initial="hidden" animate="visible" variants={sectionVariants} transition={{ duration: 0.5 }}>
       
          </motion.div>
        </div>
        <motion.div variants={sectionVariants} initial="hidden" animate="visible" transition={{ duration: 0.5, delay: 0.2 }}>
          <ServicesBanner image={customImage} name={customName} />
        </motion.div>
        <motion.div variants={sectionVariants} initial="hidden" animate="visible" transition={{ duration: 0.5, delay: 0.4 }}>
          <Map />
        </motion.div>
        <motion.div variants={sectionVariants} initial="hidden" animate="visible" transition={{ duration: 0.5, delay: 0.6 }}>
          <ContactTeam />
        </motion.div>
  
      </>
    </Suspense>
  );
};

export default React.memo(ContactPage);
