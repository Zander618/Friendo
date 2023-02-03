import React, { useContext, useState } from "react";
import { UserContext } from "./Context";
import "./DogImage.css"

const MyDog = () => {
  const { user, dogs } = useContext(UserContext);
  const [dogImage, setDogImage] = useState([]);

console.log("in dog", dogs)

  const handleSubmitPhoto = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("dog_id", e.target.id);
    formData.append("dog_image", dogImage);

    fetch("/images", {
      method: "POST",
      body: formData,
    });
  };

  return (
    <div>
      <br></br>
      <h1>{user.first_name}</h1>
      <h1>{user.username}'s Dogs</h1>
      {/* <img src={dogs[0].image.dog_image} alt="my dog" /> */}
      <div>
        {user.dogs.map((dog) => {
          return (
            <div key={dog.id}>
              <h2>{dog.name}</h2>
              <ul>
                <li>{dog.breed}</li>
                <li>{dog.traits}</li>
                <li>{dog.enjoyed_activities}</li>
                <li>{dog.age}</li>
                <li>{dog.vaccination ? "Yes" : "Not Yet"}</li>
              </ul>
              <h1>Add Photo</h1>
              <form onSubmit={handleSubmitPhoto} id={dog.id}>
                <h3>upload photo</h3>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setDogImage(e.target.files[0])}
                />
                <input type="submit" />
              </form>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyDog;
