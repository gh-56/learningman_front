import { useEffect, useState } from "react";
import { studentInfo } from "../api/ApiClient";
import { getCookie } from "../cookies/CookieFunction";
import { apiClient } from "../api/ApiClient";
import basicImg from "../baseImg/basicImg.jpg";

function TeacherMain() {
  const [student, setStudent] = useState(null);

  const callApi = async () => {
    // axios 인터셉터 설정 등록 : 모든 API요청에 사용된다.
    apiClient.interceptors.request.use((config) => {
      console.log("인터셉터하여 헤더에 토큰 정보 추가");
      config.headers.Authorization = getCookie("tokenKey");
      return config;
    });

    const response = await studentInfo();
    console.log(response.data);

    for (let index = 0; index < response.data.length; index++) {
        if(response.data[index].memberProfileImg === null){
            response.data[index].memberProfileImg = "null"
        }
    }

    setStudent(
      response.data.map((value) => (
        <ul>
          <div className="card" style={{ width: "18rem" }}>
            {value.memberProfileImg !== "null" ? (
              <div>
                <img
                  src={`http://localhost:8080${value.memberProfileImg.imgUrl}`}
                  className="card-img-top"
                  alt="현재 프로필 이미지 없음"
                />
              </div>
            ) : (
              <img
                src={basicImg}
                className="card-img-top"
                alt="기본 프로필 이미지 없음"
              />
            )}
            <h3>학생 정보</h3>
            <div>이름 : {value.memberName}</div>
            <div>이메일 : {value.memberEmail}</div>
          </div>
          <br />
        </ul>
      ))
    );
  };

  useEffect(() => {
    callApi();
  }, []);

  return (
    <div>
      {student && (
        <div>
          <h2>학생 리스트</h2>
          <ul>{student}</ul>
        </div>
      )}
    </div>
  );
}

export default TeacherMain;
