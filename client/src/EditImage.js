import React, {useState, useContext} from "react";
import { UserContext } from "./Context";
import "./PopUp.css";

const EditImage = ({dogId, trigger, setTrigger, imageId}) => {
  const [edittedDogImage, setEdittedDogImage] = useState([]);
  const { user, setUser, dogs, setDogs } = useContext(UserContext);

  const handleSubmitPhoto = (e) => {
    e.preventDefault();

    fetch(`/images/${imageId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        dog_image: edittedDogImage,
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        addPhotoToDogForUser(data);
        addPhotoToDogForDogs(data);
      });
  };

  const addPhotoToDogForUser = (data) => {
    let spreadDogs = [...user.dogs];
    let dogToUpdate = spreadDogs.find((dog) => dog.id === data.dog.id);
    let updatedDog = { ...dogToUpdate, uploaded_image: data.dog_image };
    let unupdatedUserDogs = user.dogs.filter((dog) => dog.id !== data.dog.id);
    let updatedUserDogs = [...unupdatedUserDogs, updatedDog];
    const updatedUser = {
      ...user,
      dogs: updatedUserDogs,
    };
    setUser(updatedUser);
  };

  const addPhotoToDogForDogs = (data) => {
    let spreadDogs = [...dogs];
    let dogToUpdate = spreadDogs.find((dog) => dog.id === data.dog.id);
    let updatedDog = { ...dogToUpdate, uploaded_image: data.dog_image };
    let unupdatedDogs = dogs.filter((dog) => dog.id !== data.dog.id);
    let updatedDogs = [...unupdatedDogs, updatedDog];
    setDogs(updatedDogs);
  };


  return trigger ? (
    <div className="edit-review-card">
      <form onSubmit={handleSubmitPhoto}>
        <h4>upload photo</h4>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setEdittedDogImage(e.target.files[0])}
        />
        <input type="submit" />
      </form>
      <button className="close-btn" onClick={() => setTrigger(false)}>
          close
        </button>
    </div>
  ) : (
    ""
  )
};

export default EditImage;
