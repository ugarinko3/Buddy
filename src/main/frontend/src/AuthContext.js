import React, {createContext, useContext, useState, useEffect} from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(() => {
        let timer;

        const handleActivity = () => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                Cookies.remove('access_token');
                window.location.href = '/';
            }, 1200000);
        };
        window.addEventListener('mousemove', handleActivity);
        window.addEventListener('keydown', handleActivity);

        return () => {
            clearTimeout(timer);
            window.removeEventListener('mousemove', handleActivity);
            window.removeEventListener('keydown', handleActivity);
        };
    }, []);

    const login = () => setIsAuthenticated(true);
    const logout = () => setIsAuthenticated(false);

    return (
        <AuthContext.Provider value={{isAuthenticated, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
