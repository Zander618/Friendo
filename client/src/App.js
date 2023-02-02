import React, { useContext } from "react";
import './App.css';
import NavBar from "./NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Home';
import Dogs from './Dogs';
import Locations from './Locations';
import Meetups from './Meetups';
import Signup from './Signup';
import Login from './Login';
import AddDog from './AddDog';
import MyDog from './MyDog';
import { UserContext } from "./Context";

function App() {
  const { user } = useContext(UserContext);
  return  user ? (
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/dogs" element={<Dogs/>} />
          <Route path="/locations" element={<Locations/>} />
          <Route path="/meetups" element={<Meetups/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/adddog" element={<AddDog/>} />
          <Route path="/mydog" element={<MyDog/>} />
        </Routes>
      </Router>
  ): (
    <h1>...Loading</h1>
  )
}

export default App;
