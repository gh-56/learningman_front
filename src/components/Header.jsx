import React, { useContext } from 'react';
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../security/AuthContext';
import { setCookie, getCookie, removeCookie } from '../cookies/CookieFunction';

function Header() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const onClickHandler = (event) => {
    event.preventDefault();
    navigate('/');
    // window.location.reload();
  };
  const onClickHandlerLogout = (e) => {
    logout();
    navigate('/');
    window.location.reload();
  };

  return (
    <nav className='navbar navbar-expand-lg bg-body-tertiary'>
      <div className='Header container-fluid'>
        <a className='navbar-brand' href='/' onClick={onClickHandler}>
          학습 도우미
        </a>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          {getCookie('tokenKey') == null ? (
            <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
              <li className='nav-item'>
                <Link
                  className='nav-link active'
                  aria-current='page'
                  to='/login'
                >
                  로그인
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  className='nav-link active'
                  aria-current='page'
                  to='/register'
                >
                  회원가입
                </Link>
              </li>
            </ul>
          ) : (
            <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
              <li className='nav-item'>
                <Link
                  className='nav-link active'
                  aria-current='page'
                  to='/memberinfo'
                >
                  회원정보
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  className='nav-link active'
                  aria-current='page'
                  to='/articles'
                >
                  게시판
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  className='nav-link active'
                  aria-current='page'
                  to='/quizselect'
                >
                  퀴즈
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  className='nav-link active'
                  aria-current='page'
                  onClick={onClickHandlerLogout}
                >
                  로그아웃
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}
export default Header;
