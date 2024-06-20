import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/dashboard.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username === 'Admin' && password === 'Welcome@123') {
            localStorage.setItem('authenticated', 'true');
            navigate('/dashboard'); // Navigate to the dashboard
        } else {
            alert('Invalid username or password');
        }
    };

    return (
        <div className="login-container">
            <p>
                <img src="images/logo.png" alt="DealsDray logo" height={110} width={110} />
            </p>
            <h2>Login Page</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <br /><br />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <br /><br />
                <input type="submit" value="Login" />
            </form>
        </div>
    );
};

export default Login;
