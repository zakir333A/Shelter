import React, { useEffect, useState, Suspense } from 'react';
import ServicesMain from '../../components/ServicesMain/ServicesMain';
import '../../components/Projects/Projects';

const Hero = React.lazy(() => import('../../components/Hero/Hero'));
const About = React.lazy(() => import('../../components/About/About'));
const Projects = React.lazy(() => import('../../components/Projects/Projects'));
const Map = React.lazy(() => import('../../components/Map/Map'));
const Carousel = React.lazy(() => import('../../components/PartnerCarousel/Carousel'));

const HomePage = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize); 
    };
  }, []); 

  return (
    <>
      <Suspense fallback={<div>Loading Hero...</div>}>
        <Hero />
      </Suspense>

      <Suspense fallback={<div>Loading About...</div>}>
        <About />
      </Suspense>
      
      <Suspense fallback={<div>Loading Projects...</div>}>
        <Projects />
      </Suspense>
      
      <Suspense fallback={<div>Loading Services...</div>}>
        <ServicesMain proHead="Xidmetler" />
      </Suspense>
      
      <Suspense fallback={<div>Loading Carousel...</div>}>
        <Carousel />
      </Suspense>
      
      <Suspense fallback={<div>Loading Map...</div>}>
        <Map />
      </Suspense>
    </>
  );
};

export default React.memo(HomePage);
