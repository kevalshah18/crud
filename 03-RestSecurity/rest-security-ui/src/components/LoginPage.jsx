import React, { useState } from "react";

export default function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Username and password required");
      return;
    }

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        setError("Invalid credentials");
        return;
      }

      const data = await res.json(); // backend returns { username, roles }
      setError(null);
      onLogin(data);
    } catch (err) {
      console.error(err);
      setError("Login failed. Try again.");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <div className="error">{error}</div>}

        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />

        <button type="submit">Login</button>
      </form>

      <style jsx>{`
        .login-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: #f5f5f5;
          padding: 20px;
        }
        .login-form {
          background: white;
          padding: 30px 40px;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
          width: 100%;
          max-width: 400px;
          display: flex;
          flex-direction: column;
        }
        .login-form h2 {
          text-align: center;
          margin-bottom: 20px;
        }
        .login-form label {
          margin-top: 10px;
        }
        .login-form input {
          padding: 10px;
          margin-top: 5px;
          border-radius: 6px;
          border: 1px solid #ccc;
          width: 100%;
        }
        .login-form button {
          margin-top: 20px;
          padding: 12px;
          border: none;
          border-radius: 6px;
          background-color: #007bff;
          color: white;
          font-weight: bold;
          cursor: pointer;
        }
        .login-form button:hover {
          background-color: #0056b3;
        }
        .error {
          color: red;
          margin-top: 10px;
          text-align: center;
        }
        @media (max-width: 500px) {
          .login-form {
            padding: 20px;
          }
        }
      `}</style>
    </div>
  );
}
