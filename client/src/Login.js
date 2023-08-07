import React, { useState, useContext } from "react";
import { UserContext } from "./Context";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./App.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const { loginUser } = useContext(UserContext);

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => loginUser(user));
        navigate("/");
      } else {
        r.json().then((errorData) => setErrors(errorData.errors));
      }
    });
  }

  return (
    <div className="card">
      <div className="login-card">
        <h1>Log in</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username: </label>
            <input
              type="text"
              id="username"
              autoComplete="off"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {errors.length > 0 && (
            <ul style={{ color: "red" }}>
              {errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          )}
          <input type="submit" value="Login" />
        </form>
        <Link
          to="/signup"
          style={{
            mr: 4,
            variant: "h4",
            color: "black",
            textDecoration: "none",
            textAlign: "center",
          }}
        >
          <button>Sign Up</button>
        </Link>
      </div>
      <Link
          to="/passwordrecovery"
          style={{
            mr: 4,
            variant: "h4",
            color: "blue",
            textDecoration: "underline",
            textAlign: "right",
            justify: "center",
          }}
        >
          Forgot Password ?
        </Link>
    </div>
  );
};

export default Login;
