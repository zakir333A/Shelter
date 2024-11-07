import React, { useState, useEffect, Suspense, lazy, useContext } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import './About.css';
import { MainContext } from "../Context";

const FaChevronRight = lazy(() => import('react-icons/fa').then(module => ({ default: module.FaChevronRight })));

function About() {
    const { URLAPI, lang } = useContext(MainContext); 
    const [aboutData, setAboutData] = useState(null);
    const [seeMoreText, setSeeMoreText] = useState('Daha çox öyrən'); 
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAboutData = async () => {
            try {
                const response = await fetch(`${URLAPI}/api/about-us/home?lang=${lang}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                
                setAboutData({
                    mainImageUrl: data.left_image,
                    aboutTitle: data.header_text,
                    heading: data.short_description,
                    shortDescription: data.short_description,
                    smallImages: data.subbrands.map(brand => ({
                        id: brand.id,
                        imageUrl: brand.logo,
                        altText: brand.logo_alt,
                    })),
                    buttonUrl: '/about',
                });
            } catch (error) {
                console.error('Error fetching about data:', error);
                setError('Məlumatı çəkməkdə xəta baş verdi.');
            } finally {
                setLoading(false);
            }
        };

        const fetchSeeMoreText = async () => {
            try {
                const response = await fetch(`${URLAPI}/api/static/text/link-see-more?lang=${lang}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch "See More" text');
                }
                const data = await response.json();
                setSeeMoreText(data.text);
            } catch (error) {
                console.error('Error fetching "See More" text:', error);
            }
        };

        fetchAboutData();
        fetchSeeMoreText();
    }, [URLAPI, lang]);

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
        triggerOnce: true,
    });

    if (loading) return <p>Gözləyir...</p>;

    if (error) {
        return (
            <div>
                <p>{error}</p>
                <button onClick={() => window.location.reload()}>Yenidən cəhd et</button>
            </div>
        );
    }

    if (!aboutData) {
        return <p>Məlumat tapılmadı.</p>;
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
                        <motion.p variants={fadeInUp} transition={{ delay: 0.1 }}>
                            {aboutData.heading}
                        </motion.p>
                        <motion.p variants={fadeInUp} transition={{ delay: 0.2 }}>
                            {aboutData.shortDescription}
                        </motion.p>
                    </div>
                    {aboutData.smallImages.map((image, index) => (
                        <motion.img
                            key={image.id}
                            src={image.imageUrl}
                            alt={image.altText || 'Subbrand logo'}
                            className="about-small-image"
                            variants={fadeInUp}
                            transition={{ delay: 0.2 + 0.1 * index }}
                        />
                    ))}
                    <motion.div whileHover={{ scale: 1.05 }}>
                        <Suspense fallback={<span>Gözləyir...</span>}>
                            <Link to={aboutData.buttonUrl} className="about-button">
                                {seeMoreText}
                                <FaChevronRight />
                            </Link>
                        </Suspense>
                    </motion.div>
                </motion.div>
            </motion.div>
        </section>
    );
}

export default About;
