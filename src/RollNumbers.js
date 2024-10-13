import React, { useState } from 'react';

const RollNumbers = ({ rollNumbers, subject, setSubject, division }) => {
  const [attendanceData, setAttendanceData] = useState({});

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
      body: JSON.stringify({ subject, attendanceData, division }), // Include division here
    });
    
    if (response.ok) {
      alert('Attendance submitted successfully!');
    } else {
      alert('Failed to submit attendance.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{padding:'20px'}}>
      <label htmlFor="subject">Name of the Subject:</label>
      <input
        type="text"
        id="subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        placeholder="Enter subject"
        required
      />

      <div id="rollNumbers" className="roll-numbers" style={{paddingTop:'50px'}}>
        <h2 style={{fontSize:'25px', paddingBottom:'20px'}}>Select Roll Numbers and Attendance Status:</h2>
        {rollNumbers.map((roll) => (
          <div key={roll}>
            <input
              type="checkbox"
              name={`roll_no[]`}
              value={roll}
              onChange={(e) => handleAttendanceChange(roll, e.target.checked ? 'Present' : 'Absent')}
              defaultChecked
            />
            Roll No: {roll}

            <label>
              Present
              <input
                type="radio"
                name={`attendance_status_${roll}`}
                value="Present"
                defaultChecked
                onChange={() => handleAttendanceChange(roll, 'Present')}
              />
            </label>
            <label>
              Absent
              <input
                type="radio"
                name={`attendance_status_${roll}`}
                value="Absent"
                onChange={() => handleAttendanceChange(roll, 'Absent')}
              />
            </label>
          </div>
        ))}
      </div>
      <button type="submit" className="btn">Submit Attendance</button>
    </form>
  );
};

export default RollNumbers;
