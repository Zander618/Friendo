import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'

const Signup = ( { onLogin }) => {
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

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
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => onLogin(user));
        navigate("/")
      }
    });
  }
  
  return (
    <div>
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

        <input type="submit" value="Create Account" />
      </form>
    </div>
  )
}

export default Signup