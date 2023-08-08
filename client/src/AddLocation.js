import React, { useState, useContext } from "react";
import { UserContext } from "./Context";

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
  })
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
    <div>
      <div>
        <h3 style={{ color: "black" }}>Add Location</h3>
        <form onSubmit={handleSubmit}>
          <label style={{ color: "black" }}>
            Address:
            <input
              className="submissionfield"
              type="text"
              name="address"
              spellCheck="true"
              placeholder="Enter Address"
              value={formData.address}
              onChange={handleChange}
            />
          </label>
          <br></br>
          <label style={{ color: "black" }}>
            Name:
            <input
              type="text"
              name="name"
              placeholder="Name of the Location"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
          <br></br>
          <label style={{ color: "black" }}>
            Photo:
            <input
              type="text"
              name="photo"
              placeholder="Copy url of location photo"
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

export default AddLocation;
