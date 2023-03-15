import React, { useContext } from "react";
import { UserContext } from "./Context";
import "./PopUp.css";

const DeleteDogConfirmation = ({ trigger, setTrigger, dogId}) => {
  const { user, setUser, dogs, setDogs, meetups, setMeetups } = useContext(UserContext);

  function handleDeleteClick(e) {
    fetch(`/dogs/${e.target.id}`, {
      method: "DELETE",
    })
    handleDeleteDogInCurrentUser(e)
    removeAllAssociatedMeetups(e)
    handleDeleteDogForDogsArray(e)
  }

  const handleDeleteDogForDogsArray = () => {
    let spreadDogs = [...dogs]
    let remainingDogs = spreadDogs.filter((dog) => dog.id !== dogId)
    setDogs(remainingDogs)
  } 

  const handleDeleteDogInCurrentUser = () => {
    let spreadDogs = [...user.dogs]
    let remainingDogs = spreadDogs.filter((dog) => dog.id !== dogId)
    const updatedUser = {
      ...user,
      dogs: [...remainingDogs],
    };
    setUser(updatedUser)
  } 

  const removeAllAssociatedMeetups = () => {
    let spreadDogs = [...dogs]
    let removedDog = spreadDogs.find((dog) => dog.id === dogId)
    let spreadMeetups = [...meetups]
    let unassociatedMeetups = spreadMeetups.filter((meetup) => meetup.invitor.id !== removedDog.id)
    setMeetups(unassociatedMeetups)
  }


  return trigger ? (
    <div className="delete-popup">
      <div className="delete-popup-inner">
      <h3>Are you sure you want to remove this dog?</h3>
      <button               
              id={dogId}
              onClick={(e) => {
                handleDeleteClick(e);
              }}>Remove Dog Permanently </button>
      <button className="close-btn" onClick={() => setTrigger(false)}>close</button>
      </div>
    </div>
  ) : (
    ""
  )
}

export default DeleteDogConfirmation