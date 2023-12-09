import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Header.css';
import { useAuth } from '../security/AuthContext';
import { getCookie } from '../cookies/CookieFunction';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Header = () => {
  const [activeTab, setActiveTab] = useState(1);
  const location = useLocation();
  const selectorRef = useRef(null);
  const updateSelectorTimeoutRef = useRef(null);
  const { logout, role } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    updateSelector();
  }, [activeTab, location.pathname]);

  useEffect(() => {
    const handleResize = () => {
      // Update the selector with a smooth transition on window resize
      updateSelectorSmooth();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const updateSelector = () => {
    const activeItem = document.querySelector('.navbar-nav .active');
    const selector = selectorRef.current;

    if (activeItem && selector) {
      const parent = selector.offsetParent;
      if (parent) {
        const { top, left } = activeItem.getBoundingClientRect();
        const parentTop = parent.getBoundingClientRect().top;
        const parentLeft = parent.getBoundingClientRect().left;
        selector.style.top = `${top - parentTop}px`;
        selector.style.left = `${left - parentLeft}px`;
        selector.style.height = `${activeItem.clientHeight}px`;
        selector.style.width = `${activeItem.clientWidth}px`;
      }
    }
  };

  const updateSelectorSmooth = () => {
    const selector = selectorRef.current;
    if (selector) {
      selector.style.transition = 'left 0.3s ease'; // Adjust the transition duration as needed
      updateSelector();

      // Clear any existing timeout to avoid multiple rapid calls
      clearTimeout(updateSelectorTimeoutRef.current);

      // Use a timeout to delay reset of transition property
      updateSelectorTimeoutRef.current = setTimeout(() => {
        selector.style.transition = '';
      }, 300); // Adjust the delay duration to match the transition duration
    }
  };

  const handleTabClick = (index) => {
    setActiveTab(index);
    updateSelector();
    if (index === 5) {
      onClickHandlerLogout();
    }
  };

  const handleNavbarToggle = () => {
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const horiSelector = document.querySelector('.hori-selector');

    if (navbarCollapse && horiSelector) {
      navbarCollapse.classList.toggle('show');

      // 부드러운 효과를 위해 항상 전환을 적용합니다.
      horiSelector.style.transition = 'left 0.3s ease';
      updateSelector();

      // 여러 번 빠르게 호출되는 것을 방지하기 위해 기존의 타임아웃을 지웁니다.
      clearTimeout(updateSelectorTimeoutRef.current);

      // 토글 애니메이션이 완료된 후에 updateSelector를 지연시키기 위해 타임아웃을 사용합니다.
      updateSelectorTimeoutRef.current = setTimeout(() => {
        horiSelector.style.transition = '';
        // hori-selector 요소에서 transitionend 이벤트를 듣습니다.
        horiSelector.addEventListener('transitionend', handleTransitionEnd, {
          once: true,
        });
      }, 300);
    }
  };

  const handleTransitionEnd = () => {
    // Delay for a short period before calling updateSelector
    updateSelector();
  };

  useEffect(() => {
    const path = location.pathname.split('/').pop() || 'index.html';
    const target = document.querySelector(
      `#navbarSupportedContent ul li a[href="${path}"]`
    );
    if (target) {
      target.parentNode.classList.add('active');
      updateSelector();
    }
  }, [location.pathname]);

  const onClickHandlerLogout = (e) => {
    logout();
    navigate('/');
    window.location.reload();
  };

  return (
    <nav className='navbar navbar-expand-custom navbar-mainbg'>
      <Link
        className='navbar-brand navbar-logo'
        to='/'
        onClick={() => handleTabClick(1)}
      >
        학습 도우미
      </Link>
      <button
        className='navbar-toggler'
        type='button'
        aria-controls='navbarSupportedContent'
        aria-expanded='false'
        aria-label='Toggle navigation'
        onClick={handleNavbarToggle}
      >
        <i class='fas fa-bars text-white'></i>
      </button>
      <div className='collapse navbar-collapse' id='navbarSupportedContent'>
        {getCookie('tokenKey') == null ? (
          <ul className='navbar-nav ml-auto'>
            <div className='hori-selector' ref={selectorRef}>
              <div className='left'></div>
              <div className='right'></div>
            </div>
            <li className={`nav-item ${activeTab === 1 ? 'active' : ''}`}>
              <Link
                className='nav-link'
                to='/login'
                onClick={() => handleTabClick(1)}
              >
                <i class='fa-solid fa-arrow-right-to-bracket'></i>로그인
              </Link>
            </li>
            <li className={`nav-item ${activeTab === 2 ? 'active' : ''}`}>
              <Link
                className='nav-link'
                to='/register'
                onClick={() => handleTabClick(2)}
              >
                <i class='fa-solid fa-user-plus'></i>회원가입
              </Link>
            </li>
          </ul>
        ) : (
          <ul className='navbar-nav ml-auto'>
            <div className='hori-selector' ref={selectorRef}>
              <div className='left'></div>
              <div className='right'></div>
            </div>
            <li className={`nav-item ${activeTab === 1 ? 'active' : ''}`}>
              <Link
                className='nav-link'
                to='/memberinfo'
                onClick={() => handleTabClick(1)}
              >
                <i className='fas fa-tachometer-alt'></i>회원 정보
              </Link>
            </li>
            <li className={`nav-item ${activeTab === 2 ? 'active' : ''}`}>
              <Link
                className='nav-link'
                to='/articles'
                onClick={() => handleTabClick(2)}
              >
                <i class='fa-solid fa-newspaper'></i>게시판
              </Link>
            </li>
            <li className={`nav-item ${activeTab === 3 ? 'active' : ''}`}>
              <Link
                className='nav-link'
                to='/words'
                onClick={() => handleTabClick(3)}
              >
                <i className='far fa-address-book'></i>예문 만들기
              </Link>
            </li>
            {role === 'TEACHER' ? (
              <li className={`nav-item ${activeTab === 4 ? 'active' : ''}`}>
                <Link
                  className='nav-link'
                  to='/quizselect'
                  onClick={() => handleTabClick(4)}
                >
                  <i className='far fa-address-book'></i>과제 설정
                </Link>
              </li>
            ) : (
              <li className={`nav-item ${activeTab === 4 ? 'active' : ''}`}>
                <Link
                  className='nav-link'
                  to='/quiztest'
                  onClick={() => handleTabClick(4)}
                >
                  <i className='far fa-address-book'></i>과제 수행
                </Link>
              </li>
            )}
            <li className={`nav-item ${activeTab === 5 ? 'active' : ''}`}>
              <Link
                className='nav-link'
                // to='/articles'
                onClick={() => handleTabClick(5)}
              >
                <i className='far fa-address-book'></i>로그아웃
              </Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Header;
