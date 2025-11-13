import { useEffect, useState } from 'react';

export const isLoggedIn = () => {
    return localStorage.getItem('token') !== null;
};

export const getToken = () => {
    return localStorage.getItem('token');
};

export const setToken = (token) => {
    localStorage.setItem('token', token);
};

export const removeToken = () => {
    localStorage.removeItem('token');
};

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(isLoggedIn());

    useEffect(() => {
        const checkAuth = () => {
            setIsAuthenticated(isLoggedIn());
        };

        checkAuth();
    }, []);

    return { isAuthenticated };
};