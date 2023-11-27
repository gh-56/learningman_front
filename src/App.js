// src/main/frontend/src/App.js
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import Home from './Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MemberInfo from './pages/MemberInfo';
import React from 'react';
import { AuthProvider } from './security/AuthContext';
import HomePage from './pages/HomePage';
import QuizRegister from './article/QuizRegister';

function App() {
  return (
    <div>
      <AuthProvider>
        <Router>
          <Header />
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/home' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/memberinfo' element={<MemberInfo />} />
            <Route path='/articles' element={<QuizRegister />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
