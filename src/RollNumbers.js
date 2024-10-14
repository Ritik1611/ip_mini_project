import React, { useState, useEffect } from 'react';

const RollNumbers = ({ rollNumbers, subject, setSubject, division }) => {
  const [attendanceData, setAttendanceData] = useState({});

  useEffect(() => {
    const initialData = {};
    rollNumbers.forEach(roll => {
      initialData[roll] = 'Present'; 
    });
    setAttendanceData(initialData);
  }, [rollNumbers]);

  const handleAttendanceChange = (rollNo, status) => {
    setAttendanceData(prev => ({
      ...prev,
      [rollNo]: status,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:3000/submit_attendance.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ subject, attendanceData, division }),
    });

    if (response.ok) {
      alert('Attendance submitted successfully!');
    } else {
      alert('Failed to submit attendance.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '20px' }}>
      <label htmlFor="subject">Name of the Subject:</label>
      <input
        type="text"
        id="subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        placeholder="Enter subject"
        required
      />

      <div id="rollNumbers" className="roll-numbers" style={{ paddingTop: '50px' }}>
        <h2 style={{ fontSize: '25px', paddingBottom: '20px' }}>
          Select Roll Numbers and Attendance Status:
        </h2>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Roll No</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Present</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Absent</th>
            </tr>
          </thead>
          <tbody>
            {rollNumbers.map((roll) => (
              <tr key={roll}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{roll}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>
                  <input
                    type="radio"
                    name={`attendance_status_${roll}`}
                    value="Present"
                    checked={attendanceData[roll] === 'Present'}
                    onChange={() => handleAttendanceChange(roll, 'Present')}
                  />
                </td>
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>
                  <input
                    type="radio"
                    name={`attendance_status_${roll}`}
                    value="Absent"
                    checked={attendanceData[roll] === 'Absent'}
                    onChange={() => handleAttendanceChange(roll, 'Absent')}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button type="submit" className="btn" style={{ marginTop: '20px' }}>Submit Attendance</button>
    </form>
  );
};

export default RollNumbers;
