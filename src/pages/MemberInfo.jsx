import { useEffect, useState } from "react";
import { myPageApi } from "../api/ApiClient";
import { setCookie, getCookie, removeCookie } from "../cookies/CookieFunction";
import { apiClient, infoChange } from "../api/ApiClient";
import axios from "axios";
import basicImg from "../baseImg/basicImg.jpg";
import { memberProfileBaseImg, memberProfileChange } from "../api/ApiClient";
import { useNavigate } from "react-router-dom";

function MemberInfo() {
  const baseUrl = "http://localhost:8080";
  const [memberDto, setMemberDto] = useState(null);
  const [file, setFile] = useState(null);
  const [img, setImg] = useState(null);
  const [baseImg, setBaseImg] = useState(null);
  const [updateState, setUpdateState] = useState(false);
  const [memberName, setMemberName] = useState("");
  const [memberEmail, setMemberEmail] = useState("");
  const [memberPassword, setMemberPassword] = useState("");
  const [emailError, setEmailError] = useState(null);
  const navigate = useNavigate();

  const callApi = async () => {
    // axios 인터셉터 설정 등록 : 모든 API요청에 사용된다.
    apiClient.interceptors.request.use((config) => {
      console.log("인터셉터하여 헤더에 토큰 정보 추가");
      config.headers.Authorization = getCookie("tokenKey");
      return config;
    });
    const response = await myPageApi();
    console.log(response);
    setMemberDto(response.data);
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

  // 파일 등록(변경)하기 => 파일 선택
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  // 등록한 파일을 post방식으로 요청하고 응답 받음
  const handleImgSubmit = async (event) => {
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
            Authorization: getCookie("tokenKey"),
          },
        }
      );
      setImg(response.data);
    } catch (error) {
      console.error("handleSubmit_error:", error);
    }
  };

  const updateInfoClickHandler = (event) => {
    setUpdateState(true);
  };
  const cancelClickHandler = () => {
    setUpdateState(false);
  }

  const onChangeHandlerName = (e) => {
    setMemberName(e.target.value);
  };
  const onChangeHandlerEmail = (e) => {
    setMemberEmail(e.target.value);
  };
  const onChangeHandlerPassword = (e) => {
    setMemberPassword(e.target.value);
  };

  const handleInfoSubmit = async (event) => {
    event.preventDefault();
    if (
      memberName === null ||
      memberName === "" ||
      memberEmail === null ||
      memberEmail === "" ||
      memberEmail.includes("@") === false ||
      memberPassword === null ||
      memberPassword === ""
    ) {
      if (memberName === null || memberName === "") {
        setMemberName(memberDto.memberName)
      } 
      if (memberEmail === null || memberEmail === "") {
        setMemberEmail(memberDto.memberEmail)
      } else if (memberEmail.includes("@") === false) {
        setEmailError("이메일 형식으로 입력해주십시오");
      } 
      if (memberPassword === null || memberPassword === "") {
        setMemberPassword(memberDto.memberPassword)
      }
    } else {
      await axios
        .post(baseUrl + "/members/update", 
        {
          memberName: memberName,
          memberEmail: memberEmail,
          memberPassword: memberPassword,
        },{
          headers: {
            Authorization: getCookie("tokenKey"),
          },
        })
        .then((res) => {
          console.log(res.data);
          alert("정보가 변경되었습니다 다시 로그인 해주십시오")
          navigate('/login');
          removeCookie("tokenKey");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
          console.log(err.response.status);
          if (err.response.status === 500) {
            alert("중복된 이메일입니다");
          }
        });
      // window.location.reload();
    }
  };

  useEffect(() => {
    baseProfileImg();
    callApi();
  }, []);

  return (
    <div>
      {memberDto && (
        <div>
          <h3>프로필 이미지 수정하기</h3>
          <form onSubmit={handleImgSubmit}>
            <input type="file" onChange={handleFileChange} />
            <button type="submit">Upload</button>
          </form>
          <div className="card" style={{ width: "19rem" }}>
            {img !== null ? (
              <img
                src={`http://localhost:8080${img}`}
                className="card-img-top"
                alt="현재 프로필 이미지 없음"
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
            <form onSubmit={handleInfoSubmit}>
              <h2>내 정보</h2>
              <h5>정보 수정은 다시 로그인이 필요합니다</h5>
              {updateState === false ? (
                <div>
                  <div>이름 : {memberDto.memberName}</div>
                  <div>이메일 : {memberDto.memberEmail}</div>
                  <div>비밀번호 : ***** </div>
                  <button onClick={updateInfoClickHandler}>수정하기</button>
                </div>
              ) : (
                <div>
                  <label>이름</label>
                  <input
                    name="name"
                    type="text"
                    value={memberName}
                    placeholder={memberDto.memberName}
                    onChange={onChangeHandlerName}
                  />
                  <br/>
                  <label>이메일</label>
                  <input
                    name="email"
                    type="text"
                    value={memberEmail}
                    placeholder={memberDto.memberEmail}
                    onChange={onChangeHandlerEmail}
                  />
                  {emailError === null ? null : <p>{emailError}</p>}
                  <br/>
                  <label>비밀번호</label>
                  <input
                    name="password"
                    type="password"
                    value={memberPassword}
                    placeholder="*****"
                    onChange={onChangeHandlerPassword}
                  />
                  <br/>
                  <button type="submit">완료</button>
                  <button onClick={cancelClickHandler}>취소</button>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default MemberInfo;
