import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:8080/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessage("Password reset email sent! Check your inbox.");
        setTimeout(() => navigate("/login"), 3000);
      } else {
        setMessage(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setMessage("Server error! Please try later.");
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "2rem",
      background: "linear-gradient(135deg, rgb(0,0,0) 0%, rgba(230,30,50,0.1) 50%, rgb(0,0,0) 100%)",
    },
    card: {
      background: "rgba(255,255,255,0.08)",
      backdropFilter: "blur(20px)",
      border: "1px solid rgba(255,255,255,0.1)",
      padding: "3rem 2.5rem",
      borderRadius: "24px",
      width: "100%",
      maxWidth: "420px",
      textAlign: "center",
      boxShadow: "0 25px 60px rgba(230,30,50,0.2)",
    },
    heading: {
      fontSize: "clamp(1.8rem, 4vw, 2.4rem)",
      fontWeight: "800",
      background: "linear-gradient(135deg, rgb(255,255,255), rgb(230,30,50))",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      marginBottom: "1.5rem",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "1.2rem",
    },
    input: {
      width: "100%",
      padding: "1.1rem 1.5rem",
      border: "2px solid rgba(255,255,255,0.1)",
      borderRadius: "16px",
      fontSize: "1rem",
      background: "rgba(255,255,255,0.1)",
      backdropFilter: "blur(10px)",
      color: "rgb(255,255,255)",
      fontWeight: "500",
    },
    button: {
      background: "linear-gradient(135deg, rgb(230,30,50), rgba(230,30,50,0.9))",
      border: "none",
      padding: "1.2rem",
      borderRadius: "16px",
      fontSize: "1.1rem",
      cursor: "pointer",
      color: "rgb(255,255,255)",
      fontWeight: "700",
      textTransform: "uppercase",
      boxShadow: "0 10px 30px rgba(230,30,50,0.4)",
    },
    message: {
      marginTop: "1.5rem",
      fontWeight: "600",
      fontSize: "1rem",
      padding: "1rem",
      borderRadius: "12px",
      background: "rgba(230,30,50,0.15)",
      border: "1px solid rgba(230,30,50,0.3)",
      color: "rgb(255,255,255)",
    },
    linksContainer: {
      marginTop: "1.5rem",
    },
    link: {
      color: "rgba(230,30,50,0.9)",
      textDecoration: "none",
      fontWeight: "500",
      fontSize: "0.95rem",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Forgot Password?</h2>
        <p style={{ color: "rgba(179,179,179,0.9)", marginBottom: "2rem" }}>
          Enter your email and we'll send you a link to reset your password.
        </p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
            style={styles.input}
          />
          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {message && <p style={styles.message}>{message}</p>}

        <div style={styles.linksContainer}>
          <Link to="/login" style={styles.link}>
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
