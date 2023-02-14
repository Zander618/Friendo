import React, {useContext} from 'react'
// import { useNavigate } from "react-router-dom";
import { UserContext } from "./Context";
import Select from 'react-select'

const MeetupLocation = ( {dogId, locations} ) => {
  // const navigate = useNavigate();
  const {dogs} = useContext(UserContext)
  const selectedDog = dogs.find((dog) => dog.id === parseInt(dogId))

  const locationOptions = locations.map((location) => [ {value: location.name, label: location.name }])

  console.log(locationOptions)



  return (
    <div>
      <h1>You requested a Meetup with "{selectedDog.name}" the {selectedDog.breed}</h1>
      <h2>Select your location</h2>
      <Select options={locationOptions}  />
    </div>
  )
}

export default MeetupLocation