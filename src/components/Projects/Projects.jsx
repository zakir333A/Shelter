import React, { useState, useEffect, useMemo, useContext } from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import './Projects.css';
import { MainContext } from "../Context";

function Projects() {
    const { URLAPI, lang } = useContext(MainContext); 
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [proHead, setProHead] = useState('Projects'); 
    const [linkText, setLinkText] = useState('Learn More'); 

    useEffect(() => {
        const fetchProjects = async () => {
            try {
             
                const headResponse = await fetch(`${URLAPI}/api/static/text/shelters?lang=${lang}`);
                const headData = await headResponse.json();
                setProHead(headData.text || 'Projects');

            
                const linkTextResponse = await fetch(`${URLAPI}/api/static/text/bt-learn-more?lang=${lang}`);
                const linkTextData = await linkTextResponse.json();
                setLinkText(linkTextData.text || 'Learn More');

         
                const response = await fetch(`${URLAPI}/api/subcategories?lang=${lang}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch projects');
                }
                const data = await response.json();
                
                // Filter projects with category_id 1
                const filteredProjects = data.filter(project => project.category_id === 1);
                
                setProjects(filteredProjects.map(({ id, name, image, link }) => ({
                    id,
                    title: name,
                    mainImageUrl: image,
                    linkUrl: `/projects/${link}`,
                })));
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error);
                setLoading(false);
            }
        };

        fetchProjects();
    }, [URLAPI, lang]);

    const handleCardClick = (linkUrl) => {
        window.location.href = linkUrl;
    };

    const renderedProjects = useMemo(() =>
        projects.map(({ id, mainImageUrl, title, linkUrl }) => (
            <div
                key={id}
                className="pro-card"
                onClick={() => handleCardClick(linkUrl)}
                style={{ cursor: 'pointer' }}
                role="button" 
                tabIndex={0}
                onKeyPress={(e) => e.key === 'Enter' && handleCardClick(linkUrl)}
            >
                <div className="pro-card-img">
                    <img src={mainImageUrl} alt={`Project ${title}`} className="pro-image" />
                </div>
                <h2 className="pro-card-title">{title}</h2>
                <a href={linkUrl} className="pro-link" onClick={(e) => e.stopPropagation()}>
                    {linkText}
                    <IoIosArrowForward />
                </a>
            </div>
        )),
        [projects, linkText]
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
