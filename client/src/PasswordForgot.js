import React, { useState } from "react";

const PasswordForgot = () => {
  const [email, setEmail] = useState("");
  const [alerts, setAlerts] = useState([]);
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/password/forgot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((data) => {
          setErrors([]);
          setAlerts(data.alerts);
        });
      } else {
        r.json().then((data) => {
          setAlerts([]);
          setErrors(data.errors);
        });
      }
    });
  };

  return (
    <div>
      <h1>Forgot Your Password</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Reset Password</button>
      </form>
      {alerts.length > 0 && (
        <ul style={{ color: "red" }}>
          {alerts.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
      {errors.length > 0 && (
        <ul style={{ color: "red" }}>
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PasswordForgot;
