import React, { useEffect, useRef } from 'react';
import { Home_main_back, Home_main_back2, github_ic, se } from '../components/Image';
import Header from '../components/Header';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { TextPlugin } from 'gsap/TextPlugin';
import './Home.scss';

gsap.registerPlugin(ScrollTrigger, TextPlugin, ScrollToPlugin);

const Home = () => {
  const mainRef = useRef(null);
  const h2Refs = useRef([]);
  const mainWarpRef = useRef(null);
  const svgRef = useRef(null);
  const scrollDownRef = useRef(null);
  const downBoxRef = useRef(null);
  const buttonRef = useRef(null);
  const videoRef2 = useRef(null);
  const textBoxRef = useRef(null);
  const page3Ref = useRef(null);
  const page3TextRef = useRef(null);
  const canvasRef = useRef(null);
  const profileRef = useRef(null); // page3_warp_profile 요소의 참조

  useEffect(() => {

     // Swiper 초기화
     if (window.Swiper) {
      new window.Swiper('.swiper-container', {
        direction: 'vertical',
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: true,
        },
      });
    }

    initializeScrollTrigger();
    animateHeaders();
    animateMainWarp();
    animateScrollDownSVG();
    handleScrollEffects();
    animateDownBoxText();
    splitTextAndAnimate();
    splitTextIntoSpans();
    createProfileHoverAnimation(); // 프로필 이미지 호버 애니메이션 생성
    

    // Canvas를 사용하여 이미지 렌더링
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const image = new Image();
    image.src = 'https://images.unsplash.com/photo-1631879742101-cfbb083e6402?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'; // 이미지 URL

    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1; // 디스플레이의 픽셀 비율
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr); // 고해상도로 스케일 조정

      // 이미지 스무딩 설정
      ctx.imageSmoothingEnabled = true;
    };

    image.onload = () => {
      setCanvasSize(); // 캔버스 크기 설정
    
      const { width, height } = canvas;
    
      // 스크롤에 따라 이미지 픽셀화 조정
      const pixelData = { pixelSize: 30 }; // 초기 픽셀 크기
    
      ScrollTrigger.create({
        trigger: page3Ref.current,
        start: 'top top',
        end: 'top 60%',
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const targetPixelSize = Math.max(1, 30 * (1 - progress)); // 목표 픽셀 크기
    
          // gsap 애니메이션을 사용하여 픽셀 크기를 양방향으로 조정
          gsap.to(pixelData, {
            pixelSize: targetPixelSize,
            duration: 1.5, // 애니메이션 지속 시간
            ease: 'power2.out',
            overwrite: 'auto', // 양방향 애니메이션이 부드럽게 작동하도록 설정
            onUpdate: () => {
              ctx.clearRect(0, 0, width, height);
              // 작은 사이즈로 이미지를 그린 후 확대
              ctx.drawImage(image, 0, 0, width / pixelData.pixelSize, height / pixelData.pixelSize);
              ctx.drawImage(canvas, 0, 0, width / pixelData.pixelSize, height / pixelData.pixelSize, 0, 0, width, height);
            },
          });
        },
      });
    };
    
    if (videoRef2.current) {
      videoRef2.current.playbackRate = 0.5;
    }

    window.addEventListener('resize', setCanvasSize); // 창 크기 변경 시 캔버스 크기 재조정

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

   // 프로필 이미지 호버 애니메이션 생성
   const createProfileHoverAnimation = () => {
    const profileElement = profileRef.current;
    if (!profileElement) return;

    const images = profileElement.querySelectorAll('.image__element'); // 여러 개의 이미지 요소 가져오기
    let hoverTimeline = gsap.timeline({ paused: true });

    // 초기 상태 설정: 이미지 크기와 밝기
    hoverTimeline.set(images, { scale: 1, filter: 'brightness(1)', transformOrigin: 'center center' });

    // 호버 시 애니메이션 설정
    hoverTimeline.to(
      images,
      {
        scale: (index) => 1 - index * 0.1, // 각 이미지가 순차적으로 작아지도록 설정
        filter: (index) => `brightness(${0.5 + index * 0.1})`, // 각 이미지의 밝기를 순차적으로 감소

        ease: 'power1.inOut',
        duration: 0.25,
        stagger: 0.1, // 각 이미지가 일정 시간 간격을 두고 작아지도록 설정
      }
    );

    // 마우스 이벤트 추가
    profileElement.addEventListener('mouseenter', () => hoverTimeline.play());
    profileElement.addEventListener('mouseleave', () => hoverTimeline.reverse());
  };

  const initializeScrollTrigger = () => {
    // Section 1 fixed scrolling
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

    // Section 3 fixed scrolling
    ScrollTrigger.create({
      trigger: '#page3',
      start: 'top top',
      endTrigger: '#page4',
      end: '50% center',
      pin: '#page3',
      pinSpacing: false,
      onEnter: () => gsap.set('#page3', { position: 'fixed', top: 0 }),
      onLeave: () => gsap.set('#page3', { position: 'relative' }),
      onEnterBack: () => gsap.set('#page3', { position: 'fixed', top: 0 }),
      onLeaveBack: () => gsap.set('#page3', { position: 'relative' }),
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
    let rotationY = 0;

    if (svgRef.current) {
      gsap.set(svgRef.current, {
        transformPerspective: 1000,
        transformStyle: 'preserve-3d',
      });
    } else {
      console.warn('SVG element not found');
      return;
    }

    ScrollTrigger.create({
      trigger: '#Home',
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      refreshPriority: 1,
      onUpdate: (self) => {
        if (self.direction > 0) {
          rotationY += 10;
        } else {
          rotationY -= 10;
        }
        gsap.set(svgRef.current, { rotationY });
      },
    });
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
          onComplete: animateDownBoxText,
        });
      } else {
        gsap.to(buttonRef.current, { opacity: 1, display: 'flex', duration: 0.5 });
        gsap.to(downBoxRef.current, { opacity: 0, display: 'none', duration: 0.5 });
      }
    });
  };

  const animateDownBoxText = () => {
    const alienText = "ʞɐʍʞʍʎ";
    gsap.fromTo(
      downBoxRef.current.querySelector('p'),
      { text: alienText },
      {
        text: 'scroll down',
        duration: 1.5,
        ease: 'power2.out',
        delay: 0.3,
      }
    );
  };

  const handleDownBoxClick = () => {
    const mainElement = mainRef.current;
    const targetScrollPosition = mainElement.offsetTop + mainElement.offsetHeight / 3;
    gsap.to(window, { scrollTo: { y: targetScrollPosition }, duration: 0.6, ease: 'power2.out' });
  };

  const splitTextAndAnimate = () => {
    const textBox = textBoxRef.current;
    const h2 = textBox.querySelector('h2');
    const p = textBox.querySelector('p');

    const splitText = (element) => {
      const text = element.innerText;
      element.innerHTML = '';
      text.split('').forEach((char) => {
        const span = document.createElement('span');
        span.textContent = char === '\n' ? '' : char;
        element.appendChild(span);
        if (char === '\n') {
          element.appendChild(document.createElement('br'));
        }
      });
    };

    splitText(h2);
    splitText(p);

    gsap.from(textBox.querySelectorAll('span'), {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.02,
      ease: 'power3.out',
    });
  };

  const splitTextIntoSpans = () => {
    const paragraphs = page3TextRef.current.querySelectorAll('p');

    paragraphs.forEach((p) => {
      const lines = p.innerText.split('\n');
      p.innerHTML = ''; // 기존 p의 내용을 비움

      lines.forEach((line) => {
        const lineSpan = document.createElement('span');
        lineSpan.style.display = 'block'; // 줄 단위로 블록 설정
        line.split(' ').forEach((word) => {
          const wordSpan = document.createElement('span');
          wordSpan.textContent = word + ' ';
          lineSpan.appendChild(wordSpan);
        });
        p.appendChild(lineSpan);
      });
    });

    // 애니메이션 설정
    gsap.fromTo(
      page3TextRef.current.querySelectorAll('span span'),
      {
        x: () => Math.random() * 500 - 250, // 무작위 x 위치 설정
        y: () => Math.random() * 200 - 100, // 무작위 y 위치 설정
        opacity: 0, // 초기 투명도
        rotation: () => Math.random() * 360 - 180, // 무작위 회전 설정
      },
      {
        x: 0,
        y: 0,
        opacity: 1,
        rotation: 0,
        duration: 1.5,
        ease: 'power1.out',
        stagger: 0.05, // 각 단어별로 약간의 지연을 줌
        scrollTrigger: {
          trigger: '#page3',
          start: 'top top',
          end: 'bottom center',
          scrub: true,
        },
        
      }
      
    );
    gsap.fromTo(
      page3Ref.current.querySelector('.page3_warp_profile'),
      {
        width: 0,
        height: 0,
        opacity: 0,
      },
      {
        width: '50%',
        height: '70%',
        opacity: 1,
        duration: 0.5,
        scrollTrigger: {
          trigger: '#page3',
          start: '50% center',
          endTrigger: '#page4',
          end: '10% center',
          scrub: true,
        },
      }
    );
  
  };

  


  return (
    <div id="Home">
      {/* SVG 필터 추가 */}
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style={{ display: 'none' }}>
        <filter id="pixelate">
          <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="5" />
          <feDisplacementMap in="SourceGraphic" scale="40" />
        </filter>
      </svg>

      <Header />
      <div className="scrollDown" ref={scrollDownRef}>
        <button className="button" ref={buttonRef} style={{ display: 'none' }}>
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
            <span className="material-symbols-rounded arrow">south_east</span>
            <span className="material-symbols-rounded arrow">south_east</span>
          </div>
        </div>
      </div>




      <main id="main" ref={mainRef}>
        <video src={Home_main_back} autoPlay muted playsInline loop></video>
        <video src={Home_main_back2} autoPlay muted playsInline loop ref={videoRef2}></video>
        <div className="main_warp" ref={mainWarpRef}>
          <h2 ref={(el) => (h2Refs.current[0] = el)}>
            For the web,
            <br /> for the people.
          </h2>
          <div className="main_large_cir">
            <h2 ref={(el) => (h2Refs.current[1] = el)}>
              For the web,
              <br /> for the people.
            </h2>
          </div>
          <div className="main_middle_cir">
            <h2 ref={(el) => (h2Refs.current[2] = el)}>
              For the web,
              <br /> for the people.
            </h2>
          </div>
          <div className="main_small_cir">
            <h2 ref={(el) => (h2Refs.current[3] = el)}>
              For the web,
              <br /> for the people.
            </h2>
          </div>
        </div>
        <div className="main_tx_box" ref={textBoxRef}>
          <h2>
            Welcome to a space where
            <br />
            sophisticated code and
            <br />
            sensuous design come together.
          </h2>
          <p>( 정교한 코드와 감각적인 디자인이 어우러진 공간에 오신 것을 환영합니다. )</p>
        </div>
      </main>

      <section id="page2"></section>
      <section id="page3" ref={page3Ref}>
        {/* Canvas Element for Image */}
        <div className="canvas-wrap">
          <canvas ref={canvasRef}/>
        </div>
        <div className="page3_warp" ref={page3TextRef}>
          
        
        <div className="page3_tx">
          <p className='page3_tx_eng'>
            <em>Hello,</em> I am Changhyun Kim, a front-end developer.
            <br />
            We develop user-centered web experiences<br />
            using HTML, CSS, JavaScript, and React.
            <br />
            We focus on responsive design and  <br/>
            implementing interactive elements.<br/>
            We are always pursuing<br/>
            innovation and growing.
          </p>
          <p className='page3_tx_kor'>
          안녕하세요, 프론트엔드 개발자 김창현입니다.<br/>
          HTML, CSS, JavaScript, React로 사용자 중심 웹 경험을 개발하며,
            <br />
            반응형 디자인과 인터랙티브 요소 구현에 주력하고 있습니다.
            <br />
            항상 혁신을 추구하며 성장하고 있습니다.
          </p>
        </div>
          <div 
            data-repetition-ease="power1.inOut"
            data-repetition-duration="0.5"
            data-repetition
            data-repetition-elems="5"
            data-repetition-initial-scale="1.05"
            data-repetition-stagger="-0.15"
            className="page3_warp_profile image image--style-1"
            ref={profileRef}
            alt="se"
          >
            {[...Array(5)].map((_, i) => (
              <div key={i} className="image__element" style={{ backgroundImage: `url(${se})` }} />
            ))}
          </div>
          <div className="page3_swiper_tx_box">
      <h2>
        I am{' '}
        <span>
          {/* Swiper 슬라이더 추가 */}
          <div className="swiper-container">
            <div className="swiper-wrapper">
              <div className="swiper-slide">Front-end Developer</div>
              <div className="swiper-slide">Publisher</div>
              <div className="swiper-slide">Designer</div>
            </div>
          </div>
          <div className="page3_swiper_btn">
            <button>
              <span className="material-symbols-rounded">east</span>
              <span className="material-symbols-rounded">east</span>
            </button>
          </div>
        </span>
      </h2>
    </div>
        </div>
      </section>
      <div id="page4"></div>
      <div id="page5"></div>
    </div>
  );
};

export default Home;
