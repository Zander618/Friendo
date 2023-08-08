import React, {useState, useContext} from "react";
import { UserContext } from "./Context";
import "./MyProfile.css";

const EditImage = ({dogId, trigger, setTrigger}) => {
  const [edittedDogImage, setEdittedDogImage] = useState([]);
  const { user, setUser, dogs, setDogs } = useContext(UserContext);

  
  function handleDeleteClick(e) {
    e.preventDefault();
    fetch(`/dogimage/${dogId}`, {
      method: "DELETE",
    })
    handleSubmitPhoto()
  }
  
  
  
  
  const handleSubmitPhoto = () => {
  
    const formData = new FormData();
    formData.append("dog_id", dogId);
    formData.append("dog_image", edittedDogImage);

    fetch(`/images`, {
      method: "POST",
      body: formData,
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
    <div className="edit-popup">
      <div className="edit-popup-inner">
      <form onSubmit={handleDeleteClick}>
        <h4>upload photo</h4>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setEdittedDogImage(e.target.files[0])}
        />
        <input className="popup-button" type="submit" value="Submit" />
      </form>
      <button className="close-btn" onClick={() => setTrigger(false)}>
          close
        </button>
        </div>
    </div>
  ) : (
    ""
  )
};

export default EditImage;
