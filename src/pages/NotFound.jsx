import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { gsap } from 'gsap';
import './NotFound.scss';
import '../components/Responsive_notFound.scss';
import '../components/Responsive_home.scss';
import { error_404_ic } from '../components/Image';
import { Link } from 'react-router-dom';



const NotFound = () => {
  useEffect(() => {
    // li 요소들을 선택
    const listItems = document.querySelectorAll('.NotFound_inner li');

    // GSAP 타임라인 생성 (반복)
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 3 }); // 1.5초 대기 후 반복

    // 모든 span들을 모아두는 배열
    const allSpans = [];

    // 타이핑 애니메이션 처리
    listItems.forEach((li, index) => {
      const strong = li.querySelector('strong');  // strong 요소만 따로 선택
      const textNodes = Array.from(li.childNodes).filter(node => node.nodeType === Node.TEXT_NODE);

      // 전체 텍스트를 opacity: 0으로 숨기고, strong만 opacity: 1로 나타냄
      gsap.set(li, { opacity: 1 });  // li 자체는 보이지만 span은 숨김
      gsap.set(strong, { opacity: 1 });  // strong 텍스트는 항상 보이도록 설정

      // 타이핑 애니메이션을 위한 textNode 처리
      textNodes.forEach((textNode) => {
        const words = textNode.textContent.split('').reverse();  // 각 문자를 배열로 분리
        textNode.textContent = '';  // 텍스트를 일단 지움

        // 각 문자에 span을 감싸서 opacity 제어
        words.forEach((letter, letterIndex) => {
          const span = document.createElement('span');
          span.textContent = letter;
          span.style.opacity = 0;  // 처음엔 숨겨진 상태
          textNode.parentNode.insertBefore(span, textNode.nextSibling);

          // 일반 텍스트는 숨긴 상태로 span을 생성하여 추가
          tl.to(span, { opacity: 1, duration: 0.05, ease: 'power1.inOut' }, index * 1 + letterIndex * 0.02);

          // span들을 모아둠 (나중에 한꺼번에 처리하기 위해)
          allSpans.push(span);
        });
      });
    });

    // 모든 타이핑 애니메이션이 완료된 후 0.5초 대기하고, 아래에서 위로 opacity 0으로 전환 (스무스하게)
    tl.add(() => {
      gsap.to(allSpans.reverse(), { 
        opacity: 0, 
        duration: 0.1,  // 사라지는 시간을 더 길게 설정하여 부드럽게 처리
        ease: 'power1.inOut',  // 부드럽게 사라짐
        stagger: 0.02  // 각 span들이 순차적으로 사라짐
      });
    }, `+=0.5`);  // 타이핑 완료 후 0.5초 대기
  }, []);

  return (
    <>
      <div id="NotFound">
        <Header />
        <div className="NotFound_inner">
          <ul>
            <li><strong>THIS</strong> PAGE WAS NOT FOUND</li>
            <li>THIS PAGE <strong>WAS</strong> NOT FOUND</li>
            <li>THIS <strong>PAGE</strong> WAS NOT FOUND</li>
            <li>THIS PAGE WAS NOT FOUND</li>
            <li>THIS PAGE WAS NOT <strong>FOUND</strong></li>
            <li>THIS PAGE WAS <strong>NOT</strong> FOUND</li>
          </ul>
          <div className="NotFound_txbox">
            <img src={error_404_ic} alt="error_404_ic" />
            <p>페이지가 없는거같네요.</p>
            <Link to={"/"}>
              <button>
                  Go Home
                  <span className="material-symbols-rounded">
                    chevron_right
                  </span>
              </button>
            </Link>
          </div>
        </div> 
        <div className="rt_back_gra"></div>
        <div className="lt_back_gra"></div>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;
