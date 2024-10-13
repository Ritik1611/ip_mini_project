import React from 'react'
import {Helmet} from 'react-helmet';
import './index.css'
import './land.css'
import { useNavigate } from 'react-router-dom';

const Land = () => {
    const navigate = useNavigate();
    
    const handlestudent = () => {
        navigate('/student_login');
    }
    
    const handleteacher = () => {
        navigate('/login');
    }
    
    return (
        <>
            <Helmet>
                <title>Role Selection</title>
            </Helmet>
            {/* Note: <body> tags are not recommended inside JSX */}
            <div className="cards-container">
                <div className="card" onClick={handlestudent}>
                    <h2>Student</h2>
                    <p>Click here if you are a student.</p>
                </div>
                <div className="card" onClick={handleteacher}>
                    <h2>Teacher</h2>
                    <p>Click here if you are a teacher.</p>
                </div>
            </div>
        </>
    );
}

export default Land;
