import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../Navbar/Navbar.css';

function Navbar() {
    const [data, setData] = useState({ navbar: null });
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const buttonRef = useRef(null);
    const location = useLocation();

    useEffect(() => {        
        fetch('../../../public/db.json')
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error('Error Fetch Data', error));
    }, []);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }

        const handleClickOutside = (event) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target) &&
                !buttonRef.current.contains(event.target)
            ) {
                setIsMenuOpen(false);
                document.body.classList.remove('no-scroll');
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMenuOpen]); 

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // console.log(data);
    

    return (
        <section className="navbar">
            <nav className="container navigation">
                <div className="nav-left container" ref={menuRef}>
                    <ul className={`d-flex menu ${isMenuOpen ? 'open' : 'closed'}`}>
                        {data?.navbar?.links?.map(link => (
                            <li key={link.id}>
                                <Link className="btn-shine" to={link.url}>{link.text}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="nav-right">
                    <div className="card">
                        <div className="menu-icon">
                            <div className="background">
                                <button className="menu__icon" onClick={toggleMenu} ref={buttonRef}>
                                    <span className='icon-span'></span>
                                    <span className='icon-span'></span>
                                    <span className='icon-span'></span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </section>
    );
}

export default Navbar;
