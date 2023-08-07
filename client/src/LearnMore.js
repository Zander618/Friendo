import React from "react";
import "./LearnMore.css";

const LearnMore = () => {
  return (
    <div className="container">
      <div className="box">
        <h1>
          Friendo - Connecting Dogs, Connecting People, & Unleashing the Power
          of Socialization
        </h1>
        <p>
          In a world where remote work has become the norm, our furry friends
          have also felt the distance. Isolated dogs not only pose challenges
          within the confines of our homes but can also exhibit aggression when
          exposed to the outside world. Enter Friendo, a revolutionary solution
          designed to pair your canine companions with their perfect playmates,
          ensuring a happier and more socialized life for your pets.
        </p>
      </div>

      <div className="box">
        <h2>Issues related to anti-social behavior</h2>
        <div className="box">
          <h3>Inside the home:</h3>
          <ul>
            <li>Barking</li>
            <li>Growling</li>
            <li>Baring Teeth</li>
          </ul>
        </div>
        <div className="box">
          <h3>Outside the home:</h3>
          <ul>
            <li>Avoids other dogs or people</li>
            <li>Pulls or lunges on walks</li>
            <li>Not respecting other's personal space</li>
          </ul>
        </div>
      </div>

      <div className="box">
        <p>
          Your Dog's Social Adventure Begins! Friendo is your gateway to
          fostering social connections for your furry companions. Watch as your
          dogs forge new friendships and explore the world together, all thanks
          to Friendo's innovative platform.
        </p>
      </div>
    </div>
  );
};

export default LearnMore;
