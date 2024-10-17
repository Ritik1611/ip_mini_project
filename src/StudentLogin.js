import React from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import { Helmet } from 'react-helmet';

const StudentLogin = () => {
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault(); 
      
        const names = e.target.names.value; 
        const password = e.target.password.value;
        const division = e.target.division.value; 
        const roll_no = e.target.roll_no.value; 
      
        try {
            const response = await fetch('http://localhost:3000/student_login.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ names, password, division, roll_no }), 
            });
      
            const data = await response.json();
      
            if (data.status === 'success') {
                localStorage.setItem('student', JSON.stringify({
                    name: names, 
                    roll_no: roll_no, 
                    division: division,
                    student_id: data.data.student_id // Access student_id inside data object
                }));

                alert(data.message);
                navigate('/student_dashboard/check_attendance');
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
            <Helmet>
                <title>Scholarly - Student Login</title>
            </Helmet>
            <img 
                src="/SCHOLARLY.png" 
                alt="Logo" 
                style={{ height: '250px', width: '250px', opacity: 1 }} 
            />
            <form onSubmit={handleSubmit}>
                <label htmlFor="names">Username</label>
                <input 
                    type="text" 
                    id="names" 
                    name="names" 
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

                <label htmlFor="roll_no">Roll Number</label>
                <input 
                    type="number" 
                    id="roll_no" 
                    name="roll_no"
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
