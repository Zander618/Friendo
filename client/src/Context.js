import React, { useState, useEffect } from "react";

const UserContext = React.createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [dogs, setDogs] = useState([])
  const [userId, setUserId] = useState("")


  const loginUser = (currentUser) => {
    setUser(currentUser);
    setLoggedIn(true);
  };

  const logoutUser = () => {
    setUser({});
    setLoggedIn(false);
  };

  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          loginUser(user)
          setUserId(user.id)
        });
      }
    });

    fetch("/dogs")
      .then((r) => r.json())
      .then(setDogs);
  }, []);


  return (
    <UserContext.Provider
      value={{ user, setUser, loggedIn, setLoggedIn, loginUser, logoutUser, dogs, setDogs, userId }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };