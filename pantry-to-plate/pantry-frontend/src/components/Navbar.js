import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="brand-icon">🍳</span>
        <span className="brand-name">Pantry to Plate</span>
      </div>

      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
        <span></span><span></span><span></span>
      </button>

      <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <li>
          <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''} onClick={() => setMenuOpen(false)}>
            Discover
          </NavLink>
        </li>
        <li>
          <NavLink to="/box" className={({ isActive }) => isActive ? 'active' : ''} onClick={() => setMenuOpen(false)}>
            My Recipe Box
          </NavLink>
        </li>
        <li>
          <NavLink to="/planner" className={({ isActive }) => isActive ? 'active' : ''} onClick={() => setMenuOpen(false)}>
            Meal Planner
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
