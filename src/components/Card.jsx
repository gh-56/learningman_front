import axios from "axios";
import MemberInfo from "../pages/MemberInfo";
import React, { useEffect, useState } from "react";
import { apiClient, myPageApi } from "../api/ApiClient";
import { getCookie } from "../cookies/CookieFunction";
import { memberProfileBaseImg, memberProfileChange } from "../api/ApiClient";
import { useAuth } from "../security/AuthContext";
import basicImg from "../baseImg/basicImg.jpg";
import TeacherMain from "../pages/TeacherMain";
import Student from "../pages/Student";

function Card() {
  const baseUrl = "http://localhost:8080";
  const [file, setFile] = useState(null);
  const [img, setImg] = useState(null);
  const [baseImg, setBaseImg] = useState(null);
  const [role, setRole] = useState(null);

  const callApi = async () => {
    // axios 인터셉터 설정 등록 : 모든 API요청에 사용된다.
    apiClient.interceptors.request.use((config) => {
      console.log('인터셉터하여 헤더에 토큰 정보 추가');
      config.headers.Authorization = getCookie('tokenKey');
      return config;
    });

    const response = await myPageApi();
    setRole(response.data.role);
  };

  // 파일 등록(변경)하기 => 파일 선택
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  // 등록한 파일을 post방식으로 요청하고 응답 받음
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await axios.post(
        baseUrl + "/members/profile/img",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: getCookie('tokenKey'),
          },
        }
      );
      setImg(response.data);
    } catch (error) {
      console.error("handleSubmit_error:", error);
    }
  };
  const baseProfileImg = async () => {
    apiClient.interceptors.request.use((config) => {
      console.log("인터셉터하여 헤더에 토큰 정보 추가");
      config.headers.Authorization = getCookie("tokenKey");
      return config;
    });
    try {
      const response = await memberProfileBaseImg();
      setBaseImg(response.data);
    } catch (error) {
      console.error("baseProfileImg: ", error);
    }
  };

  useEffect(() => {
    baseProfileImg();
    callApi();
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>

      <div className="card" style={{ width: "18rem" }}>
        {img !== null ? (
          <img
            src={`http://localhost:8080${img}`}
            className="card-img-top"
            alt="바뀐 프로필 이미지 없음"
          />
        ) : baseImg !== null ? (
          <img
            src={`http://localhost:8080${baseImg}`}
            className="card-img-top"
            alt="현재 프로필 이미지 없음"
          />
        ) : (
          <img
            src={basicImg}
            className="card-img-top"
            alt="기본 프로필 이미지 없음"
          />
        )}
        <div className="card-body">
          <MemberInfo />
        </div>
        {/* <button onClick={handleMember}>멤버 정보 불러오기</button> */}
      </div>
      {role === "STUDENT" ? null : <TeacherMain/>}
    </div>
  );
}

export default Card;
