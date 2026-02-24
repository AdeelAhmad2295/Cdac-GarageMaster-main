import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function MechanicDashboard() {
  const [tasks, setTasks] = useState(null);
  const [filterStatus, setFilterStatus] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setTasks([
        { id: 1, task: "🔧 Engine Oil Change", carDetails: "Toyota Camry 2023", assignedStaff: "John", deliveryTime: "2:00 PM", status: "Pending", priority: "High" },
        { id: 2, task: "🛞 Brake Inspection", carDetails: "Honda Civic 2021", assignedStaff: "Mike", deliveryTime: "4:00 PM", status: "In Progress", priority: "Medium" },
        { id: 3, task: "🔋 Battery Replacement", carDetails: "Ford F-150", assignedStaff: "Sarah", deliveryTime: "6:00 PM", status: "Pending", priority: "Urgent" },
        { id: 4, task: "❄️ AC Service", carDetails: "Maruti Swift", assignedStaff: "Ravi", deliveryTime: "3:00 PM", status: "Completed", priority: "Low" },
        { id: 5, task: "⚙️ Wheel Alignment", carDetails: "Hyundai Creta", assignedStaff: "John", deliveryTime: "5:00 PM", status: "Pending", priority: "High" }
      ]);
    }, 1500);
  }, []);

  const updateTaskStatus = (taskId, newStatus) => {
    setTasks(prevTasks =>
      prevTasks.map(task => 
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const filteredTasks = tasks ? tasks.filter(task => 
    filterStatus === "All" || task.status === filterStatus
  ) : [];

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  if (!tasks) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loadingSpinner}></div>
        <p style={styles.loadingText}>Loading Mechanic Tasks...</p>
      </div>
    );
  }

  return (
    <div style={styles.mainContainer}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerLeft}>
          <Link to="/mechanic-dashboard" style={styles.logo}>
            🔧 <span>Mechanic Dashboard</span>
          </Link>
        </div>
        <div style={styles.headerRight}>
          <button onClick={logout} style={styles.logoutButton}>
            🚪 Logout
          </button>
        </div>
      </header>

      {/* Mechanic Info */}
      <div style={styles.infoCard}>
        <div style={styles.infoContent}>
          <h3 style={styles.infoTitle}>👨‍🔧 John Doe</h3>
          <div style={styles.infoGrid}>
            <div style={styles.infoItem}>
              <span style={styles.infoLabel}>Role:</span>
              <span style={styles.infoValue}>Senior Technician</span>
            </div>
            <div style={styles.infoItem}>
              <span style={styles.infoLabel}>Garage:</span>
              <span style={styles.infoValue}>Garage A</span>
            </div>
            <div style={styles.infoItem}>
              <span style={styles.infoLabel}>Today:</span>
              <span style={styles.infoValue}>Feb 17, 2026</span>
            </div>
            <div style={styles.infoItem}>
              <span style={styles.infoLabel}>Tasks:</span>
              <span style={styles.infoValue}>{tasks.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>⏳</div>
          <div style={styles.statNumber}>{tasks.filter(t => t.status === "Pending").length}</div>
          <div style={styles.statLabel}>Pending</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>⚙️</div>
          <div style={styles.statNumber}>{tasks.filter(t => t.status === "In Progress").length}</div>
          <div style={styles.statLabel}>In Progress</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>✅</div>
          <div style={styles.statNumber}>{tasks.filter(t => t.status === "Completed").length}</div>
          <div style={styles.statLabel}>Completed</div>
        </div>
      </div>

      {/* Controls */}
      <div style={styles.controlsRow}>
        <select 
          value={filterStatus} 
          onChange={(e) => setFilterStatus(e.target.value)}
          style={styles.filterSelect}
        >
          <option>All</option>
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
      </div>

      {/* Tasks Table */}
      <div style={styles.tableContainer}>
        <div style={styles.tableHeader}>
          <h3 style={styles.tableTitle}>Today's Tasks ({filteredTasks.length})</h3>
        </div>
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeadRow}>
                <th style={styles.tableHead}>Task</th>
                <th style={styles.tableHead}>Car Details</th>
                <th style={styles.tableHead}>Staff</th>
                <th style={styles.tableHead}>Delivery</th>
                <th style={styles.tableHead}>Priority</th>
                <th style={styles.tableHead}>Status</th>
                <th style={styles.tableHead}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.length === 0 ? (
                <tr>
                  <td colSpan="7" style={styles.noData}>
                    No tasks found for this filter
                  </td>
                </tr>
              ) : (
                filteredTasks.map(task => (
                  <tr key={task.id} style={styles.tableRow}>
                    <td style={styles.tableCell}>
                      <div style={styles.taskName}>{task.task}</div>
                    </td>
                    <td style={styles.tableCell}>
                      <div style={styles.carDetails}>{task.carDetails}</div>
                    </td>
                    <td style={styles.tableCell}>
                      <span style={styles.staffBadge}>{task.assignedStaff}</span>
                    </td>
                    <td style={styles.tableCell}>
                      <span style={styles.timeBadge}>{task.deliveryTime}</span>
                    </td>
                    <td style={styles.tableCell}>
                      <span style={styles.priorityBadge[task.priority.toLowerCase()]}>
                        {task.priority}
                      </span>
                    </td>
                    <td style={styles.tableCell}>
                      <span style={styles.statusBadge[task.status.toLowerCase()]}>
                        {task.status}
                      </span>
                    </td>
                    <td style={styles.tableCell}>
                      <div style={styles.actionButtons}>
                        {task.status !== "Completed" && (
                          <button
                            onClick={() => updateTaskStatus(task.id, "In Progress")}
                            style={styles.inProgressButton}
                            disabled={task.status === "In Progress"}
                          >
                            ⚙️ Progress
                          </button>
                        )}
                        <button
                          onClick={() => updateTaskStatus(task.id, "Completed")}
                          style={styles.completeButton}
                          disabled={task.status === "Completed"}
                        >
                          ✅ Complete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const styles = {
  mainContainer: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, rgb(0,0,0) 0%, rgba(230,30,50,0.05) 50%, rgb(10,10,10) 100%)",
    padding: "100px 40px 40px",
    fontFamily: "'Poppins', sans-serif",
  },
  header: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "rgba(10,10,10,0.95)",
    backdropFilter: "blur(20px)",
    padding: "20px 40px",
    color: "rgb(255,255,255)",
    zIndex: 1000,
    boxShadow: "0 4px 20px rgba(230,30,50,0.15)",
    borderBottom: "1px solid rgba(230,30,50,0.2)",
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
  },
  logo: {
    color: "rgb(255,255,255)",
    textDecoration: "none",
    fontSize: "24px",
    fontWeight: "800",
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  headerRight: {},
  logoutButton: {
    background: "linear-gradient(135deg, rgb(230,30,50), rgba(230,30,50,0.9))",
    color: "rgb(255,255,255)",
    border: "none",
    padding: "12px 24px",
    borderRadius: "20px",
    fontSize: "15px",
    fontWeight: "700",
    cursor: "pointer",
    boxShadow: "0 8px 25px rgba(230,30,50,0.4)",
  },
  loadingContainer: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, rgb(0,0,0) 0%, rgba(230,30,50,0.05) 50%, rgb(10,10,10) 100%)",
  },
  loadingSpinner: {
    width: "60px",
    height: "60px",
    border: "4px solid rgba(230,30,50,0.2)",
    borderTop: "4px solid rgb(230,30,50)",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  loadingText: {
    color: "rgba(255,255,255,0.9)",
    fontSize: "18px",
    marginTop: "20px",
  },
  infoCard: {
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(20px)",
    borderRadius: "24px",
    padding: "40px",
    marginBottom: "40px",
    border: "1px solid rgba(255,255,255,0.1)",
  },
  infoContent: {},
  infoTitle: {
    fontSize: "28px",
    fontWeight: "900",
    background: "linear-gradient(135deg, rgb(230,30,50), rgb(255,255,255))",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    marginBottom: "25px",
  },
  infoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
  },
  infoItem: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  infoLabel: {
    color: "rgba(255,255,255,0.7)",
    fontSize: "14px",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  infoValue: {
    color: "rgb(255,255,255)",
    fontSize: "18px",
    fontWeight: "700",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "25px",
    marginBottom: "40px",
  },
  statCard: {
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(20px)",
    padding: "35px 25px",
    borderRadius: "24px",
    border: "1px solid rgba(255,255,255,0.1)",
    textAlign: "center",
    transition: "all 0.3s ease",
  },
  statIcon: {
    fontSize: "2.8rem",
    marginBottom: "15px",
  },
  statNumber: {
    fontSize: "2.5rem",
    fontWeight: "800",
    color: "rgb(230,30,50)",
    marginBottom: "10px",
  },
  statLabel: {
    color: "rgba(255,255,255,0.8)",
    fontSize: "1rem",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  controlsRow: {
    marginBottom: "30px",
  },
  filterSelect: {
    padding: "15px 25px",
    border: "2px solid rgba(255,255,255,0.15)",
    borderRadius: "20px",
    background: "rgba(15,15,15,0.9)",
    color: "rgb(255,255,255)",
    fontSize: "16px",
    cursor: "pointer",
  },
  tableContainer: {
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(25px)",
    borderRadius: "28px",
    overflow: "hidden",
    border: "1px solid rgba(255,255,255,0.12)",
  },
  tableHeader: {
    padding: "35px 40px",
    background: "rgba(230,30,50,0.15)",
  },
  tableTitle: {
    color: "rgb(255,255,255)",
    fontSize: "1.8rem",
    fontWeight: "800",
    margin: 0,
  },
  tableWrapper: {
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  tableHeadRow: {},
  tableHead: {
    padding: "25px 20px",
    color: "rgb(255,255,255)",
    fontWeight: "700",
    fontSize: "1rem",
    textAlign: "left",
    background: "rgba(230,30,50,0.2)",
    borderBottom: "2px solid rgba(255,255,255,0.1)",
  },
  tableRow: {
    transition: "all 0.3s ease",
  },
  tableCell: {
    padding: "25px 20px",
    color: "rgb(255,255,255)",
    fontSize: "1rem",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
  },
  taskName: {
    fontWeight: "600",
  },
  carDetails: {
    fontWeight: "500",
  },
  staffBadge: {
    background: "rgba(255,255,255,0.15)",
    color: "rgb(255,255,255)",
    padding: "6px 16px",
    borderRadius: "20px",
    fontSize: "0.85rem",
    fontWeight: "600",
  },
  timeBadge: {
    background: "rgba(76,175,80,0.2)",
    color: "rgb(76,175,80)",
    padding: "6px 12px",
    borderRadius: "16px",
    fontWeight: "600",
  },
  priorityBadge: {
    urgent: {
      background: "rgba(230,30,50,0.2)",
      color: "rgb(230,30,50)",
      padding: "6px 12px",
      borderRadius: "16px",
      fontSize: "0.8rem",
      fontWeight: "800",
    },
    high: {
      background: "rgba(230,30,50,0.15)",
      color: "rgb(230,30,50)",
      padding: "6px 12px",
      borderRadius: "16px",
      fontSize: "0.8rem",
      fontWeight: "700",
    },
    medium: {
      background: "rgba(255,193,7,0.2)",
      color: "rgb(255,193,7)",
      padding: "6px 12px",
      borderRadius: "16px",
      fontSize: "0.8rem",
      fontWeight: "600",
    },
    low: {
      background: "rgba(76,175,80,0.2)",
      color: "rgb(76,175,80)",
      padding: "6px 12px",
      borderRadius: "16px",
      fontSize: "0.8rem",
      fontWeight: "600",
    },
  },
  statusBadge: {
    pending: {
      background: "rgba(255,165,2,0.2)",
      color: "rgb(255,165,2)",
      padding: "6px 16px",
      borderRadius: "20px",
      fontSize: "0.85rem",
      fontWeight: "700",
    },
    "in progress": {
      background: "rgba(30,144,255,0.2)",
      color: "rgb(30,144,255)",
      padding: "6px 16px",
      borderRadius: "20px",
      fontSize: "0.85rem",
      fontWeight: "700",
    },
    completed: {
      background: "rgba(46,213,115,0.2)",
      color: "rgb(46,213,115)",
      padding: "6px 16px",
      borderRadius: "20px",
      fontSize: "0.85rem",
      fontWeight: "700",
    },
  },
  actionButtons: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  },
  inProgressButton: {
    padding: "10px 20px",
    background: "rgba(30,144,255,0.2)",
    color: "rgb(255,255,255)",
    border: "2px solid rgba(30,144,255,0.4)",
    borderRadius: "16px",
    cursor: "pointer",
    fontWeight: "600",
  },
  completeButton: {
    padding: "10px 20px",
    background: "linear-gradient(135deg, rgb(46,213,115), rgba(46,213,115,0.8))",
    color: "rgb(255,255,255)",
    border: "none",
    borderRadius: "16px",
    cursor: "pointer",
    fontWeight: "700",
  },
  noData: {
    textAlign: "center",
    color: "rgba(255,255,255,0.6)",
    padding: "60px 20px",
    fontStyle: "italic",
  },
};
