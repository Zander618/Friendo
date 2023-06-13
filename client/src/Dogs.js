import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "./Context";
import "./DogImage.css";
import { useNavigate } from "react-router-dom";

const Dogs = ({ setDogId }) => {
  const navigate = useNavigate();

  const { dogs, userId } = useContext(UserContext);

  const [dogsToDisplay, setDogsToDisplay] = useState([])

  useEffect(() => {
    let filteredDogs = dogs.filter((dog) => dog.user_id !== userId);
    setDogsToDisplay(filteredDogs)
  }, [dogs, userId])
  

  const handleClickAllDogs = () => {
    let dogsToFilter = [...dogs]
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
    let dogsToFilter = [...dogs]
    let allDogs = dogsToFilter.filter((dog) => dog.user_id !== userId);
    let dogByAges = allDogs.filter(
      (dog) => dog.age === parseInt(formData.age)
    );
    setDogsToDisplay(dogByAges);
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
        <form onSubmit={(event) => {
          handleSubmitAgeFilter(event);
        }}>
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
        {/* <button>Activities</button>
        <button>Traits</button>
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
