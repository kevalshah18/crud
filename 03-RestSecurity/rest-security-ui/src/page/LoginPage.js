// src/pages/LoginPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch("/api/employees", {
        method: "GET",
        headers: {
          "Authorization": "Basic " + btoa(username + ":" + password)
        }
      });

      if (res.ok) {
        const data = await res.json();
        // Pass data to EmployeesPage using state
        navigate("/employees", { state: { user: { username, password }, data } });
      } else {
        setError("❌ Unauthorized (Check username/password or roles)");
      }
    } catch (err) {
      setError("⚠️ Error: " + err.message);
    }
  };

  return (
    <div style={{ fontFamily: "Arial", padding: "2rem" }}>
      <h2>🔐 Login to Access Employees</h2>
      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default LoginPage;
