import React, { useState } from "react";
import { API } from "../General/General";

function App() {
  const [image, setImage] = useState(null);

  const onFileChange = (event) => {
    setImage(event.target.files[0]);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", image);
    try {
      const response = await fetch(`${API}/photo/upload`, {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      console.log(result);
      // Save the image URL to MongoDB Atlas
      // using your favorite library such as Mongoose
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="file" onChange={onFileChange} />
      <button type="submit">Upload</button>
    </form>
  );
}

export default App;
