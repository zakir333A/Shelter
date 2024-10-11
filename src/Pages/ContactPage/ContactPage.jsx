import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import ServicesBanner from '../ServicesPage/ServicesBanner/ServicesBanner';
import Map from '../../components/Map/Map';
import ContactTeam from './ContactTeam';
import FooterSec from '../FooterSec/FooterSec';
import FootEnd from '../FooterSec/FootEnd';
import { useNavigate } from 'react-router-dom'; 

const ContactPage = () => {
  const customImage = '../xid.jpg'; 
  const customName = 'Əlaqə'; 
  const navigate = useNavigate(); 

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
            <Header />
            <Navbar />
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
        <motion.div variants={sectionVariants} initial="hidden" animate="visible" transition={{ duration: 0.5, delay: 0.8 }}>
          <FooterSec />
        </motion.div>
        <motion.div variants={sectionVariants} initial="hidden" animate="visible" transition={{ duration: 0.5, delay: 1 }}>
          <FootEnd />
        </motion.div>
      </>
    </Suspense>
  );
};

export default React.memo(ContactPage);
