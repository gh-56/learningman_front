import axios from 'axios';
import React, { useState } from 'react';

function Card() {
  const baseUrl = 'http://localhost:8080';
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create a FormData object
    const formData = new FormData();
    formData.append('file', file);

    // You can also append other fields to the FormData object if needed
    // formData.append('fieldName', 'fieldValue');

    try {
      // Make a POST request with Axios
      const response = await axios.post(
        baseUrl + '/members/profile',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      // Handle the response as needed
      console.log(response);
    } catch (error) {
      console.error('2:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type='file' onChange={handleFileChange} />
      <button type='submit'>Upload</button>
    </form>
    /* <div>
      <div class='card'>
        <img
          src='src/img/test_profile_img.jpg'
          class='card-img-top'
          alt='...'
        />
        <div class='card-body'>
          <h5 class='card-title'>Card title</h5>
          <p class='card-text'>Card Text.</p>
        </div>
      </div>
    </div>  */
  );
}

export default Card;
