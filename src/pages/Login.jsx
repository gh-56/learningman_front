import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../security/AuthContext';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const formSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
    navigate('/');
  };
  const onChangeHandlerEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangeHandlerPassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className='login'>
      <h2>Login</h2>
      <form method='post' onSubmit={formSubmit}>
        <input
          name='email'
          type='text'
          value={email}
          onChange={onChangeHandlerEmail}
          placeholder='email'
          className='login-input'
        />
        <input
          name='password'
          type='password'
          value={password}
          onChange={onChangeHandlerPassword}
          placeholder='password'
          className='login-input'
        />
        <button type='submit' className='login-btn'>
          Login
        </button>
        <p className='login-register'>
          <Link className='message' to='/register'>
            회원가입 하기
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
