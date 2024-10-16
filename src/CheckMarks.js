import React, { useState, useEffect, useCallback } from 'react';
import * as XLSX from 'xlsx';
import './index.css';
import './add_student.css';
import './main.css';

const CheckMarks = () => {
  const [marksData, setMarksData] = useState([]);
  const [error, setError] = useState('');
  const [rollNo, setRollNo] = useState(''); // State for roll number
  const [division, setDivision] = useState(''); // State for division

  // Fetch the marks for the student based on roll number and division
  const fetchMarks = useCallback(async () => {
    try {
      if (!rollNo || !division) {
        throw new Error('Please enter both roll number and division.');
      }

      const response = await fetch(`http://localhost:3000/get_marks.php?roll_no=${rollNo}&division=${division}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch marks');
      }

      const data = await response.json();

      if (data.status === 'success') {
        setMarksData(data.marks); // Assuming the marks data is in data.marks
        setError('');
      } else {
        throw new Error(data.message || 'Failed to retrieve marks');
      }
    } catch (error) {
      setError(`Error fetching marks: ${error.message}`);
    }
  }, [rollNo, division]); // Adding rollNo and division as dependencies

  // Function to export marks data to Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(marksData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Marks');
    XLSX.writeFile(workbook, `Marks_${new Date().toLocaleDateString()}.xlsx`);
  };

  return (
    <div className="container">
      <h1>Check Marks</h1>

      {/* Input fields for roll number and division */}
      <div>
        <input 
          type="text" 
          placeholder="Enter Roll Number" 
          value={rollNo} 
          onChange={(e) => setRollNo(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Enter Division" 
          value={division} 
          onChange={(e) => setDivision(e.target.value)} 
        />
        <button onClick={fetchMarks}>Fetch Marks</button>
      </div>

      {error && <p className="error">{error}</p>}

      {marksData.length > 0 ? (
        <>
          <table className="marks-table">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Marks</th>
              </tr>
            </thead>
            <tbody>
              {marksData.map((mark, index) => (
                <tr key={index}>
                  <td>{mark.subject}</td>
                  <td>{mark.marks}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <button className="btn" onClick={exportToExcel}>Export as Excel</button>
        </>
      ) : (
        <p>No marks available to display.</p>
      )}
    </div>
  );
};

export default CheckMarks;
