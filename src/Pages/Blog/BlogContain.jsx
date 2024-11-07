import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import '../Blog/BlogContain.css';
import { MainContext, useContext } from "../../components/Context";

function BlogContain() {
  const { URLAPI, lang } = useContext(MainContext); 
  const [blogData, setBlogData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
   
        const response = await fetch(`${URLAPI}/api/blogs?lang=${lang}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setBlogData(data.data); 
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchData();
  }, [URLAPI]); 

  const handleCardClick = (id) => {
    navigate(`/blog/${id}`); 
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  };

  if (loading) {
    return <div className="loading">Loading...</div>; 
  }

  return (
    <div className='blogContain container'>
      {blogData.map((item, index) => (
        <motion.div
          key={item.id}
          className={`contain-${(index % 3) + 1}`} 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: index * 0.1 }} 
          onClick={() => handleCardClick(item.id)} 
          style={{ cursor: 'pointer' }} 
        >
          <div className="contain-1-left">
            <h2>{item.title}</h2>
            <h3>{item.subtitle}</h3>
            <p>{truncateText(item.content, 300)}</p> 
            <button className="read-more-button">
              Read More 
            </button>
          </div>
          <div className="contain-1-right">
            <img src={item.image} alt={item.title} /> 
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default BlogContain;
