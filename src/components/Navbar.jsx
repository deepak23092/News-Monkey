import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleNavbar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div>
            <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">NewsMonkey</Link>
                    <button className="navbar-toggler" type="button" onClick={toggleNavbar} aria-expanded={isCollapsed}>
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className={`collapse navbar-collapse ${isCollapsed ? 'show' : ''}`} id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to="/" onClick={toggleNavbar}>Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/business" onClick={toggleNavbar}>Business</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/entertainment" onClick={toggleNavbar}>Entertainment</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/general" onClick={toggleNavbar}>General</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/health" onClick={toggleNavbar}>Health</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/science" onClick={toggleNavbar}>Science</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/sports" onClick={toggleNavbar}>Sports</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/technology" onClick={toggleNavbar}>Technology</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
