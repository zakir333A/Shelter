import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import axios from "axios";
import "./Hero.css";
import { MainContext, useContext } from "../Context";

function Hero() {
  const { URLAPI, lang } = useContext(MainContext);
  const [heroData, setHeroData] = useState(null);
  const [buttonText, setButtonText] = useState("Daha çox öyrən"); 

  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
    
        const response = await axios.get(`${URLAPI}/api/static/page/home?lang=${lang}`);
        if (response.status === 200 && response.data) {
          const data = response.data;

          if (data.hero_image) {
            setHeroData({
              backgroundImageUrl: data.hero_image,
              heading: data.hero_title,
              paragraph: data.hero_description || "Burada default təsvir var.",
              buttonUrl: "#",
            });
          } else {
            throw new Error("Verilənlərin formatı düzgün deyil");
          }
        }

    
        const textResponse = await axios.get(`${URLAPI}/api/static/text/link-see-more?lang=${lang}`);
        if (textResponse.status === 200 && textResponse.data) {
          setButtonText(textResponse.data.text || "Daha çox öyrən"); 
        }
      } catch (error) {
        console.error("Məlumat çəkmə zamanı xəta:", error);
      }
    };

    fetchHeroData();
  }, [URLAPI, lang]);

  if (!heroData) {
    return <div className="loading-container">Gözləyir...</div>;
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { ease: "easeInOut", duration: 0.8 },
    },
  };

  const backgroundFade = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { ease: "easeInOut", duration: 1.2 } },
  };

  const container = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  return (
    <motion.section
      className="hero-wrapper"
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={container}
      ref={ref}
    >
      <motion.div
        className="hero-img"
        style={{
          backgroundImage: `url(${heroData.backgroundImageUrl})`,
        }}
        variants={backgroundFade}
        aria-label="Hero bölməsi arxa plan şəkli"
      >
        <motion.div
          className="hero-content container"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.h1 variants={fadeInUp}>{heroData.heading}</motion.h1>
          <motion.p
            className="hero-text"
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
          >
            {heroData.paragraph}
          </motion.p>
          <motion.a
            href={heroData.buttonUrl}
            className="hero-button button"
            variants={fadeInUp}
            transition={{ delay: 0.4 }}
          >
            {buttonText} 
          </motion.a>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

export default Hero;
