import React, { useContext, useState } from "react";
import { UserContext } from "./Context";
import "./DogImage.css"

const MyProfile = () => {
  const { user } = useContext(UserContext);
  const [dogImage, setDogImage] = useState([]);

  console.log(user)


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

  return user ? (
    <div>
      <br></br>
      <h1>User Profile</h1>
      <br></br>
      <h2>First Name: {user.first_name}</h2>
      <h2>Username: {user.username}</h2>
      <h2>State: {user.state}</h2>
      <h2>Country: {user.country}</h2>
      <h2>Email: {user.email}</h2>
      {/* <img src={dogs[0].image.dog_image} alt="my dog" /> */}
      <br></br>
      <br></br>
      <h1>{user.first_name}'s Dogs</h1>
      <div>
        {user.dogs.map((dog) => {
          return (
            <div key={dog.id}>
              <h2>{dog.name}</h2>
              <img src={dog.dog_image} alt="this is a dog" className="dogImageSizing"/>
              <ul>
                <li>{dog.breed}</li>
                <li>{dog.traits}</li>
                <li>{dog.enjoyed_activities}</li>
                <li>{dog.age}</li>
                <li>{dog.vaccination ? "Yes" : "Not Yet"}</li>
              </ul>
              <h3>Add Photo</h3>
              {dog.dog_image ? "" :
              <form onSubmit={handleSubmitPhoto} id={dog.id}>
                <h4>upload photo</h4>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setDogImage(e.target.files[0])}
                />
                <input type="submit" />
              </form>
        }
            </div>
          );
        })}
      </div>
      <br></br>
      <br></br>
    </div>
  ) : (
    <h1>... Loading</h1>
  )
};

export default MyProfile;
