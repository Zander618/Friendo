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
    setUserId(currentUser.id)
  };

  const logoutUser = () => {
    setUser({});
    setLoggedIn(false);
    setUserId("")
  };

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