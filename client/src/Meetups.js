import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "./Context";
import "./Meetup.css"

const Meetups = ({ meetups }) => {
  const { user, dogs, userId } = useContext(UserContext);
  const [userDogs, setUserDogs] = useState([]);
  console.log("meetups", meetups);
  console.log("user", user);
  console.log("dogs", dogs);
  console.log("userDogs", userDogs);
  console.log("userId", userId);

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


  const handleAcceptedClick = (rI) => {
    fetch(`/meetups/${rI.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date: rI.date,
        id: rI.id,
        invitee: rI.invitee,
        invitee_email: rI.invitee_email,
        invitee_username: rI.invitee_username,
        invitor: rI.invitor, 
        invitor_email: rI.invitor_email,
        invitor_username: rI.invitor_email,
        location: "",
        location_address: rI.location_address,
        location_id: rI.location_id,
        location_name: rI.location_name,
        response: 1,
        time: rI.time
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log("sent update", data)
      });
  };

  const handleDeclinedClick = (rI) => {
    fetch(`/meetups/${rI.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date: rI.date,
        id: rI.id,
        invitee: rI.invitee,
        invitee_email: rI.invitee_email,
        invitee_username: rI.invitee_username,
        invitor: rI.invitor, 
        invitor_email: rI.invitor_email,
        invitor_username: rI.invitor_email,
        location: "",
        location_address: rI.location_address,
        location_id: rI.location_id,
        location_name: rI.location_name,
        response: 0,
        time: rI.time
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log("sent update", data)
      });
  };

  return (
    <div>
      <h1>Once an Invite has been accepted you will recieve the owner's email address</h1>
      {userDogs.map((dog) => {
        return (
          <div key={dog.id} className="meetup-card">
            <h1>{dog.name}</h1>
            {dog.recieved_invitations.map((rI) => {
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
                  <button onClick={handleAcceptedClick(rI)}>Accept</button>
                  <button onClick={handleDeclinedClick(rI)}>Decline</button>
                </div>
              );
            })}
            {dog.sent_invitations.map((sI) => {
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
                  <button>Cancel</button>
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
