import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "./Context";

const Meetups = ({ meetups }) => {
  const { user, dogs, userId, userDogs } = useContext(UserContext);
  
  console.log("meetups", meetups);
  console.log("user", user);
  console.log("dogs", dogs);
  console.log("userDogs", userDogs);
  console.log("userId", userId);


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
                  {/* <h3>Location: {rI.</h3> */}
                </div>
              );
            })}
            {dog.sent_invitations.map((sI) => {
              return (
                <div key={sI.id}>
                  <h2>Sent Invitions</h2>
                  <h3>Date: {sI.date}</h3>
                  <h3>To: {sI.invitee.name}</h3>
                  {/* <h3>Location: {rI.</h3> */}
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
