import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer'; 
import './Hero.css';

function Hero() {
    const [heroData, setHeroData] = useState(null);
    
    const { ref, inView } = useInView({
        threshold: 0.2, 
        triggerOnce: false,
    });

    useEffect(() => {
        const fetchHeroData = async () => {
            try {
                const response = await fetch('/db.json');
                const data = await response.json();
                setHeroData(data.navbar.hero);
            } catch (error) {
                console.error('Error Data:', error);
            }
        };

        fetchHeroData();
    }, []);

    if (!heroData) {
        return <div className="loading-container">Waiting...</div>;
    }

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { ease: "easeInOut", duration: 0.8 } }
    };

    const backgroundFade = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { ease: "easeInOut", duration: 1.2 } }
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
                aria-label="Hero section background image"
            >
                <motion.div 
                    className="hero-content container"
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"} 
                >
                    <motion.h1 variants={fadeInUp}>
                        {heroData.heading}
                    </motion.h1>
                    <motion.p className="hero-text" variants={fadeInUp} transition={{ delay: 0.2 }}>
                        {heroData.paragraph}
                    </motion.p>
                    <motion.a href={heroData.buttonUrl} className="hero-button button" variants={fadeInUp} transition={{ delay: 0.4 }}>
                        {heroData.buttonText}
                    </motion.a>
                </motion.div>
            </motion.div>
        </motion.section>
    );
}

export default Hero;
