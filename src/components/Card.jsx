import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { profileInfoApi } from '../api/ApiClient';

function Card() {
  const baseUrl = 'http://localhost:8080';
  const [file, setFile] = useState(null);
  const [img, setImg] = useState(null);
  const [memberDto, setMemberDto] = useState(null);

  // const [memberName, setMemberName] = useState('');
  // const [memberEmail, setMemberEmail] = useState('');
  // const [memberRole, setMemberRole] = useState('');

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

  // 페이지가 로드 될때 API 요청하기
  useEffect(() => {
    async function callProfile() {
      const response = await profileInfoApi();
      console.log(response);

      // 응답받은 데이터 상태값 저장
      setMemberDto(response.data);
    }
    callProfile();
  }, []);
  // 멤버 정보 중 이름, 이메일, 역할 불러오기
  /* const handleMember = async () => {
    try {
      const response = await axios
        .get(baseUrl + '/members/profile/{memberId}')
        .then((response) => {
          console.log(response.data);
          setMemberName(response.data.memberName);
          setMemberEmail(response.data.memberEmail);
          setMemberRole(response.data.role);
        });
    } catch (error) {
      console.error('handleMember_error:', error);
    }
  }; */

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
          alt={'img'}
        />
        <div className='card-body'>
          {/* <h5 className='card-title'>이름 : {memberDto.}</h5> */}
          {/* <p className='card-text'>이메일 : {memberEmail}</p> */}
          {/* <p className='card-text'>{memberRole}</p> */}
        </div>
        {/* <button onClick={handleMember}>멤버 정보 불러오기</button> */}
      </div>
    </div>
  );
}

export default Card;
