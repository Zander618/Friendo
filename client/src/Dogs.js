import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "./Context";
import "./DogImage.css";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

const Dogs = ({ setDogId }) => {
  const navigate = useNavigate();

  const { dogs, userId } = useContext(UserContext);

  const [dogsToDisplay, setDogsToDisplay] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState("");

  const activityOptions = [
    { value: 0, label: "Fetch" },
    { value: 1, label: "Tug" },
    { value: 2, label: "Running" },
    { value: 3, label: "Chase" },
    { value: 4, label: "Wrestling" },
    { value: 5, label: "Racing" },
    { value: 6, label: "Napping" },
    { value: 7, label: "Zoomies" },
    { value: 8, label: "Sniffing" },
    { value: 9, label: "Spinning" },
    { value: 10, label: "Rolling" },
    { value: 11, label: "Walks" },
    { value: 12, label: "Eating" },
    { value: 13, label: "Digging" },
    { value: 14, label: "Agility" },
    { value: 15, label: "Sleeping" },
    { value: 16, label: "Swimming" },
    { value: 17, label: "Chewing" },
    { value: 18, label: "Chasing" },
    { value: 19, label: "Bubbles" },
    { value: 20, label: "Hoses" },
    { value: 21, label: "Kiddie Pools" },
    { value: 22, label: "Frisbee" },
    { value: 23, label: "Exploring" },
    { value: 24, label: "Other" },
  ];

  useEffect(() => {
    let filteredDogs = dogs.filter((dog) => dog.user_id !== userId);
    setDogsToDisplay(filteredDogs);
  }, [dogs, userId]);

  const handleClickAllDogs = () => {
    let dogsToFilter = [...dogs];
    let allDogs = dogsToFilter.filter((dog) => dog.user_id !== userId);
    setDogsToDisplay(allDogs);
  };

  const [formData, setFormData] = useState({
    age: "",
  });

  let filterAges = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmitAgeFilter = (event) => {
    event.preventDefault();
    let dogsToFilter = [...dogs];
    let allDogs = dogsToFilter.filter((dog) => dog.user_id !== userId);
    let dogByAges = allDogs.filter((dog) => dog.age === parseInt(formData.age));
    setDogsToDisplay(dogByAges);
  };

  const handleSubmitActivityFilter = (e) => {
    e.preventDefault();
    let dogsToFilter = [...dogs];
    let allDogs = dogsToFilter.filter((dog) => dog.user_id !== userId);
    let dogByActivity = allDogs.filter((dog) => dog.enjoyed_activities.includes(selectedActivity) );
    if (dogByActivity.length === 0){
    return alert("No Matching Dogs")
    }else{
    setDogsToDisplay(dogByActivity)
    }
    console.log(dogByActivity)
  };

  const handleSelectedActivity = (selectedOption) => {
    setSelectedActivity(selectedOption.label);
  };

  return dogs ? (
    <div>
      <div>
        <br />
        <h3>Filters : </h3>
        <button
          onClick={() => {
            handleClickAllDogs();
          }}
        >
          All Dogs
        </button>
        <form
          onSubmit={(event) => {
            handleSubmitAgeFilter(event);
          }}
        >
          <label>
            Age:
            <input
              type="integer"
              name="age"
              placeholder="Enter You Dog's Age"
              value={formData.age}
              onChange={filterAges}
            />
            <input type="submit" value="Submit" />
          </label>
        </form>
        <form
          onSubmit={(event) => {
            handleSubmitActivityFilter(event);
          }}
        >
          <label style={{ color: "black" }}>
            Traits:
            <Select
              options={activityOptions}
              onChange={handleSelectedActivity}
              autoFocus={true}
            />
            <input type="submit" value="Submit" />
          </label>
        </form>
        {/* <button>Traits</button>
        <button>Breed</button> */}
        <br />
        <br />
      </div>
      {dogsToDisplay
        .sort((a, b) => (a.name > b.name ? 1 : -1))
        .map((dog) => {
          return (
            <div key={dog.id} className="dog-card">
              <div>
                <h1>{dog.name}</h1>
                <h2>{dog.owner_username}'s dog</h2>
                <img
                  src={dog.uploaded_image ? dog.uploaded_image : "no photo"}
                  alt="Dog not added"
                  className="dogImageSizing"
                />
                <div className="side-content-center">
                  <ol>
                    <p>Breed: {dog.breed}</p>
                    <p>Personality Traits: {dog.traits}</p>
                    <p>Enjoyed Activites: {dog.enjoyed_activities}</p>
                    <p>Age: {dog.age}</p>
                    <p>
                      Vaccination Status: {dog.vaccination ? "Yes" : "Not Yet"}
                    </p>
                    <p>Has sent {dog.sent_invitations.length} invitations</p>
                    <p>
                      Has received {dog.recieved_invitations.length} invitations
                    </p>
                    <button
                      onClick={() => {
                        setDogId(dog.id);
                        navigate(`/dogs/${dog.id}/meetups/new`);
                      }}
                      id={dog.id}
                    >
                      Request a Meetup
                    </button>
                  </ol>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  ) : (
    <h1>...Loading</h1>
  );
};

export default Dogs;
