import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

import Login from './pages/log_in/login';
import Main from './pages/main';
import Calendar from './pages/calendar';
import Calendar_day from './pages/calendar-day';
import PrivateRoute from './PrivateRoute';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/post" element={<PrivateRoute element={Main} />} />
                <Route path="/calendar" element={<PrivateRoute element={Calendar} />} />
                <Route path="/calendar-day" element={<PrivateRoute element={Calendar_day} />} />
            </Routes>
        </Router>
    );
}

export default App;