import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../security/AuthContext";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const authContext = useAuth();
  console.log(authContext)
  const formSubmit = async (e) => {
    e.preventDefault();
    //await login(email, password);
  };

  const onChangeHandlerEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangeHandlerPassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div>
      <form method='post' onSubmit={formSubmit}>
        <input
          name='email'
          type='text'
          value={email}
          onChange={onChangeHandlerEmail}
        />
        <input
          name='password'
          type='text'
          value={password}
          onChange={onChangeHandlerPassword}
        />
        <button type='submit'>제출</button>
      </form>
    </div>
  );
}

export default Login;
