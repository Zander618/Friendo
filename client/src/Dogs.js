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
            <ul>
                <li>{dog.breed}</li>
                <li>{dog.traits}</li>
                <li>{dog.enjoyed_activities}</li>
                <li>{dog.age}</li>
                <li>{dog.vaccination ? "Yes" : "Not Yet"}</li>
            </ul>
          <button onClick={handleClick} id={dog.id}>Request a Meetup</button>
        </div>
        )
      })}
    </div>
    
  ) : (
    <h1>...Loading</h1>
  )
}

export default Dogs