import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./Context";
import "./App.css";

const Signup = () => {
  const { loginUser } = useContext(UserContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [reenteredPassword, setReenteredPassword] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [county, setCounty] = useState("");
  const [state, setState] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        first_name,
        state,
        county,
        email,
      }),
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
    <div className="container">
      <div className="card">
        <div className="signup-card">
          <h1>Create Account</h1>
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>
            <div>
              <label htmlFor="password">Re-Enter Password: </label>
              <input
                type="password"
                id="reenteredPassword"
                value={reenteredPassword}
                onChange={(e) => setReenteredPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>
            <div>
              <label htmlFor="first_name">First Name: </label>
              <input
                type="text"
                id="first_name"
                value={first_name}
                onChange={(e) => setFirst_name(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="state">State: </label>
              <input
                type="text"
                id="state"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="county">County: </label>
              <input
                type="text"
                id="county"
                value={county}
                onChange={(e) => setCounty(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email">Email Address: </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {errors.length > 0 && (
              <ul style={{ color: "red" }}>
                {errors.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            )}
            {password === reenteredPassword ? (
              <input
                type="submit"
                value="Create Account"
                className="submit-button"
              />
            ) : (
              <p className="password-mismatch">Passwords must match</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
