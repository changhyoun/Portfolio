import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import './Loading.scss'; 

gsap.registerPlugin(TextPlugin);

const Loading = () => {
  useEffect(() => {
    // GSAP으로 텍스트 타이핑 애니메이션 적용
    gsap.to(".loading-text", {
      duration: 2,
      text: "loading...",
      repeat: -1,  // 무한 반복
      repeatDelay: 0.5,
      yoyo: true,  // 애니메이션이 끝난 후 반대로 진행
      ease: "power2.inOut"
    });
  }, []);

  return (
    <div id='Loading'>
      <h2 className="loading-text"></h2>  {/* 여기에 GSAP 애니메이션 적용 */}
      <div className="loader"></div>
    </div>
  );
}

export default Loading;
