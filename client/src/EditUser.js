import React, { useState, useContext } from "react";
import { UserContext } from "./Context";
import "./PopUp.css";

const EditUser = ({
  trigger,
  setTrigger,
  userId,
  originalName,
  originalUserName,
  originalState,
  originalCounty,
  originalEmail,
  userDogs
}) => {
  const { setUser, dogs, setDogs } = useContext(UserContext);

  const [formData, setFormData] = useState({
    user_id: userId,
    username: originalUserName,
    name: originalName,
    state: originalState,
    county: originalCounty,
    email: originalEmail,
    dogs: userDogs
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userId,
        username: formData.username,
        first_name: formData.name,
        state: formData.state,
        county: formData.county,
        email: formData.email,
        dogs: userDogs
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setUser(data);
        updateDogs(data)
        setTrigger(false);
      });
    setFormData({
      user_id: userId,
      username: "",
      name: "",
      state: "",
      county: "",
      email: "",
      dogs: userDogs
    });
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const updateDogs = (data) => {
    let spreadDogs = [...dogs]
    let userDogs = spreadDogs.filter((dog) => dog.user_id === userId)
    let updatedUserDogs = userDogs.map((dog) => {
      return{
      ...dog,
      owner_username: data.username,
      user: data
      }
    })
    let unupdatedDogs = spreadDogs.filter((dog) => dog.user_id !== userId) 
    let updatedDogs = [...unupdatedDogs, ...updatedUserDogs]
    setDogs(updatedDogs)
  }

  return trigger ? (
    <div className="edit-review-card">
      <div>
        <h3 style={{ color: "black" }}>Edit Profile Information</h3>
        <form onSubmit={handleSubmit} id={userId}>
          <label style={{ color: "black" }}>
            Username:
            <input
              className="editsubmissionfield"
              type="text"
              name="username"
              spellCheck="true"
              value={formData.username}
              onChange={handleChange}
            />
          </label>
          <br></br>
          <label style={{ color: "black" }}>
            Name:
            <input
              className="editsubmissionfield"
              type="text"
              name="name"
              spellCheck="true"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
          <label style={{ color: "black" }}>
            State:
            <input
              className="editsubmissionfield"
              type="text"
              name="state"
              spellCheck="true"
              value={formData.state}
              onChange={handleChange}
            />
          </label>
          <label style={{ color: "black" }}>
            County:
            <input
              className="editsubmissionfield"
              type="text"
              name="county"
              spellCheck="true"
              value={formData.county}
              onChange={handleChange}
            />
          </label>
          <label style={{ color: "black" }}>
            Email:
            <input
              type="text"
              name="email"
              spellCheck="true"
              value={formData.email}
              onChange={handleChange}
            />
          </label>
          <br></br>
          <input type="submit" value="Submit" />
        </form>
        <button className="close-btn" onClick={() => setTrigger(false)}>
          close
        </button>
      </div>
    </div>
  ) : (
    ""
  );
};


export default EditUser