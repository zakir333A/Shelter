import React, { useEffect, useState, Suspense } from 'react';
import { motion } from 'framer-motion'; 
import CategoryCard from './CategoryCard';
import CategoryHead from './CategoryHead';
import ServicesBanner from '../../Pages/ServicesPage/ServicesBanner/ServicesBanner';
import { MainContext, useContext } from "../Context";

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8, rotate: -5 }, 
  visible: { opacity: 1, scale: 1, rotate: 0 }, 
};

const Category = () => {
  const { URLAPI, lang } = useContext(MainContext);
  const [categoryData, setCategoryData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${URLAPI}/api/static/page/products?lang=${lang}`)
      .then(response => response.json())
      .then(data => {
        setCategoryData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching category data:', error);
        setLoading(false);
      });
  }, [URLAPI, lang]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <motion.section
        className='category'
        initial="hidden"
        animate="visible"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div variants={sectionVariants} transition={{ duration: 0.5 }}>

        </motion.div>
        <motion.div variants={sectionVariants} transition={{ duration: 0.5, delay: 0.2 }}>
          {categoryData && (
            <ServicesBanner 
              image={categoryData.hero_image} 
              name={categoryData.title || 'Mehsullar'} 
            />
          )}
        </motion.div>
        <motion.div 
          variants={cardVariants} 
          initial="hidden" 
          animate="visible" 
          transition={{ duration: 0.5 }}
        >
          <CategoryHead />
        </motion.div>
        <motion.div 
          variants={cardVariants} 
          initial="hidden" 
          animate="visible" 
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <CategoryCard />
        </motion.div>
        <motion.div 
          variants={sectionVariants} 
          initial="hidden" 
          animate="visible" 
          transition={{ duration: 0.5, delay: 0.3 }}
        >
     
        </motion.div>
      </motion.section>
    </Suspense>
  );
};

export default Category;
