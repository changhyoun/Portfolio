import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../pages/Home.scss';
import Page5_bt_lt_inner_tx from './Page5_bt_lt_inner_tx';
import { samsung_sum, sam_logo_white, rotate_txt, camfine_sum, cam_logo_white, match_sum, match_logo_white, sandbox_sum, sandbox_logo_white, move_sum, move_logo_white } from './Image';

gsap.registerPlugin(ScrollTrigger);

const Page5_inner = () => {
  useEffect(() => {
    // 커서 원형 요소 생성
    const cursor = document.createElement('div');
    cursor.classList.add('cursor-circle');
    document.body.appendChild(cursor);

    // 모든 .page5_inner .box에 이벤트 리스너 추가
    const boxes = document.querySelectorAll('.page5_inner .box:not(.ani)');

    boxes.forEach((box) => {
      box.addEventListener('mousemove', (e) => {
        const rect = box.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // 커서 원을 마우스 위치에 따라 이동
        cursor.style.top = `${e.clientY}px`;
        cursor.style.left = `${e.clientX}px`;
        cursor.style.display = 'block'; // 커서 보이기

        // box 내부에서 커서가 위치한 부분만 반전 효과 적용
        box.style.setProperty('--x', `${x}px`);
        box.style.setProperty('--y', `${y}px`);
        box.classList.add('invert-active'); // 반전 활성화 클래스 추가
      });

      box.addEventListener('mouseleave', () => {
        box.classList.remove('invert-active');  // 반전 해제
        cursor.style.display = 'none';  // 커서 숨기기
      });

      box.addEventListener('mouseenter', () => {
        cursor.style.display = 'block';  // 커서 보이기
      });
    });

    // ScrollTrigger를 사용하여 #page6 이상으로 스크롤하면 .box.cam의 커서를 변경
    ScrollTrigger.create({
      trigger: '#page6', // #page6에서 트리거
      start: 'top 80%', // #page6이 화면의 90%에 도달했을 때 시작
      onEnter: () => {
        // .box.cam 요소의 커서를 기본 커서로 변경
        const camBox = document.querySelector('.box.cam');
        if (camBox) {
          camBox.style.cursor = 'default'; // 기본 커서로 설정
          camBox.classList.remove('invert-active'); // 반전 해제
        
          camBox.addEventListener('mousemove', () => {
            camBox.classList.remove('invert-active'); // 마우스 움직일 때 클래스 제거
          });
      
        }
      },
      onLeaveBack: () => {
        // 스크롤이 다시 위로 올라갔을 때 커서 원래대로 복구
        const camBox = document.querySelector('.box.cam');
          camBox.style.cursor = 'default'; // 커서 숨기기 또는 원래 스타일 복구
      }
    });

    return () => {
      cursor.remove();  // 컴포넌트 언마운트 시 커서 제거
    };
  }, []);

  return (
    <div className="page5_inner">
      <div className="page5_t">
        <div className="page5_t_lt">
          <div className="page5_t_lt_inner">
            <div className="box sam">
              <img className="section5_sum" src={samsung_sum} alt="samsung_sum" />
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
                <span className="material-symbols-rounded">arrow_right_alt</span>
              </div>
            </div>
            <div className="box cam">
              <img className="section5_sum" src={camfine_sum} alt="camfine_sum" />
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
                    <linearGradient id="gradientStroke" x1="0%" y1="0%" x2="100%">
                      <stop offset="0%" style={{ stopColor: '#292979', stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: '#232389', stopOpacity: 1 }} />
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
                      HTML, SCSS, JAVASCRIPT, REACT
                      <animate attributeName="startOffset" from="0%" to="100%" begin="6s" dur="12s" repeatCount="indefinite" />
                    </textPath>
                  </text>
                </svg>
              </a>
            </div>
            <div className="box match">
              <img className="section5_sum" src={match_sum} alt="match_sum" />
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
        <Page5_bt_lt_inner_tx />
        <div className="page5_bt_rt">
          <div className="page5_bt_rt_inner">
            <div className="box code">
              <img className="section5_sum" src={sandbox_sum} alt="sandbox_sum" />
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
              <img className="section5_sum" src={move_sum} alt="move_sum" />
              <div className="dark_overlay"></div>
              <div className="box_inner move_inner">
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
  );
};

export default Page5_inner;
