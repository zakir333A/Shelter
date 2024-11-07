import React, { Suspense, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ServicesBanner from '../ServicesPage/ServicesBanner/ServicesBanner';
import BlogContain from './BlogContain';
import { MainContext, useContext } from "../../components/Context";

const Blog = () => {
  const { URLAPI, lang } = useContext(MainContext); 
  const [customImage, setCustomImage] = useState('');
  const [customName, setCustomName] = useState('');
  
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  useEffect(() => {
    const fetchBlogData = async () => {
      try {

        const response = await fetch(`${URLAPI}/api/static/page/blogs?lang=${lang}`); 
        if (!response.ok) {
          throw new Error('Failed to fetch blog data');
        }
        const data = await response.json();
        setCustomImage(data.hero_image); 
        setCustomName(data.hero_title); 
      } catch (error) {
        console.error('Error fetching blog data:', error);
      }
    };

    fetchBlogData(); 
  }, [URLAPI]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <section className="blog">
        <motion.div initial="hidden" animate="visible" variants={sectionVariants} transition={{ duration: 0.5 }}>

        </motion.div>
        <motion.div variants={sectionVariants} initial="hidden" animate="visible" transition={{ duration: 0.5, delay: 0.2 }}>
          <ServicesBanner image={customImage} name={customName} />
        </motion.div>
        <motion.div variants={sectionVariants} initial="hidden" animate="visible" transition={{ duration: 0.5, delay: 0.4 }}>
          <BlogContain />
        </motion.div>

      </section>
    </Suspense>
  );
}

export default Blog;
