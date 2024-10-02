import React, { useEffect, useRef,useState } from 'react';

const page3_warp = () => {
    const page3TextRef = useRef(null);
    const profileRef = useRef(null);
  return (
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
  )
}

export default page3_warp