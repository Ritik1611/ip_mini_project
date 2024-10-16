import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './dashboard.css';
import { Helmet } from 'react-helmet';

const StudentDashboard = () => {
    const [attendanceData, setAttendanceData] = useState([]);
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
            const fetchAttendance = async () => {
                try {
                    const response = await fetch('http://localhost:3000/student_attendance.php', {
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
                        setAttendanceData(data.attendance);
                    } else {
                        setError(data.message);
                    }
                } catch (err) {
                    setError('Failed to fetch attendance data.');
                }
            };

            fetchAttendance();
        }
    }, [student]);

    return (
        <div className="dashboard-container">
            <Helmet>
                <title>Check Attendance - Scholarly</title>
            </Helmet>

            <h1>Welcome, {student.name}</h1>

            {error && <p className="error">{error}</p>}

            <h2>Your Attendance</h2>
            {attendanceData.length > 0 ? (
                <table className="attendance-table">
                    <thead>
                        <tr>
                            <th>Subject</th>
                            <th>Total Classes</th>
                            <th>Classes Attended</th>
                            <th>Attendance Percentage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attendanceData.map((record, index) => (
                            <tr key={index}>
                                <td>{record.subjects}</td>
                                <td>{record.total_classes}</td>
                                <td>{record.attended_classes}</td>
                                <td>{((record.attended_classes / record.total_classes) * 100).toFixed(2)}%</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No attendance data available.</p>
            )}
        </div>
    );
};

export default StudentDashboard;
