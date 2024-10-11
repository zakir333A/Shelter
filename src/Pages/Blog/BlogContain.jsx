import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../Blog/BlogContain.css';

function BlogContain() {
  const [blogData, setBlogData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/db.json');
        const data = await response.json();
        setBlogData(data.blogContain);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='blogContain container'>
      {blogData.map((item, index) => (
        <motion.div
          key={item.id}
          className={`contain-${index + 1}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: index * 0.1 }} 
        >
          <div className="contain-1-left">
            <h2>{item.heading}</h2>
            <p>{item.paragraph}</p>
            {item.subHeading && <h3>{item.subHeading}</h3>}
            {item.buttonText && <button>{item.buttonText}</button>}
          </div>
          <div className="contain-1-right">
            <img src={item.imageUrl} alt="Facility" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default BlogContain;
