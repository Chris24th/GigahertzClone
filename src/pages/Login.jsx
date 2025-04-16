import React, { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash, FaFacebookF, FaGoogle, FaUser, FaSignOutAlt, FaEnvelope, FaCalendarAlt } from 'react-icons/fa';
import './Login.css';
import axios from 'axios'; // Make sure to install axios: npm install axios

const Login = () => {
    const [activeTab, setActiveTab] = useState('login');
    const [showPassword, setShowPassword] = useState(false);
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userData, setUserData] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    // Check authentication status when component mounts
    useEffect(() => {
        checkAuthStatus();
    }, []);

    // Check if user is already authenticated
    const checkAuthStatus = async () => {
        try {
            setLoading(true);
            const response = await axios.get('https://localhost:44373/api/AccountApi/CheckAuthStatus');
            if (response.data.isAuthenticated) {
                setIsAuthenticated(true);
                setUserData({ email: response.data.email });
            }
        } catch (error) {
            console.error('Authentication check failed:', error);
        } finally {
            setLoading(false);
        }
    };

    // Toggle between login and signup
    const toggleTab = (tab) => {
        setActiveTab(tab);
        setShowForgotPassword(false);
        setErrorMessage('');
        setSuccessMessage('');
    };

    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Handle login form submission
    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');
        setLoading(true);

        try {
            const response = await axios.post('https://localhost:44373/api/AccountApi/Login', {
                email: loginEmail,
                password: loginPassword,
                rememberMe: true
            });

            if (response.data.success) {
                setSuccessMessage('Login successful!');
                setIsAuthenticated(true);
                setUserData({ email: response.data.email });

                // Reset form
                setLoginEmail('');
                setLoginPassword('');
            }
        } catch (error) {
            if (error.response && error.response.status === 423) {
                setErrorMessage('Your account is locked. Please try again later.');
            } else if (error.response && error.response.data) {
                setErrorMessage(error.response.data.message || 'Login failed. Please check your credentials.');
            } else {
                setErrorMessage('An error occurred during login. Please try again.');
            }
            console.error('Login error:', error);
        } finally {
            setLoading(false);
        }
    };

    // Handle signup form submission
    const handleSignup = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match.');
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post('https://localhost:44373/api/AccountApi/Register', {
                email: email,
                password: password,
                confirmPassword: confirmPassword
            });

            if (response.data.success) {
                setSuccessMessage('Account created successfully! You are now logged in.');
                setIsAuthenticated(true);
                setUserData({ email: response.data.email });

                // Reset form
                setEmail('');
                setPassword('');
                setConfirmPassword('');
                setFirstName('');
                setLastName('');
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data.message || 'Registration failed. Please try again.');
            } else {
                setErrorMessage('An error occurred during registration. Please try again.');
            }
            console.error('Signup error:', error);
        } finally {
            setLoading(false);
        }
    };

    // Handle forgot password form submission
    const handleForgotPassword = (e) => {
        e.preventDefault();
        // This would connect to a password reset API endpoint
        // For now, just show a success message
        setSuccessMessage('If this email exists in our system, you will receive password reset instructions shortly.');
        setForgotPasswordEmail('');
    };

    // Handle logout
    const handleLogout = async () => {
        setLoading(true);
        try {
            await axios.post('https://localhost:44373/api/AccountApi/Logout');
            setIsAuthenticated(false);
            setUserData(null);
            setSuccessMessage('You have been logged out successfully.');
        } catch (error) {
            console.error('Logout error:', error);
            setErrorMessage('An error occurred during logout. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Display user account info when logged in
    const renderUserAccount = () => {
        return (
            <div className="user-account-container">
                <div className="card">
                    <div className="card-header bg-primary text-white">
                        <h4 className="mb-0">My Account</h4>
                    </div>
                    <div className="card-body">
                        <div className="text-center mb-4">
                            <div className="avatar-circle mb-3">
                                <FaUser size={50} />
                            </div>
                            <h5>{userData?.email}</h5>
                        </div>

                        <div className="account-details">
                            <div className="detail-item">
                                <div className="icon">
                                    <FaEnvelope />
                                </div>
                                <div className="content">
                                    <div className="label">Email</div>
                                    <div className="value">{userData?.email}</div>
                                </div>
                            </div>

                            <div className="detail-item">
                                <div className="icon">
                                    <FaCalendarAlt />
                                </div>
                                <div className="content">
                                    <div className="label">Member Since</div>
                                    <div className="value">{new Date().toLocaleDateString()}</div>
                                </div>
                            </div>
                        </div>

                        <div className="d-grid gap-2 mt-4">
                            <button
                                className="btn btn-primary"
                                onClick={() => {/* Navigate to profile edit page */ }}
                            >
                                Edit Profile
                            </button>
                            <button
                                className="btn btn-outline-danger"
                                onClick={handleLogout}
                                disabled={loading}
                            >
                                {loading ? 'Logging out...' : <><FaSignOutAlt className="me-2" /> Sign Out</>}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    // Render auth forms or user account based on authentication status
    return (
        <div className="auth-page">
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        {/* Show success/error messages */}
                        {successMessage && (
                            <div className="alert alert-success mb-4" role="alert">
                                {successMessage}
                            </div>
                        )}
                        {errorMessage && (
                            <div className="alert alert-danger mb-4" role="alert">
                                {errorMessage}
                            </div>
                        )}

                        {isAuthenticated ? (
                            // User is logged in, show account info
                            renderUserAccount()
                        ) : (
                        // User is not logged in, show auth forms
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
                                                        <button
                                                            type="submit"
                                                            className="btn btn-primary"
                                                            disabled={loading}
                                                        >
                                                            {loading ? 'Submitting...' : 'Submit'}
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="btn btn-outline-secondary"
                                                            onClick={() => setShowForgotPassword(false)}
                                                            disabled={loading}
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
                                                        <button
                                                            type="submit"
                                                            className="btn btn-primary"
                                                            disabled={loading}
                                                        >
                                                            {loading ? 'Signing In...' : 'Sign In'}
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
                                                        <div className="mb-3">
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
                                                        <div className="mb-4">
                                                            <label htmlFor="confirm-password" className="form-label">Confirm Password</label>
                                                            <div className="input-group">
                                                                <input
                                                                    type={showPassword ? "text" : "password"}
                                                                    className="form-control"
                                                                    id="confirm-password"
                                                                    value={confirmPassword}
                                                                    onChange={(e) => setConfirmPassword(e.target.value)}
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
                                                    <button
                                                        type="submit"
                                                        className="btn btn-primary"
                                                        disabled={loading}
                                                    >
                                                        {loading ? 'Creating Account...' : 'Create Account'}
                                                    </button>
                                                </div>
                                            </form>
                                        )}
                                    </div>
                                </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;