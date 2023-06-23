import React from "react";
import { Link } from "react-router-dom";
import "./App.css";

const Home = () => {
  return (
    <div>
      <div className="banner">
        <br />
        <h1 className="text">Welcome to Friendo</h1>
        <h3 className="text">Find your best friend their new best friend.</h3>
        <br/>
      </div>
      <div className="container">
        <div classname="side">
          <img className="picture" src="SignUp.png" alt="Friendo App"/>
          <h3>Sign Up</h3>
          <p>Sign-up with the link below to add your information.</p>
          <Link
            to="/signup"
            style={{
              mr: 4,
              variant: "h4",
              color: "black",
              textDecoration: "none",
              textAlign: "center",
            }}
          >
            <button>Sign Up</button>
          </Link>
        </div>
        <div classname="side">
        <img className="picture" src="AddDog.png" alt="Friendo App"/>
          <h3>Add Your Dog</h3>
          <p>Use this link to add all the information needed to find your dog their perfect match.</p>
          <Link
            to="/signup"
            style={{
              mr: 4,
              variant: "h4",
              color: "black",
              textDecoration: "none",
              textAlign: "center",
            }}
          >
            <button>Sign Up</button>
          </Link>
        </div>
        <div classname="side">
        <img className="picture" src="FindFriend.png" alt="Friendo App"/>
          <h3>Find their new friends</h3>
          <p>Search through the library of other user's dogs and start making friends.</p>
          <Link
            to="/signup"
            style={{
              mr: 4,
              variant: "h4",
              color: "black",
              textDecoration: "none",
              textAlign: "center",
            }}
          >
            <button>Sign Up</button>
          </Link>
        </div>
      </div>
      <div className="learn-more-button">
      <button >Learn more</button>
      </div>

    </div>
  );
};

export default Home;
