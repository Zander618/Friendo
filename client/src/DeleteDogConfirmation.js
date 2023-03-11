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
  console.log(dogs)

  const handleDeleteDogForDogsArray = () => {
    let spreadDogs = [...dogs]
    let remainingDogs = spreadDogs.filter((dog) => dog.id !== dogId)
    // let remainingReceivedInvitations = spreadDogs.map((dog) => dog.recieved_invitations.invitor.id !== dogId)
    // const updatedDogs = {
    //   ...remainingDogs,
    //   recieved_invitations: [...remainingReceivedInvitations]
    // }
    // setDogs(updatedDogs)
    setDogs(remainingDogs)
    // console.log(updatedDogs)
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