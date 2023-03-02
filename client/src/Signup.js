import React, { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom'
import { UserContext } from "./Context";

const Signup = ( ) => {

  const {loginUser} = useContext(UserContext)

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [county, setCounty] = useState("")
  const [state, setState] = useState("");
  const [email, setEmail] = useState("");
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
        first_name,
        state,
        county,
        email
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => loginUser(user));
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
        <div>
          <label htmlFor="first_name">First Name: </label>
          <input 
                    type="first_name"
                    id="first_name"
                    value={first_name}
                    onChange={(e) => setFirst_name(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="state">State: </label>
          <input 
                    type="state"
                    id="state"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="county">County: </label>
          <input 
                    type="county"
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
        <input type="submit" value="Create Account" />
      </form>
    </div>
  )
}

export default Signup