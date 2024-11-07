import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../Navbar/Navbar.css';
import LanguageDropdown from '../Language/LanguageDropdown'; 
import SearchComponent from '../Header/SearchComponent';
import { MainContext } from "../Context";

function Navbar() {
    const { URLAPI, lang } = useContext(MainContext); 
    const [data, setData] = useState({ navbar: { links: [] } });
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [hoveredLink, setHoveredLink] = useState(null);
    const [submenuOpen, setSubmenuOpen] = useState(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const menuRef = useRef(null);
    const buttonRef = useRef(null);
    const location = useLocation();

    useEffect(() => {
        fetch(`${URLAPI}/api/static/pages?lang=${lang}`)
            .then(response => response.json())
            .then(data => {
                const links = data.data
                    .filter(item => item.is_active)
                    .map(item => ({
                        id: item.id,
                        text: item.title,
                        url: item.link,
                        submenu: item.has_categories ? item.categories : null 
                    }));
                setData({ navbar: { links } });
            })
            .catch(error => console.error('Error Fetching Data', error));
    }, [URLAPI, lang]);

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
                setSubmenuOpen(null);
                document.body.classList.remove('no-scroll');
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMenuOpen]);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const handleMouseEnter = (linkId) => {
        setHoveredLink(linkId);
        !isMobile && setSubmenuOpen(linkId);
    };

    const handleMouseLeave = () => {
        setHoveredLink(null);
        !isMobile && setSubmenuOpen(null);
    };

    const handleSubmenuToggle = (linkId) => {
        isMobile && setSubmenuOpen(submenuOpen === linkId ? null : linkId);
    };

    const handleLinkClick = () => setIsMenuOpen(false);

    return (
        <section className="navbar">
            <nav className="container navigation">
                <div className="nav-left container" ref={menuRef}>
                    <div className={`mobile_navMenu ${isMenuOpen ? 'open' : 'closed'}`}>
                        {isMobile && (
                            <div className="mobile_search-lang">
                                <SearchComponent />
                                <LanguageDropdown />    
                            </div>
                        )}
                        <ul className="d-flex menu">
                            {data.navbar.links.map(link => (
                                <li 
                                    key={link.id} 
                                    onMouseEnter={() => handleMouseEnter(link.id)} 
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <Link className="btn-shine" to={link.url} onClick={handleLinkClick}>
                                        {link.text}
                                    </Link>
                                    {link.submenu && (
                                        <span 
                                            className="arrow" 
                                            onClick={() => handleSubmenuToggle(link.id)}
                                        >
                                            ▼
                                        </span>
                                    )}
                                    {submenuOpen === link.id && link.submenu && (
                                        <ul className="submenu">
                                            {link.submenu.map(subLink => (
                                                <li key={subLink.id}>
                                                    <Link className="btn-shine" to={`/category${subLink.link}`} onClick={handleLinkClick}>
                                                        {subLink.name}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
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
