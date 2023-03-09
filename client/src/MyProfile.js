import React, { useContext, useState } from "react";
import { UserContext } from "./Context";
import "./DogImage.css";
import EditDog from "./EditDog";

const MyProfile = () => {
  const { user, setUser, dogs, setDogs } = useContext(UserContext);
  const [dogImage, setDogImage] = useState([]);
  const [editButtonPopup, setEditButtonPopup] = useState(false);
  const [popUpId, setPopUpId] = useState();

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
    console.log(updatedDogs);
  };

  function handleDeleteClick(e) {
    // fetch(`/dogs/${e.target.id}`, {
    //   method: "DELETE",
    // });
    console.log(parseInt(e.target.id));
  }

  // const handleDeleteDog = () => {
  // }

  return user ? (
    <div>
      <br></br>
      <h1>User Profile</h1>
      <br></br>
      <button>Edit Profile Details</button>
      <h2>First Name: {user.first_name}</h2>
      <h2>Username: {user.username}</h2>
      <h2>State: {user.state}</h2>
      <h2>County: {user.county}</h2>
      <h2>Email: {user.email}</h2>
      <br></br>
      <br></br>
      <h1>{user.first_name}'s Dogs</h1>
      <div>
        {user.dogs
          .sort((a, b) => (a.name > b.name ? 1 : -1))
          .map((dog) => {
            return (
              <div key={dog.id}>
                <h2>{dog.name}</h2>
                {dog.uploaded_image !== "false" ? (
                  <button>Change Photo</button>
                ) : (
                  ""
                )}
                <br></br>
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
                {dog.id === popUpId && (
                  <EditDog
                    trigger={editButtonPopup}
                    setTrigger={setEditButtonPopup}
                    dogId={popUpId}
                    originalName={dog.name}
                    originalBreed={dog.breed}
                    originalTraits={dog.traits}
                    originalAge={dog.age}
                    originalEnjoyedActivities={dog.enjoyed_activities}
                    originalVaccinationStatus={dog.vaccination}
                    uploaded_image={dog.uploaded_image}
                  />
                )}

                {dog.uploaded_image !== "false" ? (
                  <button
                    id={dog.id}
                    onClick={(e) => {
                      setPopUpId(parseInt(e.target.id));
                      setEditButtonPopup(true);
                    }}
                  >
                    Edit Dog Details
                  </button>
                ) : (
                  <div>
                    <h3>Add Photo</h3>
                    <h6>Once photo is added you may edit you dogs info.</h6>
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
                <button id={dog.id} onClick={handleDeleteClick}>Remove Dog</button>
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
