import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "./Context";
import "./Meetup.css";
// import { useNavigate } from "react-router-dom";

const Meetups = ({ setMeetupId }) => {
  // const navigate = useNavigate();
  const { userId, meetups, setMeetups } = useContext(UserContext);
  const [userDogsRecievedInvitations, setUserDogsRecievedInvitations] =
    useState([]);
  const [userDogsSentInvitations, setUserDogsSentInvitations] = useState([]);
  const [sentMeetupCount, setSentMeetupCount] = useState("");
  const [receivedMeetupCount, setReceivedMeetupCount] = useState("");
  const [showMoreReceivedDetails, setShowMoreReceivedDetails] = useState("");

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
      case 3:
        return "Canceled";
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
        response: 3,
        time: meetupToUpdate.time,
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        updateUserDogsCancelation(data);
      });
  };

  const showDetails = (e) => {
    setShowMoreReceivedDetails(e.target.id);
    console.log(e);
  };

  const hideDetails = () => {
    setShowMoreReceivedDetails("");
  };

  // const goToMessages = (e) => {
  //   navigate("/chat");
  // };

  return (
    <div>
      <h1>
        Once an Invite has been accepted you will receive the owner's email
        address
      </h1>
      <h1>{receivedMeetupCount} Received Invitations:</h1>
      {userDogsRecievedInvitations
        .map((invitation) => {
          console.log(invitation)
          return (
            <div key={invitation.id} className="meetup-card">
              <h2>{invitation.invitee.name}</h2>
              <div className="meetup-card-inner">
                <h3>Received Invition</h3>
                <img
                  src={invitation.invitee.uploaded_image}
                  alt="invitee dog"
                  className="meetup-image-left"
                />
                <img
                  src={invitation.invitor.uploaded_image}
                  alt="invitee dog"
                  className="meetup-image-right"
                />
                <br />
                <h3>{invitation.invitee.name} is being requested to meet with {invitation.invitor.name}</h3>
                <button
                  id={invitation.id}
                  onClick={(e) => {
                    showDetails(e);
                  }}
                >
                  Show Details
                </button>
                <button
                  onClick={() => {
                    hideDetails();
                  }}
                >
                  Close Details
                </button>
                {parseInt(showMoreReceivedDetails) === invitation.id ? (
                  <div>
                    <h3>Date: </h3>
                    <h4>{invitation.date}</h4>
                    <h3>From: </h3>
                    <h4>Username: {invitation.invitor_username}</h4>
                    <h4>Dog name: {invitation.invitor.name}</h4>
                    <h3>Location: </h3>
                    <h4>{invitation.location_name}</h4>
                    <h3>Address:</h3>
                    <h4>{invitation.location_address}</h4>
                    <h3>Time: </h3>
                    <h4>{invitation.time}</h4>
                    <h3>Status: </h3>
                    <h4>{returnResponseStatus(invitation.response)}</h4>
                    <h3>Requester's Email:</h3>
                    <h4>
                      {invitation.response === 1
                        ? invitation.invitor_email
                        : // <button
                          //   id={invitation.id}
                          //   onClick={(e) => {
                          //     goToMessages(e)
                          //     setMeetupId(e.target.id);
                          //   }}
                          // >
                          //   Message
                          // </button>

                          ""}
                    </h4>
                    {invitation.response === 3 ? (
                      ""
                    ) : (
                      <div>
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
                    )}
                  </div>
                ) : (
                  ""
                )}
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
              <h2>{invitation.invitor.name}</h2>
              <div className="meetup-card-inner">
                <h3>Sent Invition</h3>
                <h3>Date: </h3>
                <h4>{invitation.date}</h4>
                <h3>To: </h3>
                <h4>Username: {invitation.invitee_username}</h4>
                <h4>Dog name: {invitation.invitee.name}</h4>
                <h3>Location: </h3>
                <h4>{invitation.location_name}</h4>
                <h3>Address:</h3>
                <h4>{invitation.location_address}</h4>
                <h3>Time: </h3>
                <h4>{invitation.time}</h4>
                <h3>Status: </h3>
                <h4>{returnResponseStatus(invitation.response)}</h4>
                <h3>Invitee's Email:</h3>
                <h4>
                  {invitation.response === 1 ? invitation.invitee_email : ""}
                </h4>
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
