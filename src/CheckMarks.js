import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './dashboard.css';
import { Helmet } from 'react-helmet';

const CheckMarks = () => {
    const [marksData, setMarksData] = useState([]);
    const [student, setStudent] = useState({
        name: '',
        roll_no: null,
        division: ''
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loggedStudent = JSON.parse(localStorage.getItem('student'));
        if (loggedStudent) {
            setStudent(loggedStudent);
        } else {
            navigate('/student_login');
        }
    }, [navigate]);

    useEffect(() => {
        if (student.roll_no && student.division) {
            const fetchMarks = async () => {
                try {
                    const response = await fetch('http://localhost:3000/get_marks.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            roll_no: student.roll_no,
                            division: student.division,
                        }),
                    });

                    const data = await response.json();
                    if (data.status === 'success') {
                        setMarksData(data.marks);
                    } else {
                        setError(data.message);
                    }
                } catch (err) {
                    setError('Failed to fetch marks data.');
                }
            };

            fetchMarks();
        }
    }, [student]);

    return (
        <div className="dashboard-container">
            <Helmet>
                <title>Check Marks - Scholarly</title>
            </Helmet>

            <h1>Welcome, {student.name}</h1>

            {error && <p className="error">{error}</p>}

            <h2>Your Marks</h2>
            {marksData.length > 0 ? (
                <table className="marks-table">
                    <thead>
                        <tr>
                            <th>Subject</th>
                            <th>Marks</th>
                        </tr>
                    </thead>
                    <tbody>
                        {marksData.map((record, index) => (
                            <tr key={index}>
                                <td>{record.subjects}</td>
                                <td>{record.marks}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No marks available to display.</p>
            )}
        </div>
    );
};

export default CheckMarks;
