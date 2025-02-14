import React, { useEffect, useRef,useState } from 'react';
import { Home_main_back,Home_main_back_poster, Home_main_back2, se, insta_white_ic, notion_white_ic, github_white_ic, camfine_sum, move_sum, match_sum, samsung_sum,samsung_sum_hori, sandbox_sum, move_logo_white, cam_logo_white, sam_logo_white, match_logo_white, sandbox_logo_white, rotate_txt,grab_ic,page9_back,photoshop_ic,illust_ic,indesign_ic,powerpoint_ic,excel_ic,xd_ic,figma_ic,html_ic,css_ic,scss_ic,tailwind_ic,bootstrap_ic,javaScript_ic,jquery_ic,vue_ic,react_ic,page11_back,number_qr } from '../components/Image';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { TextPlugin } from 'gsap/TextPlugin';
import './Home.scss';
import { Link } from 'react-router-dom';
import Matter from 'matter-js';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import {
  faGithub,faInstagram,
  faNeos
} from "@fortawesome/free-brands-svg-icons";
import '../components/Responsive_home.scss';
import { faMobile } from '@fortawesome/free-solid-svg-icons';
import Page11_inner_rt_box from '../components/Page11_inner_rt_box';
import Page5_inner from '../components/Page5_inner';
import Page3_warp_profile2 from '../components/Page3_warp_profile2';

const skill_box = {
  Available_skill_tx: [
    'Photoshop', 'Illustrator', 'InDesign', 'Powerpoint', 'Excel', 'Adobe XD', 'Figma', 'Html', 'Css', 'Scss', 'Tailwind Css', 'Bootstrap', 'Javascript', 'Jquery', 'Vue', 'React'
  ],
  Available_skill_ic: [
    photoshop_ic, illust_ic, indesign_ic, powerpoint_ic, excel_ic, xd_ic, figma_ic, html_ic, css_ic, scss_ic, tailwind_ic, bootstrap_ic, javaScript_ic, jquery_ic, vue_ic, react_ic
  ]
};

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
  const profileRef = useRef(null);
  const textRef = useRef(null);
  const page5Ref = useRef(null);
  const page7Ref = useRef(null);
  const page9BoxRefs = useRef([])
  const page11BoxRefs = useRef([]);
  const [isVisible, setIsVisible] = useState(false);
  const [firstHalfSkills, setFirstHalfSkills] = useState([]);
  const [secondHalfSkills, setSecondHalfSkills] = useState([]);
  const [thirdHalfSkills, setThirdHalfSkills] = useState([]);
  const [fourthHalfSkills, setFourthHalfSkills] = useState([]);
  const [firstHalfText, setFirstHalfText] = useState([]);
  const [secondHalfText, setSecondHalfText] = useState([]);
  const [thirdHalfText, setThirdHalfText] = useState([]);
  const [fourthHalfText, setFourthHalfText] = useState([]);
  const [isPortrait, setIsPortrait] = useState(false);

  useEffect(() => {

   // User Agent를 감지하는 함수
  function isKakaoTalk() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // User Agent에 "KAKAOTALK"라는 문자열이 포함되어 있으면 카카오톡 브라우저로 감지
    return /KAKAOTALK/i.test(userAgent);
  }

  // 카카오톡에서 접속했는지 확인
  if (isKakaoTalk()) {
    alert("카카오톡을 통해 접속하셨네요.\n이 포트폴리오는 동적 요소와 화면 고정 기능을 포함하고 있어,\n보다 원활한 사용을 위해 크롬이나 사파리 같은 다른 브라우저에서 접속하시는 것을 권장드립니다.");
  }

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

    if (window.Swiper) {
      const swiper = new window.Swiper('.swiper-container2', {
        slidesPerView: 1, // 한 번에 보이는 슬라이드 수
        spaceBetween: 0,  // 슬라이드 간격을 0으로 설정
        navigation: {
          nextEl: '.swiper-button-next2',
          prevEl: '.swiper-button-prev2',
        },
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,  // 상호작용해도 자동 재생이 멈추지 않음
        },
        effect: 'coverflow',
        coverflowEffect: {
          rotate: 50, // 슬라이드 회전 각도
          stretch: 0, // 슬라이드 간 거리
          depth: 100, // 슬라이드 깊이
          modifier: 1, // 효과 강도
          slideShadows: true // 슬라이드 그림자
        },
      });
    
      // 사용자가 클릭하면 자동 재생 타이머를 다시 시작
      const restartAutoplay = () => {
        swiper.autoplay.stop();  // 일시적으로 멈추고
        swiper.autoplay.start(); // 자동 재생을 다시 시작
      };
    
      document.querySelector('.swiper-button-next2').addEventListener('click', restartAutoplay);
      document.querySelector('.swiper-button-prev2').addEventListener('click', restartAutoplay);
    }

    initializeScrollTrigger();
    animateHeaders();
    animateMainWarp();
    animateScrollDownSVG();
    handleScrollEffects();
    animateDownBoxText();
    splitTextAndAnimate();
    splitTextIntoSpans();
    createProfileHoverAnimation();
    updateSkills();
    window.addEventListener('resize', updateSkills);
    checkScreenMode();
    

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
    // 메인 픽스드
    ScrollTrigger.create({
      trigger: mainRef.current,
      start: 'top+=1 top',
      endTrigger: '#page2',
      end: '50% top',
      pin: mainRef.current,
      pinSpacing: false,
      onEnter: () => gsap.set(mainRef.current, { position: 'fixed', top: 0,width : '100vw' }),
      onLeave: () => gsap.set(mainRef.current, { position: 'relative', clearProps: 'top' }),
      onEnterBack: () => gsap.set(mainRef.current, { position: 'fixed', top: 0,width : '100vw' }),
      onLeaveBack: () => gsap.set(mainRef.current, { position: 'relative', clearProps: 'top' }),
    });

    // 페이지3 픽스드
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
    // 페이지5 픽스드
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
  // 페이지7 픽스드
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

  
const updateSkills = () => {
  if (window.innerWidth <= 768) {
    // 768px 이하에서는 4개씩 슬라이싱
    setFirstHalfSkills(skill_box.Available_skill_ic.slice(0, 4));
    setSecondHalfSkills(skill_box.Available_skill_ic.slice(4, 8));
    setThirdHalfSkills(skill_box.Available_skill_ic.slice(8, 12));
    setFourthHalfSkills(skill_box.Available_skill_ic.slice(12, 16));

    setFirstHalfText(skill_box.Available_skill_tx.slice(0, 4));
    setSecondHalfText(skill_box.Available_skill_tx.slice(4, 8));
    setThirdHalfText(skill_box.Available_skill_tx.slice(8, 12));
    setFourthHalfText(skill_box.Available_skill_tx.slice(12, 16));
  } else {
    // 768px 이상에서는 6개씩 슬라이싱
    setFirstHalfSkills(skill_box.Available_skill_ic.slice(0, 6));
    setSecondHalfSkills(skill_box.Available_skill_ic.slice(6, 12));
    setThirdHalfSkills(skill_box.Available_skill_ic.slice(12, 18));
    setFourthHalfSkills(skill_box.Available_skill_ic.slice(18, 24));

    setFirstHalfText(skill_box.Available_skill_tx.slice(0, 6));
    setSecondHalfText(skill_box.Available_skill_tx.slice(6, 12));
    setThirdHalfText(skill_box.Available_skill_tx.slice(12, 18));
    setFourthHalfText(skill_box.Available_skill_tx.slice(18, 24));
  }
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
    const mm = gsap.matchMedia();

    // 일반적인 애니메이션 설정
    mm.add("(min-width: 500px) and (orientation: landscape) ", () => {
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
    });
    
    // 768px 이하의 포터블 세로 모드일 때 설정
    mm.add("(max-width: 1100px) and (orientation: portrait)", () => {
      gsap.fromTo(
        page3Ref.current.querySelector('.page3_warp_profile'),
        {
          width: 0,
          height: 0,
          opacity: 0,
        },
        {
          width: '80%',
          height: '30%',
          position :'static',
          opacity: 1,
          duration: 0.5,
          scrollTrigger: {
            trigger: '#page3',
            start: '50% center',
            endTrigger: '#page4',
            end: '10% center',
            scrub: true,
            force3D: true, // 하드웨어 가속 강제,
          },
        }
      );
    });

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
      trigger: '#page6',
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
      delay: index * 0.5, // 각 박스마다 0.5초의 딜레이 추가
      duration: 0.8,
      scrollTrigger: {
        trigger: box, // 각 박스를 트리거로 설정
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    }
  );
});

page11BoxRefs.current.forEach((box, index) => {
  gsap.fromTo(
    box,
    {
      opacity: 0,
      y: 100, // 아래에서 위로 올라오는 애니메이션
    },
    {
      opacity: 1,
      y: 0,
      delay: index * 0.5, // 각 박스마다 0.5초의 딜레이 추가
      duration: 0.8,
      scrollTrigger: {
        trigger: box,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    }
  );
});
  };

  const camfineGit = () => {
    window.open("https://github.com/changhyoun/Camfine", "_blank"); // 새 탭에서 열기
  };

  const toggleVisibility = () => {
    if (window.scrollY > 1) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };
     // 화면 크기와 방향을 감지하는 함수
     const checkScreenMode = () => {
      const isPortraitMode = window.matchMedia('(max-width: 760px) and (orientation: portrait)').matches;
      setIsPortrait(isPortraitMode);
    };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const handleScrollTop = () => {
    gsap.to(window, { scrollTo: { y: 0, autoKill: true }, duration: 1, });
  };
  
  return (
    <div id="Home">
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
      <div className={`scrollTop ${isVisible ? 'visible' : 'hidden'}`} onClick={handleScrollTop}>
        <svg className="icon-svg" viewBox="0 0 100 100">
          <g>
            <circle className="circle" cx="50" cy="50" r="30" />
            <polygon className="diamond" points="50,10 90,50 50,90 10,50" />

          </g>
        </svg>
        <span className="material-symbols-rounded top_arrow">
              keyboard_arrow_up
        </span>
      </div>

      <main id="main" ref={mainRef}>
        <video src={Home_main_back} poster={Home_main_back_poster}
          autoPlay muted playsInline loop 
        >

        </video>
        <video src={Home_main_back2}
        autoPlay muted playsInline loop ref={videoRef2}
        ></video>
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
        <div className="canvas-wrap">
          <canvas ref={canvasRef}/>
        </div>
        <div className="page3_warp" ref={page3TextRef}>
          
        
        <div className="page3_tx">
          <p className='page3_tx_eng'>
            <em>Hello,</em> I am Changhyun Kim,<br className='m_br'/> a front-end developer.
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
          Html, Scss, JavaScript, React를 활용하여<br/>사용자 중심의 웹 경험을 설계하고,<br className='m_br'/>
          반응형 디자인과 인터랙티브 기능<br/>구현에 깊은 전문성을 보유하고 있습니다.<br/>
          항상 혁신을 지향하며 지속적인 성장을 추구하고 있습니다.
          </p>
        </div>
        {
  isPortrait ? (
    <Page3_warp_profile2 />
  ) : (
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
        <Link to={"https://github.com/changhyoun"} target="_blank">
          <img src={github_white_ic} alt="github_white_ic" />
        </Link>
        <Link to={"https://www.instagram.com/chhy02_14?igsh=MWRxYThreTRxNG52bQ%3D%3D&utm_source=qr"} target="_blank">
          <img src={insta_white_ic} alt="insta_white_ic" />
        </Link>
        <Link to={"https://www.notion.so/6681cf5058ad47d88a218527c6df4dc8"} target="_blank">
          <img src={notion_white_ic} alt="notion_white_ic" />
        </Link>
      </div>
      {[...Array(5)].map((_, i) => (
        <div key={i} className="image__element" style={{ backgroundImage: `url(${se})` }} />
      ))}
    </div>
  )
}
          <div className="page3_swiper_tx_box">
      <h2>
        I am{' '}
        <span>
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
      {/* 여백용 */}
      <section id="page4"></section>
      <section id="page5" ref={page5Ref}>
        <Page5_inner/>
      </section>
      {/* 여백용 */}
      <section id="page6">

      </section>
      <section id="page7" ref={page7Ref}>
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
                <span onClick={camfineGit}>
                  <img className='project_github' src={github_white_ic} alt="github_white_ic" />
                </span>
                <article>이미지를 선택해 프로젝트를 살펴보세요.</article>
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
                  <span onClick={camfineGit}>
                    <img className='project_github' src={github_white_ic} alt="github_white_ic" />
                  </span>
                  <article>이미지를 선택해 프로젝트를 살펴보세요.</article>
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
                  Web, mobile web
                </p>
                <span onClick={camfineGit}>
                  <img className='project_github' src={github_white_ic} alt="github_white_ic" />
                </span>
                <article>이미지를 선택해 프로젝트를 살펴보세요.</article>
              </div>
            </Link>
          </div>
          <div className="page7 procject_sum">
            <Link to="/project/move" state={{ ProjectDetail_bg: move_sum }}>
              <img src={move_sum} alt="move_sum" />
              <div className="page7_procjec_sum_inner">
                <img src={move_logo_white} alt="move_logo_white" />
                <h3>Platform.</h3>
                <p>Web, mobile web</p>
                <span
                  onClick={(e) => {
                    e.stopPropagation(); // 이벤트 전파 중단
                    camfineGit();
                  }}
                >
                  <img className="project_github" src={github_white_ic} alt="github_white_ic" />
                </span>
                <article>이미지를 선택해 프로젝트를 살펴보세요.</article>
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
                  Web, mobile web
                </p>
                <span onClick={camfineGit}>
                  <img className='project_github' src={github_white_ic} alt="github_white_ic" />
                </span>
                <article>이미지를 선택해 프로젝트를 살펴보세요.</article>
              </div>
            </Link>
          </div>
        </div>
      </section>
      {/* 여백용 */}
      <section id="page8">

      </section>
      <section id="page9">
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
                        <li>에듀사이버 모바일 강의실 제작<br/>
                        (디자인, 퍼블리싱)</li>
                        <li>비긴코퍼레이션 리뉴얼<br/>홈페이지 제작 <a style={{color : 'white'}} href='https://begin2.imweb.me/' target='_blank'>(https://begin2.imweb.me)</a></li>
                        <li>비긴코퍼레이션 인스타<br/>게시물,스토리 제작</li>
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
                          {/* ( 2023.11 ~ 2024.02 ) */}
                        </li>
                        <li>
                          비긴코퍼레이션<br/>
                          {/* ( 2023.11 ~ 2024.02 ) */}
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
            <div className="page9_box" ref={(el) => (page9BoxRefs.current[3] = el)}>
              <div className="page9_box_inner">
                <div className="page9_box_inner_lt">
                  <h3>
                    Certificate
                  </h3>
                </div>
                <div className="page9_box_inner_rt">
                    <ul className="timeline">
                        <li>
                        웹디자인기능사
                        </li>
                        <li>
                        GTQ포토샵1급
                        </li>
                        <li>
                        GTQ일러스트 1급
                        </li>
                        <li>
                        GTQ인디자인 1급
                        </li>
                        <li>
                        정보기술자격(ITQ)한글파워포인트 A등급
                        </li>
                        <li>
                        GAIQ (Google Analytics Individual Qualification)
                        </li>
                        <li>
                        캘리그라피 1급
                        </li>
                    </ul>
                </div>
              </div>
            </div>
          </div>
         
        </div>
          
      </section>
      <section id="page10">
        <div className="page10_warp">
          <div className="page10_t">
            <h3>Availablea Skills <bdo>사용가능한 스킬</bdo></h3>
            <Link to={"https://www.notion.so/19a473aedb5b802f9af9d82db391383f?pvs=4"} target='_blank'>View Design Showcase ↠</Link>
          </div>
         <div className="page10_bt">
            <div className="swiper-container2">
              <div className="swiper-wrapper">
                <div className="swiper-slide">
                  {/* 첫 번째 skills_row */}
                  <div className="skills_row">
                    {firstHalfSkills.map((icon, index) => (
                      <div key={index} className="skill_box">
                        <img src={icon} alt={`${firstHalfText[index]} Icon`} className="skill_icon" />
                        <p>{firstHalfText[index]}</p>
                      </div>
                    ))}
                  </div>
                  {/* 두 번째 skills_row */}
                  <div className="skills_row">
                    {secondHalfSkills.map((icon, index) => (
                      <div key={index} className="skill_box">
                        <img src={icon} alt={`${secondHalfText[index]} Icon`} className="skill_icon" />
                        <p>{secondHalfText[index]}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="swiper-slide">
                  {/* 세 번째 skills_row */}
                  <div className="skills_row">
                    {thirdHalfSkills.map((icon, index) => (
                      <div key={index} className="skill_box">
                        <img src={icon} alt={`${thirdHalfText[index]} Icon`} className="skill_icon" />
                        <p>{thirdHalfText[index]}</p>
                      </div>
                    ))}
                  </div>
                  {/* 네 번째 skills_row */}
                  <div className="skills_row">
                    {fourthHalfSkills.map((icon, index) => (
                      <div key={index} className="skill_box">
                        <img src={icon} alt={`${fourthHalfText[index]} Icon`} className="skill_icon" />
                        <p>{fourthHalfText[index]}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
                  
              {/* Swiper 내비게이션 버튼 */}
              <div className="swiper2_arrow_warp">
                <div className="swiper-button-prev2">
                  <span className="material-symbols-rounded">
                    line_start_arrow_notch
                  </span>
                </div>
                <div className="swiper-button-next2">
                  <span className="material-symbols-rounded">
                    line_end_arrow_notch
                  </span>
                </div>
              </div>
          </div>
        </div>
      </section>
      <section id="page11">
        <div className="page11_inner">
          <img src={page11_back} alt="page11_back" />
          <div className="page11_in">
            <div className="page11_inner_lt" ref={(el) => (page11BoxRefs.current[0] = el)}>
              <div className="page11_inner_lt_box">
                <div className="page11_inner_lt_box_t">
                  <h2>Contact Info.</h2>
                  <div className="Contact_box1">
                    <div className="Contact_box1_lt">
                      <FontAwesomeIcon icon={faEnvelope} />
                    </div>
                    <div className="Contact_box1_rt">
                      <a href="mailto:llh94367@naver.com">
                        <h3>Mail To -</h3>
                        <p>llh94367@naver.com</p>
                      </a>
                    </div>
                  </div>
                  <div className="Contact_box2">
                    <div className="Contact_box2_lt">
                      <div className="Contact_box2_lt">
                        <FontAwesomeIcon icon={faMobile} />
                      </div>
                    </div>
                    <div className="Contact_box2_rt">
                      <a href="tel:010-6636-5780">
                        <h3>call To -</h3>
                        <p>010.6636-5780</p>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="page11_inner_lt_box_bt">
                  <div className="page11_inner_lt_box_bt_t">
                    <h2>social Info.</h2>
                  </div>
                  <div className="page11_inner_lt_box_bt_bt">
                    <Link to={'https://github.com/changhyoun'} target='_blank' className="social_box">
                      <FontAwesomeIcon icon={faGithub} />
                    </Link>
                    <Link to={'https://www.notion.so/6681cf5058ad47d88a218527c6df4dc8'} target='_blank' className="social_box">
                      <FontAwesomeIcon icon={faNeos} />
                    </Link>
                  
                    <Link to={'https://www.instagram.com/chhy02_14/?igsh=MWRxYThreTRxNG52bQ%3D%3D&utm_source=qr'} target='_blank' className="social_box">
                      <FontAwesomeIcon icon={faInstagram} />
                    </Link>
                    
                  </div>
                </div>
              </div>
            </div>
            <div className="page11_inner_rt" ref={(el) => (page11BoxRefs.current[1] = el)}>
                <Page11_inner_rt_box/>
            </div>
          </div>
        </div>
      </section>
      {/* qr 코드*/}
      <section id="page12">
        <div className="page12_inner">
          <img src={number_qr} alt="number_qr" />
        </div>
      </section>
      <Footer/>
    </div>
  );
};

export default Home;
