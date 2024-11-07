import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import ProjectsCard from './ProjectsCard';
import ServicesBanner from '../ServicesPage/ServicesBanner/ServicesBanner';
import '../../components/Projects/Projects'
import { useLocation, useParams } from 'react-router';

const ProjectsTotal = () => {
  const customImage = '../../tunel-1.avif'; 
  const customName = 'Sığınacaqlarımız'; 

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const location = useParams()

  

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <motion.div initial="hidden" animate="visible" variants={sectionVariants} transition={{ duration: 0.5 }}>

      </motion.div>
      <motion.div variants={sectionVariants} initial="hidden" animate="visible" transition={{ duration: 0.5, delay: 0.2 }}>
        <ServicesBanner image={customImage} name={customName} />
      </motion.div>
      <motion.div variants={sectionVariants} initial="hidden" animate="visible" transition={{ duration: 0.5, delay: 0.4 }}>
        <ProjectsCard />
      </motion.div>

    </Suspense>
  );
}

export default ProjectsTotal;
