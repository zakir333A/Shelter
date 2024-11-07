import React, { useState, useEffect, useMemo } from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import { useNavigate } from 'react-router-dom'; 
import '../../components/Projects/Projects.css';
import { MainContext, useContext } from "../Context";

function ServicesMain() {
    const { URLAPI, lang } = useContext(MainContext); 
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [proHead, setProHead] = useState('');
    const [seeMoreText, setSeeMoreText] = useState('');  
    const navigate = useNavigate(); 

    useEffect(() => {
       
        fetch(`${URLAPI}/api/static/text/services?lang=${lang}`) 
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setProHead(data.text);
            })
            .catch(error => {
                console.error('Error fetching proHead:', error);
                setError(error);
                setLoading(false);
            });

     
        fetch(`${URLAPI}/api/static/text/link-see-more?lang=${lang}`) 
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setSeeMoreText(data.text);  
            })
            .catch(error => {
                console.error('Error fetching See More text:', error);
                setError(error);
                setLoading(false);
            });

        // Fetch the project data
        fetch(`${URLAPI}/api/services/home?lang=${lang}`) 
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setProjects(data.map(({ id, src, title, article_image }) => ({
                    id,
                    mainImageUrl: src,
                    title: title,
                    linkUrl: article_image,
                })));
                setLoading(false);
            })
            .catch(error => {
                console.error('Data Error:', error);
                setError(error);
                setLoading(false);
            });
    }, [URLAPI, lang]);  

    const handleCardClick = (linkUrl) => {
        navigate(linkUrl); 
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
                <div className="pro-link" onClick={(e) => e.stopPropagation()}>
                    {seeMoreText || 'Daha çox'}
                    <IoIosArrowForward />
                </div>
            </div>
        )),
        [projects, seeMoreText]  
    );

    if (loading) return <p>Loading projects, please wait...</p>;
    if (error) return <p>Error: {error.message}. Please try refreshing the page.</p>;
    if (projects.length === 0) return <p>No projects available at this time.</p>; 

    return (
        <section className="pro-wrapper container">
            <div className="pro-title">{proHead || 'Projects'}</div> 
            <div className="pro-list">
                {renderedProjects}
            </div>
        </section>
    );
}

export default ServicesMain;
