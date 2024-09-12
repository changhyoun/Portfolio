import React, { useEffect, useRef } from 'react';
import { Home_main_back } from '../components/Image';
import Header from '../components/Header';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Home.scss';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const mainRef = useRef(null); // #main 요소 참조
  const h2Refs = useRef([]); // 모든 h2 요소 참조
  const mainWarpRef = useRef(null); // .main_warp 요소 참조

  useEffect(() => {
    initializeScrollTrigger();
    animateHeaders();
    animateMainWarp();

    return () => {
      // 모든 ScrollTrigger 인스턴스 해제
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const initializeScrollTrigger = () => {
    // ScrollTrigger 설정
    ScrollTrigger.create({
      trigger: mainRef.current,
      start: 'top+=1 top',
      endTrigger: '#page2',
      end: '50% top',
      pin: mainRef.current,
      pinSpacing: false,
      onEnter: () => gsap.set(mainRef.current, { position: 'fixed', top: 0 }),
      onLeave: () => gsap.set(mainRef.current, { position: 'relative', clearProps: 'top' }),
      onEnterBack: () => gsap.set(mainRef.current, { position: 'fixed', top: 0 }),
      onLeaveBack: () => gsap.set(mainRef.current, { position: 'relative', clearProps: 'top' }),
      
    });
  };

  const animateHeaders = () => {
    // 각 h2 요소에 대해 GSAP 애니메이션 설정
    h2Refs.current.forEach((h2) => {
      gsap.to(h2, {
        rotate: 0,
        scrollTrigger: {
          trigger: mainRef.current,
          start: 'top top',
          endTrigger: '#page2',
          end: '50% top',
          scrub: true,
        
        },
      });
    });
  };

  const animateMainWarp = () => {
  // .main_warp 요소의 초기 스타일 설정
  gsap.set(mainWarpRef.current, {
    opacity: 0, // 처음에는 완전히 투명하게 설정
    scale: 0,
  });

  // .main_warp 애니메이션 설정
  gsap.to(mainWarpRef.current, {
    opacity: 1, // 불투명해지도록 설정
    scale: 1,
    duration: 0.5, // 애니메이션 지속 시간
    ease: 'power4.out', // 자연스러운 애니메이션 이징
    delay: 0.5, // 애니메이션 시작 지연 시간
  });

  // #main의 h2 요소들에 대한 애니메이션 설정
  h2Refs.current.forEach((h2, index) => {
    gsap.set(h2, { opacity: 0 }); // 각 h2의 초기 투명도 설정

    gsap.to(h2, {
      opacity: 1, // 각 h2의 불투명도로 전환
      duration: 0.5, // 애니메이션 지속 시간
      ease: 'power4.out', // 자연스러운 이징
      delay: 0.5 + index * 0.2, // 각 h2 요소의 애니메이션 지연 시간 (0.2초씩 차이를 줌)
    });
  });
};

  return (
    <div id="Home">
      <Header />
      <main id="main" ref={mainRef}>
        <video src={Home_main_back} 
        autoPlay muted playsInline loop
        ></video>
        <div className="main_warp" ref={mainWarpRef}>
          <h2 ref={(el) => (h2Refs.current[0] = el)}>For the web,<br /> for the people.</h2>
          <div className="main_large_cir">
            <h2 ref={(el) => (h2Refs.current[1] = el)}>For the web,<br /> for the people.</h2>
          </div>
          <div className="main_middle_cir">
            <h2 ref={(el) => (h2Refs.current[2] = el)}>For the web,<br /> for the people.</h2>
          </div>
          <div className="main_small_cir">
            <h2 ref={(el) => (h2Refs.current[3] = el)}>For the web,<br /> for the people.</h2>
          </div>
        </div>

        <div className="scrollDown">
          
        </div>
        
      </main>
      <section id="page2"></section>
      <section id="page3"></section>
    </div>
  );
};

export default Home;
