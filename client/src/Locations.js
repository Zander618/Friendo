import React, { useState } from 'react'
import AddLocation from './AddLocation';

const Locations = () => {
  const [buttonPopup, setButtonPopup] = useState(false);

  return (
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
  )
}

export default Locations