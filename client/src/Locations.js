import React, { useState } from "react";
import AddLocation from "./AddLocation";
import EditLocation from "./EditLocation";
import "./App.css";
import { useNavigate } from "react-router-dom";

const Locations = ({ locations, setLocations }) => {
  const [addButtonPopup, setAddButtonPopup] = useState(false);
  const [editButtonPopup, setEditButtonPopup] = useState(false);
  const [popUpId, setPopUpId] = useState();
  const navigate = useNavigate();



  return (
    <div>
      <div>
        <button
          onClick={() => {
            setAddButtonPopup(true);
            navigate("/locations/new")
          }}
        >
          Add Location
        </button>
        <AddLocation
          trigger={addButtonPopup}
          setTrigger={setAddButtonPopup}
          locations={locations}
          setLocations={setLocations}
        />
      </div>
      <div>
        {locations
          .sort((a, b) => (a.name > b.name ? 1 : -1))
          .map((location) => {
            return (
              <div key={location.id}>
                <ul>
                  <li>
                    <h1>{location.name}</h1>
                    <h2>{location.address}</h2>
                    <img
                      src={location.photo}
                      alt="dog park"
                      className="dogParkImageSizing"
                    />
                    <p>
                      Has hosted or is hosting a total of{" "}
                      {location.meetups.length} meetups
                    </p>
                  </li>
                </ul>
                <button
                  id={location.id}
                  onClick={(e) => {
                    setPopUpId(parseInt(e.target.id));
                    setEditButtonPopup(true);
                    navigate(`/locations/${e.target.id}`)
                  }}
                >
                  Edit
                </button>
                {location.id === popUpId && (
                  <EditLocation
                    trigger={editButtonPopup}
                    setTrigger={setEditButtonPopup}
                    locationId={popUpId}
                    locations={locations}
                    setLocations={setLocations}
                    originalName={location.name}
                    originalAddress={location.address}
                    originalPhoto={location.photo}
                  />
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Locations;
