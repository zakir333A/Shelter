import '../Header/Header.css';
import React, { useEffect, useState, Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { FaMoon, FaSun } from 'react-icons/fa';
import { MainContext, useContext } from "../Context";

const SearchComponent = lazy(() => import('./SearchComponent'));
const LanguageDropdown = lazy(() => import('../Language/LanguageDropdown'));
const Navbar = lazy(() => import('../Navbar/Navbar'));

function Header() {
  const { URLAPI, lang } = useContext(MainContext); 
  const [logo, setLogo] = useState(null);
  const [loadingLogo, setLoadingLogo] = useState(true); 
  const [error, setError] = useState(null); 
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const response = await fetch(`${URLAPI}/api/settings?lang=${lang}`); 
        if (!response.ok) {
          throw new Error('Network response was not ok'); 
        }
        const data = await response.json();
        const logoData = data.data.find(item => item.key === "logo");
        if (logoData) {
          setLogo({ imageUrl: logoData.value, altText: "Logo" });
        } else {
          setError('Logo not found.'); 
        }
      } catch (error) {
        console.error('Error fetching logo data:', error);
        setError('Could not load logo.'); 
      } finally {
        setLoadingLogo(false); 
      }
    };

    fetchLogo();
  }, [URLAPI, lang]); 

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    const debounceResize = () => {
      clearTimeout(window.resizeTimeout);
      window.resizeTimeout = setTimeout(handleResize, 200); 
    };

    window.addEventListener('resize', debounceResize);

    return () => {
      window.removeEventListener('resize', debounceResize);
      clearTimeout(window.resizeTimeout); 
    };
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
    document.body.classList.toggle('dark-mode', !isDarkMode);
  };

  const logoVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <section className={`h-wrapper container ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="logo_area">
        {loadingLogo ? (
          <p>Loading logo...</p> 
        ) : error ? (
          <p>{error}</p> 
        ) : (
          logo && (
            <motion.a
              href="/"
              initial="hidden"
              animate="visible"
              variants={logoVariants}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <img src={logo.imageUrl} alt={logo.altText} />
            </motion.a>
          )
        )}
      </div>
      <div className="search_wrapper d-flex">
        <button onClick={toggleTheme} className="theme-toggle">
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </button>
        
        <Suspense fallback={<div>Loading search...</div>}>
          {!isMobile && <SearchComponent />}
        </Suspense>

        <Suspense fallback={<div>Loading language options...</div>}>
          {!isMobile && <LanguageDropdown />}
        </Suspense>
      </div>
      
      {isMobile && (
        <Suspense fallback={<div>Loading navigation...</div>}>
          <Navbar />
        </Suspense>
      )}
    </section>
  );
}

export default Header;
