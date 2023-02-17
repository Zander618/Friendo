import React, { useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { UserContext } from "./Context";
import Select from "react-select";
import Calendar from "react-calendar";
// import TimePicker from 'react-time-picker'

const CreateMeetup = ({ dogId, locations }) => {
  // const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedUserDog, setSelectedUserDog] = useState("");
  // const [startTime, setStartTime] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const { dogs, user } = useContext(UserContext);
  const selectedDog = dogs.find((dog) => dog.id === parseInt(dogId));


  // function onlyTime(time){
  //   var date = new Date(parseInt(time));
  //   var localeSpecificTime = date.toLocaleTimeString();
  //   setStartTime(localeSpecificTime);
  // } 


  const locationOptions = locations.map((location) => ({
    value: location.id,
    label: location.name,
  }));

  const userDogOptions = user.dogs.map((dog) => ({
    value: dog.id,
    label: dog.name,
  }));

  const handleDogSelect = (selectedOption) => {
    setSelectedUserDog(selectedOption.value);
  };

  const handleLocationSelect = (selectedOption) => {
    setSelectedLocation(selectedOption.value);
  };

  const handleSubmit = () => {
    fetch(`/meetups`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        location_id: selectedLocation,
        date: date.toDateString(),
        invitor_id: selectedUserDog,
        // time: 
        invitee_id: selectedDog.id
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log("What i sent", data);
      });
  };

  return (
    <div>
      <h1>
        You requested a Meetup with "{selectedDog.name}" the {selectedDog.breed}
      </h1>
      <label style={{ color: "black" }}>
        Select Your Location
        <Select
          options={locationOptions}
          autoFocus={true}
          onChange={handleLocationSelect}
        />
      </label>
      <label style={{ color: "black" }}>
        Choose which your dog
        <Select
          options={userDogOptions}
          autoFocus={true}
          onChange={handleDogSelect}
        />
      </label>
      <h2>Select Your Date</h2>
      <Calendar onChange={setDate} value={date} />
      <div>Selected date: {date.toDateString()}</div>
      {/* <h2>Select Time</h2> */}
      {/* <TimePicker onChange={onlyTime} />
      <div>Selected time: {startTime.toTimeString()}</div> */}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default CreateMeetup;
