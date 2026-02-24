import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div style={styles.sidebar}>
      <div style={styles.logoSection}>
        <h3 style={styles.heading}>🚗 GarageMaster</h3>
        <p style={styles.subtitle}>Admin Panel</p>
      </div>
      
      <nav style={styles.navContainer}>
        <ul style={styles.navList}>
          <li style={styles.navItem}>
            <Link to="/admin-dashboard" style={styles.link}>
              <span style={styles.icon}>📊</span>
              Dashboard
            </Link>
          </li>
          <li style={styles.navItem}>
            <Link to="/staff" style={styles.link}>
              <span style={styles.icon}>👥</span>
              Staff Management
            </Link>
          </li>
          <li style={styles.navItem}>
            <Link to="/customer" style={styles.link}>
              <span style={styles.icon}>👤</span>
              Customer Management
            </Link>
          </li>
          <li style={styles.navItem}>
            <Link to="/assign-task" style={styles.link}>
              <span style={styles.icon}>✅</span>
              Assign Tasks
            </Link>
          </li>
          <li style={styles.navItem}>
            <Link to="/inventory-management" style={styles.link}>
              <span style={styles.icon}>📦</span>
              Inventory
            </Link>
          </li>
          <li style={styles.navItem}>
            <Link to="/accept-request" style={styles.link}>
              <span style={styles.icon}>📋</span>
              Accept Requests
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

const styles = {
  sidebar: {
    width: "280px",
    height: "100vh",
    background: "linear-gradient(180deg, rgba(10,10,10,0.95) 0%, rgba(0,0,0,1) 100%)",
    backdropFilter: "blur(20px)",
    color: "rgb(255,255,255)",
    position: "fixed",
    top: "80px",  // ✅ BELOW HEADER (adjust if your header is different height)
    left: 0,
    zIndex: 1000,
    padding: "40px 0",
    boxShadow: "8px 0 40px rgba(230,30,50,0.15)",
    borderRight: "1px solid rgba(255,255,255,0.1)",
    overflowY: "auto"
  },
  logoSection: {
    padding: "0 30px 40px",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
    marginBottom: "30px"
  },
  heading: {
    fontSize: "28px",
    fontWeight: "900",
    background: "linear-gradient(135deg, rgb(230,30,50), rgb(255,255,255))",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    margin: "0 0 8px 0",
    letterSpacing: "-1px"
  },
  subtitle: {
    color: "rgba(255,255,255,0.7)",
    fontSize: "14px",
    margin: 0,
    fontWeight: "500"
  },
  navContainer: {
    padding: "0 20px"
  },
  navList: {
    listStyle: "none",
    padding: 0,
    margin: 0
  },
  navItem: {
    marginBottom: "8px"
  },
  link: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    color: "rgba(255,255,255,0.9)",
    textDecoration: "none",
    padding: "16px 24px",
    borderRadius: "20px",
    fontSize: "16px",
    fontWeight: "600",
    transition: "all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.08)",
    backdropFilter: "blur(10px)"
  },
  icon: {
    fontSize: "20px",
    width: "24px",
    textAlign: "center"
  }
};
