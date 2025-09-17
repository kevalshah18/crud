// src/pages/EmployeesPage.js
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function EmployeesPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, data } = location.state || {};

  if (!user) {
    // Redirect to login if accessed directly
    navigate("/");
    return null;
  }

  return (
    <div style={{ fontFamily: "Arial", padding: "2rem" }}>
      <h2>👥 Employees Page</h2>
      <p>Welcome, {user.username}!</p>

      <h3>Data from API:</h3>
      <pre style={{
        backgroundColor: "#f4f4f4",
        padding: "10px",
        borderRadius: "5px",
        overflow: "auto"
      }}>
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}

export default EmployeesPage;
