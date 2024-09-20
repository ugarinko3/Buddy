// src/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
// Создаем контекст
const AuthContext = createContext();

// Провайдер аутентификации
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        let timer;

        const handleActivity = () => {
                clearTimeout(timer); // Сбрасываем таймер
                timer = setTimeout(() => {
                    Cookies.remove('access_token');
                    window.location.href = '/';
                }, 1200000); // 5 минут (300000 мс)
        };

        // Добавляем обработчики событий для отслеживания активности
        window.addEventListener('mousemove', handleActivity);
        window.addEventListener('keydown', handleActivity);

        // Убираем обработчики событий при размонтировании компонента
        return () => {
            clearTimeout(timer);
            window.removeEventListener('mousemove', handleActivity);
            window.removeEventListener('keydown', handleActivity);
        };
    }, []);

    const login = () => setIsAuthenticated(true);
    const logout = () => setIsAuthenticated(false);

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Хук для использования контекста
export const useAuth = () => {
    return useContext(AuthContext);
};
