import React, { useState, useEffect } from "react";
import "./App.css";
import NavBar from "./NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Dogs from "./Dogs";
import Locations from "./Locations";
import Meetups from "./Meetups";
import Signup from "./Signup";
import Login from "./Login";
import AddDog from "./AddDog";
import CreateMeetup from "./CreateMeetup";
import MyProfile from "./MyProfile";
import LearnMore from "./LearnMore";
// import Chat from "./Chat";
// import { UserContext } from "./Context";

function App() {
  const [locations, setLocations] = useState([]);
  const [dogId, setDogId] = useState("");
  // const [meetupId, setMeetupId] = useState("")
  // const { user } = useContext(UserContext);

  useEffect(() => {
    fetch("/locations")
      .then((r) => r.json())
      .then(setLocations);
  }, []);

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dogs" element={<Dogs setDogId={setDogId} />} />
        <Route
          path="/locations/*"
          element={
            <Locations locations={locations} setLocations={setLocations} />
          }
        />
        {/* <Route path="/meetups" element={<Meetups  setMeetupId={setMeetupId}/>} /> */}
        <Route path="/meetups" element={<Meetups />} />
        <Route path="/myprofile" element={<MyProfile />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/learn_more" element={<LearnMore />} />
        {/* <Route path="/chat" element={<Chat currentUser={user} meetupId={meetupId}/>} /> */}
        <Route path="/dogs/new" element={<AddDog />} />
        <Route path="/passwordrecovery" element={<PasswordForgot />} />
        <Route path="/reset_password/:token"element={<PasswordReset />}/>
        <Route
          path="/dogs/:id/meetups/new"
          element={
            <CreateMeetup
              dogId={dogId}
              locations={locations}
              setLocations={setLocations}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
