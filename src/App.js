import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './NavBar';
import TeacherDashboard from './TeacherDashboard';
import Login from './Login';
import Signup from './Signup';

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route
            path='/dashboard'
            element={
              <>
                <NavBar />
                <Routes>
                  <Route path='/teacher_dashboard' element={<TeacherDashboard />} />
                  {/* <Route path="/attendance" element={<Attendance />} /> */}
                </Routes>
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
