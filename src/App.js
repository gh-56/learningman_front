// src/main/frontend/src/App.js
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import Home from './Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MemberInfo from './pages/MemberInfo';
import React from 'react';
import { AuthProvider } from './security/AuthContext';
import HomePage from './pages/HomePage';
import QuizSelect from './pages/QuizSelect';
import QuizComp from './components/QuizComp';
import TeacherMain from './pages/TeacherMain';
import ArticleRegister from './article/ArticleRegister';
import ArticleShow from './article/ArticleShow';
import ArticleDetail from './article/ArticleDetail';
import QuizTest from './pages/QuizTest';

function App() {
  return (
    <div>
      <AuthProvider>
        <Router>
          <Header />
          <div className='app-container'>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/home' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/memberinfo' element={<MemberInfo />} />
              <Route path='/quizselect' element={<QuizSelect />} />
              <Route path='/quiz' element={<QuizComp />} />
              <Route path='/teacher' element={<TeacherMain />} />
              <Route path='/quiztest' element={<QuizTest />} />
              <Route
                path='/articles'
                element={
                  <div>
                    <h2>문제 직접 등록</h2>
                    <ArticleRegister />

                    <ArticleShow />
                  </div>
                }
              />
              <Route path='/articles/:id' element={<ArticleDetail />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
