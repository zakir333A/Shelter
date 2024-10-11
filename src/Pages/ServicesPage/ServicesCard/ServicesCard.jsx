import React, { useState, useEffect, useCallback } from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import { Link } from 'react-router-dom';
import './ServicesCard.css';

const ServicesCard = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch('/db.json');
                if (!response.ok) {
                    throw new Error('not ok');
                }
                const data = await response.json();
                setProjects(data.projectsImp || []);
            } catch (error) {
                console.error('Data Error:', error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    const renderProjectCard = useCallback((project) => (
        <Link to={`/services/${project.id}`} className="pro-card" key={project.id}>
            <img
                src={project.mainImageUrl}
                alt={project.title}
                className="pro-image"
            />
            <h2>{project.title}</h2>
            <span className="pro-link">
                {project.linkText}
                <IoIosArrowForward />
            </span>
        </Link>
    ), []);

    if (loading) {
        return <p className="loading">Waiting...</p>;
    }

    if (error) {
        return <p className="error">Error Data: {error.message}</p>;
    }

    return (
        <section className="pro-wrapper container">
            <div className="pro-list">
                {projects.map(renderProjectCard)}
            </div>
        </section>
    );
}

export default ServicesCard;
