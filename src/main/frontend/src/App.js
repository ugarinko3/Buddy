import React from 'react';
import { AuthProvider } from './AuthContext'; // Убедитесь, что путь правильный
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import Login from './pages/log_in/login';
import Post from './pages/post/post';
import Calendar from './pages/calendar/calendar';
import Profile from './pages/profile/profile';
import PrivateRoute from './PrivateRoute';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/post" element={<PrivateRoute element={Post} />} />
                    <Route path="/calendar" element={<PrivateRoute element={Calendar} />} />
                    <Route path="/profile" element={<PrivateRoute element={Profile} />} />
                    {/* Добавьте обработку 404, если необходимо */}
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;