import React from "react";

export default function AdminHeader() {
  return (
    <header style={styles.header}>
      {/* Logo - Empty but styled properly */}
      <div style={styles.logo}>
        <h2 style={styles.logoText}>🚗 GarageMaster Pro</h2>
      </div>
      
      {/* User Info - Right side */}
      <div style={styles.user}>
        <span style={styles.userInfo}>Admin Panel</span>
      </div>
    </header>
  );
}

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    // ✅ FIXED: No gray strip - Our theme colors
    background: "rgba(10,10,10,0.95)",
    backdropFilter: "blur(20px)",
    color: "rgb(255,255,255)",
    padding: "20px 40px",
    boxShadow: "0 4px 20px rgba(230,30,50,0.15)",
    borderBottom: "1px solid rgba(230,30,50,0.2)",
    height: "80px",  // Fixed height for consistent spacing
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1200,
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "12px"
  },
  logoText: {
    margin: 0,
    fontSize: "24px",
    fontWeight: "900",
    background: "linear-gradient(135deg, rgb(230,30,50), rgb(255,255,255))",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    letterSpacing: "-0.5px"
  },
  user: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    fontSize: "15px",
    fontWeight: "600"
  },
  userInfo: {
    color: "rgba(255,255,255,0.9)",
    fontWeight: "600"
  }
};
