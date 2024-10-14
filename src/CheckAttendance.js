import React, { useState, useEffect } from 'react';
import './CheckAttendance.css'
import './login.css'

const CheckAttendance = ({ division }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [subject, setSubject] = useState('');
  const [attendanceData, setAttendanceData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAttendanceByDate = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3000/get_attendance.php?division=${division}&subject=${subject}&date=${selectedDate}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setAttendanceData(data);
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

  return (
    <div style={{ padding: '20px' }} className='container'>
      <h2>Check Attendance</h2>
      <form onSubmit={handleSubmit}>
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
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((entry) => (
              <tr key={entry.roll_no}>
                <td style={{ border: '1px solid #000', padding: '8px' }}>{entry.roll_no}</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}>{entry.attendance_status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CheckAttendance;
