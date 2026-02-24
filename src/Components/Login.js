import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showResend, setShowResend] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setMessage("Please enter both email and password.");
      return;
    }
    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      console.log("Server Response:", data);
      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        setMessage("Login successful! Redirecting...");
        setTimeout(() => navigate("/customer-dash"), 1500);
      } else if (response.status === 401 && data.error === "Account Inactive") {
        setMessage("Your account is inactive. Please verify your email.");
        setShowResend(true);
      } else {
        setMessage(data.message || "Invalid email or password.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Server error! Please try later.");
    }
  };

  const handleResendVerification = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
        setMessage("Verification email sent! Please check your inbox.");
        setShowResend(false);
      } else {
        setMessage("Failed to resend verification email. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error sending verification email. Try again later.");
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
      position: "relative",
      overflow: "hidden"
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
      position: "relative",
      transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
    },
    heading: {
      fontSize: "clamp(1.8rem, 4vw, 2.4rem)",
      fontWeight: "800",
      background: "linear-gradient(135deg, rgb(255,255,255), rgb(230,30,50))",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      marginBottom: "1.5rem",
      letterSpacing: "-0.5px",
      textShadow: "0 2px 10px rgba(230,30,50,0.3)"
    },
    switchLink: {
      marginBottom: "2rem",
      padding: "1rem",
      background: "rgba(230,30,50,0.1)",
      borderRadius: "16px",
      border: "1px solid rgba(230,30,50,0.2)"
    },
    switchText: {
      color: "rgba(179,179,179,0.9)",
      textDecoration: "none",
      fontWeight: "500",
      fontSize: "1rem"
    },
    switchHighlight: {
      color: "rgb(230,30,50)",
      fontWeight: "600"
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "1.2rem"
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
      fontWeight: "500"
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
      letterSpacing: "0.5px",
      position: "relative",
      overflow: "hidden",
      boxShadow: "0 10px 30px rgba(230,30,50,0.4)"
    },
    message: {
      marginTop: "1.5rem",
      fontWeight: "600",
      fontSize: "1rem",
      padding: "1rem",
      borderRadius: "12px",
      background: "rgba(230,30,50,0.15)",
      border: "1px solid rgba(230,30,50,0.3)",
      color: "rgb(255,255,255)"
    },
    resendButton: {
      background: "rgba(179,179,179,0.2)",
      border: "2px solid rgba(179,179,179,0.4)",
      color: "rgb(255,255,255)",
      padding: "0.9rem 1.5rem",
      borderRadius: "12px",
      fontSize: "0.95rem",
      cursor: "pointer",
      fontWeight: "600",
      marginTop: "1rem"
    },
    linksContainer: {
      marginTop: "1.5rem"
    },
    link: {
      color: "rgba(230,30,50,0.9)",
      textDecoration: "none",
      fontWeight: "500",
      fontSize: "0.95rem"
    }
  };

  return (
    <>
      <div style={styles.container}>
        <div style={styles.card}>
          <h2 style={styles.heading}>Login to Your Account</h2>
          
          {/* Registration Link */}
          <div style={styles.switchLink}>
            <Link to="/register" style={styles.switchText}>
              Don't have an account? <span style={styles.switchHighlight}>Register here</span>
            </Link>
          </div>

          <form onSubmit={handleSubmit} style={styles.form}>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
            <button type="submit" style={styles.button}>
              Login
            </button>
          </form>

          {message && <p style={styles.message}>{message}</p>}
          
          {showResend && (
            <button onClick={handleResendVerification} style={styles.resendButton}>
              Resend Verification Email
            </button>
          )}

          {/* Forgot Password Link */}
          <div style={styles.linksContainer}>
            <Link to="/forgot-password" style={styles.link}>
              Forgot Password?
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
        
        * {
          font-family: 'Poppins', sans-serif;
        }
        
        input::placeholder {
          color: rgba(179,179,179,0.7);
        }
        
        input:focus {
          border-color: rgb(230,30,50);
          box-shadow: 0 0 0 4px rgba(230,30,50,0.1);
          background: rgba(255,255,255,0.15);
          transform: translateY(-2px);
          outline: none;
        }
        
        a.switchText:hover {
          color: rgb(255,255,255);
        }
        
        a.switchText:hover span {
          text-shadow: 0 0 15px rgb(230,30,50);
        }
        
        .button:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(230,30,50,0.6);
        }
        
        .resendButton:hover {
          background: rgba(179,179,179,0.4);
          border-color: rgba(179,179,179,0.6);
          transform: translateY(-2px);
        }
        
        a.link:hover {
          color: rgb(230,30,50);
          text-shadow: 0 0 10px rgba(230,30,50,0.5);
        }
        
        @media (max-width: 480px) {
          div[style*="padding: 3rem"] {
            padding: 2rem 1.5rem;
            margin: 1rem;
          }
        }
      `}</style>
    </>
  );
}
