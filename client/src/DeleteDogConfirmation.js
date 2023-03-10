import React, { useContext } from "react";
import { UserContext } from "./Context";
import "./PopUp.css";

const DeleteDogConfirmation = ({ trigger, setTrigger, dogId}) => {
  const { user, setUser, dogs, setDogs } = useContext(UserContext);

  function handleDeleteClick(e) {
    fetch(`/dogs/${e.target.id}`, {
      method: "DELETE",
    });
    handleDeleteDogForDogsArray(e);
    handleDeleteDogInCurrentUser(e)
  }

  const handleDeleteDogForDogsArray = () => {
    let spreadDogs = [...dogs]
    let remainingDogs = spreadDogs.filter((dog) => dog.id !== dogId)
    setDogs(remainingDogs)
  } 

  // REMOVE RECEIVED INVITATIONS FROM OTHER DOGS!!!!!!!!!!!!!
  // let remainingReceivedInvitations = remainingDogs.recieved_invitations.filter((invites) => invites.id !== dogId)
  // const updatedDogs = {
  //   ...dogs,
  //   recieved_invitations: [...remainingReceivedInvitations]
  // }

  const handleDeleteDogInCurrentUser = () => {
    let spreadDogs = [...user.dogs]
    let remainingDogs = spreadDogs.filter((dog) => dog.id !== dogId)
    const updatedUser = {
      ...user,
      dogs: [...remainingDogs],
    };
    setUser(updatedUser)
  } 



  return trigger ? (
    <div className="popup">
      <div className="popop-inner">
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