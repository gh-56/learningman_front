import React, { useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
import { useAuth } from '../security/AuthContext';

function Login() {
  // const baseUrl = 'http://localhost:8080';
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const navigate = useNavigate();
  const { login } = useAuth();

  const formSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const email = formData.get('email');
    const password = formData.get('password');

    await login(email, password);
    // await axios
    //   .post(baseUrl + '/members/login', {
    //     memberEmail: email,
    //     memberPassword: password,
    //   })
    //   .then((userDetails) => {
    //     if (userDetails.data == null) {
    //       alert('정보가 일치하지 않습니다');
    //       window.location.reload();
    //     } else {
    //       var member = {
    //         memberName: userDetails.data.username,
    //         memberEmail: email,
    //         memberPassword: userDetails.data.password,
    //         memberRole: userDetails.data.authorities[0].authority,
    //       };
    //       localStorage.setItem('members', JSON.stringify(member));
    //       navigate('/');
    //       window.location.reload();
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  // const onChangeHandlerEmail = (e) => {
  //   setEmail(e.target.value);
  // };
  // const onChangeHandlerPassword = (e) => {
  //   setPassword(e.target.value);
  // };

  return (
    <div>
      <form onSubmit={formSubmit} method='POST'>
        <input
          id='email'
          name='email'
          type='text'
          placeholder='email을 입력하세요.'
        />
        <input
          id='password'
          name='password'
          type='password'
          placeholder='password를 입력하세요.'
        />
        <button>제출</button>
      </form>
    </div>
  );
}

export default Login;
