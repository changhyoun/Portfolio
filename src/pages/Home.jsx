import React, { useEffect, useRef } from 'react';
import { Home_main_back, Home_main_back2, se, insta_white_ic, notion_white_ic, github_white_ic, camfine_sum, move_sum, match_sum, samsung_sum,samsung_sum_hori, sandbox_sum, move_logo_white, cam_logo_white, sam_logo_white, match_logo_white, sandbox_logo_white, rotate_txt,grab_ic,page9_back,photoshop_ic,illust_ic,indesign_ic,powerpoint_ic,excel_ic,xd_ic,figma_ic,html_ic,css_ic,scss_ic,tailwind_ic,bootstrap_ic,javaScript_ic,jquery_ic,vue_ic,react_ic } from '../components/Image';
import Header from '../components/Header';
import Page5_bt_lt_inner_tx from '../components/Page5_bt_lt_inner_tx';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { TextPlugin } from 'gsap/TextPlugin';
import './Home.scss';
import { Link } from 'react-router-dom';
import Matter from 'matter-js';
import '../components/Responsive_home.scss';



const skill_box = {
  Available_skill_tx: [
    'Photoshop', 'Illustrator', 'InDesign', 'Powerpoint', 'Excel', 'Adobe XD', 'Figma', 'Html', 'Css', 'Scss', 'Tailwind Css', 'Bootstrap', 'Javascript', 'Jquery', 'Vue', 'React'
  ],
  Available_skill_ic: [
    photoshop_ic, illust_ic, indesign_ic, powerpoint_ic, excel_ic, xd_ic, figma_ic, html_ic, css_ic, scss_ic, tailwind_ic, bootstrap_ic, javaScript_ic, jquery_ic, vue_ic, react_ic
  ]
};

// 스킬 박스 변수
const firstHalfSkills = skill_box.Available_skill_ic.slice(0, 8);
const secondHalfSkills = skill_box.Available_skill_ic.slice(8, 16);
const firstHalfText = skill_box.Available_skill_tx.slice(0, 8);
const secondHalfText = skill_box.Available_skill_tx.slice(8, 16);

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
  const textRef = useRef(null);
  const page5Ref = useRef(null);
  const page7Ref = useRef(null);
  const page9BoxRefs = useRef([])


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
     // Section5 fixed scrolling
  ScrollTrigger.create({
    trigger: '#page5',
    start: 'top top',
    endTrigger: '#page6',
    end: '100% top',
    pin: '#page5',
    pinSpacing: false,
    onEnter: () => gsap.set(page5Ref.current, { position: 'fixed', top: 0 }),
    onLeave: () => gsap.set(page5Ref.current, { position: 'relative', clearProps: 'top' }),
    onEnterBack: () => gsap.set(page5Ref.current, { position: 'fixed', top: 0 }),
    onLeaveBack: () => gsap.set(page5Ref.current, { position: 'relative', clearProps: 'top' }),
  });
  // Section7 fixed scrolling
  ScrollTrigger.create({
    trigger: '#page7',
    start: 'top top',
    endTrigger: '#page8',
    end: '60% top',
    pin: '#page7',
    pinSpacing: false,
    onEnter: () => {
      gsap.set(page5Ref.current, { 
        position: 'fixed', 
        top: 0, 
        zIndex: 10 
      });
    },
    onLeave: () => {
      gsap.set(page5Ref.current, { 
        position: 'relative', 
        clearProps: 'top' 
      });
    },
    onEnterBack: () => {
      gsap.set(page5Ref.current, { 
        position: 'fixed', 
        top: 0, 
        zIndex: 10 
      });
    },
    onLeaveBack: () => {
      gsap.set(page5Ref.current, { 
        position: 'relative', 
        clearProps: 'top' 
      });
    },
    // 스크롤 진행 비율에 따라 애니메이션 적용 및 z-index 설정
    onUpdate: (self) => {
      const progress = self.progress; // 0 ~ 1 사이의 스크롤 진행 비율
      const direction = self.direction; // 스크롤 방향 감지 (1: 아래로, -1: 위로)
  
      // 0.2 ~ 0.4 구간에서는 2번째 div 애니메이션
      if (progress >= 0.2 && progress < 0.4) {
        gsap.to("#Home #page7 > div > div:nth-of-type(2)", {
          top: direction === 1 ? 0 : '100%', // 아래로 스크롤하면 위에서 아래로, 위로 스크롤하면 아래에서 위로
          width: '100%',
          height: '100%',
          zIndex: 10, // z-index 설정
          duration: 0.5,
          ease: "power2.out"
        });
      }
  
      // 0.4 ~ 0.6 구간에서는 3번째 div 애니메이션
      else if (progress >= 0.4 && progress < 0.6) {
        gsap.to("#Home #page7 > div > div:nth-of-type(3)", {
          top: direction === 1 ? 0 : '100%', // 스크롤 방향에 따라 위아래로 이동
          width: '100%',
          height: '100%',
          zIndex: 11,
          duration: 0.5,
          ease: "power2.out"
        });
      }
  
      // 0.6 ~ 0.8 구간에서는 4번째 div 애니메이션
      else if (progress >= 0.6 && progress < 0.8) {
        gsap.to("#Home #page7 > div > div:nth-of-type(4)", {
          top: direction === 1 ? 0 : '100%', // 스크롤 방향에 따라 이동
          width: '100%',
          height: '100%',
          zIndex: 12,
          duration: 0.5,
          ease: "power2.out"
        });
      }
  
      // 0.8 ~ 1 구간에서는 5번째 div 애니메이션
      else if (progress >= 0.8 && progress <= 1) {
        gsap.to("#Home #page7 > div > div:nth-of-type(5)", {
          top: direction === 1 ? 0 : '100%', // 스크롤 방향에 따라 이동
          width: '100%',
          height: '100%',
          zIndex: 13,
          duration: 0.5,
          ease: "power2.out"
        });
      }
  
      // 스크롤이 역방향으로 올라갈 때의 z-index 및 애니메이션 초기화
      if (progress < 0.2) {
        gsap.set("#Home #page7 > div > div:nth-of-type(2)", {
          zIndex: 1, // 초기화
          top: '100%', // 다시 아래로 이동
          width: 0,
          height: 0
        });
      }
  
      if (progress < 0.4) {
        gsap.set("#Home #page7 > div > div:nth-of-type(3)", {
          zIndex: 2, // 초기화
          top: '100%', // 다시 아래로 이동
          width: 0,
          height: 0
        });
      }
  
      if (progress < 0.6) {
        gsap.set("#Home #page7 > div > div:nth-of-type(4)", {
          zIndex: 3, // 초기화
          top: '100%', // 다시 아래로 이동
          width: 0,
          height: 0
        });
      }
  
      if (progress < 0.8) {
        gsap.set("#Home #page7 > div > div:nth-of-type(5)", {
          zIndex: 4, // 초기화
          top: '100%', // 다시 아래로 이동
          width: 0,
          height: 0
        });
      }
    }
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

    gsap.fromTo(
      page3Ref.current.querySelector('.page3_warp_profile'),
      {
        right:0,
        bottom : 0,
      },
      {
        right:0,
        bottom : '10%',
        duration: 0.5,
        scrollTrigger: {
          trigger: '#page3',
          start: '70% center',
          endTrigger: '#page4',
          end: '10% center',
          scrub: true,
        },
      }
    );



// 스크롤 이벤트 리스너 추가
window.addEventListener('scroll', function() {
  const triggerElement = document.querySelector('#page6'); // 스크롤 트리거가 될 요소
  const targetElement = page5Ref.current.querySelector('#Home #page5 > div > div:nth-of-type(1) > div:nth-of-type(1) > div > div:nth-of-type(2)');

  const triggerPosition = triggerElement.getBoundingClientRect().top; // 트리거 요소의 위치 계산
  const windowHeight = window.innerHeight; // 현재 창의 높이

  // 섹션 6이 화면에 나타나면 중앙으로 이동 (CSS로 처리)
  if (triggerPosition < windowHeight * 0.5) { 
    targetElement.style.position = 'absolute';
    targetElement.style.top = '50%';
    targetElement.style.left = '50%';
    targetElement.style.transform = 'translate(-50%, -50%)';
    targetElement.style.zIndex = '10';
    targetElement.style.transition = '0.5s ease';
  } else {
    targetElement.style.position = '';
    targetElement.style.top = '';
    targetElement.style.left = '';
    targetElement.style.transform = '';
    targetElement.style.zIndex = '';
  }
});

// GSAP 애니메이션에서 크기와 위치를 처리
gsap.to(
  page5Ref.current.querySelector('#Home #page5 > div > div:nth-of-type(1) > div:nth-of-type(1) > div > div:nth-of-type(2)'),
  {
    width : '100vw',
    height : '100vh',
    borderRadius : 0,
    duration: 2,
    ease: "none",
    scrollTrigger: {
      trigger: '#page6',  // 애니메이션이 시작될 페이지의 트리거
      start: '10% center',
      end: '70% center',  
      scrub: true,  // 스크롤에 따라 애니메이션이 천천히 실행됨
    }
  }
);

page9BoxRefs.current.forEach((box, index) => {
  gsap.fromTo(
    box,
    {
      opacity: 0,
      y: 50, // 아래에서 위로 올라오는 애니메이션
    },
    {
      opacity: 1,
      y: 0,
      delay: index * 0.5, // 각 박스마다 0.3초의 딜레이 추가
      duration: 0.8,
      scrollTrigger: {
        trigger: box, // 각 박스를 트리거로 설정
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    }
  );
});

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
          Html, Scss, JavaScript, React를 활용하여<br/>사용자 중심의 웹 경험을 설계하고,
          반응형 디자인과 인터랙티브 기능<br/>구현에 깊은 전문성을 보유하고 있습니다.<br/>
          항상 혁신을 지향하며 지속적인 성장을 추구하고 있습니다.
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
            <div className="page3_warp_profile_ic_box">
                <Link to={"https://github.com/changhyoun"} target='_blank'>
                  <img src={github_white_ic} alt="github_white_ic" />
                </Link>
                <Link to={"https://www.instagram.com/chhy02_14?igsh=MWRxYThreTRxNG52bQ%3D%3D&utm_source=qr"} target='_blank'>
                  <img src={insta_white_ic} alt="insta_white_ic" />
                </Link>
                <Link to={"https://www.notion.so/6681cf5058ad47d88a218527c6df4dc8"} target='_blank'>
                  <img src={notion_white_ic} alt="notion_white_ic" />
                </Link>
            </div>
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
      <div id="page5" ref={page5Ref}>
        <div className="page5_inner">
          <div className="page5_t">
              <div className="page5_t_lt">
                <div className="page5_t_lt_inner">
                  <div className="box sam">
                    <img className='section5_sum' src={samsung_sum} alt="samsung_sum" />
                    <div className="dark_overlay"></div>
                    <div className="box_inner sam_inner">
                      <div className="lo_name">
                        <img src={sam_logo_white} alt="sam_logo_white" />
                        <h3>삼성전기.</h3>
                      </div>
                      <div className="cr_date">
                        <h3>Created date</h3>
                        <p>2024.02.11</p>
                      </div>
                        
                    </div>
                    <div className="rotate_tx_box">
                      <img src={rotate_txt} alt="rotate_txt" />
                      <span className="material-symbols-rounded">
                        arrow_right_alt
                      </span>
                    </div>
                  </div>
                  <div className="box cam">
                    <img className='section5_sum' src={camfine_sum} alt="camfine_sum" />
                    <div className="dark_overlay"></div>
                    <div className="box_inner sum_inner">
                      <div className="lo_name">
                        <img src={cam_logo_white} alt="cam_logo_white" />
                        <h3>CamFine.</h3>
                      </div>
                      <div className="cr_date">
                        <h3>Created date</h3>
                        <p>2024.09.12</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="page5_t_rt">
                <div className="page5_t_rt_inner">
                  <div className="box ani">
                    <a className="box box--2">
                      <svg className="box__background" viewBox="0 0 1200 1200" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <linearGradient id="gradientStroke" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" style={{ stopColor: "#292979", stopOpacity: 1 }} />
                            <stop offset="100%" style={{ stopColor: "#232389", stopOpacity: 1 }} />
                          </linearGradient>
                        </defs>
                        <path
                          id="line1"
                          d="M100 21.5L100 190.5C100 212.591 150 230.5 180 230.5L517.5 230.5C539.592 230.5 557.5 248.409 557.5 270.5L557.5 275.5C557.5 297.591 575.409 315.5 597.5 315.5L1200 315.5"
                          stroke="url(#gradientStroke)"
                          strokeWidth="60"
                          strokeLinecap="round"
                        />
                        <path
                          id="line2"
                          d="M0 451L226 451C248.091 451 266 468.909 266 491L266 530C266 552.091 283.908 570 306 570L800 570C822 570 840 587.909 840 610L840 1000"
                          stroke="url(#gradientStroke)"
                          strokeWidth="60"
                          strokeLinecap="round"
                        />
                        <text fill="#111">
                          <textPath startOffset="0%" textAnchor="middle" alignmentBaseline="central" xlinkHref="#line1">
                            Changhyun Kim
                            <animate attributeName="startOffset" from="0%" to="100%" begin="0s" dur="12s" repeatCount="indefinite" />
                          </textPath>
                        </text>
                        <text fill="#111">
                          <textPath startOffset="0%" textAnchor="middle" alignmentBaseline="central" xlinkHref="#line1">
                          Front-End Developer
                            <animate attributeName="startOffset" from="0%" to="100%" begin="6s" dur="12s" repeatCount="indefinite" />
                          </textPath>
                        </text>

                        <text fill="#111">
                          <textPath startOffset="0%" textAnchor="middle" alignmentBaseline="central" xlinkHref="#line2">
                          Study TypeScript, ReactNative
                            <animate attributeName="startOffset" from="0%" to="100%" begin="0s" dur="12s" repeatCount="indefinite" />
                          </textPath>
                        </text>
                        <text fill="#111">
                          <textPath startOffset="0%" textAnchor="middle" alignmentBaseline="central" xlinkHref="#line2">
                            HTML,SCSS,JAVASCRIPT,REACT
                            <animate attributeName="startOffset" from="0%" to="100%" begin="6s" dur="12s" repeatCount="indefinite" />
                          </textPath>
                        </text>
                      </svg>
                    </a>
                  </div>
                  <div className="box match">
                    <img className='section5_sum' src={match_sum} alt="match_sum" />
                    <div className="dark_overlay"></div>
                    <div className="box_inner match_inner">
                      <div className="lo_name">
                        <img src={match_logo_white} alt="match_logo_white" />
                        <h3>Match_point.</h3>
                      </div>
                      <div className="cr_date">
                        <h3>Created date</h3>
                        <p>2024.09.12</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>
          <div className="page5_bt"> 
              {/* page5_bt_lt_inner */}
              <Page5_bt_lt_inner_tx/>
            <div className="page5_bt_rt">
              <div className="page5_bt_rt_inner">
                <div className="box code">
                  <img className='section5_sum' src={sandbox_sum} alt="sandbox_sum" />
                  <div className="dark_overlay"></div>
                  <div className="box_inner sandbox_inner">
                      <div className="lo_name">
                        <img src={sandbox_logo_white} alt="sandbox_logo_white" />
                        <h3>코드 샌드박스.</h3>
                      </div>
                      <div className="cr_date">
                        <h3>Created date</h3>
                        <p>2024.09.12</p>
                      </div>
                  </div>
                </div>
                <div className="box move">
                  <img className='section5_sum' src={move_sum} alt="camfine_sum" />
                  <div className="dark_overlay"></div>
                  <div className="box_inner camfine_inner">
                      <div className="lo_name">
                        <img src={move_logo_white} alt="move_logo_white" />
                        <h3>무브.</h3>
                      </div>
                      <div className="cr_date">
                        <h3>Created date</h3>
                        <p>2024.09.12</p>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="page6">

      </div>
      <div id="page7" ref={page7Ref}>
        <div className="page7_inner">
          <div className="page7_procject_sum">
            <Link to="/project/camfine" state={{ ProjectDetail_bg: camfine_sum }}>
              <img src={camfine_sum} alt="camfine_sum" />
              <div className="page7_procjec_sum_inner">
                <img src={cam_logo_white} alt="cam_logo_white" />
                <h3>
                  Platform.
                </h3>
                <p>
                  App, Mobile Web
                </p>
                {/* 해당되는 깃허브 페이지로 이동되게해야됨 */}
                <span>
                  <img className='project_github' src={github_white_ic} alt="github_white_ic" />
                </span>
              </div>
            </Link>
          </div>
          <div className="page7 procject_sum">
            <Link to="/project/match" state={{ ProjectDetail_bg: match_sum }}>
              <img src={match_sum} alt="match_sum" />
              <div className="page7_procjec_sum_inner">
                <img src={match_logo_white} alt="match_logo_white" />
                  <h3>
                    Platform.
                  </h3>
                  <p>
                    App, Mobile Web
                  </p>
                  <span>
                    <img className='project_github' src={github_white_ic} alt="github_white_ic" />
                  </span>
                </div>
            </Link>
          </div>
          <div className="page7 procject_sum">
            <Link to="/project/sandbox" state={{ ProjectDetail_bg: sandbox_sum }}>
              <img src={sandbox_sum} alt="sandbox_sum" />
              <div className="page7_procjec_sum_inner">
                <img src={sandbox_logo_white} alt="sandbox_logo_white" />
                <h3>
                  Platform.
                </h3>
                <p>
                  Web
                </p>
                <span>
                  <img className='project_github' src={github_white_ic} alt="github_white_ic" />
                </span>
              </div>
            </Link>
          </div>
          <div className="page7 procject_sum">
            <Link to="/project/move" state={{ ProjectDetail_bg: move_sum }}>
              <img src={move_sum} alt="move_sum" />
              <div className="page7_procjec_sum_inner">
                <img src={move_logo_white} alt="move_logo_white" />
                <h3>
                  Platform.
                </h3>
                <p>
                  Web
                </p>
                <span>
                  <img className='project_github' src={github_white_ic} alt="github_white_ic" />
                </span>
              </div>
            </Link>
          </div>
          <div className="page7 procject_sum">
            <Link to="/project/samsung" state={{ ProjectDetail_bg: samsung_sum_hori }}>
              <img src={samsung_sum_hori} alt="samsung_sum_hori" />
              <div className="page7_procjec_sum_inner">
                <img src={sam_logo_white} alt="sam_logo_white" />
                <h3>
                  Platform.
                </h3>
                <p>
                  Web
                </p>
                <span>
                  <img className='project_github' src={github_white_ic} alt="github_white_ic" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div id="page8">

      </div>
      <div id="page9">
        <div className="page9_inner">
          <img src={page9_back} alt="page9_back" />
          <div className="page9_in">
            <div className="page9_box" ref={(el) => (page9BoxRefs.current[0] = el)}>
              <div className="page9_box_inner">
                <div className="page9_box_inner_lt">
                  <h3>
                    Work<br/>
                    Histoy
                  </h3>
                </div>
                <div className="page9_box_inner_rt">
                    <ul className="timeline">
                        <li>개인 포트폴리오 제작</li>
                        <li>달뜨리몬당, 소치빌리지<br/>
                        펜션 홈페이지 제작<br/>
                        (퍼블리싱)</li>
                        <li>모바일 강의실 제작<br/>
                        (디자인, 퍼블리싱)</li>
                        <li>그 외 기타.</li>
                    </ul>
                </div>
              </div>
            </div>
           
            <div className="page9_box" ref={(el) => (page9BoxRefs.current[1] = el)}>
              <div className="page9_box_inner">
                <div className="page9_box_inner_lt">
                  <h3>
                    Work<br/>
                    Experience
                  </h3>
                </div>
                <div className="page9_box_inner_rt">
                    <ul className="timeline">
                        <li>
                          에듀사이버 평생교육원<br/>
                          ( 2023.11 ~ 2024.02 )
                        </li>
                    </ul>
                </div>
              </div>
            </div>
            <div className="page9_box" ref={(el) => (page9BoxRefs.current[2] = el)}>
              <div className="page9_box_inner">
                <div className="page9_box_inner_lt">
                  <h3>
                      Education
                  </h3>
                </div>
                <div className="page9_box_inner_rt">
                    <ul className="timeline">
                        <li>
                        충남기계공업고등학교<br/>
                        ( 2017.03 ~ 2020.03 )
                        </li>
                    </ul>
                </div>
              </div>
            </div>
          </div>
         
        </div>
          
      </div>
      <div id="page10">
        <div className="page10_warp">
          <div className="page10_t">
          <h3>Availablea Skills <bdo>사용가능한 스킬</bdo></h3>
          <p>scroll Right&nbsp;&nbsp; →
            
          </p>
          </div>
          <div className="page10_bt">
            {/* 첫 번째 div: 1~9까지 */}
            <div className="skills_row">
              {firstHalfSkills.map((icon, index) => (
                <div key={index} className="skill_box">
                  <img src={icon} alt={`${firstHalfText[index]} Icon`} className="skill_icon" />
                  <p>{firstHalfText[index]}</p>
                </div>
              ))}
            </div>
            
            {/* 두 번째 div: 9~16까지 */}
            <div className="skills_row">
              {secondHalfSkills.map((icon, index) => (
                <div key={index} className="skill_box">
                  <img src={icon} alt={`${secondHalfText[index]} Icon`} className="skill_icon" />
                  <p>{secondHalfText[index]}</p>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
      
    </div>
  );
};
// 테스트
export default Home;
