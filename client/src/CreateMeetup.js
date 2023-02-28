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
  const [startTime, setStartTime] = useState("");
  const [date, setDate] = useState(new Date());
  const { dogs, user } = useContext(UserContext);
  const selectedDog = dogs.find((dog) => dog.id === parseInt(dogId));


  const timeOptions = [
    { value: "12:00 am", label: "12:00 am"},
    { value: "12:15 am", label: "12:15 am"},
    { value: "12:30 am", label: "12:30 am"},
    { value: "12:45 am", label: "12:45 am"},
    { value: "1:00 am", label: "1:00 am" },
    { value: "1:15 am", label: "1:15 am" },
    { value: "1:30 am", label: "1:30 am" },
    { value: "1:45 am", label: "1:45 am" },
    { value: "2:00 am", label: "2:00 am" },
    { value: "2:15 am", label: "2:15 am" },
    { value: "2:30 am", label: "2:30 am" },
    { value: "2:45 am", label: "2:45 am" },
    { value: "3:00 am", label: "3:00 am" },
    { value: "3:15 am", label: "3:15 am" },
    { value: "3:30 am", label: "3:30 am" },
    { value: "3:45 am", label: "3:45 am" },
    { value: "4:00 am", label: "4:00 am" },
    { value: "4:15 am", label: "4:15 am" },
    { value: "4:30 am", label: "4:30 am" },
    { value: "4:45 am", label: "4:45 am" },
    { value: "5:00 am", label: "5:00 am" },
    { value: "5:15 am", label: "5:15 am" },
    { value: "5:30 am", label: "5:30 am" },
    { value: "5:45 am", label: "5:45 am" },
    { value: "6:00 am", label: "6:00 am" },
    { value: "6:15 am", label: "6:15 am" },
    { value: "6:30 am", label: "6:30 am" },
    { value: "6:45 am", label: "6:45 am" },
    { value: "7:00 am", label: "7:00 am" },
    { value: "7:15 am", label: "7:15 am" },
    { value: "7:30 am", label: "7:30 am" },
    { value: "7:45 am", label: "7:45 am" },
    { value: "8:00 am", label: "8:00 am" },
    { value: "8:15 am", label: "8:15 am" },
    { value: "8:30 am", label: "8:30 am" },
    { value: "8:45 am", label: "8:45 am" },
    { value: "9:00 am", label: "9:00 am" },
    { value: "9:15 am", label: "9:15 am" },
    { value: "9:30 am", label: "9:30 am" },
    { value: "9:45 am", label: "9:45 am" },
    { value: "10:00 am", label: "10:00 am" },
    { value: "10:15 am", label: "10:15 am" },
    { value: "10:30 am", label: "10:30 am" },
    { value: "10:45 am", label: "10:45 am" },
    { value: "11:00 am", label: "11:00 am" },
    { value: "11:15 am", label: "11:15 am" },
    { value: "11:30 am", label: "11:30 am" },
    { value: "11:45 am", label: "11:45 am" },
    { value: "12:00 pm", label: "12:00 pm" },
    { value: "12:15 pm", label: "12:15 pm" },
    { value: "12:30 pm", label: "12:30 pm" },
    { value: "12:45 pm", label: "12:45 pm" },
    { value: "1:00 pm", label: "1:00 pm" },
    { value: "1:15 pm", label: "1:15 pm" },
    { value: "1:30 pm", label: "1:30 pm" },
    { value: "1:45 pm", label: "1:45 pm" },
    { value: "2:00 pm", label: "2:00 pm" },
    { value: "2:15 pm", label: "2:15 pm" },
    { value: "2:30 pm", label: "2:30 pm" },
    { value: "2:45 pm", label: "2:45 pm" },
    { value: "3:00 pm", label: "3:00 pm" },
    { value: "3:15 pm", label: "3:15 pm" },
    { value: "3:30 pm", label: "3:30 pm" },
    { value: "3:45 pm", label: "3:45 pm" },
    { value: "4:00 pm", label: "4:00 pm" },
    { value: "4:15 pm", label: "4:15 pm" },
    { value: "4:30 pm", label: "4:30 pm" },
    { value: "4:45 pm", label: "4:45 pm" },
    { value: "5:00 pm", label: "5:00 pm" },
    { value: "5:15 pm", label: "5:15 pm" },
    { value: "5:30 pm", label: "5:30 pm" },
    { value: "5:45 pm", label: "5:45 pm" },
    { value: "6:00 pm", label: "6:00 pm" },
    { value: "6:15 pm", label: "6:15 pm" },
    { value: "6:30 pm", label: "6:30 pm" },
    { value: "6:45 pm", label: "6:45 pm" },
    { value: "7:00 pm", label: "7:00 pm" },
    { value: "7:15 pm", label: "7:15 pm" },
    { value: "7:30 pm", label: "7:30 pm" },
    { value: "7:45 pm", label: "7:45 pm" },
    { value: "8:00 pm", label: "8:00 pm" },
    { value: "8:15 pm", label: "8:15 pm" },
    { value: "8:30 pm", label: "8:30 pm" },
    { value: "8:45 pm", label: "8:45 pm" },
    { value: "9:00 pm", label: "9:00 pm" },
    { value: "9:15 pm", label: "9:15 pm" },
    { value: "9:30 pm", label: "9:30 pm" },
    { value: "9:45 pm", label: "9:45 pm" },
    { value: "10:00 pm", label: "10:00 pm" },
    { value: "10:15 pm", label: "10:15 pm" },
    { value: "10:30 pm", label: "10:30 pm" },
    { value: "10:45 pm", label: "10:45 pm" },
    { value: "11:00 pm", label: "11:00 pm" },
    { value: "11:15 pm", label: "11:15 pm" },
    { value: "11:30 pm", label: "11:30 pm" },
    { value: "11:45 pm", label: "11:45 pm" }
  ]

  const locationOptions = locations.map((location) => ({
    value: location.id,
    label: location.name,
  }));

  const userDogOptions = user.dogs.map((dog) => ({
    value: dog.id,
    label: dog.name,
  }));

  const handleTimeSelect = (selectedOption) => {
    setStartTime(selectedOption.value);
  };

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
        time: startTime,
        invitee_id: selectedDog.id,
        response: 2
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
      <h2>Select Time</h2>
      <label style={{ color: "black" }}>
        Select Your Location
        <Select
          options={timeOptions}
          autoFocus={true}
          onChange={handleTimeSelect}
        />
      </label>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default CreateMeetup;
