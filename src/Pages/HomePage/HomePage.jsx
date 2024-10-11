import React from 'react';
import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import Hero from '../../components/Hero/Hero';
import About from '../../components/About/About';
import Projects from '../../components/Projects/Projects';
import PartnerBanner from '../../components/Partner/PartnerBanner';
import Partner from '../../components/Partner/Partner';
import Map from '../../components/Map/Map';
import Footer from '../../components/Footer/Footer';
import FootEnd from '../FooterSec/FootEnd';

const HomePage = () => {
  return (
    <>
      <Header />
      <Navbar />
      <Hero />
      <About />
      <Projects proHead="Sığınacaqlarımız" /> 
      <Projects proHead="Xidmetler" /> 
      <PartnerBanner />
      <Partner />
      <Map />
      <Footer />
      <FootEnd />
    </>
  );
};

export default React.memo(HomePage);
