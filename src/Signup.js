import React from 'react';
import {useNavigate} from 'react-router-dom';
import './login.css';
import {Helmet} from 'react-helmet';

const Signup = () => {
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();

        const username = e.target.username.value;
        const password = e.target.password.value;
        const email = e.target.email.value;

        try {
            const response = await fetch('http://localhost:3000/signup.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username, password, email})
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
        }
    };

    return (
        <div className="container">
            <Helmet>Scholarly - Signup</Helmet>
            <img
                src="/SCHOLARLY.png"
                alt="Logo"
                style={{
                height: '250px',
                width: '250px',
                opacity: 1
            }}/>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Enter your username"
                    required/>

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    required/>

                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    required/>

                <button className="btn" type="submit">Sign Up</button>
                <button className="btn" 
                    onClick={() => window.location.href = '/login'}>
                    Login
                </button>
            </form>
        </div>
    );
}

export default Signup;
