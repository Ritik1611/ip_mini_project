import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './NavBar';
import Login from './Login';
import Signup from './Signup';
import Land from './Land';
import StudentLogin from './StudentLogin';
import AddStudent from './AddStudent';
import AttendanceForm from './AttendanceForm';
import StudentDashboard from './StudentDashboard';

function DashboardLayout() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/add_student' element={<AddStudent />} />
        <Route path='/attendance' element={<AttendanceForm />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path='/' element={<Land />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/student_login' element={<StudentLogin />} />
          <Route path='/dashboard/*' element={<DashboardLayout />} />
          <Route path='/student_dashboard' element={<StudentDashboard />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
