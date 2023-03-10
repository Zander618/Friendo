import React, { useContext} from "react";
import { UserContext } from "./Context";
import "./DogImage.css"
import { useNavigate } from "react-router-dom";

const Dogs = ( {setDogId }) => {
  const navigate = useNavigate();
  
  const { dogs, userId } = useContext(UserContext);

  const handleClick = (e) => {
    setDogId(e.target.id)
    navigate(`/dogs/${e.target.id}/meetups/new`)
  }

  let filteredDogs = dogs.filter((dog) => dog.user_id !== userId)

  

  return dogs ? (
    <div>
      {filteredDogs.map((dog) => {
        return(
        <div key={dog.id} className="dog-card">
          <h1>{dog.name}</h1>
          <h2>{dog.owner_username}'s dog</h2>
          <img src={dog.uploaded_image ? dog.uploaded_image : "no photo"} alt="Dog not added" className="dogImageSizing"/>
            <ol>
                <p>Breed: {dog.breed}</p>
                <p>Personality Traits: {dog.traits}</p>
                <p>Enjoyed Activites: {dog.enjoyed_activities}</p>
                <p>Age: {dog.age}</p>
                <p>Vaccination Status: {dog.vaccination ? "Yes" : "Not Yet"}</p>
                <button onClick={handleClick} id={dog.id}>Request a Meetup</button>
            </ol>
        </div>
        )
      })}
    </div>
    
  ) : (
    <h1>...Loading</h1>
  )
}

export default Dogs