import React from 'react';
import { FaHome, FaSearch, FaBell, FaEnvelope, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../styles/Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/" className="sidebar__link">
        <FaHome /> Home
      </Link>
      <Link to="/search" className="sidebar__link">
        <FaSearch /> Search
      </Link>
      <Link to="/notifications" className="sidebar__link">
        <FaBell /> Notifications
      </Link>
      <Link to="/messages" className="sidebar__link">
        <FaEnvelope /> Messages
      </Link>
      <Link to="/profile" className="sidebar__link">
        <FaUser /> Profile
      </Link>
      <Link to="/logout" className="sidebar__link">
        <FaSignOutAlt /> Logout
      </Link>
    </div>
  );
};

export default Sidebar;
