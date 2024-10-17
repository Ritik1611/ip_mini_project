import React, { useState } from 'react';
import './index.css'
import './add_student.css'
import './main.css'
import './dashboard.css'
import * as XLSX from 'xlsx';

const GiveMarks = () => {
  const [division, setDivision] = useState('');
  const [subject, setSubject] = useState('');
  const [rollNumbers, setRollNumbers] = useState([]);
  const [marks, setMarks] = useState({});
  const [error, setError] = useState('');

  const handleFetchRollNumbers = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/get_roll_no.php?division=${division}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if (data.length > 0) {
        setRollNumbers(data);
        setError('');
      } else {
        setRollNumbers([]);
        setError('No roll numbers found for this division.');
      }
    } catch (error) {
      setError(`Error fetching roll numbers: ${error.message}`);
      setRollNumbers([]);
    }
  };

  const handleMarksChange = (roll, value) => {
    setMarks((prevMarks) => ({
      ...prevMarks,
      [roll]: value,
    }));
  };

  const handleSubmitMarks = async (e) => {
    e.preventDefault();
    const finalMarksData = {
      division,
      subject,
      marks,
    };

    try {
      const response = await fetch('http://localhost:3000/submit_final_marks.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(finalMarksData),
      });
      if (!response.ok) {
        throw new Error("Error submitting marks");
      }
      alert('Marks submitted successfully!');
    } catch (error) {
      setError(`Error submitting marks: ${error.message}`);
    }
  };

  // Function to export the table to Excel
  const exportToExcel = () => {
    const tableData = rollNumbers.map(roll => ({
      RollNumber: roll,
      Marks: marks[roll] || '',
    }));

    const worksheet = XLSX.utils.json_to_sheet(tableData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Marks');

    XLSX.writeFile(workbook, `Marks_${division}_${subject}.xlsx`);
  };

  return (
    <div className="container" style={{width:'650px'}}>
      <h1>Give Marks</h1>
      <form onSubmit={handleFetchRollNumbers}>
        <label htmlFor="division">Division:</label>
        <input
          type="text"
          id="division"
          name="division"
          value={division}
          onChange={(e) => setDivision(e.target.value)}
          placeholder="Enter class"
          required
        />

        <label htmlFor="subject">Subject:</label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Enter subject"
          required
        />

        <button type="submit" className="btn">Check Roll Numbers</button>
      </form>

      {error && <p className="error">{error}</p>}

      {rollNumbers.length > 0 && (
        <>
          <form onSubmit={handleSubmitMarks}>
            <h2>Enter Marks for Each Roll Number:</h2>
            <table className="marks-table">
              <thead>
                <tr>
                  <th>Roll Number</th>
                  <th>Marks</th>
                </tr>
              </thead>
              <tbody>
                {rollNumbers.map((roll) => (
                  <tr key={roll}>
                    <td>{roll}</td>
                    <td>
                      <input
                        type="number"
                        name={`marks_${roll}`}
                        placeholder="Enter marks"
                        value={marks[roll] || ''}
                        onChange={(e) => handleMarksChange(roll, e.target.value)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button type="submit" className="btn">Submit Marks</button>
          </form>
          <button className="btn" onClick={exportToExcel}>Export to Excel</button>
        </>
      )}
    </div>
  );
};

export default GiveMarks;
