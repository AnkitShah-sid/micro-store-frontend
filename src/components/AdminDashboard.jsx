import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // for navigating after logout

const AdminDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // simulating logged-in state
  const navigate = useNavigate(); // to navigate after logout

  const handleLogout = () => {
    // Here, clear any stored tokens or session data if applicable
    setIsLoggedIn(false);
    // Navigate the user to the login page
    navigate("/login");
  };

  if (!isLoggedIn) {
    return (
      <div>
        <h1>You are logged out!</h1>
        <p>Please log in again to continue.</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Happily Logged in as Admin!</h1>
      <p style={styles.message}>Welcome to your admin dashboard. Enjoy your stay!</p>
      <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
    </div>
  );
};

// Basic styling for the component
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f0f4f8",
    fontFamily: "'Arial', sans-serif",
  },
  header: {
    fontSize: "3rem",
    color: "#4CAF50",
    fontWeight: "bold",
  },
  message: {
    fontSize: "1.5rem",
    color: "#333",
    margin: "20px 0",
  },
  logoutButton: {
    padding: "10px 20px",
    backgroundColor: "#FF5733",
    border: "none",
    borderRadius: "5px",
    color: "white",
    fontSize: "1rem",
    cursor: "pointer",
  },
};

export default AdminDashboard;
