import React, { useState, useContext } from "react";
import { UserContext } from "./Context";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import "./AddDog.css";

const AddDog = () => {
  const { user, setUser, userId, dogs, setDogs, setUserDogs } =
    useContext(UserContext);
  const [selectedVaccinationStatus, setSelectedVaccinationStatus] =
    useState("");
  const [selectedBreed, setSelectedBreed] = useState("");
  const [selectedTraits, setSelectedTraits] = useState("");
  const [selectedActivities, setSelectedActivities] = useState("");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const vaccinationOptions = [
    { value: 1, label: "Vaccinated" },
    { value: 0, label: "Not Vaccinated Yet" },
  ];

  const traitOptions = [
    { value: 0, label: "Energetic" },
    { value: 1, label: "Playful" },
    { value: 2, label: "Lazy" },
    { value: 3, label: "Loud" },
    { value: 4, label: "Friendly" },
    { value: 5, label: "Relaxed" },
    { value: 6, label: "Calm" },
    { value: 7, label: "Patient" },
    { value: 8, label: "Obedient" },
    { value: 9, label: "Gentle" },
    { value: 10, label: "Trustworthy" },
    { value: 11, label: "Intelligent" },
    { value: 12, label: "Loyal" },
    { value: 13, label: "Protective" },
    { value: 14, label: "Affectionate" },
    { value: 15, label: "Happy" },
    { value: 16, label: "Social" },
    { value: 17, label: "Agile" },
    { value: 18, label: "Loving" },
    { value: 19, label: "Sociable" },
    { value: 20, label: "Sensitive" },
    { value: 21, label: "Kind" },
    { value: 22, label: "Good-natured" },
    { value: 23, label: "Reliable" },
    { value: 24, label: "Athletic" },
    { value: 25, label: "Well-behaved" },
    { value: 26, label: "Strong" },
    { value: 27, label: "Cautious" },
    { value: 28, label: "Mellow" },
    { value: 29, label: "Graceful" },
    { value: 30, label: "Quick" },
    { value: 31, label: "Caring" },
  ];

  const breedOptions = [
    { value: 0, label: "Airedale Terrier" },
    { value: 1, label: "Akita" },
    { value: 2, label: "Alaskan Malamute" },
    { value: 3, label: "American Staffordshire Terrier" },
    { value: 4, label: "Anatolian Shepherd Dog" },
    { value: 5, label: "Australian Cattle Dog" },
    { value: 6, label: "Australian Shepherd" },
    { value: 7, label: "Basenji" },
    { value: 8, label: "Basset Hound" },
    { value: 9, label: "Beagle" },
    { value: 10, label: "Belgian Malinoi" },
    { value: 11, label: "Bernese Mountain Dog" },
    { value: 12, label: "Bichons Frise" },
    { value: 13, label: "Biewer Terrier" },
    { value: 14, label: "Bloodhound" },
    { value: 15, label: "Border Collie" },
    { value: 16, label: "Border Terrier" },
    { value: 17, label: "Boston Terrier" },
    { value: 18, label: "Bouviers des Flandre" },
    { value: 19, label: "Boxer" },
    { value: 20, label: "Boykin Spaniel" },
    { value: 21, label: "Brittany" },
    { value: 22, label: "Brussels Griffon" },
    { value: 23, label: "Bull Terrier" },
    { value: 24, label: "Bulldog" },
    { value: 25, label: "Bullmastiff" },
    { value: 26, label: "Cairn Terrier" },
    { value: 27, label: "Cane Corso" },
    { value: 28, label: "Cardigan Welsh Corgi" },
    { value: 29, label: "Cavalier King Charles Spaniel" },
    { value: 30, label: "Chesapeake Bay Retriever" },
    { value: 31, label: "Chihuahua" },
    { value: 32, label: "Chinese Crested" },
    { value: 33, label: "Chinese Shar-Pei" },
    { value: 34, label: "Chow Chow" },
    { value: 35, label: "Cocker Spaniel" },
    { value: 36, label: "Collie" },
    { value: 37, label: "Cotons de Tulear" },
    { value: 38, label: "Dachshund" },
    { value: 39, label: "Dalmatian" },
    { value: 40, label: "Doberman Pinscher" },
    { value: 41, label: "Dogo Argentino" },
    { value: 42, label: "Dogues de Bordeaux" },
    { value: 43, label: "English Cocker Spaniel" },
    { value: 44, label: "English Setter" },
    { value: 45, label: "English Springer Spaniel" },
    { value: 46, label: "French Bulldog" },
    { value: 47, label: "German Shepherd" },
    { value: 48, label: "German Shorthaired Pointer" },
    { value: 49, label: "Giant Schnauzer" },
    { value: 50, label: "Golden Retriever" },
    { value: 51, label: "Gordon Setter" },
    { value: 52, label: "Great Dane" },
    { value: 53, label: "Great Pyrenees" },
    { value: 54, label: "Greater Swiss Mountain Dog" },
    { value: 55, label: "Havanese" },
    { value: 56, label: "Irish Setter" },
    { value: 57, label: "Irish Wolfhound" },
    { value: 58, label: "Italian Greyhound" },
    { value: 59, label: "Keeshonden" },
    { value: 60, label: "Labrador Retriever" },
    { value: 61, label: "Lagotti Romagnoli" },
    { value: 62, label: "Lhasa Apsos" },
    { value: 63, label: "Maltese" },
    { value: 64, label: "Mastiff" },
    { value: 65, label: "Miniature American Shepherd" },
    { value: 66, label: "Miniature Pinscher" },
    { value: 67, label: "Miniature Schnauzer" },
    { value: 68, label: "Newfoundland" },
    { value: 69, label: "Norwegian Elkhound" },
    { value: 70, label: "Nova Scotia Duck Tolling Retriever" },
    { value: 71, label: "Old English Sheepdog" },
    { value: 72, label: "Papillon" },
    { value: 73, label: "Pekingese" },
    { value: 74, label: "Pembroke Welsh Corgi" },
    { value: 75, label: "Pomeranian" },
    { value: 76, label: "Poodle" },
    { value: 77, label: "Portuguese Water Dog" },
    { value: 78, label: "Pug" },
    { value: 79, label: "Rat Terrier" },
    { value: 80, label: "Rhodesian Ridgeback" },
    { value: 81, label: "Rottweiler" },
    { value: 82, label: "Russell Terrier" },
    { value: 83, label: "Samoyed" },
    { value: 84, label: "Scottish Terrier" },
    { value: 85, label: "Shetland Sheepdog" },
    { value: 86, label: "Shiba Inu" },
    { value: 87, label: "Shih Tzu" },
    { value: 88, label: "Siberian Husky" },
    { value: 89, label: "Soft Coated Wheaten Terrier" },
    { value: 90, label: "St. Bernard" },
    { value: 91, label: "Staffordshire Bull Terrier" },
    { value: 92, label: "Standard Schnauzer" },
    { value: 93, label: "Vizsla" },
    { value: 94, label: "Weimaraner" },
    { value: 95, label: "West Highland White Terrier" },
    { value: 96, label: "Whippet" },
    { value: 97, label: "Wirehaired Pointing Griffon" },
    { value: 98, label: "Yorkshire Terrier" },
    { value: 99, label: "Mixed" },
    { value: 100, label: "Other" },
  ];

  const activityOptions = [
    { value: 0, label: "Fetch" },
    { value: 1, label: "Tug" },
    { value: 2, label: "Running" },
    { value: 3, label: "Chase" },
    { value: 4, label: "Wrestling" },
    { value: 5, label: "Racing" },
    { value: 6, label: "Napping" },
    { value: 7, label: "Zoomies" },
    { value: 8, label: "Sniffing" },
    { value: 9, label: "Spinning" },
    { value: 10, label: "Rolling" },
    { value: 11, label: "Walks" },
    { value: 12, label: "Eating" },
    { value: 13, label: "Digging" },
    { value: 14, label: "Agility" },
    { value: 15, label: "Sleeping" },
    { value: 16, label: "Swimming" },
    { value: 17, label: "Chewing" },
    { value: 18, label: "Chasing" },
    { value: 19, label: "Bubbles" },
    { value: 20, label: "Hoses" },
    { value: 21, label: "Kiddie Pools" },
    { value: 22, label: "Frisbee" },
    { value: 23, label: "Ball" },
    { value: 24, label: "Exploring" },
    { value: 25, label: "Other" },
  ];

  const addNewDogToUser = (dog) => {
    const updatedUser = {
      ...user,
      dogs: [...user.dogs, dog],
    };
    setUser(updatedUser);
  };

  const addNewDogToDogs = (dog) => {
    const updatedDogs = [...dogs, dog];
    setDogs(updatedDogs);
  };

  const addNewDogToUserDogs = (dog) => {
    const updatedDogs = [...user.dogs, dog];
    setUserDogs(updatedDogs);
  };

  const [formData, setFormData] = useState({
    user_id: userId,
    name: "",
    age: "",
    image_data: "",
    vaccination: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`/dogs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userId,
        name: formData.name,
        breed: selectedBreed,
        traits: selectedTraits,
        enjoyed_activities: selectedActivities,
        age: formData.age,
        image_data: "",
        vaccination: selectedVaccinationStatus,
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((data) => {
          addNewDogToUser(data);
          addNewDogToDogs(data);
          addNewDogToUserDogs(data);
          navigate("/myprofile");
        });
      } else {
        r.json().then((errorData) => setErrors(errorData.errors));
      }
    });
    setFormData({
      user_id: userId,
      name: "",
      age: "",
      image_data: "",
      vaccination: "",
    });
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSelectedVaccination = (selectedOption) => {
    setSelectedVaccinationStatus(selectedOption.value);
  };

  const handleSelectedBreed = (selectedOption) => {
    setSelectedBreed(selectedOption.label);
  };

  const handleSelectedTraits = (selectedOption) => {
    const obj = selectedOption.map((label) => {
      return " " + label.label;
    });
    const stringObj = obj.toString();
    setSelectedTraits(stringObj.split().join());
  };

  const handleSelectedActivities = (selectedOption) => {
    const obj = selectedOption.map((label) => {
      return " " + label.label;
    });
    const stringObj = obj.toString();
    setSelectedActivities(stringObj.split().join());
  };

  return (
    <div>
      <br />
      <div className="container">
        <div className="card">
          <div className="add-dog-card">
            <h1>Add Dog</h1>
            <form onSubmit={handleSubmit}>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  spellCheck="true"
                  placeholder="Enter Dog's Name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </label>
              <br />
              <label>
                Breed:
                <Select
                  options={breedOptions}
                  onChange={handleSelectedBreed}
                  autoFocus={true}
                />
              </label>
              <br />
              <label>
                Traits:
                <Select
                  isMulti
                  options={traitOptions}
                  className="multi-select"
                  classNamePrefix="select"
                  onChange={handleSelectedTraits}
                />
              </label>
              <br />
              <label>
                Enjoyed Activities:
                <Select
                  isMulti
                  options={activityOptions}
                  className="multi-select"
                  classNamePrefix="select"
                  onChange={handleSelectedActivities}
                />
              </label>
              <br />
              <label>
                Age:
                <input
                  type="text"
                  name="age"
                  spellCheck="true"
                  placeholder="Enter Your Dog's Age"
                  value={formData.age}
                  onChange={handleChange}
                />
              </label>
              <br />
              <label>
                Vaccination:
                <Select
                  options={vaccinationOptions}
                  onChange={handleSelectedVaccination}
                  autoFocus={true}
                />
              </label>
              <input type="submit" value="Submit" className="submit-button" />
            </form>
            {errors.length > 0 && (
              <ul className="error-list">
                {errors.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDog;
