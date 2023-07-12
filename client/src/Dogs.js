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
      {dogsToDisplay
        .sort((a, b) => (a.name > b.name ? 1 : -1))
        .map((dog) => {
          return (
            <div key={dog.id} className="dog-card">
              <div>
                <div className="text">
                  <h2>{dog.owner_username}'s dog</h2>
                  <h1>{dog.name}</h1>
                </div>
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
