import React, { useState } from "react";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState("");

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
        setResponse(JSON.stringify(data, null, 2));
      } else {
        setResponse("❌ Unauthorized (Check username/password or roles)");
      }
    } catch (err) {
      setResponse("⚠️ Error: " + err.message);
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

      <pre style={{
        backgroundColor: "#f4f4f4",
        padding: "10px",
        borderRadius: "5px",
        overflow: "auto"
      }}>
        {response}
      </pre>
    </div>
  );
}

export default App;
