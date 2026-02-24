import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assests/logo-main.png"; // ✅ Your logo import

export default function Header() {
  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid px-4">
          {/* Brand Name WITH LOGO */}
          <NavLink className="navbar-brand fw-bold d-flex align-items-center gap-2" to="/" end>
            <img src={logo} alt="Garage Master Logo" className="navbar-logo" />
            <span>GARAGE MASTER</span>
          </NavLink>
          
          {/* Toggler Button for Mobile */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          
          {/* Navbar Links */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <NavLink 
                  to="/" 
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  end
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink 
                  to="/contact" 
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  Contact Us
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink 
                  to="/about" 
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink 
                  to="/register" 
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  Register
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink 
                  to="/login" 
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  Login
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@700;800;900&display=swap');
        
        /* COLOR SCHEME: rgb(0,0,0), rgb(230,30,50), rgb(255,255,255), rgb(179,179,179) */
        
        .navbar {
          background: rgb(0,0,0) !important;
          border-bottom: 3px solid rgba(230,30,50,0.8);
          box-shadow: 0 4px 20px rgba(230,30,50,0.3);
          padding: 1rem 0;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
          position: sticky;
          top: 0;
          z-index: 1000;
        }

        /* LOGO STYLES */
        .navbar-logo {
          width: 45px;
          height: 45px;
          object-fit: contain;
          filter: brightness(0) invert(1) drop-shadow(0 2px 4px rgba(230,30,50,0.3));
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .navbar-brand:hover .navbar-logo {
          filter: brightness(0) invert(0.3) sepia(1) saturate(3) hue-rotate(330deg);
          transform: rotate(360deg) scale(1.1);
        }

        /* GARAGE MASTER TEXT - SPECIAL FONT */
        .navbar-brand span {
          font-family: 'Poppins', sans-serif;
          font-weight: 900 !important;
          font-size: 1rem;
          background: linear-gradient(135deg, rgb(255,255,255), rgb(230,30,50));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: 1px;
          text-shadow: 2px 2px 4px rgba(230,30,50,0.5);
          position: relative;
        }

        .navbar-brand {
          color: rgb(255,255,255) !important;
          font-size: 1.8rem;
          font-weight: 800;
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          position: relative;
          text-decoration: none;
        }

        .navbar-brand::before {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 0;
          height: 3px;
          background: linear-gradient(90deg, transparent, rgb(230,30,50), transparent);
          transition: width 0.4s ease;
        }

        .navbar-brand:hover {
          transform: scale(1.05);
        }

        .navbar-brand:hover::before {
          width: 100%;
        }

        /* Toggler Button */
        .navbar-toggler {
          border: 2px solid rgba(230,30,50,0.8);
          border-radius: 8px;
          padding: 0.5rem;
          transition: all 0.3s ease;
        }

        .navbar-toggler:hover {
          border-color: rgb(230,30,50);
          box-shadow: 0 5px 15px rgba(230,30,50,0.3);
        }

        .navbar-toggler:focus {
          box-shadow: 0 0 0 0.25rem rgba(230,30,50,0.25);
        }

        .navbar-toggler-icon {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28230,30,50,1%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
        }

        /* Navigation Links */
        .nav-link {
          color: rgba(179,179,179,0.9) !important;
          font-weight: 500;
          padding: 0.75rem 1.5rem !important;
          margin: 0 0.25rem;
          border-radius: 25px;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          position: relative;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          font-size: 0.92rem;
          overflow: hidden;
          font-family: 'Poppins', sans-serif;
        }

        .nav-link::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(142, 7, 21, 0.1), transparent);
          transition: left 0.6s;
        }

        .nav-link:hover::before {
          left: 100%;
        }

        .nav-link:hover {
          color: rgb(255,255,255) !important;
          background: rgba(230,30,50,0.15);
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(230,30,50,0.25);
        }

        /* Active Links */
        .nav-link.active {
          color: rgb(255,255,255) !important;
          background: linear-gradient(135deg, rgb(230,30,50), rgba(230,30,50,0.9)) !important;
          box-shadow: 0 10px 30px rgba(230,30,50,0.5) !important;
          border: 2px solid rgba(255,255,255,0.3);
          transform: translateY(-4px) scale(1.03);
          text-shadow: 0 1px 3px rgba(0,0,0,0.8);
          position: relative;
        }

        .nav-link.active::after {
          content: '●';
          position: absolute;
          top: -8px;
          right: -8px;
          width: 12px;
          height: 12px;
          background: rgb(255,255,255);
          color: rgb(255,255,255);
          border-radius: 50%;
          font-size: 10px;
          line-height: 12px;
          animation: activePulse 2s infinite;
          box-shadow: 0 0 10px rgba(255,255,255,0.8);
        }

        @keyframes activePulse {
          0% { 
            box-shadow: 0 0 0 0 rgba(255,255,255,0.8);
            transform: scale(1);
          }
          50% { 
            box-shadow: 0 0 0 8px rgba(255,255,255,0);
            transform: scale(1.1);
          }
          100% { 
            box-shadow: 0 0 0 0 rgba(255,255,255,0);
            transform: scale(1);
          }
        }

        /* Mobile Menu */
        @media (max-width: 991.98px) {
          .navbar-nav {
            background: rgba(0,0,0,0.98);
            margin-top: 1rem;
            padding: 1.5rem;
            border-radius: 20px;
            border: 2px solid rgba(230,30,50,0.4);
            backdrop-filter: blur(20px);
            box-shadow: 0 15px 40px rgba(230,30,50,0.2);
          }
          
          .navbar-nav .nav-item {
            margin: 0.5rem 0;
          }
          
          .nav-link {
            margin: 0 !important;
            text-align: center;
            font-size: 1.15rem;
            padding: 1rem 2rem !important;
          }
          
          .navbar-logo {
            width: 40px;
            height: 40px;
          }
          
          .navbar-brand span {
            font-size: 1.6rem;
          }
        }

        @media (max-width: 576px) {
          .container-fluid {
            padding-left: 1rem;
            padding-right: 1rem;
          }
          
          .navbar-brand span {
            font-size: 1.4rem;
          }
        }
      `}</style>
    </>
  );
}
