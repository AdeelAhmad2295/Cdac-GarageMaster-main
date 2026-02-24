import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function StaffList() {
  const [staff, setStaff] = useState([
    { 
      id: 1, 
      name: "John Doe", 
      role: "Manager", 
      status: "Active", 
      phone: "+91 98765 43210",
      email: "john@garegemaster.com",
      salary: "₹85,000",
      joinDate: "Jan 2024",
      garage: "Garage A",
      experience: "5 Years",
      shift: "Morning"
    },
    { 
      id: 2, 
      name: "Ravi Sharma", 
      role: "Senior Mechanic", 
      status: "Active", 
      phone: "+91 87654 32109",
      email: "ravi@garegemaster.com",
      salary: "₹65,000",
      joinDate: "Mar 2023",
      garage: "Garage B",
      experience: "8 Years",
      shift: "Night"
    },
    { 
      id: 3, 
      name: "Priya Patel", 
      role: "Junior Mechanic", 
      status: "Inactive", 
      phone: "+91 76543 21098",
      email: "priya@garegemaster.com",
      salary: "₹35,000",
      joinDate: "Nov 2024",
      garage: "Garage A",
      experience: "2 Years",
      shift: "Morning"
    }
  ]);

  const [newStaff, setNewStaff] = useState({
    name: "", role: "", phone: "", email: "", salary: "", garage: "", shift: "Morning"
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("All");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStaff({ ...newStaff, [name]: value });
  };

  const handleAddStaff = (e) => {
    e.preventDefault();
    const staffMember = {
      id: Date.now(),
      ...newStaff,
      status: "Active",
      joinDate: new Date().toLocaleDateString('en-IN'),
      experience: "0 Years"
    };
    setStaff([staffMember, ...staff]);
    setNewStaff({ name: "", role: "", phone: "", email: "", salary: "", garage: "", shift: "Morning" });
    setShowAddForm(false);
  };

  const deleteStaff = (id) => {
    setStaff(staff.filter(member => member.id !== id));
  };

  const toggleStatus = (id) => {
    setStaff(staff.map(member => 
      member.id === id 
        ? { ...member, status: member.status === "Active" ? "Inactive" : "Active" }
        : member
    ));
  };

  const filteredStaff = staff.filter(member => 
    (member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     member.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filterRole === "All" || member.role === filterRole)
  );

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div style={styles.wrapper}>
      {/* Toggle Button */}
      <button onClick={toggleSidebar} style={styles.toggleButton}>
        {isSidebarOpen ? "✕" : "☰"}
      </button>

      {/* Sidebar */}
      <div style={{
        ...styles.sidebar,
        ...(isSidebarOpen ? styles.sidebarOpen : {}),
      }}>
        <div style={styles.sidebarHeader}>
          <h3 style={styles.heading}>🚗 GarageMaster</h3>
          <button onClick={toggleSidebar} style={styles.closeButton}>×</button>
        </div>
        <ul style={styles.navList}>
          <li><Link to="/admin-dashboard" style={styles.link}><span>📊</span>Dashboard</Link></li>
          <li><Link to="/staff" style={styles.activeLink}><span>👥</span>Staff Management</Link></li>
          <li><Link to="/customer" style={styles.link}><span>👤</span>Customer Management</Link></li>
          <li><Link to="/assign-task" style={styles.link}><span>🔧</span>Assign Tasks</Link></li>
          <li><Link to="/accept-request" style={styles.link}><span>📋</span>Accept Requests</Link></li>
        </ul>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Header */}
        <div style={styles.header}>
          <div>
            <h1 style={styles.pageTitle}>Staff Management Portal</h1>
            <p style={styles.pageSubtitle}>Complete control over garage workforce ({filteredStaff.length} active)</p>
          </div>
          <button onClick={() => setShowAddForm(true)} style={styles.addButton}>
            ➕ Add New Staff
          </button>
        </div>

        {/* Stats Cards */}
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={styles.statIcon}>👥</div>
            <div style={styles.statNumber}>{staff.length}</div>
            <div style={styles.statLabel}>Total Staff</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statIcon}>✅</div>
            <div style={styles.statNumber}>{staff.filter(s => s.status === "Active").length}</div>
            <div style={styles.statLabel}>Active Staff</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statIcon}>⏸️</div>
            <div style={styles.statNumber}>{staff.filter(s => s.status === "Inactive").length}</div>
            <div style={styles.statLabel}>Inactive</div>
          </div>
        </div>

        {/* Search & Filter */}
        <div style={styles.controlsRow}>
          <input
            placeholder="Search name, email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
          <select value={filterRole} onChange={(e) => setFilterRole(e.target.value)} style={styles.filterSelect}>
            <option>All Roles</option>
            <option>Manager</option>
            <option>Senior Mechanic</option>
            <option>Junior Mechanic</option>
            <option>Assistant</option>
          </select>
        </div>

        {/* Add Form */}
        {showAddForm && (
          <div style={styles.addFormCard}>
            <form onSubmit={handleAddStaff} style={styles.form}>
              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Full Name *</label>
                  <input name="name" value={newStaff.name} onChange={handleInputChange} required style={styles.formInput} />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Role *</label>
                  <select name="role" value={newStaff.role} onChange={handleInputChange} required style={styles.formInput}>
                    <option value="">Select Role</option>
                    <option>Manager</option>
                    <option>Senior Mechanic</option>
                    <option>Junior Mechanic</option>
                    <option>Assistant</option>
                  </select>
                </div>
              </div>
              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Phone</label>
                  <input name="phone" value={newStaff.phone} onChange={handleInputChange} style={styles.formInput} />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Email</label>
                  <input name="email" type="email" value={newStaff.email} onChange={handleInputChange} style={styles.formInput} />
                </div>
              </div>
              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Salary (₹)</label>
                  <input name="salary" value={newStaff.salary} onChange={handleInputChange} style={styles.formInput} />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Garage</label>
                  <select name="garage" value={newStaff.garage} onChange={handleInputChange} style={styles.formInput}>
                    <option value="">Select Garage</option>
                    <option>Garage A</option>
                    <option>Garage B</option>
                    <option>Garage C</option>
                  </select>
                </div>
              </div>
              <div style={styles.formButtons}>
                <button type="submit" style={styles.submitButton}>✅ Add Staff</button>
                <button type="button" onClick={() => setShowAddForm(false)} style={styles.cancelButton}>❌ Cancel</button>
              </div>
            </form>
          </div>
        )}

        {/* Staff Table */}
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHead}>
                <th style={styles.tableHeaderCell}>#</th>
                <th style={styles.tableHeaderCell}>Name</th>
                <th style={styles.tableHeaderCell}>Role</th>
                <th style={styles.tableHeaderCell}>Garage</th>
                <th style={styles.tableHeaderCell}>Phone</th>
                <th style={styles.tableHeaderCell}>Salary</th>
                <th style={styles.tableHeaderCell}>Status</th>
                <th style={styles.tableHeaderCell}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStaff.map((member, index) => (
                <tr key={member.id} style={styles.tableRow}>
                  <td style={styles.tableCell}>{index + 1}</td>
                  <td style={styles.tableCell}>
                    <div>
                      <div style={styles.staffName}>{member.name}</div>
                      <div style={styles.staffEmail}>{member.email}</div>
                    </div>
                  </td>
                  <td style={styles.tableCell}><span style={styles.roleBadge}>{member.role}</span></td>
                  <td style={styles.tableCell}><span style={styles.garageBadge}>{member.garage}</span></td>
                  <td style={styles.tableCell}>{member.phone}</td>
                  <td style={styles.tableCell}>₹{member.salary}</td>
                  <td style={styles.tableCell}>
                    <span style={styles.statusBadge[member.status.toLowerCase()]}>
                      {member.status}
                    </span>
                  </td>
                  <td style={styles.tableCell}>
                    <div style={styles.actionButtons}>
                      <button onClick={() => toggleStatus(member.id)} style={styles.statusToggle}>
                        {member.status === "Active" ? "⏸️ Pause" : "▶️ Activate"}
                      </button>
                      <button onClick={() => deleteStaff(member.id)} style={styles.deleteButton}>
                        🗑️ Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Link to="/admin-dashboard" style={styles.backButton}>← Back to Dashboard</Link>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, rgb(0,0,0) 0%, rgba(230,30,50,0.05) 50%, rgb(10,10,10) 100%)",
    fontFamily: "'Poppins', sans-serif",
    position: "relative",
  },
  toggleButton: {
    position: "fixed",
    top: "25px",
    left: "25px",
    zIndex: 1100,
    width: "48px",
    height: "48px",
    borderRadius: "12px",
    background: "linear-gradient(135deg, rgb(230,30,50), rgba(230,30,50,0.9))",
    color: "white",
    border: "none",
    fontSize: "22px",
    cursor: "pointer",
    boxShadow: "0 8px 25px rgba(230,30,50,0.4)",
  },
  sidebar: {
    position: "fixed",
    top: 0,
    left: "-280px",
    width: "280px",
    height: "100vh",
    background: "rgba(10,10,10,0.98)",
    backdropFilter: "blur(25px)",
    padding: "80px 30px 30px",
    transition: "left 0.4s ease",
    zIndex: 1000,
    borderRight: "1px solid rgba(230,30,50,0.3)",
  },
  sidebarOpen: {
    left: 0,
  },
  sidebarHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
    paddingBottom: "20px",
    borderBottom: "2px solid rgba(230,30,50,0.3)",
  },
  heading: {
    fontSize: "26px",
    fontWeight: "900",
    background: "linear-gradient(135deg, rgb(230,30,50), white)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    margin: 0,
  },
  closeButton: {
    background: "none",
    border: "none",
    fontSize: "28px",
    color: "rgba(255,255,255,0.7)",
    cursor: "pointer",
  },
  navList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  link: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    padding: "18px 25px",
    color: "rgba(255,255,255,0.9)",
    textDecoration: "none",
    borderRadius: "20px",
    background: "rgba(255,255,255,0.05)",
    marginBottom: "12px",
    fontWeight: "600",
  },
  activeLink: {
    background: "rgba(230,30,50,0.2)",
    boxShadow: "0 0 20px rgba(230,30,50,0.3)",
  },
  mainContent: {
    marginLeft: 0,
    padding: "120px 40px 40px",
    transition: "margin-left 0.4s ease",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "40px",
    gap: "20px",
  },
  pageTitle: {
    fontSize: "2.8rem",
    fontWeight: "900",
    background: "linear-gradient(135deg, rgb(230,30,50), white)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    margin: 0,
  },
  pageSubtitle: {
    color: "rgba(255,255,255,0.8)",
    fontSize: "1.2rem",
    margin: "10px 0 0 0",
  },
  addButton: {
    padding: "20px 35px",
    background: "linear-gradient(135deg, rgb(230,30,50), rgba(230,30,50,0.9))",
    color: "white",
    border: "none",
    borderRadius: "24px",
    fontSize: "1.1rem",
    fontWeight: "700",
    cursor: "pointer",
    boxShadow: "0 12px 35px rgba(230,30,50,0.4)",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "25px",
    marginBottom: "40px",
  },
  statCard: {
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(20px)",
    padding: "35px",
    borderRadius: "24px",
    border: "1px solid rgba(255,255,255,0.1)",
    textAlign: "center",
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
    fontWeight: "700",
    textTransform: "uppercase",
  },
  controlsRow: {
    display: "flex",
    gap: "20px",
    marginBottom: "30px",
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    padding: "18px 25px",
    border: "2px solid rgba(255,255,255,0.15)",
    borderRadius: "20px",
    background: "rgba(15,15,15,0.9)",
    color: "white",
    fontSize: "16px",
  },
  filterSelect: {
    padding: "18px 25px",
    border: "2px solid rgba(255,255,255,0.15)",
    borderRadius: "20px",
    background: "rgba(15,15,15,0.9)",
    color: "white",
    fontSize: "16px",
  },
  addFormCard: {
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(20px)",
    borderRadius: "24px",
    padding: "40px",
    marginBottom: "40px",
    border: "1px solid rgba(255,255,255,0.1)",
  },
  formRow: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    marginBottom: "20px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  formLabel: {
    color: "rgba(255,255,255,0.9)",
    fontWeight: "600",
  },
  formInput: {
    padding: "18px 20px",
    border: "2px solid rgba(255,255,255,0.15)",
    borderRadius: "18px",
    background: "rgba(15,15,15,0.9)",
    color: "white",
    fontSize: "1rem",
  },
  formButtons: {
    display: "flex",
    gap: "20px",
    justifyContent: "flex-end",
  },
  submitButton: {
    padding: "18px 40px",
    background: "linear-gradient(135deg, rgb(230,30,50), rgba(230,30,50,0.9))",
    color: "white",
    border: "none",
    borderRadius: "20px",
    fontWeight: "700",
    cursor: "pointer",
  },
  cancelButton: {
    padding: "18px 40px",
    background: "rgba(179,179,179,0.2)",
    color: "white",
    border: "2px solid rgba(179,179,179,0.3)",
    borderRadius: "20px",
    fontWeight: "600",
    cursor: "pointer",
  },
  tableContainer: {
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(25px)",
    borderRadius: "28px",
    overflow: "hidden",
    border: "1px solid rgba(255,255,255,0.12)",
    marginBottom: "40px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  tableHead: {
    background: "rgba(230,30,50,0.15)",
  },
  tableHeaderCell: {
    padding: "25px 20px",
    color: "white",
    fontWeight: "700",
    textAlign: "left",
    borderBottom: "2px solid rgba(255,255,255,0.1)",
  },
  tableRow: {
    transition: "all 0.3s ease",
  },
  tableCell: {
    padding: "25px 20px",
    color: "rgba(255,255,255,0.95)",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
  },
  staffName: {
    fontWeight: "700",
    fontSize: "1.05rem",
  },
  staffEmail: {
    color: "rgba(255,255,255,0.7)",
    fontSize: "0.9rem",
  },
  roleBadge: {
    background: "rgba(255,255,255,0.15)",
    color: "white",
    padding: "6px 16px",
    borderRadius: "20px",
    fontSize: "0.85rem",
    fontWeight: "600",
  },
  garageBadge: {
    background: "rgba(76,175,80,0.2)",
    color: "rgb(76,175,80)",
    padding: "6px 12px",
    borderRadius: "16px",
    fontWeight: "600",
  },
  statusBadge: {
    active: {
      background: "rgba(46,213,115,0.2)",
      color: "rgb(46,213,115)",
      padding: "6px 16px",
      borderRadius: "20px",
      fontWeight: "700",
    },
    inactive: {
      background: "rgba(179,179,179,0.2)",
      color: "rgba(179,179,179,0.8)",
      padding: "6px 16px",
      borderRadius: "20px",
      fontWeight: "700",
    },
  },
  actionButtons: {
    display: "flex",
    gap: "12px",
  },
  statusToggle: {
    padding: "10px 20px",
    background: "rgba(255,193,7,0.2)",
    color: "white",
    border: "none",
    borderRadius: "16px",
    cursor: "pointer",
    fontWeight: "600",
  },
  deleteButton: {
    padding: "10px 20px",
    background: "rgba(230,30,50,0.2)",
    color: "white",
    border: "2px solid rgba(230,30,50,0.4)",
    borderRadius: "16px",
    cursor: "pointer",
    fontWeight: "600",
  },
  backButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: "12px",
    padding: "20px 40px",
    background: "rgba(255,255,255,0.1)",
    color: "white",
    textDecoration: "none",
    borderRadius: "24px",
    fontSize: "1.1rem",
    fontWeight: "700",
    border: "2px solid rgba(255,255,255,0.2)",
  },
};
