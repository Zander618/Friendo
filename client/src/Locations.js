import React, { useState } from 'react'
import AddLocation from './AddLocation';
import "./App.css"

const Locations = ( {locations, setLocations}) => {
  const [buttonPopup, setButtonPopup] = useState(false);
  

  return (
    <div>
      <div>
        <button
          onClick={() => {
            setButtonPopup(true);
          }}
        >
          Add Location
        </button>
        <AddLocation
          trigger={buttonPopup}
          setTrigger={setButtonPopup}
        />
      </div>
      <div>
        {locations.map((location) => {
          return(
            <div key={location.id}>
              <ul>
                <li>
                  <h1>{location.name}</h1>
                  <h2>{location.address}</h2>
                  <img src={location.photo} alt="dog park" className="dogParkImageSizing"/> 
                </li>
              </ul>
              <button>Edit</button>
            </div>
          )
        })}

      </div>

    </div>
  )
}

export default Locations