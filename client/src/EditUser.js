import React, { useState, useContext } from "react";
import { UserContext } from "./Context";
import "./MyProfile.css";

const EditUser = ({
  trigger,
  setTrigger,
  userId,
  originalName,
  originalUserName,
  originalState,
  originalCounty,
  originalEmail,
  userDogs,
}) => {
  const { setUser, dogs, setDogs, meetups, setMeetups } =
    useContext(UserContext);
  const [errors, setErrors] = useState([]);

  const [formData, setFormData] = useState({
    user_id: userId,
    username: originalUserName,
    name: originalName,
    state: originalState,
    county: originalCounty,
    email: originalEmail,
    dogs: userDogs,
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
        dogs: userDogs,
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((data) => {
          setUser(data);
          updateDogs(data);
          updateMeetups(data);
          setTrigger(false);
        });
      } else {
        r.json().then((errorData) => setErrors(errorData.errors));
      }
    });
    setFormData({
      user_id: userId,
      username: "",
      name: "",
      state: "",
      county: "",
      email: "",
      dogs: userDogs,
    });
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const updateDogs = (data) => {
    let spreadDogs = [...dogs];
    let userDogs = spreadDogs.filter((dog) => dog.user_id === userId);
    let updatedUserDogs = userDogs.map((dog) => {
      return {
        ...dog,
        owner_username: data.username,
        user: data,
      };
    });
    let unupdatedDogs = spreadDogs.filter((dog) => dog.user_id !== userId);
    let updatedDogs = [...unupdatedDogs, ...updatedUserDogs];
    setDogs(updatedDogs);
  };

  const updateMeetups = (data) => {
    let spreadMeetups = [...meetups];
    let userSentMeetups = spreadMeetups.filter(
      (meetup) => meetup.invitor.user_id === userId
    );
    let userRecievedMeetups = spreadMeetups.filter(
      (meetup) => meetup.invitee.user_id === userId
    );
    let updatedSentMeetups = userSentMeetups.map((meetup) => {
      return {
        ...meetup,
        invitor_username: data.username,
        invitor_email: data.email,
      };
    });
    let updatedRecievedMeetups = userRecievedMeetups.map((meetup) => {
      return {
        ...meetup,
        invitee_username: data.username,
        invitee_email: data.email,
      };
    });
    let unupdatedSentMeetups = spreadMeetups.filter(
      (meetup) => meetup.invitor.user_id !== userId
    );
    let unupdatedSentAndRecievedMeetups = unupdatedSentMeetups.filter(
      (meetup) => meetup.invitee.user_id !== userId
    );
    let updatedMeetups = [
      ...unupdatedSentAndRecievedMeetups,
      ...updatedSentMeetups,
      ...updatedRecievedMeetups,
    ];
    setMeetups(updatedMeetups);
  };

  return trigger ? (
    <div className="edit-popup">
      <div className="edit-popup-inner">
        <h3>Edit Profile Information</h3>
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
          <input className="popup-button" type="submit" value="Submit" />
        </form>
        <button className="close-btn" onClick={() => setTrigger(false)}>
          close
        </button>
        {errors.length > 0 && (
        <ul style={{ color: "red" }}>
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
      </div>
    </div>
  ) : (
    ""
  );
};

export default EditUser;
