import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Error404() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {

    window.addEventListener('resize', handleResize);


    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>  
      <div style={styles.container}>
        <h1 style={styles.errorCode}>Error 404</h1>
        <h2 style={styles.errorMessage}>Oops! Səhifə tapılmadı</h2>
        <p style={styles.errorText}>Üzr istəyirik, axtardığınız səhifə mövcud deyil.</p>
        <Link to="/" style={styles.link}>
          Ana səhifəyə qayıt
        </Link>
      </div>
    </>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    padding: 'clamp(20px, 5vw, 50px)',
  },
  errorCode: {
    fontSize: 'clamp(4rem, 10vw, 8rem)',
    color: 'red',
    margin: '0',
  },
  errorMessage: {
    fontSize: 'clamp(1.5rem, 5vw, 2rem)',
    color: 'orange',
  },
  errorText: {
    color: '#555',
    marginBottom: '20px',
  },
  link: {
    color: 'red',
    textDecoration: 'underline',
    fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
    transition: 'color 0.3s ease',
  },
};

export default Error404;
