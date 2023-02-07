import React, { useState } from "react";

const AddLocation = ( {trigger, setTrigger }) => {

  const [formData, setFormData] = useState({
    address: "",
    name: "",
    photo: "",
    is_a_dog_park: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };


  return trigger ? (
    <div>
      <div >
        <h3 style={{ color: "black" }}>Add Location</h3>
        <form>
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
              name="name"
              placeholder="Copy url of location photo"
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

export default AddLocation;
