import React, { useState } from "react";
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
    })
      .then((resp) => resp.json())
      .then((data) => {
        updatedLocations(data)
        setTrigger(false)
      });
    setFormData({
      address: "",
      name: "",
      photo: "",
    });
  };


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
        <button className="close-btn" onClick={() => setTrigger(false)}>
          close
        </button>
      </div>
    </div>
  ) : (
    ""
  );
};

export default EditReview;