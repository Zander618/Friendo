import React, { useState, useContext } from "react";
import AddLocation from "./AddLocation";
import EditLocation from "./EditLocation";
import { UserContext } from "./Context";
import "./Locations.css";

const Locations = () => {
  const { locations, setLocations } = useContext(UserContext);
  const [addButtonPopup, setAddButtonPopup] = useState(false);
  const [editButtonPopup, setEditButtonPopup] = useState(false);
  const [popUpId, setPopUpId] = useState();

  return (
    <div className="locations-container">
      <div>
        <button className="add-button" onClick={() => setAddButtonPopup(true)}>
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
              <div key={location.id} className="location-card">
                <h1>{location.name}</h1>
                <h2>{location.address}</h2>
                <img
                  src={location.photo}
                  alt="dog park"
                  className="dogParkImageSizing"
                />
                <p>
                  Has hosted or is hosting a total of {location.meetups.length}{" "}
                  meetups
                </p>
                <button
                  className="edit-button"
                  id={location.id}
                  onClick={(e) => {
                    setPopUpId(parseInt(e.target.id));
                    setEditButtonPopup(true);
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
