import React, { useContext } from "react";
import { UserContext } from "./Context";

const MyDog = () => {
  const { user } = useContext(UserContext);


  return  (
    <div>
      <br></br>
      <h1>{user.first_name}</h1>
      <h1>{user.username}'s Dogs</h1>
      <div>
        {user.dogs.map((dog) => {
        return(
          <div key={dog.id}>
            <h2>{dog.name}</h2>
              <ul>
                <li>{dog.breed}</li>
                <li>{dog.traits}</li>
                <li>{dog.enjoyed_activities}</li>
                <li>{dog.age}</li>
                <li>{dog.vaccination ? "Yes" : "Not Yet"}</li>
              </ul>
          </div>
        )
        })}
      </div>
    </div>
  )
};

export default MyDog;
