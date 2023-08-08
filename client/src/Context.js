import React, { useState, useEffect } from "react";

const UserContext = React.createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [locations, setLocations] = useState([]);
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
  



  useEffect(() => {
    if (loggedIn) {
      fetch("/dogs")
        .then((r) => r.json())
        .then((data) => {
          setDogs(data);
        });
  
      fetch("/meetups")
        .then((r) => r.json())
        .then((data) => {
          setMeetups(data);
        });

        useEffect(() => {
          fetch("/locations")
            .then((r) => r.json())
            .then(setLocations);
        }, []);
    }
  
    fetch("/me")
      .then((r) => {
        if (r.ok) {
          r.json().then((user) => {
            loginUser(user);
          });
        }
      })
      .catch((error) => {
        // Handle error if unable to fetch user data
        console.error("Error fetching user data:", error);
      });
  }, [loggedIn]);


  return (
    <UserContext.Provider
      value={{ user, setUser, loggedIn, locations, setLocations, setLoggedIn, loginUser, logoutUser, dogs, setDogs, userId, meetups, setMeetups, userDogs, setUserDogs }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };