import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function CustomerList() {
    const [customers, setCustomers] = useState([
        { id: 1, name: "Alice Brown", email: "alice@example.com", phone: "9876543210", status: "Active", lastVisit: "2026-02-15" },
        { id: 2, name: "Bob Green", email: "bob@example.com", phone: "9876543201", status: "Inactive", lastVisit: "2026-01-20" },
        { id: 3, name: "Charlie White", email: "charlie@example.com", phone: "9876543202", status: "Active", lastVisit: "2026-02-16" },
    ]);
    
    const [showForm, setShowForm] = useState(false);
    const [newCustomer, setNewCustomer] = useState({
        name: "",
        email: "",
        phone: "",
        status: "Active",
    });

    const deleteCustomer = (id) => {
        setCustomers(customers.filter(customer => customer.id !== id));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCustomer({ ...newCustomer, [name]: value });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (!newCustomer.name || !newCustomer.email || !newCustomer.phone) {
            alert("Please fill in all required fields.");
            return;
        }
        const customer = {
            id: Date.now(),
            ...newCustomer,
            lastVisit: new Date().toLocaleDateString()
        };
        setCustomers([...customers, customer]);
        setNewCustomer({ name: "", email: "", phone: "", status: "Active" });
        setShowForm(false);
    };

    const getStatusStyle = (status) => {
        return status === "Active" 
            ? { background: "rgba(230,30,50,0.2)", color: "rgb(230,30,50)", border: "1px solid rgba(230,30,50,0.4)" }
            : { background: "rgba(179,179,179,0.15)", color: "rgba(179,179,179,0.8)", border: "1px solid rgba(179,179,179,0.3)" };
    };

    return (
        <div style={styles.mainContainer}>
            <div style={styles.contentWrapper}>
                {/* Header */}
                <div style={styles.header}>
                    <h1 style={styles.headerTitle}>Customer Management</h1>
                    <p style={styles.headerSubtitle}>Manage your garage customers and service history</p>
                </div>

                {/* Add Button */}
                <div style={styles.addButtonContainer}>
                    <button
                        onClick={() => setShowForm(true)}
                        style={styles.addButton}
                    >
                        ➕ Add New Customer
                    </button>
                </div>

                {/* Add Form */}
                {showForm && (
                    <div style={styles.formCard}>
                        <h3 style={styles.formTitle}>Add New Customer</h3>
                        <form onSubmit={handleFormSubmit} style={styles.form}>
                            <div style={styles.formGrid}>
                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>Customer Name *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={newCustomer.name}
                                        onChange={handleInputChange}
                                        style={styles.darkInput}
                                        placeholder="Enter customer name"
                                    />
                                </div>
                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>Phone *</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={newCustomer.phone}
                                        onChange={handleInputChange}
                                        style={styles.darkInput}
                                        placeholder="9876543210"
                                    />
                                </div>
                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>Email *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={newCustomer.email}
                                        onChange={handleInputChange}
                                        style={styles.darkInput}
                                        placeholder="customer@example.com"
                                    />
                                </div>
                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>Status</label>
                                    <select
                                        name="status"
                                        value={newCustomer.status}
                                        onChange={handleInputChange}
                                        style={styles.darkSelect}
                                    >
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                </div>
                            </div>
                            <div style={styles.formButtons}>
                                <button type="submit" style={styles.submitButton}>
                                    ✅ Add Customer
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowForm(false)}
                                    style={styles.cancelButton}
                                >
                                    ❌ Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Customers Table */}
                <div style={styles.tableCard}>
                    <div style={styles.tableHeader}>
                        <h3 style={styles.tableTitle}>Customers List ({customers.length})</h3>
                    </div>
                    <div style={styles.tableWrapper}>
                        <table style={styles.table}>
                            <thead>
                                <tr style={styles.tableHeadRow}>
                                    <th style={styles.tableHead}>Name</th>
                                    <th style={styles.tableHead}>Phone</th>
                                    <th style={styles.tableHead}>Email</th>
                                    <th style={styles.tableHead}>Status</th>
                                    <th style={styles.tableHead}>Last Visit</th>
                                    <th style={styles.tableHead}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {customers.map((customer) => (
                                    <tr key={customer.id} style={styles.tableRow}>
                                        <td style={styles.tableCell}>{customer.name}</td>
                                        <td style={styles.tableCell}>{customer.phone}</td>
                                        <td style={styles.tableCell}>{customer.email}</td>
                                        <td style={styles.tableCell}>
                                            <span style={{...styles.statusBadge, ...getStatusStyle(customer.status)}}>
                                                {customer.status}
                                            </span>
                                        </td>
                                        <td style={styles.tableCell}>{customer.lastVisit}</td>
                                        <td style={styles.tableCell}>
                                            <button
                                                onClick={() => deleteCustomer(customer.id)}
                                                style={styles.deleteButton}
                                            >
                                                🗑️ Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Back Button */}
                <div style={styles.backButtonContainer}>
                    <Link to="/admin-dashboard" style={styles.backButton}>
                        ← Back to Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
}

const styles = {
    mainContainer: {
        minHeight: "100vh",
        background: "linear-gradient(135deg, rgb(0,0,0) 0%, rgba(230,30,50,0.05) 50%, rgb(10,10,10) 100%)",
        padding: "40px 20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    contentWrapper: {
        width: "100%",
        maxWidth: "1400px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "40px"
    },
    header: {
        textAlign: "center"
    },
    headerTitle: {
        fontSize: "clamp(2.5rem, 8vw, 4.5rem)",
        fontWeight: "900",
        background: "linear-gradient(135deg, rgb(255,255,255), rgb(230,30,50))",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        marginBottom: "10px"
    },
    headerSubtitle: {
        fontSize: "1.4rem",
        color: "rgba(255,255,255,0.8)",
        fontWeight: "400",
        maxWidth: "600px"
    },
    addButtonContainer: {
        width: "100%",
        maxWidth: "500px"
    },
    addButton: {
        width: "100%",
        padding: "20px 30px",
        background: "linear-gradient(135deg, rgb(230,30,50), rgba(230,30,50,0.9))",
        color: "rgb(255,255,255)",
        border: "none",
        borderRadius: "20px",
        fontSize: "1.2rem",
        fontWeight: "700",
        cursor: "pointer",
        transition: "all 0.4s ease",
        boxShadow: "0 12px 35px rgba(230,30,50,0.4)",
        textAlign: "center"
    },
    formCard: {
        background: "rgba(255,255,255,0.08)",
        backdropFilter: "blur(25px)",
        borderRadius: "28px",
        padding: "50px",
        border: "1px solid rgba(255,255,255,0.12)",
        width: "100%",
        maxWidth: "900px",
        boxShadow: "0 30px 80px rgba(230,30,50,0.15)"
    },
    formTitle: {
        color: "rgb(255,255,255)",
        fontSize: "2rem",
        fontWeight: "800",
        marginBottom: "30px",
        textAlign: "center",
        background: "linear-gradient(135deg, rgb(230,30,50), rgb(255,255,255))",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text"
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "25px"
    },
    formGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "25px"
    },
    inputGroup: {
        display: "flex",
        flexDirection: "column",
        gap: "10px"
    },
    label: {
        color: "rgba(255,255,255,0.95)",
        fontSize: "1rem",
        fontWeight: "600"
    },
    darkInput: {
        padding: "18px 22px",
        border: "2px solid rgba(255,255,255,0.15)",
        borderRadius: "18px",
        background: "rgba(15,15,15,0.9)",
        color: "rgb(255,255,255)",
        fontSize: "1rem",
        fontWeight: "500",
        transition: "all 0.3s ease"
    },
    darkSelect: {
        padding: "18px 22px",
        border: "2px solid rgba(255,255,255,0.15)",
        borderRadius: "18px",
        background: "rgba(15,15,15,0.9)",
        color: "rgb(255,255,255)",
        fontSize: "1rem",
        fontWeight: "500",
        transition: "all 0.3s ease",
        cursor: "pointer"
    },
    formButtons: {
        display: "flex",
        gap: "20px",
        justifyContent: "center"
    },
    submitButton: {
        flex: 1,
        padding: "20px",
        background: "linear-gradient(135deg, rgb(230,30,50), rgba(230,30,50,0.9))",
        color: "rgb(255,255,255)",
        border: "none",
        borderRadius: "20px",
        fontSize: "1.1rem",
        fontWeight: "700",
        cursor: "pointer",
        transition: "all 0.4s ease"
    },
    cancelButton: {
        flex: 1,
        padding: "20px",
        background: "rgba(179,179,179,0.2)",
        color: "rgb(255,255,255)",
        border: "2px solid rgba(179,179,179,0.3)",
        borderRadius: "20px",
        fontSize: "1.1rem",
        fontWeight: "700",
        cursor: "pointer",
        transition: "all 0.4s ease"
    },
    tableCard: {
        background: "rgba(255,255,255,0.08)",
        backdropFilter: "blur(25px)",
        borderRadius: "28px",
        padding: "0",
        border: "1px solid rgba(255,255,255,0.12)",
        width: "100%",
        overflow: "hidden",
        boxShadow: "0 30px 80px rgba(0,0,0,0.3)"
    },
    tableHeader: {
        padding: "30px 40px",
        background: "rgba(230,30,50,0.15)"
    },
    tableTitle: {
        color: "rgb(255,255,255)",
        fontSize: "1.8rem",
        fontWeight: "700",
        margin: 0
    },
    tableWrapper: {
        overflowX: "auto"
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
        background: "rgba(15,15,15,0.5)"
    },
    tableHeadRow: {
        background: "rgba(230,30,50,0.2)"
    },
    tableHead: {
        padding: "20px",
        color: "rgb(255,255,255)",
        fontWeight: "700",
        fontSize: "1rem",
        textAlign: "left",
        borderBottom: "2px solid rgba(255,255,255,0.1)"
    },
    tableRow: {
        transition: "all 0.3s ease"
    },
    tableRow: {
        background: "rgba(255,255,255,0.05)"
    },
    tableCell: {
        padding: "20px",
        color: "rgb(255,255,255)",
        fontSize: "1rem",
        borderBottom: "1px solid rgba(255,255,255,0.1)"
    },
    statusBadge: {
        padding: "8px 20px",
        borderRadius: "25px",
        fontSize: "0.9rem",
        fontWeight: "700",
        textTransform: "uppercase",
        letterSpacing: "0.5px"
    },
    deleteButton: {
        padding: "12px 24px",
        background: "rgba(179,179,179,0.2)",
        color: "rgb(255,255,255)",
        border: "2px solid rgba(179,179,179,0.3)",
        borderRadius: "16px",
        fontSize: "0.95rem",
        fontWeight: "700",
        cursor: "pointer",
        transition: "all 0.3s ease"
    },
    backButtonContainer: {
        width: "100%",
        maxWidth: "500px"
    },
    backButton: {
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
        padding: "18px 40px",
        background: "rgba(255,255,255,0.1)",
        color: "rgb(255,255,255)",
        textDecoration: "none",
        borderRadius: "20px",
        fontSize: "1.1rem",
        fontWeight: "600",
        transition: "all 0.3s ease",
        border: "1px solid rgba(255,255,255,0.2)"
    }
};
