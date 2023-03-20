import React, { useState, useContext } from "react";
import { UserContext } from "./Context";
import "./PopUp.css";
import Select from "react-select";

const EditDog = ({
  trigger,
  setTrigger,
  dogId,
  originalName,
  originalBreed,
  originalTraits,
  originalAge,
  originalEnjoyedActivities,
  originalVaccinationStatus,
  uploaded_image,
}) => {
  const options = [
    { value: 1, label: "Vaccinated" },
    { value: 0, label: "Not Vaccinated Yet" },
  ];
  const { user, setUser, dogs, setDogs, meetups, setMeetups } =
    useContext(UserContext);
  const [selected, setSelected] = useState("");
  const [errors, setErrors] = useState([]);

  const [formData, setFormData] = useState({
    dog_id: dogId,
    name: originalName,
    breed: originalBreed,
    traits: originalTraits,
    enjoyed_activities: originalEnjoyedActivities,
    age: originalAge,
    image_data: uploaded_image,
    vaccination: originalVaccinationStatus,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`/dogs/${dogId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        dog_id: dogId,
        name: formData.name,
        breed: formData.breed,
        traits: formData.traits,
        enjoyed_activities: formData.enjoyed_activities,
        age: formData.age,
        image_data: uploaded_image,
        vaccination: selected,
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((data) => {
          updateUserDog(data);
          updateDog(data);
          updateMeetups(data);
          setTrigger(false);
        });
      } else {
        r.json().then((errorData) => setErrors(errorData.errors));
      }
    });
    setFormData({
      dog_id: dogId,
      name: "",
      breed: "",
      traits: "",
      enjoyed_activities: "",
      age: "",
      image_data: uploaded_image,
      vaccination: "",
    });
  };

  const updateUserDog = (data) => {
    let spreadDogs = [...user.dogs];
    let unupdatedUserDogs = spreadDogs.filter((dog) => dog.id !== data.id);
    let updatedUserDogs = [...unupdatedUserDogs, data];
    const updatedUser = {
      ...user,
      dogs: [...updatedUserDogs],
    };
    setUser(updatedUser);
  };

  const updateDog = (data) => {
    let spreadDogs = [...dogs];
    let unupdatedDogs = spreadDogs.filter((dog) => dog.id !== data.id);
    let updatedDogs = [...unupdatedDogs, data];
    setDogs(updatedDogs);
  };

  const updateMeetups = (data) => {
    let spreadMeetups = [...meetups];
    let sentMeetups = spreadMeetups.filter(
      (meetup) => meetup.invitor.id === data.id
    );
    let recievedMeetups = spreadMeetups.filter(
      (meetup) => meetup.invitee.id === data.id
    );
    let updatedSentMeetups = sentMeetups.map((meetup) => {
      return {
        ...meetup,
        invitee: { ...meetup.invitee, name: data.name },
      };
    });
    let updatedRecievedMeetups = recievedMeetups.map((meetup) => {
      return {
        ...meetup,
        invitee: { ...meetup.invitee, name: data.name },
      };
    });
    let unupdatedSentMeetups = spreadMeetups.filter(
      (meetup) => meetup.invitor.id !== data.id
    );
    let unupdatedSentAndRecievedMeetups = unupdatedSentMeetups.filter(
      (meetup) => meetup.invitee.id !== data.id
    );
    let updatedMeetups = [
      ...unupdatedSentAndRecievedMeetups,
      ...updatedSentMeetups,
      ...updatedRecievedMeetups,
    ];
    setMeetups(updatedMeetups);
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

  return trigger ? (
    <div className="edit-review-card">
      <div>
        <h3 style={{ color: "black" }}>Edit Dog</h3>
        <form onSubmit={handleSubmit} id={dogId}>
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
          <br></br>
          <label style={{ color: "black" }}>
            Breed:
            <input
              className="editsubmissionfield"
              type="text"
              name="breed"
              spellCheck="true"
              value={formData.breed}
              onChange={handleChange}
            />
          </label>
          <label style={{ color: "black" }}>
            Traits:
            <input
              className="editsubmissionfield"
              type="text"
              name="traits"
              spellCheck="true"
              value={formData.traits}
              onChange={handleChange}
            />
          </label>
          <label style={{ color: "black" }}>
            Enjoyed Activities:
            <input
              className="editsubmissionfield"
              type="text"
              name="enjoyed_activities"
              spellCheck="true"
              value={formData.enjoyed_activities}
              onChange={handleChange}
            />
          </label>
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
            <Select
              options={options}
              onChange={handleSelect}
              autoFocus={true}
            />
          </label>
          <input type="submit" value="Submit" />
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

export default EditDog;
