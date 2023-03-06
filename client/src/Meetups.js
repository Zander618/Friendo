import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "./Context";
import "./Meetup.css";

const Meetups = () => {
  const { dogs, userId, setDogs } = useContext(UserContext);
  const [userDogs, setUserDogs] = useState([]);

  useEffect(() => {
    let filteredDogs = dogs.filter((dog) => dog.user_id === userId);
    setUserDogs(filteredDogs);
  }, [dogs, userId]);

  const returnResponseStatus = (response) => {
    switch (response) {
      case 0:
        return "Declined";
      case 1:
        return "Accepted";
      case 2:
        return "Tentative";
      default:
        return "";
    }
  };

  const updateUserDogsAcceptance = (data) => {
    let spreadDogs = [...dogs];
    let dogToUpdate = spreadDogs.find((dog) => dog.id === data.invitee.id);
    let unupdatedMeetups = dogToUpdate.recieved_invitations.filter(
      (invite) => invite.id !== data.id
    );
    let updatedDog = {
      ...dogToUpdate,
      recieved_invitations: [...unupdatedMeetups, data],
    };
    let unupdatedDogs = dogs.filter((dog) => dog.id !== data.invitee.id);
    let updatedDogs = [...unupdatedDogs, updatedDog];
    setDogs(updatedDogs);
  };

  const updateUserDogsDecline = (data) => {
    let spreadDogs = [...dogs];
    let dogToUpdate = spreadDogs.find((dog) => dog.id === data.invitee.id);
    let unupdatedMeetups = dogToUpdate.recieved_invitations.filter(
      (invite) => invite.id !== data.id
    );
    let updatedDog = {
      ...dogToUpdate,
      recieved_invitations: [...unupdatedMeetups, data],
    };
    let unupdatedDogs = dogs.filter((dog) => dog.id !== data.invitee.id);
    let updatedDogs = [...unupdatedDogs, updatedDog];
    setDogs(updatedDogs);
  };

  const updateUserDogsCancelation = (data) => {
    let spreadDogs = [...dogs];
    let dogToUpdate = spreadDogs.find((dog) => dog.id === data.invitor.id);
    let unupdatedMeetups = dogToUpdate.sent_invitations.filter(
      (invite) => invite.id !== data.id
    );
    let updatedDog = {
      ...dogToUpdate,
      sent_invitations: [...unupdatedMeetups, data],
    };
    let unupdatedDogs = dogs.filter((dog) => dog.id !== data.invitor.id);
    let updatedDogs = [...unupdatedDogs, updatedDog];
    setDogs(updatedDogs);
  }

  const handleAcceptedClick = (e) => {
    let dogToUpdate = userDogs.find(
      (dog) => dog.id === parseInt(e.target.attributes.dog.value)
    );
    let meetupToUpdate = dogToUpdate.recieved_invitations.find(
      (invite) => invite.id === parseInt(e.target.attributes.invite.value)
    );

    fetch(`/meetups/${meetupToUpdate.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date: meetupToUpdate.date,
        id: meetupToUpdate.id,
        invitee: meetupToUpdate.invitee,
        invitee_email: meetupToUpdate.invitee_email,
        invitee_username: meetupToUpdate.invitee_username,
        invitor: meetupToUpdate.invitor,
        invitor_email: meetupToUpdate.invitor_email,
        invitor_username: meetupToUpdate.invitor_email,
        location: "",
        location_address: meetupToUpdate.location_address,
        location_id: meetupToUpdate.location_id,
        location_name: meetupToUpdate.location_name,
        response: 1,
        time: meetupToUpdate.time,
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        updateUserDogsAcceptance(data);
      });
  };

  const handleDeclinedClick = (e) => {
    let dogToUpdate = userDogs.find(
      (dog) => dog.id === parseInt(e.target.attributes.dog.value)
    );
    let meetupToUpdate = dogToUpdate.recieved_invitations.find(
      (invite) => invite.id === parseInt(e.target.attributes.invite.value)
    );

    fetch(`/meetups/${meetupToUpdate.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date: meetupToUpdate.date,
        id: meetupToUpdate.id,
        invitee: meetupToUpdate.invitee,
        invitee_email: meetupToUpdate.invitee_email,
        invitee_username: meetupToUpdate.invitee_username,
        invitor: meetupToUpdate.invitor,
        invitor_email: meetupToUpdate.invitor_email,
        invitor_username: meetupToUpdate.invitor_email,
        location: "",
        location_address: meetupToUpdate.location_address,
        location_id: meetupToUpdate.location_id,
        location_name: meetupToUpdate.location_name,
        response: 0,
        time: meetupToUpdate.time,
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        updateUserDogsDecline(data);
      });
  };

  const handleCancelClick = (e) => {

    let dogToUpdate = userDogs.find(
      (dog) => dog.id === parseInt(e.target.attributes.dog.value)
    );
    let meetupToUpdate = dogToUpdate.sent_invitations.find(
      (invite) => invite.id === parseInt(e.target.attributes.invite.value)
    );


      fetch(`/meetups/${meetupToUpdate.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: meetupToUpdate.date,
          id: meetupToUpdate.id,
          invitee: meetupToUpdate.invitee,
          invitee_email: meetupToUpdate.invitee_email,
          invitee_username: meetupToUpdate.invitee_username,
          invitor: meetupToUpdate.invitor,
          invitor_email: meetupToUpdate.invitor_email,
          invitor_username: meetupToUpdate.invitor_email,
          location: "",
          location_address: meetupToUpdate.location_address,
          location_id: meetupToUpdate.location_id,
          location_name: meetupToUpdate.location_name,
          response: 0,
          time: meetupToUpdate.time,
        }),
      })
        .then((resp) => resp.json())
        .then((data) => {
        updateUserDogsCancelation(data)
        });
  };

  return (
    <div>
      <h1>
        Once an Invite has been accepted you will recieve the owner's email
        address
      </h1>
      <h1>Recieved Invites:</h1>
      {userDogs.sort((a, b) => (a.name > b.name ? 1 : -1)).map((dog) => {
        return (
          <div key={dog.id} className="meetup-card">
            <h1>{dog.name}</h1>
            {dog.recieved_invitations.sort((a, b) => (a.date > b.date ? 1 : -1)).map((rI) => {
              return (
                <div key={rI.id} className="meetup-card-inner">
                  <h2>Recieved Invition</h2>
                  <h2>Date: </h2>
                  <h3>{rI.date}</h3>
                  <h2>From: </h2>
                  <h3>Username: {rI.invitor_username}</h3>
                  <h3>Dog name: {rI.invitor.name}</h3>
                  <h2>Location: </h2>
                  <h3>{rI.location_name}</h3>
                  <h2>Address:</h2>
                  <h3>{rI.location_address}</h3>
                  <h2>Time: </h2>
                  <h3>{rI.time}</h3>
                  <h2>Status: </h2>
                  <h3>{returnResponseStatus(rI.response)}</h3>
                  <h2>Requester's Email:</h2>
                  <h3>{rI.response === 1 ? rI.invitor_email : ""}</h3>
                  <button
                    invite={rI.id}
                    dog={rI.invitee.id}
                    onClick={(e) => {
                      handleAcceptedClick(e);
                    }}
                  >
                    Accept
                  </button>
                  <button
                    invite={rI.id}
                    dog={rI.invitee.id}
                    onClick={(e) => {
                      handleDeclinedClick(e);
                    }}
                  >
                    Decline
                  </button>
                </div>
              );
            })}
          </div>
        );
      })}
      <h1>Sent Invites:</h1>
      {userDogs.sort((a, b) => (a.name > b.name ? 1 : -1)).map((dog) => {
        return (
          <div key={dog.id} className="meetup-card">
            <h1>{dog.name}</h1>
            {dog.sent_invitations.sort((a, b) => (a.date > b.date ? 1 : -1)).map((sI) => {
              return (
                <div key={sI.id} className="meetup-card-inner">
                  <h2>Sent Invition</h2>
                  <h2>Date: </h2>
                  <h3>{sI.date}</h3>
                  <h2>To: </h2>
                  <h3>Username: {sI.invitee_username}</h3>
                  <h3>Dog name: {sI.invitee.name}</h3>
                  <h2>Location: </h2>
                  <h3>{sI.location_name}</h3>
                  <h2>Address:</h2>
                  <h3>{sI.location_address}</h3>
                  <h2>Time: </h2>
                  <h3>{sI.time}</h3>
                  <h2>Status: </h2>
                  <h3>{returnResponseStatus(sI.response)}</h3>
                  <h2>Invitee's Email:</h2>
                  <h3>{sI.response === 1 ? sI.invitee_email : ""}</h3>
                  <button
                    invite={sI.id}
                    dog={sI.invitor.id}
                    onClick={(e) => {
                      handleCancelClick(e);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Meetups;
