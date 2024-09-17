import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';
import './Header.scss';
import { logo } from './Image';

const Header = () => {
  const [isInputVisible, setIsInputVisible] = useState(false);
  const inputBoxRef = useRef();
  const searchInput = useRef();
  const spanRef = useRef();

  const handleToggleInput = () => {
    if (!isInputVisible) {
      // Input을 위에서 내려오듯이 보여주기
      gsap.fromTo(
        searchInput.current,
        { width: '0', height: '0', y: '-20%', opacity: 0 },  // 초기 위치 및 불투명도
        {
          width: '250px',
          height: '',
          y: '0%',
          opacity: 1,
          duration: 0.3,
          display: 'block',
          ease: 'power1.out',
          transformOrigin: 'top right',
          onComplete : () => searchInput.current.focus(),
        }
      );
      gsap.to(spanRef.current, {
        duration: 0.3,
        ease: 'power1.out'
      });
    } else {
      // Input을 숨기고 span 아이콘 복구
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


  return (
    <div id='Header'>
      <div className='Header_inner'>
        <img className='logo' src={logo} alt='logo' />

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
              placeholder='프로젝트를 검색하세요. ex) 캠파인'
              ref={searchInput}
            
              style={{ width: '0', display: 'none' }}
            />
          </div>
          <div className="hambuger">
            <span className="material-symbols-rounded">
              menu
            </span>
          </div>
        </div>
         
      </div>
    </div>
  );
};

export default Header;
