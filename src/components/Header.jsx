import React, { useState, useEffect } from 'react';
import { FaUser, FaShoppingCart, FaSearch, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isCartOpen, setIsCartOpen] = useState(false); // State for cart popup
    const navigate = useNavigate();

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

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    };

    // Handle search
    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <header className={`site-header`} style={{ backgroundColor: "#0000FF" }}>
            <div className="container">
                <nav className="navbar navbar-expand-lg">
                    <div className="container-fluid px-0">
                        {/* Logo */}
                        <a className="navbar-brand" href="/">
                            <img
                                src="assets/gigahertz-logo.png"
                                alt="Gigahertz Logo"
                                className="img-fluid  text-light"
                                style={{ maxHeight: '40px' }}
                            />
                        </a>

                        {/* Search Icon (Replaces Hamburger) */}
                        <button
                            className="navbar-toggler border-1 ms-auto mx-3"
                            onClick={toggleMenu}
                            aria-expanded={isMenuOpen}
                            aria-label="Toggle search"
                            style={{ fontSize: '1.5rem', border: 'none' }} // Enlarges the button
                        >
                            {isMenuOpen ? <FaTimes color='white' /> : <FaSearch color='white' />}
                        </button>

                        {/* User Actions */}
                        <div className={`align-items-center ${isMenuOpen ? 'd-flex' : 'd-none'}`}>
                            <a href="/account" className="nav-link text-center">
                                <FaUser className="fs-5 text-light" />
                            </a>
                            <a href="/cart" className="nav-link text-center ms-3 position-relative">
                                <FaShoppingCart className="fs-5 text-light" />
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-lightblue">
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
                                    <button className="btn bg-lightblue" type="submit">
                                        <FaSearch size={25} color='white' />
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* User Actions */}
                        <div className={`align-items-center ${isMenuOpen ? 'd-none' : 'd-flex '} `}>
                            <a href="/account" className="nav-link text-center  text-light">
                                <FaUser className="fs-5" />
                                <div className="small d-none d-md-block">Account</div>
                            </a>
                            <button onClick={toggleCart} className="nav-link text-center ms-3 position-relative text-light">
                                <FaShoppingCart className="fs-5" />
                                <div className="small d-none d-md-block">Cart</div>
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-lightblue">
                                    0
                                </span>
                            </button>
                            {isCartOpen && (
                                <div
                                    className="d-flex flex-column justify-content-between align-items-center position-absolute end-0 bg-white shadow p-3"
                                    style={{
                                        width: '300px',
                                        top: '100%',
                                        zIndex: 1050,
                                        borderRadius: '8px',
                                        minHeight: '250px',
                                    }}
                                >
                                    <h5 className="mb-3">Your Cart</h5>
                                    <div className='my-4 text-center'>
                                        <FaShoppingCart size={80} />
                                        <p>Your cart is currently empty.</p>
                                    </div>
                                    {/* Add cart items here */}
                                    <div className="d-flex justify-content-between mt-3">
                                        <a href="/" className="btn btn-primary">
                                            Shop our Products
                                        </a>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;