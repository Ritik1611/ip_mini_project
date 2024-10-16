import React, { useState } from 'react';
import './CheckAttendance.css';
import './login.css';

const CheckAttendance = () => {
    const [division, setDivision] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [subject, setSubject] = useState('');
    const [attendanceData, setAttendanceData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [editRollNo, setEditRollNo] = useState(null);
    const [newStatus, setNewStatus] = useState('');

    const fetchAttendanceByDate = async () => {
        setIsLoading(true);
        try {
            if (!division || !subject || !selectedDate) {
                alert("Please ensure all fields are filled out.");
                return;
            }

            const fetchUrl = `http://localhost:3000/get_attendance.php?division=${division}&subject=${subject}&date=${selectedDate}`;
            const response = await fetch(fetchUrl);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            
            if (Array.isArray(data) && data.length > 0) {
                setAttendanceData(data);
            } else {
                alert("No attendance records found for the selected date and subject.");
                setAttendanceData([]);
            }
        } catch (error) {
            console.error(error);
            alert('Error fetching attendance');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchAttendanceByDate();
    };

    const handleEditClick = (rollNo, currentStatus) => {
        setEditRollNo(rollNo);
        setNewStatus(currentStatus);
    };

    const handleUpdateAttendance = async () => {
        if (!newStatus) {
            alert("Please enter a new attendance status.");
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/update_attendance.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    division,
                    date: selectedDate,
                    subject,
                    roll_no: editRollNo,
                    attendance_status: newStatus,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update attendance');
            }

            const result = await response.json();
            alert(result.message);

            // Refresh attendance data
            fetchAttendanceByDate();
            setEditRollNo(null);
            setNewStatus('');
        } catch (error) {
            console.error(error);
            alert('Error updating attendance');
        }
    };

    return (
        <div style={{ padding: '20px' }} className='container'>
            <h2>Edit Attendance</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="division">Division:</label>
                <input
                    type="text"
                    id="division"
                    value={division}
                    onChange={(e) => setDivision(e.target.value)}
                    placeholder="Enter division"
                    required
                />
                <label htmlFor="subject">Subject:</label>
                <input
                    type="text"
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Enter subject"
                    required
                />
                <label htmlFor="date" style={{ marginLeft: '20px' }}>Date:</label>
                <input
                    type="date"
                    id="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    required
                />
                <button type="submit" className="btn">Check Attendance</button>
            </form>

            {isLoading && <p>Loading...</p>}

            {!isLoading && attendanceData.length > 0 && (
                <table style={{ marginTop: '20px', borderCollapse: 'collapse', width: '100%' }}>
                    <thead>
                        <tr>
                            <th style={{ border: '1px solid #000', padding: '8px' }}>Roll No</th>
                            <th style={{ border: '1px solid #000', padding: '8px' }}>Status</th>
                            <th style={{ border: '1px solid #000', padding: '8px' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attendanceData.map((entry) => (
                            <tr key={entry.roll_no}>
                                <td style={{ border: '1px solid #000', padding: '8px' }}>{entry.roll_no}</td>
                                <td style={{ border: '1px solid #000', padding: '8px' }}>
                                    {editRollNo === entry.roll_no ? (
                                        <input
                                            type="text"
                                            value={newStatus}
                                            onChange={(e) => setNewStatus(e.target.value)}
                                        />
                                    ) : (
                                        entry.attendance_status
                                    )}
                                </td>
                                <td style={{ border: '1px solid #000', padding: '8px' }}>
                                    {editRollNo === entry.roll_no ? (
                                        <button onClick={handleUpdateAttendance}>Update</button>
                                    ) : (
                                        <button onClick={() => handleEditClick(entry.roll_no, entry.attendance_status)}>Edit</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {!isLoading && attendanceData.length === 0 && <p>No attendance records found.</p>}
        </div>
    );
};

export default CheckAttendance;
