import React from 'react'
// import ImageViewer from 'react-simple-image-viewer';

const AddDog = () => {

  // const [formData, setFormData] = useState({
  //   name: "",
  // });

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   fetch(`/dogs`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       name: formData.name,
  //     }),
  //   })
  //     .then((resp) => resp.json())
  //     .then((data) => {
  //       addUserDog(data)
  //     });
  //   setFormData({
  //     name: "",
  //   });
  // };

  // const addUserDog = (dog) => {
  //   const newDogList = [ ...dogs, dog ];
  //   setDogs(newGamesList);
  // };


  return (
    <div>
      {/* <form onSubmit={handleSubmit}>
          <label style={{ color: "black" }}>
            Name:
            <input
              type="text"
              name="name"
              spellCheck="true"
              placeholder="Enter Game Name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form> */}
        <h1>Add Dog</h1>
    </div>
  )
}

export default AddDog