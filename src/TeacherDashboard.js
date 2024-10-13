import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './NavBar';
import TeacherDashboard from './TeacherDashboard';
import Login from './Login';
import Signup from './Signup';
import Land from './Land';
import StudentLogin from './StudentLogin';

function DashboardLayout() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='teacher_dashboard' element={<TeacherDashboard />} />
        {/* Add more nested routes here if needed */}
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
          <Route path='/student_dashboard' element={
              <>
                {/* Add student dashboard component here */}
              </>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
