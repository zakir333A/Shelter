import React from 'react';
import PropTypes from 'prop-types'; 
import { motion } from 'framer-motion'; 
import '../ServicesBanner/ServicesBanner.css';

function ServicesBanner({ image, name }) {
  return (
    <section className="serBanner">
      <div className="banContain" style={{ backgroundImage: `url(${image})` }}>
        <motion.h2 
          initial={{ y: -20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ duration: 0.5 }} 
        >
          {name}
        </motion.h2>
      </div>
    </section>
  );
}

ServicesBanner.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default ServicesBanner;
