import React, { useState, useEffect } from "react";

const UserContext = React.createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [dogs, setDogs] = useState([])
  const [userId, setUserId] = useState("")
  const [meetups, setMeetups] = useState([])
  const [userDogs, setUserDogs] = useState([])


  const loginUser = (currentUser) => {
    setUser(currentUser);
    setLoggedIn(true);
    setUserId(currentUser.id)
    setUserDogs(currentUser.dogs)
  };

  const logoutUser = () => {
    setUser({});
    setLoggedIn(false);
    setUserId("")
    setUserDogs([])
  };
  
  console.log(userDogs)



  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          loginUser(user)
        });
      }
    });

    fetch("/dogs")
      .then((r) => r.json())
      .then((data) => {
        setDogs(data)
      });

    fetch("/meetups")
      .then((r) => r.json())
      .then(setMeetups);
  }, []);


  return (
    <UserContext.Provider
      value={{ user, setUser, loggedIn, setLoggedIn, loginUser, logoutUser, dogs, setDogs, userId, meetups, setMeetups, userDogs, setUserDogs }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };