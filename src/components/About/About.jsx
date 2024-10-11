import React, { useState, useEffect, Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer'; 
import { Link } from 'react-router-dom';  
import './About.css';

const FaChevronRight = lazy(() => import('react-icons/fa').then(module => ({ default: module.FaChevronRight })));

function About() {
    const [aboutData, setAboutData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/db.json');
                const data = await response.json();
                setAboutData(data.navbar.about);
            } catch (error) {
                console.error('Error Data:', error);
                setError('Error Data.');
            }
        };

        fetchData();
    }, []);

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
    };

    const fadeIn = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    const { ref, inView } = useInView({
        threshold: 0.2, 
        triggerOnce: false, 
    });

    if (error) {
        return <p>{error}</p>;
    }

    if (!aboutData) {
        return <p>Waiting...</p>;
    }

    return (
        <section className="about-section container">
            <motion.div
                className="about-container"
                ref={ref}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={fadeIn}
                transition={{ duration: 1 }}
            >
                <motion.div
                    className="about-main"
                    variants={fadeInUp}
                    transition={{ delay: 0.1, duration: 0.8 }}
                >
                    <img src={aboutData.mainImageUrl} alt="Main about" className="about-main-image" />
                </motion.div>

                <motion.div
                    className="about-small-images"
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    transition={{ delay: 0.2, duration: 0.8 }}
                >
                    <div className="about-content">
                        <motion.h2 variants={fadeInUp}>{aboutData.aboutTitle}</motion.h2>
                        <motion.h3 variants={fadeInUp} transition={{ delay: 0.1 }}>
                            {aboutData.heading}
                        </motion.h3>
                        <motion.p variants={fadeInUp} transition={{ delay: 0.2 }}>
                            {aboutData.paragraph}
                        </motion.p>
                    </div>
                    {aboutData.smallImages.map((image, index) => (
                        <motion.img 
                            key={image.id}
                            src={image.imageUrl}
                            alt={image.altText}
                            className="about-small-image"
                            variants={fadeInUp}
                            transition={{ delay: 0.2 + 0.1 * index }}
                        />
                    ))}
                    <motion.div whileHover={{ scale: 1.05 }}>
                        <Link to={aboutData.buttonUrl} className="about-button"> 
                            {aboutData.buttonText}
                            <Suspense fallback={<span>Waiting icon...</span>}>
                                <FaChevronRight />
                            </Suspense>
                        </Link>
                    </motion.div>
                </motion.div>
            </motion.div>
        </section>
    );
}

export default About;
