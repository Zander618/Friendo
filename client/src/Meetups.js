import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "./Context";
import "./Meetup.css";

const Meetups = () => {
  const { userId, meetups, setMeetups } = useContext(UserContext);
  const [userDogsRecievedInvitations, setUserDogsRecievedInvitations] =
    useState([]);
  const [userDogsSentInvitations, setUserDogsSentInvitations] = useState([]);
  const [sentMeetupCount, setSentMeetupCount] = useState("");
  const [receivedMeetupCount, setReceivedMeetupCount] = useState("");

  useEffect(() => {
    let filteredDogsRecievedInvitations = meetups.filter(
      (meetup) => meetup.invitee.user_id === userId
    );
    let filteredDogsSentInvitations = meetups.filter(
      (meetup) => meetup.invitor.user_id === userId
    );
    let sentCount = meetups.filter(
      (meetup) => meetup.invitor.user_id === userId
    );
    let receivedCount = meetups.filter(
      (meetup) => meetup.invitee.user_id === userId
    );
    setSentMeetupCount(sentCount.length);
    setReceivedMeetupCount(receivedCount.length);
    setUserDogsRecievedInvitations(filteredDogsRecievedInvitations);
    setUserDogsSentInvitations(filteredDogsSentInvitations);
  }, [receivedMeetupCount, userId, meetups]);

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
    let spreadMeetups = [...meetups];
    let unupdatedMeetups = spreadMeetups.filter(
      (meetup) => meetup.id !== data.id
    );
    let updatedMeetups = [...unupdatedMeetups, data];
    setMeetups(updatedMeetups);
  };

  const updateUserDogsDecline = (data) => {
    let spreadMeetups = [...meetups];
    let unupdatedMeetups = spreadMeetups.filter(
      (meetup) => meetup.id !== data.id
    );
    let updatedMeetups = [...unupdatedMeetups, data];
    setMeetups(updatedMeetups);
  };

  const updateUserDogsCancelation = (data) => {
    let spreadMeetups = [...meetups];
    let unupdatedMeetups = spreadMeetups.filter(
      (meetup) => meetup.id !== data.id
    );
    let updatedMeetups = [...unupdatedMeetups, data];
    setMeetups(updatedMeetups);
  };

  const handleAcceptedClick = (e) => {
    let meetupToUpdate = userDogsRecievedInvitations.find(
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
        invitee: meetupToUpdate.invitee.name,
        invitee_email: meetupToUpdate.invitee_email,
        invitee_username: meetupToUpdate.invitee.owner_username,
        invitor: meetupToUpdate.invitor.name,
        invitor_email: meetupToUpdate.invitor_email,
        invitor_username: meetupToUpdate.invitor_email,
        location: meetupToUpdate.location,
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
    let meetupToUpdate = userDogsRecievedInvitations.find(
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
        invitee: meetupToUpdate.invitee.name,
        invitee_email: meetupToUpdate.invitee_email,
        invitee_username: meetupToUpdate.invitee.owner_username,
        invitor: meetupToUpdate.invitor.name,
        invitor_email: meetupToUpdate.invitor_email,
        invitor_username: meetupToUpdate.invitor_email,
        location: meetupToUpdate.location,
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
    let meetupToUpdate = userDogsSentInvitations.find(
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
        invitee: meetupToUpdate.invitee.name,
        invitee_email: meetupToUpdate.invitee_email,
        invitee_username: meetupToUpdate.invitee.owner_username,
        invitor: meetupToUpdate.invitor.name,
        invitor_email: meetupToUpdate.invitor_email,
        invitor_username: meetupToUpdate.invitor_email,
        location: meetupToUpdate.location,
        location_address: meetupToUpdate.location_address,
        location_id: meetupToUpdate.location_id,
        location_name: meetupToUpdate.location_name,
        response: 0,
        time: meetupToUpdate.time,
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        updateUserDogsCancelation(data);
      });
  };

  return (
    <div>
      <h1>
        Once an Invite has been accepted you will recieve the owner's email
        address
      </h1>
      <h1>{receivedMeetupCount} Recieved Invitations:</h1>
      {userDogsRecievedInvitations
        .sort((a, b) => (a.name > b.name ? 1 : -1))
        .map((invitation) => {
          return (
            <div key={invitation.id} className="meetup-card">
              <h1>{invitation.invitee.name}</h1>
              <div className="meetup-card-inner">
                <h2>Recieved Invition</h2>
                <h2>Date: </h2>
                <h3>{invitation.date}</h3>
                <h2>From: </h2>
                <h3>Username: {invitation.invitor_username}</h3>
                <h3>Dog name: {invitation.invitor.name}</h3>
                <h2>Location: </h2>
                <h3>{invitation.location_name}</h3>
                <h2>Address:</h2>
                <h3>{invitation.location_address}</h3>
                <h2>Time: </h2>
                <h3>{invitation.time}</h3>
                <h2>Status: </h2>
                <h3>{returnResponseStatus(invitation.response)}</h3>
                <h2>Requester's Email:</h2>
                <h3>
                  {invitation.response === 1 ? invitation.invitor_email : ""}
                </h3>
                <button
                  invite={invitation.id}
                  dog={invitation.invitee.id}
                  onClick={(e) => {
                    handleAcceptedClick(e);
                  }}
                >
                  Accept
                </button>
                <button
                  invite={invitation.id}
                  dog={invitation.invitee.id}
                  onClick={(e) => {
                    handleDeclinedClick(e);
                  }}
                >
                  Decline
                </button>
              </div>
            </div>
          );
        })}
      <h1>{sentMeetupCount} Sent Invitations:</h1>
      {userDogsSentInvitations
        .sort((a, b) => (a.name > b.name ? 1 : -1))
        .map((invitation) => {
          return (
            <div key={invitation.id} className="meetup-card">
              <h1>{invitation.invitor.name}</h1>
              <div className="meetup-card-inner">
                <h2>Sent Invition</h2>
                <h2>Date: </h2>
                <h3>{invitation.date}</h3>
                <h2>To: </h2>
                <h3>Username: {invitation.invitee_username}</h3>
                <h3>Dog name: {invitation.invitee.name}</h3>
                <h2>Location: </h2>
                <h3>{invitation.location_name}</h3>
                <h2>Address:</h2>
                <h3>{invitation.location_address}</h3>
                <h2>Time: </h2>
                <h3>{invitation.time}</h3>
                <h2>Status: </h2>
                <h3>{returnResponseStatus(invitation.response)}</h3>
                <h2>Invitee's Email:</h2>
                <h3>
                  {invitation.response === 1 ? invitation.invitee_email : ""}
                </h3>
                <button
                  invite={invitation.id}
                  dog={invitation.invitor.id}
                  onClick={(e) => {
                    handleCancelClick(e);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Meetups;
