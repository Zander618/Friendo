import React, { useContext, useState } from "react";
import { UserContext } from "./Context";
import DeleteDogConfirmation from "./DeleteDogConfirmation";
import "./MyProfile.css";
import EditDog from "./EditDog";
import EditImage from "./EditImage";
import EditUser from "./EditUser";

const MyProfile = () => {
  const { user, setUser, dogs, setDogs, userId } = useContext(UserContext);
  const [dogImage, setDogImage] = useState([]);
  const [editButtonPopup, setEditButtonPopup] = useState(false);
  const [editPopUpId, setEditPopUpId] = useState();
  const [editUserPopUp, setEditUserPopUp] = useState(false);
  const [deletePopUpId, setDeletePopUpId] = useState();
  const [editImagePopUpId, setEditImagePopUpId] = useState();
  const [editImagePopUp, setEditImagePopUp] = useState(false);
  const [deleteButtonPopup, setDeleteButtonPopup] = useState(false);

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
  };

  return user ? (
    <div className="background">
      <h1 className="profile-title">{user.first_name}'s Profile</h1>
      <br />
      <button
        id={userId}
        onClick={() => {
          setEditUserPopUp(true);
        }}
        className="popup-button"
      >
        Edit Profile Details
      </button>
      <h2 className="profile-info">First Name: {user.first_name}</h2>
      <h2 className="profile-info">Username: {user.username}</h2>
      <h2 className="profile-info">State: {user.state}</h2>
      <h2 className="profile-info">County: {user.county}</h2>
      <h2 className="profile-info">Email: {user.email}</h2>
      <EditUser
        trigger={editUserPopUp}
        setTrigger={setEditUserPopUp}
        userId={userId}
        originalName={user.first_name}
        originalUserName={user.username}
        originalState={user.state}
        originalCounty={user.county}
        originalEmail={user.email}
        userDogs={user.dogs}
      />
      <br />
      <br />
      <h1 className="profile-title">{user.first_name}'s Dogs</h1>
      <div>
        {user.dogs
          .sort((a, b) => (a.name > b.name ? 1 : -1))
          .map((dog) => {
            return (
              <div key={dog.id} className="profile-dog-card">
                <h2 className="dog-name">{dog.name}</h2>
                {dog.uploaded_image !== "false" && (
                  <button
                    id={dog.id}
                    onClick={(e) => {
                      setEditImagePopUpId(parseInt(e.target.id));
                      setEditImagePopUp(true);
                    }}
                    className="dog-button"
                  >
                    Change Photo
                  </button>
                )}
                {dog.id === editImagePopUpId && (
                  <EditImage
                    dogId={editImagePopUpId}
                    trigger={editImagePopUp}
                    setTrigger={setEditImagePopUp}
                  />
                )}
                <br />
                <br />
                <img
                  src={dog.uploaded_image}
                  alt="Please Upload Below"
                  className="dog-image"
                />
                <div className="dog-details">
                  <p>Breed: {dog.breed}</p>
                  <p>Personality Traits: {dog.traits}</p>
                  <p>Enjoyed Activities: {dog.enjoyed_activities}</p>
                  <p>Age: {dog.age}</p>
                  <p>
                    Vaccination Status: {dog.vaccination ? "Yes" : "Not Yet"}
                  </p>
                </div>
                {dog.id === editPopUpId && (
                  <EditDog
                    trigger={editButtonPopup}
                    setTrigger={setEditButtonPopup}
                    dogId={editPopUpId}
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
                      setEditPopUpId(parseInt(e.target.id));
                      setEditButtonPopup(true);
                    }}
                    className="dog-button"
                  >
                    Edit Dog Details
                  </button>
                ) : (
                  <div className="popup-form">
                    <h3>Add Photo</h3>
                    <h6>
                      Once a photo is added, you may edit your dog's info.
                    </h6>
                    <form onSubmit={handleSubmitPhoto} id={dog.id}>
                      <h4>Upload a Photo</h4>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setDogImage(e.target.files[0])}
                        className="popup-input"
                      />
                      <input
                        type="submit"
                        value="Upload"
                        className="popup-submit"
                      />
                    </form>
                  </div>
                )}
                <button
                  id={dog.id}
                  onClick={(e) => {
                    setDeletePopUpId(parseInt(e.target.id));
                    setDeleteButtonPopup(true);
                  }}
                  className="dog-button"
                >
                  Remove Dog
                </button>
                {dog.id === deletePopUpId && (
                  <DeleteDogConfirmation
                    trigger={deleteButtonPopup}
                    setTrigger={setDeleteButtonPopup}
                    dogId={deletePopUpId}
                  />
                )}
              </div>
            );
          })}
      </div>
      <br />
    </div>
  ) : (
    <h1>... Loading</h1>
  );
};

export default MyProfile;
