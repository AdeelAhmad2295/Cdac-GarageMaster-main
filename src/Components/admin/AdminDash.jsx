import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminHeader from "./Header";

export default function AdminDash() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div style={styles.wrapper}>
      {/* Header FIRST - Logo always visible */}
      <AdminHeader />
      
      {/* ✅ PERFECT SMALL TOGGLE BUTTON */}
      <button 
        onClick={toggleSidebar} 
        style={isSidebarOpen ? styles.toggleButtonClose : styles.toggleButtonOpen}
      >
        {isSidebarOpen ? "✕" : "☰"}
      </button>

      {/* Sidebar */}
      <div
        style={{
          ...styles.sidebar,
          ...(isSidebarOpen ? styles.sidebarOpen : {}),
        }}
      >
        <div style={styles.sidebarHeader}>
          <h3 style={styles.heading}>🚗 GarageMaster</h3>
          <p style={styles.subtitle}>Admin Panel</p>
        </div>
        <ul style={styles.navList}>
          <li style={styles.navItem}>
            <Link to="/admin-dashboard" style={styles.link}>
              <span style={styles.icon}>📊</span>Dashboard
            </Link>
          </li>
          <li style={styles.navItem}>
            <Link to="/staff" style={styles.link}>
              <span style={styles.icon}>👥</span>Staff Management
            </Link>
          </li>
          <li style={styles.navItem}>
            <Link to="/customer" style={styles.link}>
              <span style={styles.icon}>👤</span>Customer Management
            </Link>
          </li>
          <li style={styles.navItem}>
            <Link to="/assign-task" style={styles.link}>
              <span style={styles.icon}>🔧</span>Service Management
            </Link>
          </li>
          <li style={styles.navItem}>
            <Link to="/inventory-management" style={styles.link}>
              <span style={styles.icon}>📦</span>Inventory Management
            </Link>
          </li>
          <li style={styles.navItem}>
            <Link to="/accept-request" style={styles.link}>
              <span style={styles.icon}>📋</span>Accept Requests
            </Link>
          </li>
          <li style={styles.logoutItem}>
            <button onClick={handleLogout} style={styles.logoutButton}>
              🚪 Logout
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div style={styles.contentArea}>
        <div style={styles.mainContainer}>
          <div style={styles.heroSection}>
            <div style={styles.heroContent}>
              <h1 style={styles.heroTitle}>Admin Control Panel</h1>
              <p style={styles.heroSubtitle}>
                Complete control over garage operations and management
              </p>
            </div>
          </div>

          <div style={styles.statsGrid}>
            <div style={styles.statCard}>
              <div style={styles.statIcon}>👥</div>
              <div style={styles.statNumber}>24</div>
              <div style={styles.statLabel}>Active Staff</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statIcon}>👤</div>
              <div style={styles.statNumber}>156</div>
              <div style={styles.statLabel}>Total Customers</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statIcon}>🔧</div>
              <div style={styles.statNumber}>89</div>
              <div style={styles.statLabel}>Pending Services</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statIcon}>📦</div>
              <div style={styles.statNumber}>₹2.4L</div>
              <div style={styles.statLabel}>Inventory Value</div>
            </div>
          </div>

          <div style={styles.recentActivity}>
            <h3 style={styles.sectionTitle}>Recent Activity</h3>
            <div style={styles.activityGrid}>
              <div style={styles.activityCard}>
                <div style={styles.activityIcon}>✅</div>
                <div>
                  <h4 style={styles.activityTitle}>New Service Request</h4>
                  <p style={styles.activityText}>John Doe - Battery Replacement</p>
                </div>
              </div>
              <div style={styles.activityCard}>
                <div style={styles.activityIcon}>👤</div>
                <div>
                  <h4 style={styles.activityTitle}>Staff Assigned</h4>
                  <p style={styles.activityText}>Mike assigned to Garage A</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    minHeight: "100vh",
    background: "linear-gradient(135deg, rgb(0,0,0) 0%, rgba(230,30,50,0.05) 50%, rgb(10,10,10) 100%)",
    position: "relative",
    overflow: "hidden",
  },
  
  // ✅ SMALL MENU BUTTON (48px - Perfect ☰ visibility)
  toggleButtonOpen: {
    position: "fixed",
    top: "95px",
    left: "25px",
    zIndex: 1100,
    width: "48px",        // ✅ PERFECT SIZE
    height: "48px",       // ✅ PERFECT SIZE
    borderRadius: "12px",
    background: "linear-gradient(135deg, rgb(230,30,50), rgba(230,30,50,0.9))",
    color: "rgb(255,255,255)",
    border: "none",
    fontSize: "22px",     // ✅ CLEAR ☰ TEXT
    fontWeight: "700",
    cursor: "pointer",
    boxShadow: "0 8px 25px rgba(230,30,50,0.4)",
    transition: "all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  },
  
  // ✅ TINY CLOSE BUTTON (36px - Minimal ✕)
  toggleButtonClose: {
    position: "fixed",
    top: "95px",
    left: "25px",
    zIndex: 1100,
    width: "36px",        // ✅ SUPER TINY
    height: "36px",       // ✅ SUPER TINY
    borderRadius: "10px",
    background: "linear-gradient(135deg, rgb(230,30,50), rgba(230,30,50,0.9))",
    color: "rgb(255,255,255)",
    border: "none",
    fontSize: "18px",     // ✅ SMALL ✕
    fontWeight: "700",
    cursor: "pointer",
    boxShadow: "0 6px 20px rgba(230,30,50,0.5)",
    transition: "all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  },

  sidebar: {
    position: "fixed",
    top: "80px",
    left: "-300px",
    width: "300px",
    height: "calc(100vh - 80px)",
    background: "rgba(10,10,10,0.98)",
    backdropFilter: "blur(25px)",
    color: "rgb(255,255,255)",
    padding: "40px 30px 30px",
    transition: "left 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    zIndex: 1000,
    borderRight: "1px solid rgba(230,30,50,0.3)",
    boxShadow: "8px 0 40px rgba(230,30,50,0.2)",
    overflowY: "auto"
  },
  sidebarOpen: {
    left: 0,
  },
  sidebarHeader: {
    paddingBottom: "30px",
    borderBottom: "2px solid rgba(230,30,50,0.3)",
    marginBottom: "30px",
  },
  heading: {
    color: "rgb(255,255,255)",
    fontSize: "26px",
    fontWeight: "900",
    background: "linear-gradient(135deg, rgb(230,30,50), rgb(255,255,255))",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    letterSpacing: "-0.5px",
    margin: "0 0 5px 0",
  },
  subtitle: {
    color: "rgba(255,255,255,0.7)",
    fontSize: "13px",
    margin: 0,
    fontWeight: "500"
  },
  navList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  navItem: {
    marginBottom: "12px",
  },
  link: {
    color: "rgba(255,255,255,0.95)",
    display: "flex",
    alignItems: "center",
    gap: "15px",
    padding: "18px 25px",
    textDecoration: "none",
    borderRadius: "20px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.08)",
    fontWeight: "600",
    fontSize: "15px",
    transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  },
  icon: {
    fontSize: "20px",
    width: "25px",
    textAlign: "center"
  },
  logoutItem: {
    marginTop: "40px",
    paddingTop: "25px",
    borderTop: "1px solid rgba(179,179,179,0.2)",
  },
  logoutButton: {
    background: "rgba(179,179,179,0.15)",
    color: "rgb(255,255,255)",
    padding: "18px 25px",
    borderRadius: "20px",
    border: "2px solid rgba(179,179,179,0.3)",
    fontWeight: "700",
    fontSize: "15px",
    cursor: "pointer",
    width: "100%",
    transition: "all 0.4s ease",
  },
  contentArea: {
    width: "100%",
    padding: "140px 40px 40px",
    marginLeft: 0,
    transition: "margin-left 0.4s ease",
  },
  mainContainer: {
    maxWidth: "1400px",
    margin: "0 auto",
  },
  heroSection: {
    background: "rgba(255,255,255,0.03)",
    backdropFilter: "blur(15px)",
    borderRadius: "24px",
    padding: "60px 40px",
    marginBottom: "60px",
    border: "1px solid rgba(255,255,255,0.1)",
    boxShadow: "0 25px 60px rgba(230,30,50,0.15)",
  },
  heroContent: {
    maxWidth: "900px",
    margin: "0 auto",
    textAlign: "center",
  },
  heroTitle: {
    fontSize: "clamp(2.5rem, 6vw, 4rem)",
    fontWeight: "900",
    background: "linear-gradient(135deg, rgb(255,255,255), rgb(230,30,50))",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    marginBottom: "20px",
    letterSpacing: "-1px",
  },
  heroSubtitle: {
    fontSize: "1.3rem",
    color: "rgba(255,255,255,0.9)",
    fontWeight: "400",
    maxWidth: "600px",
    margin: "0 auto 50px",
    lineHeight: "1.7",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "30px",
    marginBottom: "60px",
  },
  statCard: {
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(20px)",
    padding: "40px 30px",
    borderRadius: "24px",
    border: "1px solid rgba(255,255,255,0.1)",
    cursor: "pointer",
    textAlign: "center",
    transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  },
  statIcon: {
    fontSize: "3rem",
    marginBottom: "20px",
  },
  statNumber: {
    fontSize: "2.8rem",
    fontWeight: "800",
    background: "linear-gradient(135deg, rgb(230,30,50), rgb(255,255,255))",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    marginBottom: "12px",
  },
  statLabel: {
    color: "rgb(200,200,200)",
    fontWeight: "600",
    fontSize: "1rem",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  recentActivity: {
    maxWidth: "1200px",
    margin: "0 auto",
  },
  sectionTitle: {
    color: "rgb(255,255,255)",
    fontSize: "2.2rem",
    fontWeight: "800",
    textAlign: "center",
    marginBottom: "50px",
    background: "linear-gradient(135deg, rgb(230,30,50), rgb(255,255,255))",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  activityGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
    gap: "25px",
  },
  activityCard: {
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(20px)",
    padding: "30px",
    borderRadius: "20px",
    border: "1px solid rgba(255,255,255,0.1)",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "20px",
    transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  },
  activityIcon: {
    fontSize: "2.5rem",
    width: "60px",
    height: "60px",
    borderRadius: "16px",
    background: "rgba(230,30,50,0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "rgb(230,30,50)",
  },
  activityTitle: {
    color: "rgb(255,255,255)",
    fontSize: "1.3rem",
    fontWeight: "700",
    margin: "0 0 5px 0",
  },
  activityText: {
    color: "rgba(255,255,255,0.85)",
    margin: 0,
    fontSize: "1rem",
  },
};
