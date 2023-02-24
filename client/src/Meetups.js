import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "./Context";

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


  return (
    <div>
      {userDogs.map((dog) => {
        return (
          <div key={dog.id}>
            <h1>{dog.name}</h1>
            {dog.recieved_invitations.map((rI) => {
              return (
                <div key={rI.id}>
                  <h2>Recieved Invitions</h2>
                  <h3>Date: {rI.date}</h3>
                  <h3>From: {rI.invitor.name}</h3>
                  <h3>Location: {rI.location_name}</h3>
                  <h3>Address: {rI.location_address}</h3>
                  <h3>Time: {rI.time}</h3>
                  {/* <h3> {(() => {
                    switch (rI.response) {
                      case 0: return "declined";
                      case 1: return "accepted";
                      case 2: return "tentative";
                      default:  return "";
                    }
                  })}</h3> */}
                  <button>Accept</button>
                  <button>Decline</button>
                </div>
              );
            })}
            {dog.sent_invitations.map((sI) => {
              return (
                <div key={sI.id}>
                  <h2>Sent Invitions</h2>
                  <h3>To: {sI.invitee.name}</h3>
                  <h3>Date: {sI.date}</h3>
                  <h3>Location: {sI.location_name}</h3>
                  <h3>Address: {sI.location_address}</h3>
                  <h3>Time: {sI.time}</h3>
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
