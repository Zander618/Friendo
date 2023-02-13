import React, {useContext} from "react";
import { UserContext } from "./Context";
import "./DogImage.css"

const Dogs = () => {

  const { dogs } = useContext(UserContext);


  return dogs ? (
    <div>
      {dogs.map((dog) => {
        return(
        <div key={dog.id} className="dog-card">
          <h1>{dog.name}</h1>
          <h2>{dog.owner_username}'s dog</h2>
          <img src={dog.image ? dog.uploaded_image : "no photo"} alt="No Photo" className="dogImageSizing"/>
            <ul>
                <li>{dog.breed}</li>
                <li>{dog.traits}</li>
                <li>{dog.enjoyed_activities}</li>
                <li>{dog.age}</li>
                <li>{dog.vaccination ? "Yes" : "Not Yet"}</li>
            </ul>
          <button>Request a Meetup</button>
        </div>
        )
      })}
    </div>
  ) : (
    <h1>...Loading</h1>
  )
}

export default Dogs