  import React, { useEffect, useState } from 'react';
  import './CategoryHead.css'; 
  import { Link } from 'react-router-dom';

  function CategoryHead() {
    const [navItems, setNavItems] = useState([]);

    useEffect(() => {
      fetch('db.json') 
        .then(response => response.json())
        .then(data => setNavItems(data.secondnavname))
        .catch(error => console.error('Error fetching nav items:', error));
    }, []);

    return (
      <nav className='categoryHead container'>
        <div className="nav-inner"> 
          {navItems.map(item => (
            <Link to={item.link} key={item.id}>
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    );
  }

  export default CategoryHead;
