import { useEffect, useState } from 'react';
import { myPageApi } from '../api/ApiClient';
import { setCookie, getCookie, removeCookie } from '../cookies/CookieFunction';
import { apiClient, infoChange } from '../api/ApiClient';
import axios from 'axios';
import basicImg from '../baseImg/basicImg.jpg';
import { memberProfileBaseImg, memberProfileChange } from '../api/ApiClient';
import { useNavigate } from 'react-router-dom';
import './MemberInfo.css';
import serverConfig from '../config/serverConfig';

function MemberInfo() {
  const baseUrl = serverConfig.serverUrl + ':8080';
  const [memberDto, setMemberDto] = useState(null);
  const [file, setFile] = useState(null);
  const [img, setImg] = useState(null);
  const [baseImg, setBaseImg] = useState(null);
  const [nameUpdateState, setNameUpdateState] = useState(false);
  const [emailUpdateState, setEmailUpdateState] = useState(false);
  const [passwordUpdateState, setPasswordUpdateState] = useState(false);
  const [memberName, setMemberName] = useState('');
  const [memberEmail, setMemberEmail] = useState('');
  const [memberPassword, setMemberPassword] = useState('');
  const navigate = useNavigate();

  const callApi = async () => {
    // axios 인터셉터 설정 등록 : 모든 API요청에 사용된다.
    apiClient.interceptors.request.use((config) => {
      console.log('인터셉터하여 헤더에 토큰 정보 추가');
      config.headers.Authorization = getCookie('tokenKey');
      return config;
    });
    const response = await myPageApi();
    console.log(response);
    setMemberDto(response.data);
  };

  const baseProfileImg = async () => {
    apiClient.interceptors.request.use((config) => {
      console.log('인터셉터하여 헤더에 토큰 정보 추가');
      config.headers.Authorization = getCookie('tokenKey');
      return config;
    });

    try {
      const response = await memberProfileBaseImg();
      setBaseImg(response.data);
    } catch (error) {
      console.error('baseProfileImg: ', error);
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
    formData.append('file', file);
    try {
      const response = await axios.post(
        baseUrl + '/members/profile/img',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: getCookie('tokenKey'),
          },
        }
      );
      setImg(response.data);
    } catch (error) {
      console.error('handleSubmit_error:', error);
    }
  };

  const updateNameClickHandler = (event) => {
    setNameUpdateState(true);
    setEmailUpdateState(false);
    setPasswordUpdateState(false);
  };

  const updateEmailClickHandler = (event) => {
    setNameUpdateState(false);
    setEmailUpdateState(true);
    setPasswordUpdateState(false);
  };

  const updatePasswordClickHandler = (event) => {
    setNameUpdateState(false);
    setEmailUpdateState(false);
    setPasswordUpdateState(true);
  };

  const nameUpdateCancelClickHandler = () => {
    setNameUpdateState(false);
  };

  const emailUpdateCancelClickHandler = () => {
    setEmailUpdateState(false);
  };

  const passwordUpdateCancelClickHandler = () => {
    setPasswordUpdateState(false);
  };

  const onChangeHandlerName = (e) => {
    setMemberName(e.target.value);
  };
  const onChangeHandlerEmail = (e) => {
    setMemberEmail(e.target.value);
  };
  const onChangeHandlerPassword = (e) => {
    setMemberPassword(e.target.value);
  };

  const handleNameUpdateSubmit = async (event) => {
    event.preventDefault();
    if (memberName === null || memberName === '') {
      return alert('정보를 입력해주십시오');
    } else {
      await axios
        .post(
          baseUrl + '/members/update',
          {
            memberName: memberName,
          },
          {
            headers: {
              Authorization: getCookie('tokenKey'),
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          alert('이름이 변경되었습니다');
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
          console.log(err.response.status);
        });
    }
  };

  const handleEmailUpdateSubmit = async (event) => {
    event.preventDefault();
    if (memberEmail === null || memberEmail === '') {
      return alert('정보를 입력해주십시오');
    } else if (memberEmail.includes('@') === false) {
      return alert('이메일 형식으로 입력해주십시오');
    } else {
      await axios
        .post(
          baseUrl + '/members/update',
          {
            memberEmail: memberEmail,
          },
          {
            headers: {
              Authorization: getCookie('tokenKey'),
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          alert('이메일이 변경되었습니다 다시 로그인이 필요합니다');
          removeCookie('tokenKey');
          navigate('/login');
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
          console.log(err.response.status);
          if (err.response.status === 500) {
            alert('중복된 이메일입니다');
          }
        });
    }
  };

  const handlePasswordUpdateSubmit = async (event) => {
    event.preventDefault();
    if (memberPassword === null || memberPassword === '') {
      return alert('정보를 입력해주십시오');
    } else {
      await axios
        .post(
          baseUrl + '/members/update',
          {
            memberPassword: memberPassword,
          },
          {
            headers: {
              Authorization: getCookie('tokenKey'),
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          alert('비밀번호가 변경되었습니다 다시 로그인이 필요합니다');
          removeCookie('tokenKey');
          navigate('/login');
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
          console.log(err.response.status);
          if (err.response.status === 500) {
            alert('오류입니다');
          }
        });
    }
  };

  useEffect(() => {
    baseProfileImg();
    callApi();
  }, []);

  return (
    <div className='memberinfo'>
      {memberDto && (
        <div className='memberinfo-container'>
          <div className='memberinfo-item1' style={{ width: '19rem' }}>
            <h3 className='title-memberinfo'>프로필 이미지 변경</h3>
            <hr />
            {img !== null ? (
              <img
                src={serverConfig.serverUrl + `:8080${img}`}
                className='card-img-top'
                alt='현재 프로필 이미지 없음'
              />
            ) : baseImg !== null ? (
              <img
                src={serverConfig.serverUrl + `:8080${baseImg}`}
                className='card-img-top'
                alt='현재 프로필 이미지 없음'
              />
            ) : (
              <img
                src={basicImg}
                className='card-img-top'
                alt='기본 프로필 이미지 없음'
              />
            )}
            <form onSubmit={handleImgSubmit}>
              <div className='file-select'>
                <input
                  className='file-select-button'
                  type='file'
                  onChange={handleFileChange}
                />
                <button className='submit-button' type='submit'>
                  변경
                </button>
              </div>
            </form>
          </div>

          <div className='memberinfo-item2'>
            <h3 className='title-memberinfo'>내 정보 수정</h3>
            <h5>(이메일과 비밀번호 수정은 다시 로그인이 필요합니다)</h5>
            <hr />

            <form onSubmit={handleNameUpdateSubmit}>
              {nameUpdateState === false ? (
                <div className='memberinfo-form-div'>
                  <div className='memberinfo-edit'>
                    이름 : {memberDto.memberName}
                  </div>
                  <button
                    className='submit-button'
                    onClick={updateNameClickHandler}
                  >
                    수정하기
                  </button>
                </div>
              ) : (
                <div className='memberinfo-form-div'>
                  <div className='memberinfo-div'>
                    <label className='memberinfo-label'>이름</label>
                    <input
                      name='name'
                      type='text'
                      value={memberName}
                      placeholder={memberDto.memberName}
                      onChange={onChangeHandlerName}
                      className='memberinfo-edit-input'
                    />
                    <button className='submit-button' type='submit'>
                      완료
                    </button>
                    <button
                      className='submit-cancle-button'
                      onClick={nameUpdateCancelClickHandler}
                    >
                      취소
                    </button>
                  </div>
                </div>
              )}
            </form>

            <form onSubmit={handleEmailUpdateSubmit}>
              {emailUpdateState === false ? (
                <div className='memberinfo-form-div'>
                  <div className='memberinfo-edit'>
                    이메일 : {memberDto.memberEmail}
                  </div>
                  <button
                    className='submit-button'
                    onClick={updateEmailClickHandler}
                  >
                    수정하기
                  </button>
                </div>
              ) : (
                <div className='memberinfo-form-div'>
                  <label className='memberinfo-label'>이메일 </label>
                  <input
                    name='email'
                    type='text'
                    value={memberEmail}
                    placeholder={memberDto.memberEmail}
                    onChange={onChangeHandlerEmail}
                    className='memberinfo-edit-input'
                  />
                  <button className='submit-button' type='submit'>
                    완료
                  </button>
                  <button
                    className='submit-cancle-button'
                    onClick={emailUpdateCancelClickHandler}
                  >
                    취소
                  </button>
                </div>
              )}
            </form>

            <form onSubmit={handlePasswordUpdateSubmit}>
              {passwordUpdateState === false ? (
                <div className='memberinfo-form-div'>
                  <div className='memberinfo-edit'>비밀번호 : ***** </div>
                  <button
                    className='submit-button'
                    onClick={updatePasswordClickHandler}
                  >
                    수정하기
                  </button>
                </div>
              ) : (
                <div className='memberinfo-form-div'>
                  <label className='memberinfo-label'>비밀번호</label>
                  <input
                    name='password'
                    type='password'
                    value={memberPassword}
                    placeholder='*****'
                    onChange={onChangeHandlerPassword}
                    className='memberinfo-edit-input'
                  />
                  <button className='submit-button' type='submit'>
                    완료
                  </button>
                  <button
                    className='submit-cancle-button'
                    onClick={passwordUpdateCancelClickHandler}
                  >
                    취소
                  </button>
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
