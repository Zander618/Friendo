import React, { useContext, useState } from "react";
import { UserContext } from "./Context";
import "./DogImage.css";

const MyProfile = () => {
  const { user, dogs, setDogs } = useContext(UserContext);
  const [dogImage, setDogImage] = useState([]);

  const handleSubmitPhoto = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("dog_id", e.target.id);
    formData.append("dog_image", dogImage);

    fetch("/images", {
      method: "POST",
      body: formData,
    })
      .then((resp) => resp.json())
      .then((data) => {
        addPhotoToDog(data);
      });
  };

  const addPhotoToDog = (data) => {
    let spreadDogs = [...dogs];
    let dogToUpdate = spreadDogs.find((dog) => (dog.id = data.dog.id));
    dogToUpdate.uploaded_image = data.dog_image;
    let unupdatedDogs = spreadDogs.filter((dog) => dog.id !== data.dog.id);
    let updatedDogs = [...unupdatedDogs, dogToUpdate];
    setDogs(updatedDogs)
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
      <br></br>
      <br></br>
      <h1>{user.first_name}'s Dogs</h1>
      <div>
        {user.dogs.map((dog) => {
          return (
            <div key={dog.id}>
              <h2>{dog.name}</h2>
              <img
                src={dog.uploaded_image}
                alt="Please Upload Below"
                className="dogImageSizing"
              />
              <ul>
                <li>{dog.breed}</li>
                <li>{dog.traits}</li>
                <li>{dog.enjoyed_activities}</li>
                <li>{dog.age}</li>
                <li>{dog.vaccination ? "Yes" : "Not Yet"}</li>
              </ul>

              {dog.uploaded_image ? (
                ""
              ) : (
                <div>
                  <h3>Add Photo</h3>
                  <form onSubmit={handleSubmitPhoto} id={dog.id}>
                    <h4>upload photo</h4>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setDogImage(e.target.files[0])}
                    />
                    <input type="submit" />
                  </form>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <br></br>
      <br></br>
    </div>
  ) : (
    <h1>... Loading</h1>
  );
};

export default MyProfile;
