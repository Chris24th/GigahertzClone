import React from 'react';
import { FiFacebook, FiInstagram, FiYoutube, FiTwitter } from 'react-icons/fi';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function GigahertzFooter() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-dark text-white pt-5">
            {/* Footer Top Section */}
            <div className="container">
                <div className="row mb-4">
                    {/* Company Info */}
                    <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
                        <h5 className="text-uppercase mb-4 fw-bold">Gigahertz</h5>
                        <p className="small mb-4">
                            Your trusted partner for electronics repair and service across the Philippines.
                            Bringing quality repair services for all your devices since 1995.
                        </p>
                        <div className="d-flex mb-4">
                            <a href="#" className="text-white me-3">
                                <FiFacebook size={24} />
                            </a>
                            <a href="#" className="text-white me-3">
                                <FiInstagram size={24} />
                            </a>
                            <a href="#" className="text-white me-3">
                                <FiYoutube size={24} />
                            </a>
                            <a href="#" className="text-white">
                                <FiTwitter size={24} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
                        <h5 className="text-uppercase mb-4 fw-bold">Quick Links</h5>
                        <ul className="list-unstyled">
                            <li className="mb-2">
                                <a href="#" className="text-white text-decoration-none">Home</a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="text-white text-decoration-none">About Us</a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="text-white text-decoration-none">Products</a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="text-white text-decoration-none">Services</a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="text-white text-decoration-none">Contact Us</a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="text-white text-decoration-none">Career</a>
                            </li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
                        <h5 className="text-uppercase mb-4 fw-bold">Services</h5>
                        <ul className="list-unstyled">
                            <li className="mb-2">
                                <a href="#" className="text-white text-decoration-none">Repair Services</a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="text-white text-decoration-none">Maintenance</a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="text-white text-decoration-none">Warranty Claims</a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="text-white text-decoration-none">Diagnostics</a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="text-white text-decoration-none">Trade-in</a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="text-white text-decoration-none">Parts & Accessories</a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Information */}
                    <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
                        <h5 className="text-uppercase mb-4 fw-bold">Contact Us</h5>
                        <p className="small mb-2">
                            <strong>Head Office:</strong><br />
                            123 Main Street, Makati City<br />
                            Metro Manila, Philippines 1200
                        </p>
                        <p className="small mb-2">
                            <strong>Phone:</strong><br />
                            (02) 8123-4567
                        </p>
                        <p className="small mb-2">
                            <strong>Email:</strong><br />
                            support@gigahertz.com.ph
                        </p>
                        <p className="small mb-0">
                            <strong>Business Hours:</strong><br />
                            Monday-Saturday: 9:00 AM - 6:00 PM
                        </p>
                    </div>
                </div>
            </div>

            {/* Footer Newsletter */}
            <div className="bg-black py-4">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-6 mb-3 mb-md-0">
                            <h5 className="mb-0">Subscribe to our newsletter</h5>
                            <p className="small mb-0">Get the latest updates on products, services, and promotions.</p>
                        </div>
                        <div className="col-md-6">
                            <form className="d-flex">
                                <input
                                    type="email"
                                    className="form-control me-2"
                                    placeholder="Your Email Address"
                                    aria-label="Email"
                                />
                                <button className="btn btn-primary" type="submit">Subscribe</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Copyright */}
            <div className="bg-black py-3 border-top border-secondary">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 text-center text-md-start">
                            <p className="small mb-0">
                                &copy; {currentYear} Gigahertz. All Rights Reserved.
                            </p>
                        </div>
                        <div className="col-md-6 text-center text-md-end">
                            <div className="d-inline-flex">
                                <a href="#" className="text-white text-decoration-none small me-3">Privacy Policy</a>
                                <a href="#" className="text-white text-decoration-none small me-3">Terms of Service</a>
                                <a href="#" className="text-white text-decoration-none small">Sitemap</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}