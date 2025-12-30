import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { FiMenu, FiX } from "react-icons/fi";

function Navbar({ onAuthChange }) {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Check for admin token
  useEffect(() => {
    setIsAdmin(!!localStorage.getItem("token"));
  }, []);

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setIsAdmin(false);
    onAuthChange?.();
    navigate("/");
    setIsMenuOpen(false);
  };

  // Handle link clicks on mobile
  const handleNavClick = () => {
    if (isMobile) {
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="pro-navbar">
      <div className="logo">CoffeeHouse</div>

      {/* Hamburger Menu Button (Mobile Only) */}
      <button 
        className="menu-toggle" 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Navigation Links */}
      <div className={`nav-links ${isMenuOpen ? "nav-links-active" : ""}`}>
        <Link to="/" className="nav-box" onClick={handleNavClick}>Home</Link>
        <Link to="/menu" className="nav-box" onClick={handleNavClick}>Drink</Link>
        <Link to="/dessert" className="nav-box" onClick={handleNavClick}>Dessert</Link>
        <Link to="/about" className="nav-box" onClick={handleNavClick}>About</Link>
        <Link to="/contact" className="nav-box" onClick={handleNavClick}>Contact</Link>

        <Link to="/admin" className="nav-box" onClick={handleNavClick}>
          {isAdmin ? "Admin Panel" : "Admin Login"}
        </Link>

        {isAdmin && (
          <button
            className="nav-box logout-btn"
            onClick={logout}
          >
            Logout
          </button>
        )}
      </div>

      {/* Overlay for mobile menu */}
      {isMenuOpen && <div className="nav-overlay" onClick={() => setIsMenuOpen(false)} />}
    </nav>
  );
}

export default Navbar;