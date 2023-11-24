import axios from 'axios';
import MemberInfo from '../pages/MemberInfo';
import React, { useEffect, useState } from 'react';

function Card() {
  const baseUrl = 'http://localhost:8080';
  const [file, setFile] = useState(null);
  const [img, setImg] = useState(null);

  // 파일 등록(변경)하기 => 파일 선택
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // 등록한 파일을 post방식으로 요청하고 응답 받음
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(
        baseUrl + '/members/profile/img',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log(response);
      setImg(response.data);
    } catch (error) {
      console.error('handleSubmit_error:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type='file' onChange={handleFileChange} />
        <button type='submit'>Upload</button>
      </form>
      <div className='card' style={{ width: '18rem' }}>
        <img
          src={`http://localhost:8080${img}`}
          className='card-img-top'
          alt='프로필 이미지 없음'
        />
        <div className='card-body'>
          <MemberInfo />
        </div>
        {/* <button onClick={handleMember}>멤버 정보 불러오기</button> */}
      </div>
    </div>
  );
}

export default Card;
