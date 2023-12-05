import React from 'react';
import Card from '../components/Card';
import { useAuth } from '../security/AuthContext';
import { setCookie, getCookie, removeCookie } from '../cookies/CookieFunction';
import Login from './Login';

function HomePage() {
  return <>{getCookie('tokenKey') == null ? <Login /> : <Card />}</>;
}

export default HomePage;
