import axios from 'axios';

const API_URL = 'http://localhost:3000';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Function to register a user
export const registerUser = async (userData) => {
    const response = await api.post('/user/register', userData);
    return response.data;
};

// Function to login a user
export const loginUser = async (credentials) => {
    const response = await api.post('/user/login', credentials);
    return response.data;
};

// Function to verify email
export const verifyEmail = async (token) => {
    const response = await api.post('/user/verify', {}, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

// Function to fetch user data
export const fetchUserData = async (token) => {
    const response = await api.get('/user/profile', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export default api;