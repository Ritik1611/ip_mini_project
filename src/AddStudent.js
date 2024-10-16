import React, { useState } from 'react';
import './add_student.css';
import './index.css';
import './main.css'
import { Helmet } from 'react-helmet';

const AddStudent = () => {
  const [studentName, setStudentName] = useState('');
  const [studentDivision, setStudentDivision] = useState('');
  const [studentRollNo, setStudentRollNo] = useState('');
  const [studentPassword, setStudentPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('student-name', studentName);
    formData.append('student-division', studentDivision);
    formData.append('student-rollno', studentRollNo);
    formData.append('student-password', studentPassword);

    const response = await fetch('http://localhost:3000/add_student.php', {
      method: 'POST',
      body: formData,
    });

    const data = await response.text();
    alert(data);
  };

  return (
    <div className="dashboard-section main-content" style={{opacity:'0.5', width:'600px'}}>
      <Helmet>
        <title>Add Student</title>
      </Helmet>
      <h2 style={{paddingBottom:'50px'}}>Add a Student</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="student-name">Name:</label>
        <input
          type="text"
          id="student-name"
          name="student-name"
          placeholder="Enter student's name"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          required
        />

        <label htmlFor="student-division">Division:</label>
        <input
          type="text"
          id="student-division"
          name="student-division"
          placeholder="Enter division"
          value={studentDivision}
          onChange={(e) => setStudentDivision(e.target.value)}
          required
        />

        <label htmlFor="student-rollno">Roll No:</label>
        <input
          type="number"
          id="student-rollno"
          name="student-rollno"
          placeholder="Enter roll number"
          value={studentRollNo}
          onChange={(e) => setStudentRollNo(e.target.value)}
          required
        />

        <label htmlFor="student-password">Password:</label>
        <input
          type="password"
          id="student-password"
          name="student-password"
          placeholder="Enter password"
          value={studentPassword}
          onChange={(e) => setStudentPassword(e.target.value)}
          required
        />

        <button className="btn" type="submit" style={{marginTop:'80px'}}>Add Student</button>
      </form>
    </div>
  );
}

export default AddStudent;
