import React, { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

const ContactBanner = () => {
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchImage = useCallback(async () => {
    try {
      const response = await fetch('/db.json');
      if (!response.ok) {
        throw new Error('not ok');
      }
      const data = await response.json();
      setImage(data.services[0]?.image || '');
    } catch (error) {
      setError(error.message);
      console.error('Error Data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchImage();
  }, [fetchImage]);

  if (loading) {
    return <div>Waiting..</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section className="serBanner">
      <div className="banContain">
        <motion.img
          src={image}
          alt="Service Banner"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
        />
        <motion.h2
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Contact Us
        </motion.h2>
      </div>
    </section>
  );
};

export default React.memo(ContactBanner);
