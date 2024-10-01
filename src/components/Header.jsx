import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useNavigate } from 'react-router-dom';
import './Header.scss';
import { logo } from './Image';

const Header = () => {
  const [isInputVisible, setIsInputVisible] = useState(false);
  const inputBoxRef = useRef();
  const searchInput = useRef();
  const spanRef = useRef();
  const navigate = useNavigate();  // useNavigate 훅 사용

  const handleToggleInput = () => {
    if (!isInputVisible) {
      gsap.fromTo(
        searchInput.current,
        { width: '0', height: '0', y: '-20%', opacity: 0 },
        {
          width: '250px',
          height: '',
          y: '0%',
          opacity: 1,
          duration: 0.3,
          display: 'block',
          ease: 'power1.out',
          transformOrigin: 'top right',
        }
      );
      gsap.to(spanRef.current, {
        duration: 0.3,
        ease: 'power1.out'
      });
    } else {
      gsap.to(searchInput.current, {
        width: '0',
        height: '0',
        y: '-20%',
        opacity: 0,
        duration: 0.3,
        display: 'none',
        ease: 'power1.in',
        transformOrigin: 'top right',
      });
      gsap.to(spanRef.current, {
        duration: 0.3,
        ease: 'power1.in'
      });
    }
    setIsInputVisible(!isInputVisible);
  };

  const handleLogoClick = () => {
    navigate('/');  // 로고 클릭 시 네비게이션
  };

  return (
    <div id='Header'>
      <div className='Header_inner'>
        <img className='logo' src={logo} alt='logo' onClick={handleLogoClick} /> {/* 로고 클릭 시 handleLogoClick 함수 실행 */}
        <div className="Header_rt">
          <div className='input_box' ref={inputBoxRef}>
            <span
              className='material-symbols-rounded'
              onClick={handleToggleInput}
              ref={spanRef}
            >
              {isInputVisible ? 'East' : 'action_key'}
            </span>
            <input
              type='text'
              placeholder='프로젝트를 검색하세요.'
              ref={searchInput}
              style={{ width: '0', display: 'none' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
