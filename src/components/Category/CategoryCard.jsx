import React, { useState, useEffect, useContext } from 'react';
import './CategoryCard.css'; 
import { useLocation, Link } from 'react-router-dom';
import { MainContext } from "../Context";

function CategoryCard() {
  const { URLAPI, lang } = useContext(MainContext); 
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const paths = location.pathname.split("/");
  const currentPath = paths[paths.length - 1]; 

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${URLAPI}/api/categories?lang=${lang}`); 
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
          
        setCategories(data); 
      } catch (error) {
        console.error('Məlumat alarkən xəta baş verdi:', error);
        setError(error);
      } finally {
        setLoading(false); 
      }
    };

    fetchCategories();
  }, [URLAPI, lang]);

  const renderSubcategories = (categoryName) => {
    const category = categories.find(category => category.name === categoryName);

    if (!category) return null;

    return category.subcategories.map(subcategory => (
      <Link to={`/category/${categoryName.toLowerCase()}/${subcategory.id}`} key={subcategory.id} className="card-category">
        <img src={subcategory.image} alt={subcategory.name}  /> 
        <h3 lang="az">{subcategory.name}</h3>
      </Link>
    ));
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading categories: {error.message}</p>;
  }

  return (
    <div className="category-container container">
      {(currentPath === "shelters" || currentPath === "category") && renderSubcategories("Shelters")}
      {(currentPath === "equipment-and-accessories" || currentPath === "category") && renderSubcategories("Equipment and Accessories")}
    </div>
  );
}

export default CategoryCard;
