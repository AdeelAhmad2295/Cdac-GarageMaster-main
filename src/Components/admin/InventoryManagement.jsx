import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function InventoryManagement() {
  const [inventory, setInventory] = useState([
    { id: 1, name: "🔧 Engine Oil 5W-30", stock: 45, lowStock: false, category: "Oil & Fluids", price: 850 },
    { id: 2, name: "🛞 Michelin Defender Tires", stock: 12, lowStock: true, category: "Tires", price: 12500 },
    { id: 3, name: "⚙️ Bosch Brake Pads", stock: 28, lowStock: false, category: "Brakes", price: 3200 },
    { id: 4, name: "🔋 Exide Battery 60Ah", stock: 8, lowStock: true, category: "Electrical", price: 9800 },
    { id: 5, name: "❄️ AC Refrigerant R134a", stock: 35, lowStock: false, category: "AC System", price: 2400 },
    { id: 6, name: "🪞 Side View Mirror LH", stock: 15, lowStock: false, category: "Body Parts", price: 1800 },
    { id: 7, name: "💡 LED Headlight Bulbs", stock: 22, lowStock: false, category: "Lighting", price: 1500 },
    { id: 8, name: "🔥 Spark Plugs NGK", stock: 60, lowStock: false, category: "Engine", price: 800 }
  ]);
  
  const [inventoryItem, setInventoryItem] = useState("");
  const [inventoryQuantity, setInventoryQuantity] = useState(0);
  const [showAddForm, setShowAddForm] = useState(false);
  const [filterCategory, setFilterCategory] = useState("All");

  const categories = ["All", "Oil & Fluids", "Tires", "Brakes", "Electrical", "AC System", "Body Parts", "Lighting", "Engine"];

  const addInventoryItem = () => {
    if (!inventoryItem || !inventoryQuantity) {
      alert("Please enter item name and quantity.");
      return;
    }
    const newItem = {
      id: Date.now(),
      name: inventoryItem,
      stock: parseInt(inventoryQuantity),
      lowStock: parseInt(inventoryQuantity) < 10,
      category: "Misc",
      price: 0
    };
    setInventory([...inventory, newItem]);
    setInventoryItem("");
    setInventoryQuantity(0);
    setShowAddForm(false);
    alert(`✅ ${newItem.name} added to inventory!`);
  };

  const updateInventoryStock = (itemId, quantity) => {
    setInventory(inventory.map(item => 
      item.id === itemId 
        ? { ...item, stock: Math.max(0, item.stock + quantity), lowStock: (item.stock + quantity) < 10 }
        : item
    ));
  };

  const filteredInventory = inventory.filter(item => 
    filterCategory === "All" || item.category === filterCategory
  );

  const lowStockItems = filteredInventory.filter(item => item.lowStock).length;

  return (
    <div style={styles.mainContainer}>
      <div style={styles.contentWrapper}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.headerTitle}>Inventory Management</h1>
          <p style={styles.headerSubtitle}>
            Track garage parts & supplies • {lowStockItems} items low stock
          </p>
        </div>

        {/* Stats Cards - ✅ ALL STYLE ERRORS FIXED */}
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={styles.statIcon}>📦</div>
            <div style={styles.statNumber}>{filteredInventory.length}</div>
            <div style={styles.statLabel}>Total Items</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statIcon}>⚠️</div>
            <div style={styles.lowStockNumber}>{lowStockItems}</div>
            <div style={styles.statLabel}>Low Stock</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statIcon}>₹</div>
            <div style={styles.statNumber}>
              ₹{filteredInventory.reduce((sum, item) => sum + (item.stock * item.price), 0).toLocaleString()}
            </div>
            <div style={styles.statLabel}>Total Value</div>
          </div>
        </div>

        {/* Controls */}
        <div style={styles.controlsRow}>
          <button 
            onClick={() => setShowAddForm(true)}
            style={styles.addButton}
          >
            ➕ Add New Item
          </button>
          <select 
            value={filterCategory} 
            onChange={(e) => setFilterCategory(e.target.value)}
            style={styles.filterSelect}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Add Form */}
        {showAddForm && (
          <div style={styles.formCard}>
            <h3 style={styles.formTitle}>Add New Inventory Item</h3>
            <div style={styles.formGrid}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Item Name *</label>
                <input
                  type="text"
                  value={inventoryItem}
                  onChange={(e) => setInventoryItem(e.target.value)}
                  style={styles.darkInput}
                  placeholder="e.g. Castrol Engine Oil GTX"
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Quantity *</label>
                <input
                  type="number"
                  value={inventoryQuantity}
                  onChange={(e) => setInventoryQuantity(Number(e.target.value))}
                  style={styles.darkInput}
                  placeholder="0"
                  min="0"
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Unit Price (₹)</label>
                <input
                  type="number"
                  style={styles.darkInput}
                  placeholder="0"
                  min="0"
                />
              </div>
            </div>
            <div style={styles.formButtons}>
              <button onClick={addInventoryItem} style={styles.submitButton}>
                ✅ Add Item
              </button>
              <button onClick={() => setShowAddForm(false)} style={styles.cancelButton}>
                ❌ Cancel
              </button>
            </div>
          </div>
        )}

        {/* Inventory Table - ✅ ALL STYLE ERRORS FIXED */}
        <div style={styles.tableCard}>
          <div style={styles.tableHeader}>
            <h3 style={styles.tableTitle}>Stock Overview ({filteredInventory.length})</h3>
          </div>
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr style={styles.tableHeadRow}>
                  <th style={styles.tableHead}>Item</th>
                  <th style={styles.tableHead}>Category</th>
                  <th style={styles.tableHead}>Stock</th>
                  <th style={styles.tableHead}>Price</th>
                  <th style={styles.tableHead}>Value</th>
                  <th style={styles.tableHead}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInventory.length === 0 ? (
                  <tr>
                    <td colSpan="6" style={styles.noData}>
                      No items found in this category
                    </td>
                  </tr>
                ) : (
                  filteredInventory.map((item) => (
                    <tr key={item.id} style={styles.tableRow}>
                      <td style={styles.tableCell}>
                        <div style={styles.itemName}>{item.name}</div>
                      </td>
                      <td style={styles.tableCell}>
                        <span style={styles.categoryBadge}>{item.category}</span>
                      </td>
                      <td style={styles.stockCell}>
                        <span style={item.lowStock ? styles.lowStockNumber : styles.stockNumber}>
                          {item.stock}
                        </span>
                        {item.lowStock && <span style={styles.lowStockWarning}>⚠️ Low Stock</span>}
                      </td>
                      <td style={styles.tableCell}>₹{item.price.toLocaleString()}</td>
                      <td style={styles.tableCell}>₹{(item.stock * item.price).toLocaleString()}</td>
                      <td style={styles.tableCell}>
                        <div style={styles.actionButtons}>
                          <button
                            onClick={() => updateInventoryStock(item.id, 1)}
                            style={styles.addStockButton}
                          >
                            ➕
                          </button>
                          <button
                            onClick={() => updateInventoryStock(item.id, -1)}
                            style={styles.removeStockButton}
                          >
                            ➖
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

        {/* Back Button */}
        <Link to="/admin-dashboard" style={styles.backButton}>
          ← Back to Dashboard
        </Link>
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
    alignItems: "flex-start"
  },
  contentWrapper: {
    width: "100%",
    maxWidth: "1600px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "40px"
  },
  header: {
    textAlign: "center",
    marginBottom: "20px"
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
    fontWeight: "400"
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "25px",
    width: "100%",
    maxWidth: "1000px"
  },
  statCard: {
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(20px)",
    borderRadius: "24px",
    padding: "35px",
    border: "1px solid rgba(255,255,255,0.1)",
    textAlign: "center",
    transition: "all 0.3s ease"
  },
  statIcon: {
    fontSize: "2.5rem",
    marginBottom: "15px"
  },
  statNumber: {
    fontSize: "2.8rem",
    fontWeight: "800",
    color: "rgb(255,255,255)",
    marginBottom: "8px"
  },
  // ✅ NEW: Dedicated low stock number style
  lowStockNumber: {
    fontSize: "2.8rem",
    fontWeight: "800",
    color: "rgb(230,30,50)",
    marginBottom: "8px"
  },
  statLabel: {
    color: "rgba(255,255,255,0.8)",
    fontSize: "1.1rem",
    fontWeight: "600"
  },
  controlsRow: {
    display: "flex",
    gap: "20px",
    width: "100%",
    maxWidth: "600px",
    alignItems: "center",
    flexWrap: "wrap"
  },
  addButton: {
    flex: 1,
    minWidth: "250px",
    padding: "20px 30px",
    background: "linear-gradient(135deg, rgb(230,30,50), rgba(230,30,50,0.9))",
    color: "rgb(255,255,255)",
    border: "none",
    borderRadius: "20px",
    fontSize: "1.2rem",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.4s ease",
    boxShadow: "0 12px 35px rgba(230,30,50,0.4)"
  },
  filterSelect: {
    padding: "20px 25px",
    border: "2px solid rgba(255,255,255,0.15)",
    borderRadius: "20px",
    background: "rgba(15,15,15,0.9)",
    color: "rgb(255,255,255)",
    fontSize: "1.1rem",
    cursor: "pointer"
  },
  formCard: {
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(25px)",
    borderRadius: "28px",
    padding: "50px",
    border: "1px solid rgba(255,255,255,0.12)",
    width: "100%",
    maxWidth: "1000px"
  },
  formTitle: {
    color: "rgb(255,255,255)",
    fontSize: "2rem",
    fontWeight: "800",
    marginBottom: "30px",
    textAlign: "center"
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "25px",
    marginBottom: "30px"
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
    transition: "all 0.3s ease"
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
    cursor: "pointer"
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
    cursor: "pointer"
  },
  tableCard: {
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(25px)",
    borderRadius: "28px",
    width: "100%",
    overflow: "hidden",
    border: "1px solid rgba(255,255,255,0.12)"
  },
  tableHeader: {
    padding: "35px 40px",
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
    borderCollapse: "collapse"
  },
  tableHeadRow: {
    background: "rgba(230,30,50,0.2)"
  },
  tableHead: {
    padding: "25px 20px",
    color: "rgb(255,255,255)",
    fontWeight: "700",
    fontSize: "1rem",
    textAlign: "left",
    borderBottom: "2px solid rgba(255,255,255,0.1)"
  },
  tableRow: {
    transition: "all 0.3s ease",
    background: "rgba(15,15,15,0.6)"
  },
  tableCell: {
    padding: "25px 20px",
    color: "rgb(255,255,255)",
    fontSize: "1rem",
    borderBottom: "1px solid rgba(255,255,255,0.08)"
  },
  itemName: {
    fontWeight: "600",
    fontSize: "1.05rem"
  },
  categoryBadge: {
    background: "rgba(255,255,255,0.15)",
    color: "rgb(255,255,255)",
    padding: "6px 16px",
    borderRadius: "20px",
    fontSize: "0.85rem",
    fontWeight: "600"
  },
  stockCell: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    alignItems: "flex-start"
  },
  stockNumber: {
    fontSize: "1.3rem",
    fontWeight: "800",
    color: "rgb(255,255,255)"
  },
  lowStockWarning: {
    background: "rgba(230,30,50,0.2)",
    color: "rgb(230,30,50)",
    padding: "4px 12px",
    borderRadius: "12px",
    fontSize: "0.8rem",
    fontWeight: "700"
  },
  actionButtons: {
    display: "flex",
    gap: "10px"
  },
  addStockButton: {
    width: "45px",
    height: "45px",
    background: "rgba(76,175,80,0.2)",
    color: "rgb(255,255,255)",
    border: "2px solid rgba(76,175,80,0.4)",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "1.2rem",
    fontWeight: "700",
    transition: "all 0.3s ease"
  },
  removeStockButton: {
    width: "45px",
    height: "45px",
    background: "rgba(179,179,179,0.2)",
    color: "rgb(255,255,255)",
    border: "2px solid rgba(179,179,179,0.4)",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "1.2rem",
    fontWeight: "700",
    transition: "all 0.3s ease"
  },
  backButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: "12px",
    padding: "20px 40px",
    background: "rgba(255,255,255,0.1)",
    color: "rgb(255,255,255)",
    textDecoration: "none",
    borderRadius: "24px",
    fontSize: "1.2rem",
    fontWeight: "700",
    border: "2px solid rgba(255,255,255,0.2)",
    transition: "all 0.3s ease",
    maxWidth: "300px"
  },
  noData: {
    textAlign: "center",
    color: "rgba(255,255,255,0.6)",
    fontStyle: "italic",
    padding: "60px 20px"
  }
};
