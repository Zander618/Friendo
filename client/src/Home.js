import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Welcome to Friendo</h1>
      <h3>We aim to find your dog or dogs their new dog best friend.</h3>
      <p>
        Anti-social dogs can not only present problems inside the house
        but they are also more likely to be aggressive outside the house.
      </p>
      <h2>Issues related to anti-social behavior</h2>
      <h3>Inside the home:</h3>
      <ul>
        <li>Avoids other dogs or people</li>
        <li>Pulls or lunges on walks</li>
        <li>Not respecting personal space</li>
      </ul>
      <h3>Outside the home:</h3>
      <ul>
        <li>Barking</li>
        <li>Growling</li>
        <li>Baring Teeth</li>
      </ul>
      <p>Start here by clicking the sign up button. You can also sign up or login using the user icon on the top right.
        <br/>
        After signing up or logging in you can add a dog using the same user tab in the top right. 
        <br/>
        Once signed in you can explore dogs and start creating meetups.
      </p>
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
  );
};

export default Home;
