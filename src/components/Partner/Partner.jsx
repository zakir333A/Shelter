import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './Partner.css';

function Partner() {
    const [partners, setPartners] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { ref, inView } = useInView({
        threshold: 0.1,
        triggerOnce: false, 
    });

    useEffect(() => {
        const fetchPartners = async () => {
            try {
                const response = await fetch('/db.json');
                if (!response.ok) {
                    throw new Error(' not ok');
                }
                const data = await response.json();
                setPartners(data.partners);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPartners();
    }, []);



    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='part-wrapper container'>
            <h2>Bizim Tərəfdaşlarımız</h2>
            <motion.div
                className='partners-grid'
                ref={ref}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7 }}
            >
                {partners.map((partner, index) => (
                    <motion.img
                        key={partner.id}
                        src={partner.imageUrl}
                        alt={`Partner ${partner.name}`}
                        className='partner-image'
                        initial={{ scale: 0.5, rotate: -30 }} 
                        animate={inView ? { scale: 1, rotate: 0, transition: { duration: 0.5 } } : {}}
                        transition={{ 
                            duration: 0.8, 
                            delay: index * 0.18, 
                            type: "spring",
                            stiffness: 200, 
                            damping: 10,
                        }}
                    />
                ))}
            </motion.div>
        </div>
    );
}

export default Partner;
