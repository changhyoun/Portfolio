import React, { useEffect, useRef } from 'react';
import { Home_main_back } from '../components/Image';
import Header from '../components/Header';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'; // ScrollToPlugin 추가
import { TextPlugin } from 'gsap/TextPlugin'; // GSAP 텍스트 플러그인 추가
import './Home.scss';

gsap.registerPlugin(ScrollTrigger, TextPlugin, ScrollToPlugin); // ScrollToPlugin 등록

const Home = () => {
  const mainRef = useRef(null);
  const h2Refs = useRef([]);
  const mainWarpRef = useRef(null);
  const svgRef = useRef(null);
  const scrollDownRef = useRef(null);
  const downBoxRef = useRef(null);
  const buttonRef = useRef(null); // button 참조 추가

  useEffect(() => {
    initializeScrollTrigger();
    animateHeaders();
    animateMainWarp();
    animateScrollDownSVG();
    handleScrollEffects();
    animateDownBoxText();

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const initializeScrollTrigger = () => {
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
    gsap.set(mainWarpRef.current, {
      opacity: 0,
      scale: 0,
    });

    gsap.to(mainWarpRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.5,
      ease: 'power4.out',
      delay: 0.5,
    });

    h2Refs.current.forEach((h2, index) => {
      gsap.set(h2, { opacity: 0 });

      gsap.to(h2, {
        opacity: 1,
        duration: 0.5,
        ease: 'power4.out',
        delay: 0.5 + index * 0.2,
      });
    });
  };
  const animateScrollDownSVG = () => {
    let rotationY = 0; // 초기 회전 각도
  
    // SVG 요소에 3D 회전을 활성화하도록 스타일 설정
    if (svgRef.current) {
      gsap.set(svgRef.current, {
        transformPerspective: 1000, // 3D 회전의 깊이 설정
        transformStyle: 'preserve-3d', // 3D 스타일 유지
      });
    } else {
      console.warn('SVG element not found');
      return; // SVG 요소가 없으면 함수 종료
    }
  
    console.log('SVG 3D transformation settings applied.');
  
    ScrollTrigger.create({
      trigger: '#Home', // 페이지 전체를 트리거로 설정
      start: 'top top', // 스크롤 시작 위치
      end: 'bottom bottom', // 스크롤 끝 위치
      scrub: true, // 스크롤에 따라 애니메이션 동기화
      refreshPriority: 1, // 업데이트 우선순위 설정
      onUpdate: (self) => {
        console.log('onUpdate called.'); // onUpdate가 호출되는지 확인
  
        // 스크롤 변화에 따라 회전 각도 계산
        if (self.direction > 0) {
          rotationY += 10; // 스크롤 다운 시 10도 증가
        } else {
          rotationY -= 10; // 스크롤 업 시 10도 감소
        }
  
        // 콘솔에 현재 회전 각도 출력
        console.log(`Current rotationY: ${rotationY} degrees`);
  
        // SVG 요소의 회전 적용
        gsap.set(svgRef.current, { rotationY });
      },
    });
  
    console.log('ScrollTrigger created.');
  };
  

  const handleScrollEffects = () => {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      if (scrollY === 0) {
        gsap.to(buttonRef.current, { opacity: 0, display: 'none', duration: 0.5 });
        gsap.to(downBoxRef.current, {
          opacity: 1,
          display: 'flex',
          duration: 0.5,
          onComplete: animateDownBoxText, // 애니메이션이 완료된 후 텍스트 애니메이션 실행
        });
      } else {
        gsap.to(buttonRef.current, { opacity: 1, display: 'flex', duration: 0.5 });
        gsap.to(downBoxRef.current, { opacity: 0, display: 'none', duration: 0.5 });
      }
    });
  };

  const animateDownBoxText = () => {
    const alienText = "ʞɐʍʞʍʎ"; // 외계어처럼 보이는 텍스트

    // 텍스트 애니메이션 설정
    gsap.fromTo(
      downBoxRef.current.querySelector('p'),
      { text: alienText }, // 외계어로 시작
      {
        text: 'scroll down', // 타자치는 효과로 텍스트 전환
        duration: 1.5,
        ease: 'power2.out',
        delay: 0.3,
      }
    );
  };

  const handleDownBoxClick = () => {
    const mainElement = mainRef.current; // #main 요소 참조
    const targetScrollPosition = mainElement.offsetTop + mainElement.offsetHeight / 3; // #main 높이의 1/3 위치 계산
  
    gsap.to(window, { scrollTo: { y: targetScrollPosition }, duration: 0.6, ease: 'power2.out' }); // 부드럽게 스크롤
  };

  return (
    <div id="Home">
      <Header />
      <div className="scrollDown" ref={scrollDownRef}>
        <button className="button" ref={buttonRef}  style={{ display: 'none' }}>
          <div className="dots_border"></div>
          <svg
            ref={svgRef}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="sparkle"
          >
            <path
              className="path"
              strokeLinejoin="round"
              strokeLinecap="round"
              stroke="black"
              fill="black"
              d="M14.187 8.096L15 5.25L15.813 8.096C16.0231 8.83114 16.4171 9.50062 16.9577 10.0413C17.4984 10.5819 18.1679 10.9759 18.903 11.186L21.75 12L18.904 12.813C18.1689 13.0231 17.4994 13.4171 16.9587 13.9577C16.4181 14.4984 16.0241 15.1679 15.814 15.903L15 18.75L14.187 15.904C13.9769 15.1689 13.5829 14.4994 13.0423 13.9587C12.5016 13.4181 11.8321 13.0241 11.097 12.814L8.25 12L11.096 11.187C11.8311 10.9769 12.5006 10.5829 13.0413 10.0423C13.5819 9.50162 13.9759 8.83214 14.186 8.097L14.187 8.096Z"
            ></path>
            <path
              className="path"
              strokeLinejoin="round"
              strokeLinecap="round"
              stroke="black"
              fill="black"
              d="M6 14.25L5.741 15.285C5.59267 15.8785 5.28579 16.4206 4.85319 16.8532C4.42059 17.2858 3.87853 17.5927 3.285 17.741L2.25 18L3.285 18.259C3.87853 18.4073 4.42059 18.7142 4.85319 19.1468C5.28579 19.5794 5.59267 20.1215 5.741 20.715L6 21.75L6.259 20.715C6.40725 20.1216 6.71398 19.5796 7.14639 19.147C7.5788 18.7144 8.12065 18.4075 8.714 18.259L9.75 18L8.714 17.741C8.12065 17.5925 7.5788 17.2856 7.14639 16.853C6.71398 16.4204 6.40725 15.8784 6.259 15.285L6 14.25Z"
            ></path>
            <path
              className="path"
              strokeLinejoin="round"
              strokeLinecap="round"
              stroke="black"
              fill="black"
              d="M6.5 4L6.303 4.5915C6.24777 4.75718 6.15472 4.90774 6.03123 5.03123C5.90774 5.15472 5.75718 5.24777 5.5915 5.303L5 5.5L5.5915 5.697C5.75718 5.75223 5.90774 5.84528 6.03123 5.96877C6.15472 6.09226 6.24777 6.24282 6.303 6.4085L6.5 7L6.697 6.4085C6.75223 6.24282 6.84528 6.09226 6.96877 5.96877C7.09226 5.84528 7.24282 5.75223 7.4085 5.697L8 5.5L7.4085 5.303C7.24282 5.24777 7.09226 5.15472 6.96877 5.03123C6.84528 4.90774 6.75223 4.75718 6.697 4.5915L6.5 4Z"
            ></path>
          </svg>
        </button>
        <div className="down_box" ref={downBoxRef} onClick={handleDownBoxClick}>
           <p>scroll down</p>
           <div>
             <span
               className="material-symbols-rounded arrow"
             >
              south_east
            </span>
            <span
               className="material-symbols-rounded arrow"
             >
              south_east
            </span>
           </div>
         </div>
      </div>

      <main id="main" ref={mainRef}>
        <video src={Home_main_back}
            // autoPlay muted playsInline loop
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
      </main>
      <section id="page2"></section>
      <section id="page3"></section>
    </div>
  );
};

export default Home;
