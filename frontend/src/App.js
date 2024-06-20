import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Logout from './pages/Logout';
import './styles/dashboard.css';

const App = () => {
    const isAuthenticated = () => {
        return localStorage.getItem('authenticated') === 'true';
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to={isAuthenticated() ? "/dashboard" : "/login"} />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />} />
                <Route path="/logout" element={<Logout />} />
            </Routes>
        </Router>
    );
};

export default App;
