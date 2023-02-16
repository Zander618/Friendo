import React, { useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { UserContext } from "./Context";
import Select from "react-select";
import Calendar from "react-calendar";

const MeetupLocation = ({ dogId, locations }) => {
  // const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState("");
  const [date, setDate] = useState(new Date());
  const { dogs } = useContext(UserContext);
  const selectedDog = dogs.find((dog) => dog.id === parseInt(dogId));

  const locationOptions = locations.map((location) => ({
    value: location.id,
    label: location.name,
  }));

  console.log(date);

  const handleSelect = (selectedOption) => {
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
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log("find meetup id", data);
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
          onChange={handleSelect}
        />
      </label>
      <h2>Select Your Date</h2>
      <Calendar onChange={setDate} value={date} />
      <div>Selected date: {date.toDateString()}</div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default MeetupLocation;
