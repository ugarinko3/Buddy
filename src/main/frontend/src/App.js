import React from 'react';
import { AuthProvider } from './AuthContext'; // Убедитесь, что путь правильный
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import Login from './pages/log_in/login';
import Main from './pages/main';
import Calendar from './pages/calendar';
import Calendar_day from './pages/calendar-day';
import PrivateRoute from './PrivateRoute';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/post" element={<PrivateRoute element={Main} />} />
                    <Route path="/calendar" element={<PrivateRoute element={Calendar} />} />
                    <Route path="/calendar-day" element={<PrivateRoute element={Calendar_day} />} />
                    {/* Добавьте обработку 404, если необходимо */}
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;