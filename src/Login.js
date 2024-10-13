import React from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import './index.css'
import { Helmet } from 'react-helmet';

const Login = () => {
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault(); 
      
        const username = e.target.username.value;
        const password = e.target.password.value;
      
        try {
            const response = await fetch('http://localhost:3000/login.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
      
            const data = await response.json();
      
            if (data.status === 'success') {
                alert(data.message);
                navigate('/dashboard/add_student');
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    const handleSignUpClick = () => {
        navigate('/signup');
    };

    return (
        <div className="container">
            <Helmet>Scholarly - Login</Helmet>
            <img 
                src="/SCHOLARLY.png" 
                alt="Logo" 
                style={{ height: '250px', width: '250px', opacity: 1 }} 
            />
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input 
                    type="text" 
                    id="username" 
                    name="username" 
                    placeholder="Enter your username" 
                    required 
                />

                <label htmlFor="password">Password</label>
                <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    placeholder="Enter your password" 
                    required 
                />

                <button className="btn" type="submit">Login</button>
                <button 
                    className="btn"  
                    type="button" 
                    onClick={handleSignUpClick}
                >
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default Login;
