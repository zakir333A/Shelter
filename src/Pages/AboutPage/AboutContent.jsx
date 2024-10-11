import React, { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import '../AboutPage/AboutPage.css';

function AboutContent() {
    const [aboutData, setAboutData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchAboutData = useCallback(async () => {
        try {
            const response = await fetch('/db.json');
            if (!response.ok) {
                throw new Error('Response  not ok');
            }
            const data = await response.json();
            setAboutData(data.aboutContent);
        } catch (error) {
            setError(error.message);
            console.error('Error Data:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchAboutData();
    }, [fetchAboutData]);

    if (loading) {
        return <div>Waiting...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='AboutContent'>
            <motion.div
                className="about-top container"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <div className="about-top-img">
                    <img src={aboutData.aboutTop.imgSrc} alt="About Top" />
                </div>
                <div className="about-right-top">
                    <h3>{aboutData.aboutTop.aboutUsTitle}</h3>
                    <h2>{aboutData.aboutTop.aboutCompanyName}</h2>
                    <p>{aboutData.aboutTop.description}</p>
                </div>
            </motion.div>

            <motion.div
                className="about-center container"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <h2>{aboutData.aboutCenter.brandValuesTitle}</h2>
                <div className="about-cards">
                    {aboutData.aboutCenter.cards.map((card) => (
                        <motion.div
                            className="card-top"
                            key={card.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="card-inner">
                                <h2>{card.title}</h2>
                                <img src={card.imgSrc} alt={card.title} />
                            </div>
                            <p>{card.description}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}

export default React.memo(AboutContent);
