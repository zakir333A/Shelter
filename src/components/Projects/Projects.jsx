import React, { useState, useEffect, useMemo } from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import './Projects.css';

function Projects({ proHead = 'Projects' }) {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('/db.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setProjects(data.projects.slice(1));
                setLoading(false);
            })
            .catch(error => {
                console.error('Data Error:', error);
                setError(error);
                setLoading(false);
            });
    }, []);

    const handleCardClick = (linkUrl) => {
        window.location.href = linkUrl;
    };

    const renderedProjects = useMemo(() =>
        projects.map(({ id, mainImageUrl, title, linkUrl, linkText }) => (
            <div
                key={id}
                className="pro-card"
                onClick={() => handleCardClick(linkUrl)}
                style={{ cursor: 'pointer' }}
            >
                <div className="pro-card-img">
                    <img src={mainImageUrl} alt={`Project ${title}`} className="pro-image" />
                </div>
                <h2 className="pro-card-title">{title}</h2> {/* Change made here */}
                <a href={linkUrl} className="pro-link" onClick={(e) => e.stopPropagation()}>
                    {linkText}
                    <IoIosArrowForward />
                </a>
            </div>
        )),
        [projects]
    );

    if (loading) return <p>Loading projects, please wait...</p>;
    if (error) return <p>Error: {error.message}. Please try refreshing the page.</p>;

    return (
        <section className="pro-wrapper container">
            <div className="pro-title">{proHead}</div>
            <div className="pro-list">
                {renderedProjects}
            </div>
        </section>
    );
}

export default Projects;
