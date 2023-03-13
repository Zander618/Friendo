import React, { useContext } from "react";
import { UserContext } from "./Context";
import "./PopUp.css";

const DeleteDogConfirmation = ({ trigger, setTrigger, dogId}) => {
  const { user, setUser, dogs, setDogs, meetups, setMeetups } = useContext(UserContext);

  function handleDeleteClick(e) {
    fetch(`/dogs/${e.target.id}`, {
      method: "DELETE",
    });
    handleDeleteDogForDogsArray(e);
    handleDeleteDogInCurrentUser(e)
    // removeAllAssociatedMeetups(e)
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

  // function removeTargetInvite() {
  //   return dogs.map(dog => 
  //     dog.recieved_invitations.map(invite => {
  //     if (invite.invitor.id === dogId) {
  
  //       return {
  //         language: book.language,
  //         books: Object.assign(...Object.keys(book.books).map((key) => ({
  //           [key]: book.books[key]
  //         })).filter((e) => (Object.keys(e)[0] !== Object.keys(target)[0]) && Object.values(e)[0] !== Object.values(target)[0])),
  //       }
  //     } else {
  //       return book
  //     }
  //   })
  // }

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