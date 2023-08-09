import React, { useState, useContext } from "react";
import { UserContext } from "./Context";
import "./Locations.css";

const AddLocation = ({ trigger, setTrigger }) => {
  const { locations, setLocations } = useContext(UserContext);
  const [formData, setFormData] = useState({
    address: "",
    name: "",
    photo: "",
  });
  const [errors, setErrors] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`/locations`, {
      method: "POST",
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
          addNewLocation(data);
          setTrigger(false);
        });
      } else {
        resp.json().then((errorData) => setErrors(errorData.errors));
      }
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

  const addNewLocation = (data) => {
    let newLocations = [...locations, data];
    setLocations(newLocations);
  };

  return trigger ? (
    <div className="add-popup">
      <div className="add-popup-inner">
        <h3>Add Location</h3>
        <form onSubmit={handleSubmit}>
          <label>
            Address:
            <input
              className="submission-field"
              type="text"
              name="address"
              spellCheck="true"
              placeholder="Enter Address"
              value={formData.address}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Name:
            <input
              className="submission-field"
              type="text"
              name="name"
              placeholder="Name of the Location"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Photo:
            <input
              className="submission-field"
              type="text"
              name="photo"
              placeholder="Copy URL of Location Photo"
              value={formData.photo}
              onChange={handleChange}
            />
          </label>
          <br />
          <input type="submit" value="Submit" />
        </form>
        <button className="close-btn" onClick={() => setTrigger(false)}>
          Close
        </button>
        {errors.length > 0 && (
          <ul className="error-list">
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

export default AddLocation;
