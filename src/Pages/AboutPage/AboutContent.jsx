import React, { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import '../AboutPage/AboutPage.css';
import { MainContext, useContext } from "../../components/Context";

function AboutContent() {
    const { URLAPI, lang } = useContext(MainContext); 
    const [aboutData, setAboutData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchAboutData = useCallback(async () => {
        try {
            const response = await fetch(`${URLAPI}/api/about-us?lang=${lang}`); 
            if (!response.ok) {
                throw new Error('Response not ok');
            }
            const data = await response.json();
            setAboutData(data); 
        } catch (error) {
            setError(error.message);
            console.error('Error Data:', error);
        } finally {
            setLoading(false);
        }
    }, [URLAPI,lang]); 

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
                    <img src={aboutData.left_image} alt="About Top" />
                </div>
                <div className="about-right-top">
                    <h3>{aboutData.header_text}</h3>
                    {/* <h2>{aboutData.short_description}</h2> */}
                    <p>{aboutData.long_description}</p>
                </div>
            </motion.div>

            <motion.div
                className="about-center container"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <h2>Brand Values</h2>
                <div className="about-cards">
                    {aboutData.brand_values.map((value) => (
                        <motion.div
                            className="card-top"
                            key={value.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="card-inner">
                                <h2>{value.title}</h2>
                                <img src={value.icon} alt={value.title} />
                            </div>
                            <p>{value.description}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}

export default React.memo(AboutContent);
