import React, { useState, useContext } from "react";
import { UserContext } from "./Context";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

const AddDog = () => {
  const { user, setUser, userId, dogs, setDogs, setUserDogs } = useContext(UserContext);
  const [selectedVaccinationStatus, setSelectedVaccinationStatus] = useState("");
  const [selectedBreed, setSelectedBreed] = useState("");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const vaccinationOptions = [
    { value: 1, label: "Vaccinated" },
    { value: 0, label: "Not Vaccinated Yet" },
  ];

  const breedOptions = [
    { value: 0, label: "Airedale Terrier" },
    { value: 1, label: "Akita" },
    { value: 2, label: "Alaskan Malamute" },
    { value: 3, label: "American Staffordshire Terrier" },
    { value: 4, label: "Anatolian Shepherd Dog" },
    { value: 5, label: "Australian Cattle Dog" },
    { value: 6, label: "Australian Shepherd" },
    { value: 7, label: "Basenji" },
    { value: 8, label: "Basset Hound" },
    { value: 9, label: "Beagle" },
    { value: 10, label: "Belgian Malinoi" },
    { value: 11, label: "Bernese Mountain Dog" },
    { value: 12, label: "Bichons Frise" },
    { value: 13, label: "Biewer Terrier" },
    { value: 14, label: "Bloodhound" },
    { value: 15, label: "Border Collie" },
    { value: 16, label: "Border Terrier" },
    { value: 17, label: "Boston Terrier" },
    { value: 18, label: "Bouviers des Flandre" },
    { value: 19, label: "Boxer" },
    { value: 20, label: "Boykin Spaniel" },
    { value: 21, label: "Brittany" },
    { value: 22, label: "Brussels Griffon" },
    { value: 23, label: "Bull Terrier" },
    { value: 24, label: "Bulldog" },
    { value: 25, label: "Bullmastiff" },
    { value: 26, label: "Vaccinated" },
    { value: 27, label: "Not Vaccinated Yet" },
    { value: 28, label: "Vaccinated" },
    { value: 29, label: "Not Vaccinated Yet" },
    { value: 30, label: "Vaccinated" },
    { value: 31, label: "Not Vaccinated Yet" },
    { value: 32, label: "Vaccinated" },
    { value: 33, label: "Not Vaccinated Yet" },
    { value: 34, label: "Vaccinated" },
    { value: 35, label: "Not Vaccinated Yet" },
    { value: 36, label: "Vaccinated" },
    { value: 37, label: "Not Vaccinated Yet" },
    { value: 38, label: "Vaccinated" },
    { value: 39, label: "Not Vaccinated Yet" },
    { value: 40, label: "Vaccinated" },
    { value: 41, label: "Not Vaccinated Yet" },
    { value: 42, label: "Vaccinated" },
    { value: 43, label: "Not Vaccinated Yet" },
    { value: 44, label: "Vaccinated" },
    { value: 45, label: "Not Vaccinated Yet" },
    { value: 46, label: "Vaccinated" },
    { value: 47, label: "Not Vaccinated Yet" },
    { value: 48, label: "Vaccinated" },
    { value: 49, label: "Not Vaccinated Yet" },

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

  const addNewDogToUserDogs = (dog) => {
    const updatedDogs = [...user.dogs, dog];
    setUserDogs(updatedDogs);
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
        breed: selectedBreed,
        traits: formData.traits,
        enjoyed_activities: formData.enjoyed_activities,
        age: formData.age,
        image_data: "",
        vaccination: selectedVaccinationStatus,
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((data) => {
          addNewDogToUser(data);
          addNewDogToDogs(data);
          addNewDogToUserDogs(data)
          navigate("/myprofile");
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

  const handleSelectedVaccination = (selectedOption) => {
    setSelectedVaccinationStatus(selectedOption.value);
  };

  const handleSelectedBreed = (selectedOption) => {
    setSelectedBreed(selectedOption.value);
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
          <Select options={breedOptions} onChange={handleSelectedBreed} autoFocus={true} />
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
          <Select options={vaccinationOptions} onChange={handleSelectedVaccination} autoFocus={true} />
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
