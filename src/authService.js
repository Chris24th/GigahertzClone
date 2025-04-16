
const baseDomain = "https://localhost:44373/";

// Create a reusable authentication service
const authService = {
    // Check if user is authenticated
    checkAuthStatus: async () => {
        try {
            const response = await axios.get(`${baseDomain}api/AccountApi/CheckAuthStatus`);
            return response.data;
        } catch (error) {
            console.error('Auth check error:', error);
            return { isAuthenticated: false };
        }
    },

    // Login user
    login: async (email, password, rememberMe = false) => {
        try {
            const response = await axios.post(`${baseDomain}api/AccountApi/Login`, {
                email,
                password,
                rememberMe
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Register new user
    register: async (userData) => {
        try {
            const response = await axios.post(`${baseDomain}api/AccountApi/Register`, userData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Logout user
    logout: async () => {
        try {
            const response = await axios.post(`${baseDomain}api/AccountApi/Logout`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};
