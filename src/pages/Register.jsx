import axios, { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

function Register() {
  const baseUrl = 'http://43.200.5.111:8080';
  const [memberName, setMemberName] = useState('');
  const [memberEmail, setMemberEmail] = useState('');
  const [memberPassword, setMemberPassword] = useState('');
  const [nameError, setNameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [role, setRole] = useState('STUDENT');
  const navigate = useNavigate();

  const handleClickRadioButton = (e) => {
    console.log(e.target.value);
    setRole(e.target.value);
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    if (
      memberName === null ||
      memberName === '' ||
      memberEmail === null ||
      memberEmail === '' ||
      memberEmail.includes('@') === false ||
      memberPassword === null ||
      memberPassword === ''
    ) {
      if (memberName === null || memberName === '') {
        setNameError('이름을 입력해주십시오');
      } else {
        setNameError(null);
      }
      if (memberEmail === null || memberEmail === '') {
        setEmailError('이메일을 입력해주십시오');
      } else if (memberEmail.includes('@') === false) {
        setEmailError('이메일 형식으로 입력해주십시오');
      } else {
        setEmailError(null);
      }
      if (memberPassword === null || memberPassword === '') {
        setPasswordError('비밀번호를 입력해주십시오');
      } else {
        setPasswordError(null);
      }
    } else {
      await axios
        .post(baseUrl + '/members/register', {
          memberName: memberName,
          memberEmail: memberEmail,
          memberPassword: memberPassword,
          role: role,
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
          console.log(err.response.status);
          if (err.response.status === 400) {
            alert('이미 가입한 회원입니다');
          }
        });
      console.log('test after api');
      navigate('/login');
    }
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

  return (
    <div className='register'>
      <h2>Sign Up</h2>
      <form onSubmit={formSubmit}>
        <label className='register-label'>이름</label>
        <input
          name='name'
          type='text'
          value={memberName}
          onChange={onChangeHandlerName}
          className='register-input'
          placeholder='name'
        />
        {nameError === null ? null : <p>{nameError}</p>}

        <label className='register-label'>이메일</label>
        <input
          name='email'
          type='text'
          value={memberEmail}
          onChange={onChangeHandlerEmail}
          className='register-input'
          placeholder='email'
        />
        {emailError === null ? null : <p>{emailError}</p>}

        <label className='register-label'>비밀번호</label>
        <input
          name='password'
          type='password'
          value={memberPassword}
          onChange={onChangeHandlerPassword}
          className='register-input'
          placeholder='password'
        />
        {passwordError === null ? null : <p>{passwordError}</p>}

        <div className='select-register-radio'>
          <input
            type='radio'
            value='STUDENT'
            checked={role === 'STUDENT'}
            onChange={handleClickRadioButton}
          />
          학생
        </div>
        <div className='select-register-radio'>
          <input
            type='radio'
            value='TEACHER'
            checked={role === 'TEACHER'}
            onChange={handleClickRadioButton}
          />
          선생님
        </div>
        <div className='select-register-radio'>
          <input
            type='radio'
            value='ADMIN'
            checked={role === 'ADMIN'}
            onChange={handleClickRadioButton}
          />
          관리자
        </div>

        <button type='submit' className='register-button'>
          회원가입
        </button>
      </form>
    </div>
  );
}
export default Register;
