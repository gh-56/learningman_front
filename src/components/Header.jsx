import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [activeTab, setActiveTab] = useState(1);
  const location = useLocation();
  const selectorRef = useRef(null);
  const updateSelectorTimeoutRef = useRef(null);

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
  };

  const handleNavbarToggle = () => {
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const horiSelector = document.querySelector('.hori-selector');
    if (navbarCollapse && horiSelector) {
      navbarCollapse.classList.toggle('show');
      updateSelector();

      // Always apply transition for smooth effect
      horiSelector.style.transition = 'left 0.3s ease';

      // Clear any existing timeout to avoid multiple rapid calls
      clearTimeout(updateSelectorTimeoutRef.current);

      // Use a timeout to delay updateSelector after the toggle animation completes
      updateSelectorTimeoutRef.current = setTimeout(() => {
        // Listen for the transitionend event on the hori-selector element
        horiSelector.addEventListener('transitionend', handleTransitionEnd, {
          once: true,
        });
      }, 50); // Adjust the delay duration as needed
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

  return (
    <nav className='navbar navbar-expand-custom navbar-mainbg'>
      <Link className='navbar-brand navbar-logo' to='/'>
        Navbar
      </Link>
      <button
        className='navbar-toggler'
        type='button'
        aria-controls='navbarSupportedContent'
        aria-expanded='false'
        aria-label='Toggle navigation'
        onClick={handleNavbarToggle}
      >
        <i className='fas fa-bars text-white'></i>
      </button>
      <div className='collapse navbar-collapse' id='navbarSupportedContent'>
        <ul className='navbar-nav ml-auto'>
          <div className='hori-selector' ref={selectorRef}>
            <div className='left'></div>
            <div className='right'></div>
          </div>
          <li className={`nav-item ${activeTab === 1 ? 'active' : ''}`}>
            <Link className='nav-link' to='/' onClick={() => handleTabClick(1)}>
              <i className='fas fa-tachometer-alt'></i>Dashboard
            </Link>
          </li>
          <li className={`nav-item ${activeTab === 2 ? 'active' : ''}`}>
            <Link
              className='nav-link'
              to='/address'
              onClick={() => handleTabClick(2)}
            >
              <i className='far fa-address-book'></i>Address Book
            </Link>
          </li>
          {/* Add more tabs as needed */}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
