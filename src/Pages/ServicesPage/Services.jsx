import React, { Suspense, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';

const HeaderSec = React.lazy(() => import('../Header/HeaderSec'));
const ServicesBanner = React.lazy(() => import('./ServicesBanner/ServicesBanner'));
const ServicesCard = React.lazy(() => import('./ServicesCard/ServicesCard'));
const FooterSec = React.lazy(() => import('../FooterSec/FooterSec'));
const FootEnd = React.lazy(() => import('../FooterSec/FootEnd'));

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8, rotate: -5 },
  visible: { opacity: 1, scale: 1, rotate: 0 },
};

const footerVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

const Services = () => {
  const [service, setService] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/db.json')
      .then((response) => response.json())
      .then((data) => {
        setService(data.services[0]);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const customImage = '../xid.jpg';
  const customName = 'Xidmetler';

  const handleLogoClick = () => {
    // navigate('/');
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <motion.div initial="hidden" animate="visible" exit={{ opacity: 0 }}>
        <motion.div variants={sectionVariants} transition={{ duration: 0.5 }}>
          <Header />
          <Navbar />
        </motion.div>
        <motion.div variants={sectionVariants} transition={{ duration: 0.5, delay: 0.2 }}>
          {service && <ServicesBanner image={customImage} name={customName} />}
        </motion.div>
        <motion.div 
          variants={cardVariants} 
          initial="hidden" 
          animate="visible" 
          transition={{ duration: 0.5 }}
        >
          <ServicesCard />
        </motion.div>
        <motion.div 
          variants={footerVariants} 
          initial="hidden" 
          animate="visible" 
          transition={{ duration: 0.5 }}
        >
          <FooterSec />
        </motion.div>
        <motion.div 
          variants={footerVariants} 
          initial="hidden" 
          animate="visible" 
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <FootEnd />
        </motion.div>
      </motion.div>
    </Suspense>
  );
};

export default Services;
