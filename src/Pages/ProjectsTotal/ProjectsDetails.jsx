import React, { useEffect, useState, useCallback, useContext } from 'react';
import { useParams } from 'react-router-dom';
import '../../Pages/ProjectsTotal/ProjectDetails.css';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { MainContext } from "../../components/Context";

const ProjectsDetails = React.memo(() => {
  const { URLAPI, lang } = useContext(MainContext);
  const { id } = useParams();
  

  const [projects, setProjects] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  

  const [categoryText, setCategoryText] = useState('');
  const [dateText, setDateText] = useState('');
  const [clientText, setClientText] = useState('');
  const [locationText, setLocationText] = useState('');
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${URLAPI}/api/projects?lang=${lang}`);
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const { data } = await response.json();
        setProjects(data);
        const index = data.findIndex(p => p.id === parseInt(id));
        setCurrentIndex(index !== -1 ? index : 0);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [id, URLAPI, lang]);


  useEffect(() => {
    const fetchTextData = async () => {
      try {
        const categoryRes = await fetch(`${URLAPI}/api/static/text/category?lang=${lang}`);
        const dateRes = await fetch(`${URLAPI}/api/static/text/date?lang=${lang}`);
        const clientRes = await fetch(`${URLAPI}/api/static/text/client?lang=${lang}`);
        const locationRes = await fetch(`${URLAPI}/api/static/text/location?lang=${lang}`);
        
        if (categoryRes.ok && dateRes.ok && clientRes.ok && locationRes.ok) {
          const categoryData = await categoryRes.json();
          const dateData = await dateRes.json();
          const clientData = await clientRes.json();
          const locationData = await locationRes.json();

          setCategoryText(categoryData.text);
          setDateText(dateData.text);
          setClientText(clientData.text);
          setLocationText(locationData.text);
        } else {
          throw new Error('Failed to fetch text data');
        }
      } catch (error) {
        setError(error);
      }
    };

    fetchTextData();
  }, [URLAPI, lang]);


  const handleIndexChange = useCallback((delta) => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex === null || projects.length === 0) return prevIndex;
      return (prevIndex + delta + projects.length) % projects.length;
    });
  }, [projects.length]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading project: {error.message}</p>;
  if (currentIndex === null || projects.length === 0) return <p>Project not found.</p>;

  const currentProject = projects[currentIndex];
  const { src: imageUrl, date, client, location, category, title, text: description } = currentProject;

  return (
    <>
      <section className="projectDetails container">
        <div className="details-content">
          <div className="content-head">
            <div className="head-image">
              <img src={imageUrl} alt="Project Image" />
            </div>
            <div className="head-history">
              <h3>{dateText}</h3>
              <p>{date}</p>
              <h3>{clientText}</h3>
              <p>{client}</p>
              <h3>{locationText}</h3>
              <p>{location}</p>
              <h3>{categoryText}</h3>
              <p>{category}</p>
            </div>
          </div>
          <div className="content-bottom">
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
          <div className="arrow-detail">
            <a href="#" onClick={(e) => { e.preventDefault(); handleIndexChange(-1); }}>
              <FaAngleLeft /> Previous
            </a>
            <a href="#" onClick={(e) => { e.preventDefault(); handleIndexChange(1); }}>
              Next <FaAngleRight />
            </a>
          </div>
        </div>
      </section>
    </>
  );
});

export default ProjectsDetails;
