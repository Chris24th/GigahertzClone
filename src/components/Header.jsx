import React, { useState, useEffect } from 'react';
import { FaUser, FaShoppingCart, FaSearch, FaTimes } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Toggle mobile menu
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Handle search
    const handleSearch = (e) => {
        e.preventDefault();
        console.log("Searching for:", searchQuery);
        // Add actual search functionality here
    };

    return (
        <header className={`site-header ${isScrolled ? 'shadow-sm py-2' : 'py-3'}`}>
            <div className="container">
                <nav className="navbar navbar-expand-lg">
                    <div className="container-fluid px-0">
                        {/* Logo */}
                        <a className="navbar-brand" href="/">
                            <img
                                src="https://www.gigahertz.com.ph/cdn/shop/files/GH_LOGO_180x.png?v=1613545268"
                                alt="Gigahertz Logo"
                                className="img-fluid"
                                style={{ maxHeight: '40px' }}
                            />
                        </a>

                        {/* Search Icon (Replaces Hamburger) */}
                        <button
                            className="navbar-toggler border-1 ms-auto mx-3"
                            type="button"
                            onClick={toggleMenu}
                            aria-expanded={isMenuOpen}
                            aria-label="Toggle search"
                            style={{ fontSize: '1.5rem'}} // Enlarges the button
                        >
                            {isMenuOpen ? <FaTimes /> : <FaSearch />}
                        </button>

                        {/* User Actions */}
                        <div className={`align-items-center ${isMenuOpen ? 'd-flex' : 'd-none'}`}>
                            <a href="/account" className="nav-link text-center">
                                <FaUser className="fs-5 text-dark" />
                            </a>
                            <a href="/cart" className="nav-link text-center ms-3 position-relative">
                                <FaShoppingCart className="fs-5 text-dark" />
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    0
                                </span>
                            </a>
                        </div>

                        {/* Navigation Content */}
                        <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''} my-4`}>
                            {/* Search Bar */}
                            <form className="mx-auto d-flex" onSubmit={handleSearch} style={{ maxWidth: '500px', width: '100%' }}>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Search products..."
                                        aria-label="Search"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                    <button className="btn btn-outline-secondary" type="submit">
                                        <FaSearch />
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* User Actions */}
                        <div className={`align-items-center ${isMenuOpen ? 'd-none' : 'd-flex '}`}>
                            <a href="/account" className="nav-link text-center">
                                <FaUser className="fs-5 text-dark" />
                                <div className="small text-dark d-none d-md-block">Account</div>
                            </a>
                            <a href="/cart" className="nav-link text-center ms-3 position-relative">
                                <FaShoppingCart className="fs-5 text-dark" />
                                <div className="small text-dark d-none d-md-block">Cart</div>
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    0
                                </span>
                            </a>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;