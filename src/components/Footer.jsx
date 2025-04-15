import React from 'react';
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-light py-5">
            <div className="container">
                <div className="d-flex justify-content-between flex-wrap">
                    {/* OUR COMPANY Column */}
                    <div className="col-6 col-lg-3">
                        <h5 className="text-primary fw-bold mb-4">OUR COMPANY</h5>
                        <ul className="list-unstyled">
                            <li className="mb-2">
                                <Link to="/about-us" className="text-dark text-decoration-none">About Us</Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/blogs" className="text-dark text-decoration-none">Blogs</Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/branches" className="text-dark text-decoration-none">Branches</Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/careers" className="text-dark text-decoration-none">Careers</Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/contact-us" className="text-dark text-decoration-none">Contact Us</Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/promos" className="text-dark text-decoration-none">Promos</Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/terms" className="text-dark text-decoration-none">
                                    <span className="text-danger">*</span>Terms and Conditions Apply
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* SUPPORT AND SERVICES Column */}
                    <div className="col-6 col-lg-3">
                        <h5 className="text-primary fw-bold mb-4">SUPPORT AND SERVICES</h5>
                        <ul className="list-unstyled">
                            <li className="mb-2">
                                <Link to="/delivery" className="text-dark text-decoration-none">Delivery</Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/track-repair" className="text-dark text-decoration-none">Track My Repair</Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/repair-and-service" className="text-dark text-decoration-none">Repair and Service</Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/return-refund" className="text-dark text-decoration-none">Return and Refund Policies</Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/terms-conditions" className="text-dark text-decoration-none">Terms and Conditions</Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/privacy-policy" className="text-dark text-decoration-none">Privacy Policy</Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright and Social Media */}
                <div className="row mt-5">
                    <div className="col-md-6">
                        <p className="mb-0">© 2025 Gigahertz</p>
                        <p className="mb-0">
                            Powered by{' '}
                            <a href="https://claude.ai" className="text-dark">
                                AI
                            </a>
                        </p>
                    </div>
                    <div className="col-md-6">
                        <div className="d-flex justify-content-md-end align-items-center">
                            <p className="mb-0 me-3">Follow Us</p>
                            <div className="d-flex">
                                <a href="https://facebook.com" className="me-2" aria-label="Facebook">
                                    <div
                                        className="bg-secondary rounded-circle d-flex justify-content-center align-items-center"
                                        style={{ width: '40px', height: '40px' }}
                                    >
                                        <FaFacebook className="text-white" />
                                    </div>
                                </a>
                                <a href="https://instagram.com" className="me-2" aria-label="Instagram">
                                    <div
                                        className="bg-secondary rounded-circle d-flex justify-content-center align-items-center"
                                        style={{ width: '40px', height: '40px' }}
                                    >
                                        <FaInstagram className="text-white" />
                                    </div>
                                </a>
                                <a href="https://youtube.com" className="me-2" aria-label="YouTube">
                                    <div
                                        className="bg-secondary rounded-circle d-flex justify-content-center align-items-center"
                                        style={{ width: '40px', height: '40px' }}
                                    >
                                        <FaYoutube className="text-white" />
                                    </div>
                                </a>
                                <a href="https://tiktok.com" aria-label="TikTok">
                                    <div
                                        className="bg-secondary rounded-circle d-flex justify-content-center align-items-center"
                                        style={{ width: '40px', height: '40px' }}
                                    >
                                        <FaTiktok className="text-white" />
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;