import React, { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import authService from '../authService';
import { useNavigate } from 'react-router-dom';

const LoginSignup = () => {
    const [isLoginView, setIsLoginView] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);

    // Login state
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    // Signup state
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Forgot password state
    const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');

    // UI state
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userData, setUserData] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [isAdmin, setAdmin] = useState(false);
    const navigate = useNavigate();

    // Check authentication status when component mounts
    useEffect(() => {
        checkAuthStatus();
    }, []);

    // Check if user is already authenticated
    const checkAuthStatus = async () => {
        try {
            setLoading(true);

            const response = await authService.checkAuthStatus();
            setAdmin(sessionStorage.getItem('isAdmin') == 'true' ? true : false);
            if (response.isAuthenticated) {
                setIsAuthenticated(true);
                setUserData({ email: response.email });
            }
        } catch (error) {
            console.error('Authentication check failed:', error);
        } finally {
            setLoading(false);
        }
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
            // Use the reusable authService function for login
            const response = await authService.login(loginEmail, loginPassword, true);

            if (response.success) {
                setSuccessMessage('Login successful!');
                setIsAuthenticated(true);
                setUserData({ email: response.email });
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
            // Use the reusable authService function for signup
            const response = await authService.register({
                email: email,
                password: password,
                confirmPassword: confirmPassword,
            });

            if (response.success) {
                setSuccessMessage('Account created successfully! You are now logged in.');
                setIsAuthenticated(true);
                setUserData({ email: response.email });

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
    const handleForgotPassword = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');
        setLoading(true);

        try {
            // Use authService for forgot password functionality
            await authService.forgotPassword({ email: forgotPasswordEmail });

            setSuccessMessage('If this email exists in our system, you will receive password reset instructions shortly.');
            setForgotPasswordEmail('');
        } catch (error) {
            setErrorMessage('An error occurred. Please try again later.');
            console.error('Forgot password error:', error);
        } finally {
            setLoading(false);
        }
    };

    // Handle logout
    const handleLogout = async () => {
        setLoading(true);
        try {
            // Use the reusable authService function for logout
            await authService.logout();
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

    return (
        <section className="d-flex justify-content-center align-items-center bg-light p-5">
            <div className="mx-auto p-5 bg-white col-md-6">
                {/* Message display */}
                {successMessage && (
                    <div className="mb-3 p-3 bg-success text-white rounded">
                        {successMessage}
                    </div>
                )}
                {errorMessage && (
                    <div className="mb-3 p-3 bg-danger text-white rounded">
                        {errorMessage}
                    </div>
                )}

                {isAuthenticated ? (
                    // User Account View
                    <div className="text-center px-5">
                        <div className="rounded-circle bg-primary d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '80px', height: '80px' }}>
                            <svg className="text-light" fill="none" stroke="currentColor" width="40" height="40" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                            </svg>
                        </div>
                        <h2 className="h4 mb-2">My Account</h2>
                        <p className="text-muted mb-4">{userData?.email}</p>

                        <div className="border-top border-bottom py-3 mb-4">
                            <div className="d-flex align-items-center mb-3">
                                <svg className="text-blue me-2" fill="none" stroke="currentColor" width="30" height="30" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                </svg>
                                <div className='text-start'>
                                    <small className="text-secondary">Email</small>
                                    <div className="fw-medium">{userData?.email}</div>
                                </div>
                            </div>
                            <div className="d-flex align-items-center">
                                <svg className="text-blue me-2" fill="none" stroke="currentColor" width="30" height="30" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                </svg>
                                <div className='text-start'>
                                    <small className="text-secondary">Member Since</small>
                                    <div className="fw-medium">{new Date().toLocaleDateString()}</div>
                                </div>
                            </div>
                        </div>

                        {isAdmin && 
                            <button
                                className="btn btn-primary w-100 mb-3"
                                onClick={() => { navigate('/admin-dashboard') }}
                            >
                                Admin Dashboard
                            </button>
                        }
                        <button
                            className={`btn btn-outline-danger w-100 ${loading && 'disabled'}`}
                            onClick={handleLogout}
                        >
                            {loading ? 'Logging out...' : 'Sign Out'}
                        </button>
                    </div>
                ) : showForgotPassword ? (
                    // Forgot Password View
                    <>
                        <h1 className="fw-bold text-center text-blue mb-4">Reset Your Password</h1>
                        <p className="text-center text-muted mb-4">
                            We will send you an email to reset your password.
                        </p>

                            <form onSubmit={handleForgotPassword}>
                                <div className="mb-3">
                                    <input
                                        type="email"
                                        className="form-control border  py-3"
                                        placeholder="Email"
                                        value={forgotPasswordEmail}
                                        onChange={(e) => setForgotPasswordEmail(e.target.value)}
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100 mb-3"
                                    disabled={loading}
                                >
                                    {loading ? 'Submitting...' : 'Submit'}
                                </button>
                                <button
                                    className="btn btn-outline-secondary w-100"
                                    onClick={() => setShowForgotPassword(false)}
                                    disabled={loading}
                                >
                                    Cancel
                                </button>
                            </form>
                        </>
                    ) : isLoginView ? (
                        // Login View
                        <>
                            <h1 className="fw-bold text-center text-blue mb-4">Login to my account</h1>
                            <p className="text-center text-muted mb-4">
                                Enter your e-mail and password:
                            </p>

                            <form onSubmit={handleLogin}>
                                <div className="mb-3">
                                        <input
                                            type="email"
                                            className="form-control  py-3"
                                            placeholder="Email"
                                            value={loginEmail}
                                            onChange={(e) => setLoginEmail(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="mb-3 position-relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            className="form-control  py-3"
                                            placeholder="Password"
                                            value={loginPassword}
                                            onChange={(e) => setLoginPassword(e.target.value)}
                                            required
                                        />
                                        <button
                                            type='button'
                                            className="btn position-absolute end-0 top-50 translate-middle-y text-secondary hover-text-dark"
                                            onClick={togglePasswordVisibility}
                                        >
                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                        </button>
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn btn-primary w-100 mb-3"
                                        disabled={loading}
                                    >
                                        {loading ? 'Signing in...' : 'Login'}
                                    </button>
                                </form>

                                <div className="mt-3 text-center">
                                    <button
                                        className="btn text-blue hover-text-dark fw-medium"
                                        onClick={() => setShowForgotPassword(true)}
                                    >
                                        Recover password
                                    </button>
                                </div>

                                <div className="mt-4 text-center text-muted text-sm">
                                    <p>This site is protected by hCaptcha and the hCaptcha Privacy</p>
                                    <p>Policy and Terms of Service apply.</p>
                                </div>

                                <div className="mt-4 text-center border-top">
                                    <p className="text-dark mt-5">New customer?
                                        <button
                                            className="btn text-blue hover-text-dark fw-medium"
                                            onClick={() => setIsLoginView(false)}
                                        >
                                            Create your account
                                        </button>
                                    </p>
                                </div>
                            </>
                        ) : (
                                // Signup View
                                <>
                                    <h1 className="fw-bold text-center text-blue mb-4">Create my account</h1>
                                    <p className="text-center text-muted mb-4">
                                        Please fill in the information below:
                                    </p>

                                    <form onSubmit={handleSignup}>
                                        <div className="mb-3">
                                            <input
                                                type="text"
                                                className="form-control py-3"
                                                placeholder="First name"
                                                value={firstName}
                                                onChange={(e) => setFirstName(e.target.value)}
                                                required
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <input
                                                type="text"
                                                className="form-control  py-3"
                                                placeholder="Last name"
                                                value={lastName}
                                                onChange={(e) => setLastName(e.target.value)}
                                                required
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <input
                                                type="email"
                                                className="form-control  py-3"
                                                placeholder="Email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                        </div>

                                        <div className="mb-3 position-relative">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                className="form-control  py-3"
                                                placeholder="Password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                            />
                                            <button
                                                type='button'
                                                className="btn position-absolute end-0 top-50 translate-middle-y text-secondary hover-text-dark"
                                                onClick={togglePasswordVisibility}
                                            >
                                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                                            </button>
                                        </div>

                                        <div className="mb-4 position-relative">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                className="form-control  py-3"
                                                placeholder="Confirm Password"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                required
                                            />
                                            <button
                                                type='button'
                                                className="btn position-absolute btn end-0 top-50 translate-middle-y text-secondary hover-text-dark"
                                                onClick={togglePasswordVisibility}
                                            >
                                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                                            </button>
                                        </div>

                                        <button
                                            type="submit"
                                            className="btn btn-primary w-100 mb-3"
                                            disabled={loading}
                                        >
                                            {loading ? 'Creating Account...' : 'Create my account'}
                                        </button>
                                    </form>

                                    <div className="mt-4 text-center text-muted text-sm">
                                        <p>This site is protected by hCaptcha and the hCaptcha Privacy</p>
                                        <p>Policy and Terms of Service apply.</p>
                                    </div>

                                    <div className="mt-4 text-center border-top pt-4">
                                        <p className="text-dark">Already have an account?
                                            <button
                                                className="btn text-blue hover-text-dark ms-1 fw-medium"
                                                onClick={() => setIsLoginView(true)}
                                            >
                                                Login here
                                            </button>
                                        </p>
                                    </div>
                                </>
                )}
            </div>
        </section>
    );
};

export default LoginSignup;