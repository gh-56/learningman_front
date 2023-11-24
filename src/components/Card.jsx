import axios from 'axios';
import React, { useState } from 'react';
import MemberInfo from '../pages/MemberInfo';

function Card() {
  const baseUrl = 'http://localhost:8080';
  const [file, setFile] = useState(null);
  const [img, setImg] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(
        baseUrl + '/members/profile',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log(response);
      setImg(response.data);
      // img = response.data;
      console.log('img :   ' + img);
    } catch (error) {
      console.error('2:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type='file' onChange={handleFileChange} />
        <button type='submit'>Upload</button>
      </form>
      <div class='card'>
        <img
          src={`http://localhost:8080${img}`}
          class='card-img-top'
          alt={'img'}
        />
        <div class='card-body'>
          {/* <MemberInfo/> */}
        </div>
      </div>
    </div>
  );
}

export default Card;
