import React, { useState, useContext } from "react";
import { UserContext } from "./Context";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

const AddDog = () => {
  const { user, setUser, userId, dogs, setDogs } = useContext(UserContext);
  const [selected, setSelected] = useState("");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const options = [
    { value: 1, label: "Vaccinated" },
    { value: 0, label: "Not Vaccinated Yet" },
  ];

  const addNewDogToUser = (dog) => {
    const updatedUser = {
      ...user,
      dogs: [...user.dogs, dog],
    };
    setUser(updatedUser);
  };

  const addNewDogToDogs = (dog) => {
    const updatedDogs = [...dogs, dog];
    setDogs(updatedDogs);
  };

  const [formData, setFormData] = useState({
    user_id: userId,
    name: "",
    breed: "",
    traits: "",
    enjoyed_activities: "",
    age: "",
    image_data: "",
    vaccination: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`/dogs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userId,
        name: formData.name,
        breed: formData.breed,
        traits: formData.traits,
        enjoyed_activities: formData.enjoyed_activities,
        age: formData.age,
        image_data: "",
        vaccination: selected,
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((data) => {
          addNewDogToUser(data);
          addNewDogToDogs(data);
          navigate("/profile");
        });
      } else {
        r.json().then((errorData) => setErrors(errorData.errors));
      }
    });
    setFormData({
      user_id: userId,
      name: "",
      breed: "",
      traits: "",
      enjoyed_activities: "",
      age: "",
      image_data: "",
      vaccination: "",
    });
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSelect = (selectedOption) => {
    setSelected(selectedOption.value);
  };

  return (
    <div>
      <h1>Add Dog</h1>
      <form onSubmit={handleSubmit}>
        <label style={{ color: "black" }}>
          Name:
          <input
            type="text"
            name="name"
            spellCheck="true"
            placeholder="Enter Dog's Name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <br></br>
        <label style={{ color: "black" }}>
          Breed:
          <input
            type="text"
            name="breed"
            spellCheck="true"
            placeholder="Enter Dog's Breed"
            value={formData.breed}
            onChange={handleChange}
          />
        </label>
        <br></br>
        <label style={{ color: "black" }}>
          Traits:
          <input
            type="text"
            name="traits"
            spellCheck="true"
            placeholder="Enter Dog's Traits"
            value={formData.traits}
            onChange={handleChange}
          />
        </label>
        <br></br>
        <label style={{ color: "black" }}>
          Enjoyed Activities:
          <input
            type="text"
            name="enjoyed_activities"
            spellCheck="true"
            placeholder="Enter Activities Your Dog Enjoys"
            value={formData.enjoyed_activities}
            onChange={handleChange}
          />
        </label>
        <br></br>
        <label style={{ color: "black" }}>
          Age:
          <input
            type="text"
            name="age"
            spellCheck="true"
            placeholder="Enter You Dog's Age"
            value={formData.age}
            onChange={handleChange}
          />
        </label>
        <br></br>
        <label style={{ color: "black" }}>
          Vaccination:
          <Select options={options} onChange={handleSelect} autoFocus={true} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      {errors.length > 0 && (
        <ul style={{ color: "red" }}>
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AddDog;
