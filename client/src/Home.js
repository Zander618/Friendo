import React, { useContext } from "react";
import { UserContext } from "./Context";
import { Link } from "react-router-dom";
import "./Home.css";
import Login from "./Login";

const Home = () => {
  const { loggedIn } = useContext(UserContext);

  return (
    <div>
      {loggedIn ? (
        <div>
          <div className="banner">
            <h2>Welcome to Friendo!</h2>
            <h4>
              Connecting Dogs, Connecting People, & Unleashing the Power of
              Socialization.
              <br />
              <br />
              Find your best friend their new best friend.
            </h4>
          </div>
          <div className="container">
            <div classname="side">
              <img className="picture" src="SignUp.PNG" alt="Friendo App" />
              <h3>Search Locations</h3>
              <p>View and add locations for your meetups.</p>
              <Link
                to="/locations"
                style={{
                  mr: 4,
                  variant: "h4",
                  color: "black",
                  textDecoration: "none",
                  textAlign: "center",
                }}
              >
                <button>Locations</button>
              </Link>
            </div>
            <br />
            <div classname="side">
              <img className="picture" src="AddDog.PNG" alt="Friendo App" />
              <h3>Add Your Dog</h3>
              <p>
                Use this link to add all the information needed to find your dog
                their perfect match.
              </p>

              <Link
                to="/dogs/new"
                style={{
                  mr: 4,
                  variant: "h4",
                  color: "black",
                  textDecoration: "none",
                  textAlign: "center",
                }}
              >
                <button>Add Dog</button>
              </Link>
            </div>
            <br />
            <div classname="side">
              <img className="picture" src="FindFriend.PNG" alt="Friendo App" />
              <h3>Find their new friends</h3>
              <p>
                Search through the library of other user's dogs and start making
                friends.
              </p>
              <Link
                to="/dogs"
                style={{
                  mr: 4,
                  variant: "h4",
                  color: "black",
                  textDecoration: "none",
                  textAlign: "center",
                }}
              >
                <button>Dogs</button>
              </Link>
            </div>
            <br />
            <br />
            <br />
            <div className="learn-more-button">
              <Link
                to="/learn_more"
                style={{
                  mr: 4,
                  variant: "h4",
                  color: "black",
                  textDecoration: "none",
                  textAlign: "center",
                }}
              >
                <button>Learn more</button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="banner">
            <h1 className="text">Welcome to Friendo!</h1>
            <h3 className="text">
              Connecting Dogs, Connecting People, & Unleashing the Power of
              Socialization
              <br />
              Find your best friend their new best friend.
            </h3>
          </div>
          <Login />
        </div>
      )}
    </div>
  );
};

export default Home;
