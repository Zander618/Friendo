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
                <h4>Breed: </h4>
                <h5>{dog.breed}</h5>
                <h4>Personality Traits: </h4>
                <h5>{dog.traits}</h5>
                <h4>Enjoyed Activities: </h4>
                <h5>{dog.enjoyed_activities}</h5>
                <h4>Age: </h4>
                <h5>{dog.age}</h5>
                <h4>Vaccination Status: </h4>
                <h5>{dog.vaccination ? "Yes" : "Not Yet"}</h5>
                <h5>Owner's Username: {dog.owner_username}</h5>
                <h5>Has sent {dog.sent_invitations.length} invitations</h5>
                <h5>
                  Has received {dog.recieved_invitations.length} invitations
                </h5>
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
