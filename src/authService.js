import axios from 'axios';

const baseDomain = "https://localhost:44373/";

// Create a reusable authentication service
const authService = {
    // Check if user is authenticated
    checkAuthStatus: async () => {
        try {
            const response = await axios.get(`${baseDomain}api/AccountApi/CheckAuthStatus`, {
                withCredentials: true
            });
            if (response.data.isAdmin) sessionStorage.setItem('isAdmin', true);
            else sessionStorage.removeItem('isAdmin');
            return response.data;
        } catch (error) {
            console.error('Auth check error:', error);
            return { isAuthenticated: false, isAdmin: false };
        }
    },

    // Login user
    login: async (email, password, isAdmin, rememberMe = false) => {
        try {
            const response = await axios.post(`${baseDomain}api/AccountApi/Login`, {
                email,
                password,
                isAdmin,
                rememberMe
            }, {
                withCredentials: true
            });
            response.data.isAdmin && sessionStorage.setItem('isAdmin', response.data.isAdmin);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Register new user
    register: async (userData) => {
        try {
            const response = await axios.post(`${baseDomain}api/AccountApi/Register`, userData, {
                withCredentials: true
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Logout user
    logout: async () => {
        try {
            const response = await axios.post(`${baseDomain}api/AccountApi/Logout`, {}, {
                withCredentials: true
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};

export default authService;
