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
                <Link to="/dashboard/add_student" className="nav-item">Add a Student</Link>
                <Link to="/dashboard/attendance" className="nav-item">Take Attendance</Link>
                <Link to="/dashboard/check_attendance" className='nav-item'>Edit Attendance</Link>
                <Link to="/dashboard/give_marks" className='nav-item'>Give Marks</Link>
            </div>
            <div className="settings">
                <button className="settings-btn" onClick={toggleDropdown}>
                    <img src="/settings-icon.png" alt="Settings" className="settings-icon" />
                </button>
                {dropdownVisible && (
                    <div className="dropdown-menu">
                        <Link to="/profile" className="dropdown-item">Profile</Link>
                        <Link to="/" className="dropdown-item">Logout</Link>
                    </div>
                )}
            </div>
        </header>
  );
}

export default NavBar;
