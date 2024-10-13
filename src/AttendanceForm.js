import React, { useState } from 'react';
import RollNumbers from './RollNumbers';
import './login.css'
import './main.css'
import { Helmet } from 'react-helmet';

const AttendanceForm = () => {
  const [division, setDivision] = useState('');
  const [rollNumbers, setRollNumbers] = useState([]);
  const [showRollNumbers, setShowRollNumbers] = useState(false);
  const [subject, setSubject] = useState('');

  const handleDivisionChange = (e) => {
    setDivision(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:3000/get_roll_no.php?division=${division}`);
    const data = await response.json();
    if (Array.isArray(data) && data.length > 0) {
      setRollNumbers(data);
      setShowRollNumbers(true);
    } else {
      alert('No roll numbers found for this division.');
      setShowRollNumbers(false);
    }
  };

  return (
    <div className='container main-content' style={{width:'640px'}}>
      <Helmet>
        <title>Attendance Management</title>
      </Helmet>
      <form onSubmit={handleSubmit}>
        <label htmlFor="division">Division:</label>
        <input
          type="text"
          id="division"
          value={division}
          onChange={handleDivisionChange}
          placeholder="Enter class"
          required
        />
        <button type="submit" className="btn">Check Roll Numbers</button>
      </form>

      {showRollNumbers && (
        <RollNumbers rollNumbers={rollNumbers} subject={subject} setSubject={setSubject} division={division} />
      )}
    </div>
  );
};

export default AttendanceForm;
