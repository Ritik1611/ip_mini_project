import React from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import { Helmet } from 'react-helmet';

const StudentLogin = () => {
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        const username = e.target.username.value;
        const password = e.target.password.value;
        const division = e.target.division.value; 
        const rollNumber = e.target.rollNumber.value; 

        console.log("Sending data:", { username, password, division, rollNumber }); // Debugging line
        
        try {
            const response = await fetch('http://localhost:3000/student_login.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password, division, rollNumber }),
            });

            const data = await response.json();
            console.log("Response data:", data);
            
            if (data.status === 'success') {
                alert(data.message);
                navigate('/student_dashboard');
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="container">
            <Helmet>Scholarly - Student Login</Helmet>
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

                <label htmlFor="division">Division</label>
                <input 
                    type="text" 
                    id="division" 
                    name="division" 
                    placeholder="Enter your division" 
                    required 
                />

                <label htmlFor="rollNumber">Roll Number</label>
                <input 
                    type="number" 
                    id="rollNumber" 
                    name="rollNumber" 
                    placeholder="Enter your roll number"
                    min="1"
                    max="99" 
                    required 
                />
                <br></br>
                <button className="btn" type="submit">Login</button>
            </form>
        </div>
    );
};

export default StudentLogin;
