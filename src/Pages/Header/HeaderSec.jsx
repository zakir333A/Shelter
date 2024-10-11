import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './HeaderSec.css';
import SearchComponent from '../../components/Header/SearchComponent';

function HeaderSec() {
    const [data, setData] = useState({ navbar: null, logo: null });
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const buttonRef = useRef(null);

    useEffect(() => {
        fetch('./db.json')
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error('Error Data', error));
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target) &&
                !buttonRef.current.contains(event.target)
            ) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <section className="header-wrapper container">
            <div className="logo">
                {data?.logo && (
                    <img src={data?.logo?.imageUrl} alt={data?.logo?.altText} />
                )}
            </div>
            <div className="navbar">
                <nav className="container navigation">
                    <div className="nav-left container" ref={menuRef}>
                        <ul className={`d-flex menu ${isMenuOpen ? 'open' : 'closed'}`}>
                            {data?.navbar && data?.navbar?.links?.map(link => (
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
                                    <button
                                        className="menu__icon"
                                        onClick={toggleMenu}
                                        ref={buttonRef}
                                        style={{
                                            backgroundColor: 'black',
                                            cursor: 'pointer',
                                            width: '30px',
                                            height: '25px',
                                            padding: '5px',
                                            borderRadius: '5px'
                                        }}
                                    >
                                        <span style={{ display: 'block', width: '100%', height: '2px', backgroundColor: 'white' }}></span>
                                        <span style={{ display: 'block', width: '100%', height: '2px', backgroundColor: 'white' }}></span>
                                        <span style={{ display: 'block', width: '100%', height: '2px', backgroundColor: 'white' }}></span>
                                    </button>



                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
            <SearchComponent />
        </section>
    );
}

export default HeaderSec;
