import './Footer.scss';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {

  // 텍스트를 개별 글자로 나누는 함수
  const splitTextIntoSpans = (text) => {
    return text.split("").map((char, index) => (
      <sub key={index} className="char">{char}</sub>
    ));
  };

  useEffect(() => {
    // 타임라인을 사용해 Footer_t_lt와 Footer_t_rt 텍스트를 동시에 애니메이션
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#Footer',
        start: 'top bottom',
        toggleActions: 'play none none reverse'
      }
    });

    // Footer_t_lt 텍스트 애니메이션
    tl.fromTo('.Footer_t_lt .char', 
      { opacity: 0, x: -20 }, // 초기 상태
      { 
        opacity: 1, 
        x: 0,
        delay : 0.5,
        duration: 1, 
        ease: 'power2.out', 
        stagger: 0.01 // 글자가 순차적으로 나타나게 하는 딜레이
      }
    );

    // Footer_t_rt 텍스트 애니메이션 - 같은 타임라인에 추가
    tl.fromTo('.Footer_t_rt .char', 
      { opacity: 0, x: -20 }, // 초기 상태
      { 
        opacity: 1, 
        x: 0, 
        duration: 1, 
        ease: 'power2.out', 
        stagger: 0.01 // 글자가 순차적으로 나타나게 하는 딜레이
      }, "-=1" // 이전 애니메이션과 동시에 시작
    );

     // Footer_t 애니메이션
     gsap.fromTo('.Footer_t', 
        { y: -100, opacity: 0 }, // 초기 위치 및 투명도
        {
          y: 0, 
          opacity: 1, 
          duration: 1, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#Footer',
            start: 'top bottom', // 스크롤 트리거 시작 지점
            toggleActions: 'play none none reverse' // 애니메이션 재생 및 종료 시 동작
          }
        }
      );

    // Footer_bt 애니메이션
    gsap.fromTo('.Footer_bt', 
      { y: -100, opacity: 0 }, // 초기 위치 및 투명도
      {
        y: 0, 
        opacity: 1, 
        duration: 1, 
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#Footer',
          start: 'top bottom', // 스크롤 트리거 시작 지점
          toggleActions: 'play none none reverse' // 애니메이션 재생 및 종료 시 동작
        }
      }
    );
  }, []);

  return (
    <div id='Footer'>
      <div className='Footer_inner'>
        <div className="Footer_t">
            <div className="Footer_t_lt">
                <span>{splitTextIntoSpans("End 2024.")}</span>
                <h2>
                  {splitTextIntoSpans("º The possibilities are endless.")}<br/>
                  {splitTextIntoSpans("We are looking forward to")}<br/>
                  {splitTextIntoSpans("that possibility together !")}
                </h2>
                <p>{splitTextIntoSpans("끝없는 가능성을 함께 실현해나가길 고대합니다.")}</p>
            </div>
            <div className="Footer_t_rt">
                <div className="Footer_t_rt_t">
                    <span>{splitTextIntoSpans("Project.")}</span>
                    <ul>
                        <li>
                          <Link to={"/project/camfine"}>
                            {splitTextIntoSpans("Camfine")}
                          </Link>
                            &nbsp;&nbsp;
                          <Link to={'/project/match'}>
                            {splitTextIntoSpans("Match_Point")}
                          </Link>
                        </li>
                        <li>
                          <Link to={'/project/sandbox'}>
                            {splitTextIntoSpans("Code Sandbox")}
                          </Link>
                          &nbsp;&nbsp;
                          <Link to={'/project/move'}>
                          {splitTextIntoSpans("Move")}
                          </Link>
                        </li>
                        <li>
                            <Link to={'/project/samsung'}>
                                {splitTextIntoSpans("Samsung Electro-Mechanics")}
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="Footer_t_rt_bt">
                    <p>{splitTextIntoSpans("ⓒ 2024 Kim chang hyoun. All rights reserved.")}</p>
                </div>
            </div>
        </div>
        <div className="Footer_bt">
            <h1>Portfolio.</h1>
        </div>
      </div>
    </div>
  );
};

export default Footer;
