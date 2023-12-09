// src/main/frontend/src/App.js
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
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
import WordsRegister from './words/WordsRegister';
import WordsShow from './words/WordsShow';
import WordsDetail from './words/WordsDetail';
import { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.css';

function App() {
  const [editState, setEditState] = useState(false);
  const [editTitle, setEditTitle] = useState(null);
  const [editContent, setEditContent] = useState(null);
  const [editArticleId, setEditArticleId] = useState(null);

  return (
    <div>
      <AuthProvider>
        <Router>
          <Header />
          <div className='app-container'>
            <Routes>
              <Route path='/' element={<HomePage />} />
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
                    <h2>자유 게시판</h2>
                    <ArticleRegister
                      setEditState={setEditState}
                      editState={editState}
                      setEditTitle={setEditTitle}
                      editTitle={editTitle}
                      setEditContent={setEditContent}
                      editContent={editContent}
                      setEditArticleId={setEditArticleId}
                      editArticleId={editArticleId}
                    />
                    <ArticleShow
                      setEditState={setEditState}
                      editState={editState}
                      setEditTitle={setEditTitle}
                      editTitle={editTitle}
                      setEditContent={setEditContent}
                      editContent={editContent}
                      setEditArticleId={setEditArticleId}
                      editArticleId={editArticleId}
                    />
                  </div>
                }
              />
              <Route path='/articles/:id' element={<ArticleDetail />} />
              <Route
                path='/words'
                element={
                  <div>
                    <WordsRegister />
                    <WordsShow />
                  </div>
                }
              />
              <Route path='/words/:id' element={<WordsDetail />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
