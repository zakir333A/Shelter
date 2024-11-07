import React, { useEffect, useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import ServicesBanner from '../ServicesPage/ServicesBanner/ServicesBanner';
import AboutContent from './AboutContent';
import { useNavigate } from 'react-router-dom';
import { MainContext } from '../../components/Context';

const AboutPage = () => {
  const { URLAPI, lang } = React.useContext(MainContext); 
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${URLAPI}/api/static/page/about?lang=${lang}`)
      .then(response => response.json())
      .then(data => {
        setAboutData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching about data:', error);
        setLoading(false);
      });
  }, [URLAPI, lang]);

  const handleLogoClick = () => {
    // navigate('/'); 
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <section className='AboutPage'>
        <div onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
          <motion.div initial="hidden" animate="visible" variants={sectionVariants} transition={{ duration: 0.5 }}>
          
          </motion.div>
        </div>
        <motion.div variants={sectionVariants} initial="hidden" animate="visible" transition={{ duration: 0.5, delay: 0.2 }}>
          {aboutData && (
            <ServicesBanner image={aboutData.hero_image} name={aboutData.title || 'Haqqımızda'} />
          )}
        </motion.div>
        <motion.div variants={sectionVariants} initial="hidden" animate="visible" transition={{ duration: 0.5, delay: 0.4 }}>
          <AboutContent />
        </motion.div>
        <motion.div variants={sectionVariants} initial="hidden" animate="visible" transition={{ duration: 0.5, delay: 0.6 }}>
     
        </motion.div>
        <motion.div variants={sectionVariants} initial="hidden" animate="visible" transition={{ duration: 0.5, delay: 0.8 }}>
    
        </motion.div>
      </section>
    </Suspense>
  );
};

export default React.memo(AboutPage);
