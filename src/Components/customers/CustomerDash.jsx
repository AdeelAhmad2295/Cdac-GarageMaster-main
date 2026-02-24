import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function CustomerDash() {
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
    <>
      <div style={styles.wrapper}>
        {/* Toggle Button */}
        <button onClick={toggleSidebar} style={styles.toggleButton}>
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
            <h3 style={styles.heading}>Customer Dashboard</h3>
          </div>
          <ul style={styles.navList}>
            <li style={styles.navItem}>
              <Link to="/service-history" style={styles.link}>
                📋 Service History
              </Link>
            </li>
            <li style={styles.navItem}>
              <Link to="/customer-contact-support" style={styles.link}>
                💬 Contact Support
              </Link>
            </li>
            <li style={styles.navItem}>
              <Link to="/customer-update-details" style={styles.link}>
                👤 Profile Management
              </Link>
            </li>
            <li style={styles.navItem}>
              <Link to="/notifications" style={styles.link}>
                🔔 Notifications
              </Link>
            </li>
            <li style={styles.navItem}>
              <Link to="/service-booking" style={styles.link}>
                🔧 Service Booking
              </Link>
            </li>
            <li style={styles.navItem}>
              <Link to="/vehicle-tracking" style={styles.link}>
                🚗 Vehicle Tracking
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
          <div style={styles.heroSection}>
            <div style={styles.heroContent}>
              <h1 style={styles.heroTitle}>Welcome Back!</h1>
              <p style={styles.heroSubtitle}>
                Manage your garage services with ease
              </p>
              <div style={styles.statsGrid}>
                <div style={styles.statCard}>
                  <div style={styles.statNumber}>12</div>
                  <div style={styles.statLabel}>Total Services</div>
                </div>
                <div style={styles.statCard}>
                  <div style={styles.statNumber}>3</div>
                  <div style={styles.statLabel}>Active Bookings</div>
                </div>
                <div style={styles.statCard}>
                  <div style={styles.statNumber}>98%</div>
                  <div style={styles.statLabel}>Satisfaction</div>
                </div>
              </div>
            </div>
          </div>

          <div style={styles.quickActions}>
            <h3 style={styles.sectionTitle}>Quick Actions</h3>
            <div style={styles.actionGrid}>
              <div style={styles.actionCard} onClick={() => navigate("/service-booking")}>
                <div style={styles.actionIcon}>🔧</div>
                <h4 style={styles.actionTitle}>Book Service</h4>
                <p style={styles.actionText}>Schedule your next service</p>
              </div>
              <div style={styles.actionCard} onClick={() => navigate("/service-history")}>
                <div style={styles.actionIcon}>📋</div>
                <h4 style={styles.actionTitle}>View History</h4>
                <p style={styles.actionText}>Check past services</p>
              </div>
              <div style={styles.actionCard} onClick={() => navigate("/notifications")}>
                <div style={styles.actionIcon}>🔔</div>
                <h4 style={styles.actionTitle}>Notifications</h4>
                <p style={styles.actionText}>Stay updated</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
        
        * {
          font-family: 'Poppins', sans-serif;
          box-sizing: border-box;
        }

        /* PERFECT DARK THEME HOVER EFFECTS */
        a[href="/service-history"]:hover,
        a[href="/customer-contact-support"]:hover,
        a[href="/customer-update-details"]:hover,
        a[href="/notifications"]:hover,
        a[href="/service-booking"]:hover,
        a[href="/vehicle-tracking"]:hover {
          background: rgba(230,30,50,0.15) !important;
          transform: translateX(8px);
          box-shadow: 0 8px 25px rgba(230,30,50,0.3) !important;
        }

        .actionCard:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(230,30,50,0.3);
        }

        .statCard:hover {
          transform: translateY(-4px);
          box-shadow: 0 15px 35px rgba(230,30,50,0.4);
        }

        .logoutButton:hover {
          background: rgba(230,30,50,0.2) !important;
          border-color: rgb(230,30,50);
          transform: translateY(-2px);
        }

        .toggleButton:hover {
          transform: scale(1.1) rotate(90deg);
          box-shadow: 0 15px 40px rgba(230,30,50,0.6);
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        [style*="heroContent"] {
          animation: fadeInUp 0.8s ease-out;
        }

        @media (max-width: 768px) {
          [style*="contentArea"] {
            padding: 80px 20px 20px !important;
          }
        }
      `}</style>
    </>
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
  toggleButton: {
    position: "fixed",
    top: "25px",
    left: "25px",
    zIndex: 1100,
    width: "55px",
    height: "55px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, rgb(230,30,50), rgba(230,30,50,0.9))",
    color: "rgb(255,255,255)",
    border: "none",
    fontSize: "24px",
    fontWeight: "700",
    cursor: "pointer",
    boxShadow: "0 10px 30px rgba(230,30,50,0.4)",
    transition: "all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  },
  sidebar: {
    position: "fixed",
    top: 0,
    left: "-280px",
    width: "280px",
    height: "100vh",
    background: "rgba(0,0,0,0.95)",
    backdropFilter: "blur(20px)",
    color: "rgb(255,255,255)",
    padding: "80px 25px 30px",
    transition: "left 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    zIndex: 1000,
    borderRight: "1px solid rgba(230,30,50,0.3)",
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
    fontSize: "28px",
    fontWeight: "800",
    background: "linear-gradient(135deg, rgb(255,255,255), rgb(230,30,50))",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    letterSpacing: "-0.5px",
    margin: 0,
  },
  navList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  navItem: {
    marginBottom: "8px",
  },
  link: {
    color: "rgba(255,255,255,0.9)",  // ✅ FIXED: Bright white
    display: "flex",
    alignItems: "center",
    padding: "16px 20px",
    textDecoration: "none",
    borderRadius: "16px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    fontWeight: "500",
    fontSize: "15px",
    transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    position: "relative",
    overflow: "hidden",
  },
  logoutItem: {
    marginTop: "40px",
    paddingTop: "20px",
    borderTop: "1px solid rgba(179,179,179,0.2)",
  },
  logoutButton: {
    background: "linear-gradient(135deg, rgba(179,179,179,0.2), rgba(179,179,179,0.1))",
    color: "rgb(255,255,255)",        // ✅ FIXED: Pure white
    padding: "16px 20px",
    borderRadius: "16px",
    border: "2px solid rgba(179,179,179,0.3)",
    fontWeight: "600",
    fontSize: "15px",
    cursor: "pointer",
    width: "100%",
    transition: "all 0.3s ease",
  },
  contentArea: {
    width: "100%",
    padding: "100px 40px 40px",
    marginLeft: 0,
    transition: "margin-left 0.4s ease",
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
    color: "rgba(255,255,255,0.9)",    // ✅ FIXED: Bright white
    fontWeight: "400",
    maxWidth: "600px",
    margin: "0 auto 50px",
    lineHeight: "1.7",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "25px",
    marginTop: "40px",
  },
  statCard: {
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(15px)",
    padding: "30px 20px",
    borderRadius: "20px",
    border: "1px solid rgba(255,255,255,0.1)",
    cursor: "pointer",
    transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  },
  statNumber: {
    fontSize: "2.5rem",
    fontWeight: "800",
    background: "linear-gradient(135deg, rgb(230,30,50), rgb(255,255,255))",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    marginBottom: "8px",
  },
  statLabel: {
    color: "rgb(200,200,200)",         // ✅ FIXED: Bright silver
    fontWeight: "500",
    fontSize: "0.95rem",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  quickActions: {
    maxWidth: "1200px",
    margin: "0 auto",
  },
  sectionTitle: {
    color: "rgb(255,255,255)",
    fontSize: "2rem",
    fontWeight: "700",
    textAlign: "center",
    marginBottom: "50px",
    background: "linear-gradient(135deg, rgb(230,30,50), rgb(255,255,255))",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  actionGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "30px",
  },
  actionCard: {
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(20px)",
    padding: "40px 30px",
    borderRadius: "24px",
    border: "1px solid rgba(255,255,255,0.1)",
    cursor: "pointer",
    textAlign: "center",
    transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    position: "relative",
    overflow: "hidden",
    color: "rgb(255,255,255)",         // ✅ FIXED: Pure white
  },
  actionIcon: {
    fontSize: "4rem",
    marginBottom: "20px",
  },
  actionTitle: {
    fontSize: "1.4rem",
    fontWeight: "700",
    marginBottom: "10px",
    color: "rgb(255,255,255)",
  },
  actionText: {
    color: "rgba(255,255,255,0.85)",   // ✅ FIXED: Bright white
    fontSize: "1rem",
    margin: 0,
  },
};
