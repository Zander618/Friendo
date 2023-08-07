import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "./Context";
import "./DogImage.css";
import { useNavigate } from "react-router-dom";
import DogFilters from "./DogFilters";

const Dogs = ({ setDogId }) => {
  const navigate = useNavigate();

  const { dogs, userId } = useContext(UserContext);

  const [dogsToDisplay, setDogsToDisplay] = useState([]);
  const [filterButtonPopup, setFilterButtonPopup] = useState(false);

  useEffect(() => {
    if (dogs.length > 0) {
      let filteredDogs = dogs.filter((dog) => dog.user_id !== userId);
      setDogsToDisplay(filteredDogs);
    }
  }, [dogs, userId]);

  return dogs ? (
    <div>
      <div>
        <button
          onClick={() => {
            setFilterButtonPopup(true);
          }}
        >
          Filters
        </button>
        <DogFilters
          trigger={filterButtonPopup}
          setTrigger={setFilterButtonPopup}
          dogsToDisplay={dogsToDisplay}
          setDogsToDisplay={setDogsToDisplay}
        />
      </div>
      <div className="dog-cards-container">
        {dogsToDisplay.map((dog) => {
          return (
            <div key={dog.id} className="dog-card">
              <h1>{dog.name}</h1>
              <img
                src={dog.uploaded_image ? dog.uploaded_image : "no photo"}
                alt="Dog not added"
              />
              <div className="side-content">
                <h3>Breed: </h3>
                <p>{dog.breed}</p>
                <h3>Personality Traits: </h3>
                <p>{dog.traits}</p>
                <h3>Enjoyed Activities: </h3>
                <p>{dog.enjoyed_activities}</p>
                <h3>Age: </h3>
                <p>{dog.age}</p>
                <h3>Vaccination Status: </h3>
                <p>{dog.vaccination ? "Yes" : "Not Yet"}</p>
                <p>Owner's Username: {dog.owner_username}</p>
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
              </div>
            </div>
          );
        })}
      </div>
    </div>
  ) : (
    <h1>...Loading</h1>
  );
};

export default Dogs;
