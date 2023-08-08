import React, { useState, useContext } from "react";
import { UserContext } from "./Context";
import "./PopUp.css";

const EditReview = ({
  trigger,
  setTrigger,
  locationId,
  locations,
  setLocations,
  originalName,
  originalAddress,
  originalPhoto
}) => {
  const { meetups, setMeetups, locations, setLocations } = useContext(UserContext);
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState({
    address: originalAddress,
    name: originalName,
    photo: originalPhoto,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`/locations/${locationId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        address: formData.address,
        name: formData.name,
        photo: formData.photo,
      }),
    }).then((resp) => {
      if (resp.ok) {
        resp.json().then((data) => {
        updatedLocations(data)
        updateMeetups(data)
        setTrigger(false)
      });
    } else {
      resp.json().then((errorData) => setErrors(errorData.errors));
    }
  })
    setFormData({
      address: "",
      name: "",
      photo: "",
    });
  };

  console.log(errors)


  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const updatedLocations = (data) => {
    const unupdatedLocations = locations.filter(
      (location) => location.id !== data.id
    );
    const updatedLocations = [...unupdatedLocations, data];
    setLocations(updatedLocations);
  };

  const updateMeetups = (data) => {
    const spreadMeetups = [...meetups]
    const meetupsToUpdate = spreadMeetups.filter((meetup) => meetup.location_id === data.id)
    let updatedLocationMeetups = meetupsToUpdate.map((meetup) => {
      return{
        ...meetup,
        location_address: data.address,
        location_name: data.name
      }
    })
    let unupdatedMeetups = spreadMeetups.filter((meetup) => meetup.location_id !== data.id)
    let updatedMeetups = [...unupdatedMeetups, ...updatedLocationMeetups]
    setMeetups(updatedMeetups)
  }

  return trigger ? (
    <div className="edit-review-card">
      <div>
        <h3 style={{ color: "black" }}>Edit location</h3>
        <form onSubmit={handleSubmit} id={locationId}>
          <label style={{ color: "black" }}>
            Address:
            <input
              className="editsubmissionfield"
              type="text"
              name="address"
              spellCheck="true"
              value={formData.address}
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
            Photo:
            <input
              className="editsubmissionfield"
              type="text"
              name="photo"
              spellCheck="true"
              value={formData.photo}
              onChange={handleChange}
            />
          </label>
          <br></br>
          <input type="submit" value="Submit" />
        </form>
        <button
          className="close-btn"
          onClick={() => {
            setTrigger(false);
          }}
        >
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

export default EditReview;