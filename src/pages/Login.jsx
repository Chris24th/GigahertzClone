import React, { useState } from 'react';
import { FaEye, FaEyeSlash, FaFacebookF, FaGoogle } from 'react-icons/fa';
import './Login.css';

const Login = () => {
    const [activeTab, setActiveTab] = useState('login');
    const [showPassword, setShowPassword] = useState(false);
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
    const [showForgotPassword, setShowForgotPassword] = useState(false);

    // Toggle between login and signup
    const toggleTab = (tab) => {
        setActiveTab(tab);
        setShowForgotPassword(false);
    };

    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Handle login form submission
    const handleLogin = (e) => {
        e.preventDefault();
        console.log('Login with:', { loginEmail, loginPassword });
        // Add actual login logic here
    };

    // Handle signup form submission
    const handleSignup = (e) => {
        e.preventDefault();
        console.log('Signup with:', { firstName, lastName, email, password });
        // Add actual signup logic here
    };

    // Handle forgot password form submission
    const handleForgotPassword = (e) => {
        e.preventDefault();
        console.log('Reset password for:', forgotPasswordEmail);
        // Add actual password reset logic here
    };

    return (
        <div className="auth-page">
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <div className="card auth-card">
                            <div className="card-header bg-white p-0">
                                <ul className="nav nav-tabs nav-fill">
                                    <li className="nav-item">
                                        <button
                                            className={`nav-link ${activeTab === 'login' ? 'active' : ''}`}
                                            onClick={() => toggleTab('login')}
                                        >
                                            LOGIN
                                        </button>
                                    </li>
                                    <li className="nav-item">
                                        <button
                                            className={`nav-link ${activeTab === 'signup' ? 'active' : ''}`}
                                            onClick={() => toggleTab('signup')}
                                        >
                                            CREATE ACCOUNT
                                        </button>
                                    </li>
                                </ul>
                            </div>

                            <div className="card-body p-4">
                                {/* Social Media Login Buttons */}
                                <div className="social-login mb-4">
                                    <div className="row">
                                        <div className="col-6">
                                            <button className="btn btn-facebook w-100">
                                                <FaFacebookF className="me-2" /> Facebook
                                            </button>
                                        </div>
                                        <div className="col-6">
                                            <button className="btn btn-google w-100">
                                                <FaGoogle className="me-2" /> Google
                                            </button>
                                        </div>
                                    </div>
                                    <div className="separator my-4">
                                        <span>OR</span>
                                    </div>
                                </div>

                                {showForgotPassword ? (
                                    /* Forgot Password Form */
                                    <div className="forgot-password-form">
                                        <h5 className="mb-4">Reset Your Password</h5>
                                        <p className="text-muted mb-4">
                                            We will send you an email to reset your password.
                                        </p>
                                        <form onSubmit={handleForgotPassword}>
                                            <div className="mb-3">
                                                <label htmlFor="forgot-email" className="form-label">Email</label>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    id="forgot-email"
                                                    value={forgotPasswordEmail}
                                                    onChange={(e) => setForgotPasswordEmail(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div className="d-grid gap-2 mb-3">
                                                <button type="submit" className="btn btn-primary">
                                                    Submit
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-secondary"
                                                    onClick={() => setShowForgotPassword(false)}
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                ) : activeTab === 'login' ? (
                                    /* Login Form */
                                    <form onSubmit={handleLogin}>
                                        <div className="mb-3">
                                            <label htmlFor="login-email" className="form-label">Email</label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="login-email"
                                                value={loginEmail}
                                                onChange={(e) => setLoginEmail(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="login-password" className="form-label">Password</label>
                                            <div className="input-group">
                                                <input
                                                    type={showPassword ? "text" : "password"}
                                                    className="form-control"
                                                    id="login-password"
                                                    value={loginPassword}
                                                    onChange={(e) => setLoginPassword(e.target.value)}
                                                    required
                                                />
                                                <button
                                                    className="btn btn-outline-secondary"
                                                    type="button"
                                                    onClick={togglePasswordVisibility}
                                                >
                                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                                </button>
                                            </div>
                                        </div>
                                        <div className="mb-4 text-end">
                                            <button
                                                type="button"
                                                className="btn btn-link p-0 text-decoration-none"
                                                onClick={() => setShowForgotPassword(true)}
                                            >
                                                Forgot your password?
                                            </button>
                                        </div>
                                        <div className="d-grid">
                                            <button type="submit" className="btn btn-primary">
                                                Sign In
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    /* Signup Form */
                                    <form onSubmit={handleSignup}>
                                        <div className="row mb-3">
                                            <div className="col-md-6">
                                                <label htmlFor="first-name" className="form-label">First Name</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="first-name"
                                                    value={firstName}
                                                    onChange={(e) => setFirstName(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="last-name" className="form-label">Last Name</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="last-name"
                                                    value={lastName}
                                                    onChange={(e) => setLastName(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="signup-email" className="form-label">Email</label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="signup-email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="signup-password" className="form-label">Password</label>
                                            <div className="input-group">
                                                <input
                                                    type={showPassword ? "text" : "password"}
                                                    className="form-control"
                                                    id="signup-password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    required
                                                />
                                                <button
                                                    className="btn btn-outline-secondary"
                                                    type="button"
                                                    onClick={togglePasswordVisibility}
                                                >
                                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                                </button>
                                            </div>
                                        </div>
                                        <div className="d-grid">
                                            <button type="submit" className="btn btn-primary">
                                                Create Account
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;