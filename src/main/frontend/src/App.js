import React, { useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Routes,
    Link
  } from "react-router-dom";
  
import Burger from './pages/header_burger';
import Login from './pages/log_in/login';
import Main from './pages/main';
import Calendar from './pages/calendar';
import Calendar_day from './pages/calendar-day';


function App(){

    return(
        <Router>
            <Routes>
                <Route path="" element={<Login />}/>
                <Route path="/post" element={<Main />}/>
                <Route path="/calendar" element={<Calendar />}/>
                <Route path="/calendar-day" element={<Calendar_day />}/>
            </Routes>
        </Router>
    )
};

export default App;