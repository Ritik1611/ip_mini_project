import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './index.css'
import './navbar.css'

const NavBar = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
        <header className="navbar">
            <div className="navbar-items">
                <Link to="dashboard/teacher_dashboard" className="nav-item">Dashboard</Link>
                <Link to="/add_student" className="nav-item">Add a Student</Link>
                <Link to="/attendance" className="nav-item">Take Attendance</Link>
            </div>
            <div className="settings">
                <button className="settings-btn" onClick={toggleDropdown}>
                    <img src="/settings-icon.png" alt="Settings" className="settings-icon" />
                </button>
                {dropdownVisible && (
                    <div className="dropdown-menu">
                        <Link to="/profile" className="dropdown-item">Profile</Link>
                        <Link to="/settings" className="dropdown-item">Settings</Link>
                        <button className="dropdown-item" onClick={() => alert('Logout action')}>Logout</button>
                    </div>
                )}
            </div>
        </header>
  );
}

export default NavBar;
