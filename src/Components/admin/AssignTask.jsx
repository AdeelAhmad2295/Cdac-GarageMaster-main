import React, { useState } from "react";

export default function AssignTask({ onTaskAssigned }) {
  const [staffList] = useState([
    "John Doe - Mechanic",
    "Jane Smith - Technician", 
    "Mark Wilson - Supervisor",
    "Alice Johnson - Electrician",
    "David Brown - Painter"
  ]);
  
  const [formData, setFormData] = useState({
    task: "",
    taskType: "",
    assignedStaff: "",
    carDetails: "",
    deliveryTime: "",
    priority: "Medium"
  });
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);

  const taskTypes = ["Oil Change", "Brake Repair", "Tire Service", "Engine Tune-up", "AC Repair", "Electrical", "Body Work"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const assignTask = async () => {
    if (!formData.task || !formData.taskType || !formData.assignedStaff || !formData.deliveryTime || !formData.carDetails) {
      alert("Please fill all required fields!");
      return;
    }

    setLoading(true);
    
    setTimeout(() => {
      const newTask = {
        id: Date.now(),
        ...formData,
        status: "Assigned",
        createdAt: new Date().toLocaleString()
      };
      
      setTasks([newTask, ...tasks]);
      
      if (onTaskAssigned) {
        onTaskAssigned(newTask);
      }
      
      setFormData({
        task: "",
        taskType: "",
        assignedStaff: "",
        carDetails: "",
        deliveryTime: "",
        priority: "Medium"
      });
      
      setLoading(false);
      alert("Task assigned successfully!");
    }, 1500);
  };

  return (
    <div style={styles.mainContainer}>
      <div style={styles.contentWrapper}>
        <div style={styles.header}>
          <h1 style={styles.headerTitle}>Assign Task</h1>
          <p style={styles.headerSubtitle}>Allocate service tasks to staff members</p>
        </div>

        <div style={styles.formSection}>
          <h3 style={styles.sectionTitle}>New Task Assignment</h3>
          
          <div style={styles.formGrid}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Task Name *</label>
              <input 
                name="task"
                value={formData.task}
                onChange={handleInputChange}
                style={styles.darkInput}
                placeholder="e.g. Engine Diagnostic"
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Task Type *</label>
              <select 
                name="taskType"
                value={formData.taskType}
                onChange={handleInputChange}
                style={styles.darkSelect}
              >
                <option value="">Select Task Type</option>
                {taskTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Assign Staff *</label>
              <select 
                name="assignedStaff"
                value={formData.assignedStaff}
                onChange={handleInputChange}
                style={styles.darkSelect}
              >
                <option value="">Select Staff Member</option>
                {staffList.map((staff, index) => (
                  <option key={index} value={staff}>{staff}</option>
                ))}
              </select>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Priority</label>
              <select 
                name="priority"
                value={formData.priority}
                onChange={handleInputChange}
                style={styles.darkSelect}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Car Details *</label>
              <input 
                name="carDetails"
                value={formData.carDetails}
                onChange={handleInputChange}
                style={styles.darkInput}
                placeholder="e.g. Toyota Corolla 2020 - White"
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Delivery Time *</label>
              <input 
                name="deliveryTime"
                type="datetime-local"
                value={formData.deliveryTime}
                onChange={handleInputChange}
                style={styles.darkInput}
              />
            </div>
          </div>

          <button 
            onClick={assignTask} 
            disabled={loading}
            style={{
              ...styles.assignButton,
              opacity: loading ? 0.7 : 1,
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? "Assigning..." : "🚀 Assign Task"}
          </button>
        </div>

        {tasks.length > 0 && (
          <div style={styles.tasksSection}>
            <h3 style={styles.sectionTitle}>Recently Assigned</h3>
            <div style={styles.tasksList}>
              {tasks.slice(0, 3).map(task => (
                <div key={task.id} style={styles.taskItem}>
                  <div style={styles.taskInfo}>
                    <strong>{task.task}</strong> - {task.assignedStaff}
                    <br />
                    <small style={styles.taskSmall}>{task.carDetails} | {new Date(task.deliveryTime).toLocaleString()}</small>
                  </div>
                  <span style={styles.taskStatus}>Assigned</span>
                </div>
              ))}
            </div>
          </div>
        )}
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
    maxWidth: "1400px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "40px"
  },
  header: {
    textAlign: "center",
  },
  headerTitle: {
    fontSize: "clamp(2.5rem, 8vw, 4.5rem)",
    fontWeight: "900",
    background: "linear-gradient(135deg, rgb(255,255,255), rgb(230,30,50))",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    marginBottom: "10px",
    letterSpacing: "-1px",
  },
  headerSubtitle: {
    fontSize: "1.4rem",
    color: "rgba(255,255,255,0.8)",
    fontWeight: "400",
    maxWidth: "600px"
  },
  formSection: {
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(25px)",
    borderRadius: "28px",
    padding: "60px 50px",
    border: "1px solid rgba(255,255,255,0.12)",
    width: "100%",
    maxWidth: "900px",
    boxShadow: "0 30px 80px rgba(230,30,50,0.15)"
  },
  sectionTitle: {
    color: "rgb(255,255,255)",
    fontSize: "2rem",
    fontWeight: "800",
    marginBottom: "35px",
    background: "linear-gradient(135deg, rgb(230,30,50), rgb(255,255,255))",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    textAlign: "center"
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
    gap: "30px",
    marginBottom: "45px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  },
  label: {
    color: "rgba(255,255,255,0.95)",
    fontSize: "1rem",
    fontWeight: "600",
    letterSpacing: "0.3px",
  },
  // 🔥 DARK INPUTS - PERFECT VISIBILITY
  darkInput: {
    padding: "18px 22px",
    border: "2px solid rgba(255,255,255,0.15)",
    borderRadius: "18px",
    background: "rgba(15,15,15,0.9)",
    color: "rgb(255,255,255)",
    fontSize: "1rem",
    fontWeight: "500",
    transition: "all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    outline: "none",
    boxShadow: "inset 0 2px 8px rgba(0,0,0,0.3)"
  },
  darkSelect: {
    padding: "18px 22px",
    border: "2px solid rgba(255,255,255,0.15)",
    borderRadius: "18px",
    background: "rgba(15,15,15,0.9)",
    color: "rgb(255,255,255)",
    fontSize: "1rem",
    fontWeight: "500",
    transition: "all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    outline: "none",
    cursor: "pointer",
    boxShadow: "inset 0 2px 8px rgba(0,0,0,0.3)",
    appearance: "none",
    backgroundImage: "url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='rgba(255,255,255,0.5)'%3e%3cpath d='M7 10l5 5 5-5z'/%3e%3c/svg%3e\")",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 15px center",
    backgroundSize: "20px"
  },
  assignButton: {
    width: "100%",
    padding: "22px",
    background: "linear-gradient(135deg, rgb(230,30,50), rgba(230,30,50,0.95))",
    color: "rgb(255,255,255)",
    border: "none",
    borderRadius: "22px",
    fontSize: "1.15rem",
    fontWeight: "800",
    cursor: "pointer",
    transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    boxShadow: "0 15px 40px rgba(230,30,50,0.4)",
    letterSpacing: "1px",
    textTransform: "uppercase",
  },
  tasksSection: {
    background: "rgba(255,255,255,0.06)",
    backdropFilter: "blur(20px)",
    borderRadius: "24px",
    padding: "45px",
    border: "1px solid rgba(255,255,255,0.1)",
    width: "100%",
    maxWidth: "500px",
  },
  tasksList: {
    maxHeight: "450px",
    overflowY: "auto",
  },
  taskItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "22px",
    marginBottom: "18px",
    background: "rgba(230,30,50,0.1)",
    borderRadius: "18px",
    borderLeft: "5px solid rgb(230,30,50)",
  },
  taskInfo: {
    flex: 1,
    color: "rgb(255,255,255)",
  },
  taskSmall: {
    color: "rgba(255,255,255,0.75)",
    fontSize: "0.9rem"
  },
  taskStatus: {
    background: "rgba(255,255,255,0.2)",
    color: "rgb(255,255,255)",
    padding: "8px 20px",
    borderRadius: "25px",
    fontSize: "0.9rem",
    fontWeight: "700",
  }
};
