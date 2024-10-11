import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import ProjectsCard from './ProjectsCard';
import FooterSec from '../FooterSec/FooterSec';
import FootEnd from '../FooterSec/FootEnd';
import ServicesBanner from '../ServicesPage/ServicesBanner/ServicesBanner';
import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';

const ProjectsTotal = () => {
  const customImage = '../tunel-1.avif'; 
  const customName = 'Sığınacaqlarımız'; 

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <motion.div initial="hidden" animate="visible" variants={sectionVariants} transition={{ duration: 0.5 }}>
        <Header />
        <Navbar />
      </motion.div>
      <motion.div variants={sectionVariants} initial="hidden" animate="visible" transition={{ duration: 0.5, delay: 0.2 }}>
        <ServicesBanner image={customImage} name={customName} />
      </motion.div>
      <motion.div variants={sectionVariants} initial="hidden" animate="visible" transition={{ duration: 0.5, delay: 0.4 }}>
        <ProjectsCard />
      </motion.div>
      <motion.div variants={sectionVariants} initial="hidden" animate="visible" transition={{ duration: 0.5, delay: 0.6 }}>
        <FooterSec />
      </motion.div>
      <motion.div variants={sectionVariants} initial="hidden" animate="visible" transition={{ duration: 0.5, delay: 0.8 }}>
        <FootEnd />
      </motion.div>
    </Suspense>
  );
}

export default ProjectsTotal;
