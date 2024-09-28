import React, { useEffect,useRef  } from 'react';
import { useParams, Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import './ProjectDetail.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub
} from "@fortawesome/free-brands-svg-icons";  // faReact는 free-brands-svg-icons에서 가져와야 합니다.

gsap.registerPlugin(TextPlugin);

import { 
  // Move 프로젝트 이미지
  move_sum, 
  move_moc1, move_moc2, move_moc3, move_moc4, move_moc5, move_moc6, move_moc7, move_moc8, move_moc9,

  // Samsung 프로젝트 이미지
  samsung_sum_hori,sam_moc1,sam_moc2,sam_moc3,sam_moc4,sam_moc5,

  // Sandbox 프로젝트 이미지
  sandbox_sum,sand_moc1,sand_moc2,sand_moc3,sand_moc4,sand_moc5,sand_moc6,sand_moc7,

  // 프로젝트 로고
  pr_dt_logo1, pr_dt_logo2, pr_dt_logo3, pr_dt_logo4, pr_dt_logo5,

  // Match 프로젝트 이미지
  match_sum,
  match_mock1, match_mock2, match_mock3, match_mock4, match_mock5, match_mock6, match_mock7, match_mock8, match_mock9, 
  

  // Camfine 프로젝트 이미지
  camfine_sum,
  camfine_mock1, camfine_mock2, camfine_mock3, camfine_mock4, camfine_mock5, camfine_mock6, camfine_mock7, camfine_mock8, 
  
  // 스킬 아이콘
  html_ic,figma_ic,illust_ic,photoshop_ic,scss_ic,react_ic,javaScript_ic,css_ic
} from '../components/Image';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

const projects = [
  { 
    id: 'camfine', 
    name: 'Camfine', 
    logo: pr_dt_logo1, 
    ProjectDetail_warp_center_sc1_h2: 'Camfine', 
    ProjectDetail_warp_center_sc1_p: '캠파인.', 
    slidesPerView: 2,
    images: [camfine_sum,camfine_mock1,camfine_mock2,camfine_mock3,camfine_mock4,camfine_mock5,camfine_mock6,camfine_mock7,camfine_mock8],  
    ProjectDetail_warp_center_sc3_tx_1_box_inner : 'https://changhyoun.github.io/<br/>Camfine',
    ProjectDetail_warp_center_sc3_tx_2_box_inner : "테니스 예약 사이트, 앱",
    ProjectDetail_warp_center_sc3_tx_3_box_inner : "모바일 웹, 앱",
    skill_ic : [photoshop_ic,illust_ic,figma_ic,html_ic,scss_ic,javaScript_ic,react_ic],
    skill_tx : ['photoshop','illust', 'figma','html','scss','javaScript','react'],
    ProjectDetail_warp_center_sc3_tx_5_box_tx :
    `해당 프로젝트 Camfine은 포트폴리오용으로<br/>
    캠핑장 정보 조회 사이트를 제작해봤습니다.<br/>
    이 프로젝트는 전국의 다양한 캠핑장을 탐색하고 일일히 캠핑장을<br/>
    찾아보기 힘든 사용자를 위해 개발되었습니다.<br/>
    Firebase 기반의 회원가입 및 로그인 시스템과<br/>
    공공데이터포털 API를 활용하여 캠핑장 정보를<br/>
    실시간으로 조회하며, 사용자에게 보다 편리한 캠핑장 검색,<br/>
    필터, 위치 정보 조회 등의 기능을 제공합니다.<br/>
    또한, 각 캠핑장 지역의 실시간 날씨 정보와 즐겨찾기 기능을 통해<br/>
    사용자의 캠핑 계획을 보다 효율적으로 지원합니다.`,
    github_url : 'https://github.com/changhyoun/Camfine'
  },
  { 
    id: 'match', 
    name: 'Match', 
    logo: pr_dt_logo2, 
    ProjectDetail_warp_center_sc1_h2: 'Match Point', 
    ProjectDetail_warp_center_sc1_p: '매치포인트.', 
    slidesPerView: 2,
    images: [match_sum,match_mock1, match_mock2, match_mock3,match_mock4,match_mock5,match_mock6,match_mock7,match_mock8,match_mock9],
    ProjectDetail_warp_center_sc3_tx_1_box_inner : 'https://changhyoun.github.io/<br/>Match_Point',
    ProjectDetail_warp_center_sc3_tx_2_box_inner : "테니스 예약 사이트, 앱",
    ProjectDetail_warp_center_sc3_tx_3_box_inner : "모바일 웹, 앱",
    skill_ic : [photoshop_ic,figma_ic,html_ic,scss_ic,javaScript_ic,react_ic],
    skill_tx : ['photoshop', 'figma','html','scss','javaScript','react'],
    ProjectDetail_warp_center_sc3_tx_5_box_tx :
    `해당 프로젝트 Match_Point은 포트폴리오용으로<br/>
    테니스 모바일 웹,앱을 제작했습니다.<br/>
    이 앱은 로컬 스토리지를 활용해 사용자 데이터를 저장하고,<br/>
    날씨 API를 통해 실시간으로 날씨 정보를 제공하여 테니스 코트 예약에<br/>
    참고할 수 있도록 했습니다.<br/>
    또한 카카오 API를 사용해 사용자에게 위치 기반 서비스를 제공하며,<br/>
    EmailJS를 통해 피드백을 받을 수 있는 시스템도 구축했습니다.<br/>
    테니스장 데이터베이스를 활용해 사용자는 회원가입, 로그인 기능을 통해<br/>
    개인 계정을 관리하고, 예약 시스템을 이용해<br/>
    테니스 코트 예약을 손쉽게 할 수 있습니다.`,
    github_url : 'https://github.com/changhyoun/Match_Point'
  },
  { 
    id: 'sandbox', 
    name: 'Sandbox', 
    logo: pr_dt_logo3, 
    ProjectDetail_warp_center_sc1_h2: 'Code Sandbox', 
    ProjectDetail_warp_center_sc1_p: '코드 샌드박스.', 
    slidesPerView: 1,
    images: [sandbox_sum, sand_moc1, sand_moc2, sand_moc3, sand_moc4, sand_moc5, sand_moc6, sand_moc7],  
    ProjectDetail_warp_center_sc3_tx_1_box_inner : 'https://changhyoun.github.io/<br/>CodeSandbox',
    ProjectDetail_warp_center_sc3_tx_2_box_inner : "코드샌드박스 한국 페이지 ",
    ProjectDetail_warp_center_sc3_tx_3_box_inner : "PC, 모바일 웹",
    skill_ic : [figma_ic,html_ic,scss_ic,javaScript_ic,react_ic],
    skill_tx : ['figma','html','scss','javaScript','react'],
    ProjectDetail_warp_center_sc3_tx_5_box_tx :
    `해당 프로젝트는 gsap을 이용한 자연스러은 스크롤 기능,<br/>
    반응형, codesandbox 정보 확인을 할 수 있는<br/>
    Code Sandbox 한국 페이지를 제작했습니다.`,
    github_url : 'https://github.com/changhyoun/CodeSandbox'
  },
  { 
    id: 'move', 
    name: 'Move', 
    logo: pr_dt_logo4, 
    ProjectDetail_warp_center_sc1_h2: 'Move', 
    ProjectDetail_warp_center_sc1_p: '무브.', 
    slidesPerView: 1,
    images: [move_sum, move_moc1, move_moc2, move_moc3, move_moc4, move_moc5, move_moc6, move_moc7, move_moc8, move_moc9,],  
    ProjectDetail_warp_center_sc3_tx_1_box_inner : 'https://changhyoun.github.io/<br/>move',
    ProjectDetail_warp_center_sc3_tx_2_box_inner : "무브(Move) 홈페이지 클론코딩",
    ProjectDetail_warp_center_sc3_tx_3_box_inner : "PC, 모바일 웹",
    skill_ic : [figma_ic,html_ic,css_ic,javaScript_ic],
    skill_tx : ['figma','html','css','javaScript',],
    ProjectDetail_warp_center_sc3_tx_5_box_tx :
    `해당 프로젝트는 기존 무브(Move) 홈페이지를<br/>
    클론 코딩하여, 추가적인 페이지를 제작하고,<br/>
    반응형 웹 디자인을 적용하여 다양한<br/>
    화면 크기에서도 잘 동작하도록 구현했습니다. `,
    github_url : 'https://github.com/changhyoun/move'
  },
  { 
    id: 'samsung', 
    name: 'Samsung', 
    logo: pr_dt_logo5, 
    ProjectDetail_warp_center_sc1_h2: 'Samsung<br/>Electro-Mechanics', 
    ProjectDetail_warp_center_sc1_p: '삼성전기.', 
    slidesPerView: 1,
    images: [samsung_sum_hori,sam_moc1,sam_moc2,sam_moc3,sam_moc4,sam_moc5,],
    ProjectDetail_warp_center_sc3_tx_1_box_inner : 'https://changhyoun.github.io/<br/>SamsungElectro-Mechanics',
    ProjectDetail_warp_center_sc3_tx_2_box_inner :  "삼성전기(Samsung Electro-Mechanics) 홈페이지 클론코딩",
    ProjectDetail_warp_center_sc3_tx_3_box_inner : "PC, 모바일 웹",
    skill_ic : [figma_ic,html_ic,css_ic,javaScript_ic],
    skill_tx : ['figma','html','css','javaScript',],
    ProjectDetail_warp_center_sc3_tx_5_box_tx :
    `해당 프로젝트는 기존 삼성전기(Samsung Electro-Mechanics')<br/>
    홈페이지를 클론 코딩하여, 반응형 웹 디자인을 적용하여<br/>
    다양한 화면 크기에서도 잘 동작하도록 구현했습니다. `,
    github_url : 'https://github.com/changhyoun/SamsungElectro-Mechanics'
  },
];

function ProjectDetail() {
  const { projectId } = useParams(); // URL에서 projectId 가져오기
  const ProjectDetail_warp_center_sc1_h2Ref = useRef(null);
  const ProjectDetail_warp_center_sc1_pRef = useRef(null);
  const ProjectDetail_warp_center_sc3_tx_5_box_txRef = useRef(null);

  const currentProject = projects.find(project => project.id === projectId);
  const currentIndex = projects.findIndex(project => project.id === projectId);
  const previousProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  const formatTextWithLineBreaks = (text) => {
    return text.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

    // 텍스트를 <span>으로 분리하는 함수 (줄바꿈은 유지)
    const splitTextWithLineBreaks = (text) => {
      return text.split(/(<br\s*\/?>)/gi).map((line) => {
        if (line.match(/<br\s*\/?>/)) {
          return '<br />'; // 줄바꿈을 그대로 추가
        }
        return line.split('').map((char) => `<span class="char">${char}</span>`).join(''); // 각 글자를 <span>으로 감싸기
      }).join(''); // 전체를 하나의 문자열로 반환
    };
 

  useEffect(() => {
   
    
      // h2와 p 태그에 텍스트 초기화 후 GSAP 실행
      gsap.killTweensOf(ProjectDetail_warp_center_sc1_h2Ref.current);
      gsap.killTweensOf(ProjectDetail_warp_center_sc1_pRef.current);
      gsap.killTweensOf(ProjectDetail_warp_center_sc3_tx_5_box_txRef.current);
  
      // h2에 타이핑 효과 적용
      gsap.to(ProjectDetail_warp_center_sc1_h2Ref.current, {
        duration: 1,
        text: { value: currentProject.ProjectDetail_warp_center_sc1_h2 },
        ease: "power2"
      });
  
      // p 태그에 타이핑 효과 적용
      gsap.to(ProjectDetail_warp_center_sc1_pRef.current, {
        duration: 1,
        delay: 1,
        text: { value: currentProject.ProjectDetail_warp_center_sc1_p },
        ease: "power2"
      });

      const applyTextAnimation = () => {
        if (ProjectDetail_warp_center_sc3_tx_5_box_txRef.current) {
          // 기존 텍스트 비우기
          ProjectDetail_warp_center_sc3_tx_5_box_txRef.current.innerHTML = '';
  
          // 텍스트 분리 및 설정
          const splitText = splitTextWithLineBreaks(currentProject.ProjectDetail_warp_center_sc3_tx_5_box_tx);
          ProjectDetail_warp_center_sc3_tx_5_box_txRef.current.innerHTML = splitText;
  
          // GSAP 애니메이션 적용
          gsap.fromTo(".char", 
            {
              opacity: 0,
              y: 150, // 초기 위치
            },
            {
              opacity: 1,
              y: 0, // 애니메이션 후 위치
              duration: 0.5,
              ease: "power2.out",
              stagger: 0.03, // 각 글자가 순차적으로 나타나도록 설정
            }
          );
        }
      };
  
      applyTextAnimation();
    


 

    const utils = {
      distance: function (p0, p1) {
        var dx = p1.x - p0.x,
          dy = p1.y - p0.y;
        return Math.sqrt(dx * dx + dy * dy);
      },
    };
  
    const vector = {
      _x: 1,
      _y: 0,
      create: function (x, y) {
        var obj = Object.create(this);
        obj.setX(x);
        obj.setY(y);
        return obj;
      },
      setX: function (value) {
        this._x = value;
      },
      getX: function () {
        return this._x;
      },
      setY: function (value) {
        this._y = value;
      },
      getY: function () {
        return this._y;
      },
    };
  
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    const full = { x: window.innerWidth, y: window.innerHeight };
    canvas.width = full.x;
    canvas.height = full.y;
  
    const mouse = { x: 0, y: 0 };
  
    // 캔버스 내 마우스 좌표 계산
    canvas.addEventListener("mousemove", function (e) {
      const rect = canvas.getBoundingClientRect(); // 캔버스의 경계 좌표
      mouse.x = (e.clientX - rect.left) * (canvas.width / rect.width); // 캔버스 비율 보정
      mouse.y = (e.clientY - rect.top) * (canvas.height / rect.height); // 캔버스 비율 보정
    });
    const number = 20;
    const baseDotSize = 1;
    const hoverDotSizeMultiplier = 6;
    const vectorStock = [];
  
    // 점 배치
    for (let i = 0; i < full.x / number + 1; i++) {
      for (let j = 0; j < full.y / number + 1; j++) {
        vectorStock.push(vector.create(i * number, j * number));
      }
    }
  
    function update() {
      context.clearRect(0, 0, full.x, full.y);
      for (let i = 0; i < vectorStock.length; i++) {
        const dx = vectorStock[i].getX() - mouse.x;
        const dy = vectorStock[i].getY() - mouse.y;
        let dist = Math.sqrt(dx * dx + dy * dy);
  
        // 마우스 근처 점 크기 변경
        let dotSize = baseDotSize;
        if (dist < 100) {
          dotSize = baseDotSize + (hoverDotSizeMultiplier * (100 - dist) / 100);
        }
  
        context.fillStyle = "#333";
        context.save();
        context.translate(vectorStock[i].getX(), vectorStock[i].getY());
  
        // 원 그리기
        context.beginPath();
        context.arc(0, 0, dotSize, 0, 2 * Math.PI);
        context.fill();
  
        context.restore();
      }
      requestAnimationFrame(update);
    }
  
    update();
  }, [currentProject]);
  return (
    <div id="ProjectDetail">
      {currentProject ? (
        <>
          <img src={currentProject.images[0]} alt={`${currentProject.name} Background`} className="ProjectDetail_bg" />
          <div className="ProjectDetail_bg_ol"></div>
          <div className="ProjectDetail_warp">
            <div className="ProjectDetail_warp_lt">
              <Link to="/" className="ProjectDetail_home_btn">
                <span className="material-symbols-rounded">home</span>
              </Link>
            </div>
            <div className={`ProjectDetail_warp_center content_box ${currentProject.id}-scroll`}>
              <div className="ProjectDetail_warp_center_inner">
                <div className="ProjectDetail_warp_center_sc1">
                  <canvas id="canvas"></canvas> {/* 캔버스 추가 */}
                  <img src={currentProject.logo} alt={`${currentProject.name} Logo`} className="ProjectDetail_logo" />
                  <div className="ProjectDetail_warp_center_sc1_tx">
                    <h2 ref={ProjectDetail_warp_center_sc1_h2Ref}></h2>
                    <p ref={ProjectDetail_warp_center_sc1_pRef}></p>
                  </div>
                  <div className="ProjectDetail_warp_center_sc1_ic">
                    <span className="material-symbols-rounded">south</span>
                    <span className="material-symbols-rounded">south</span>
                  </div>
                </div>
                <div 
                    className={`ProjectDetail_warp_center_sc2 ${
                    currentProject.slidesPerView === 1 
                        ? 'sc2_single-swiper' 
                        : 'sc2_multiple-swiper' 
                    }`}
                >
                 <Swiper
                    slidesPerView={currentProject.slidesPerView}
                    modules={[Navigation, Pagination]}
                    navigation={{
                      nextEl: `.swiper-button-next`, // 고유 next 버튼 클래스 설정
                      prevEl: `.swiper-button-prev`, // 고유 prev 버튼 클래스 설정
                    }}
                    pagination={{ clickable: true, el: `.pagination-${currentProject.id} .pagination` }} // 고유 pagination 설정
                  >
                    {currentProject.id === 'move' && currentProject.images.slice(1, 10).map((image, index) => (
                      <SwiperSlide key={index} className={
                          currentProject.slidesPerView === 1 
                            ? 'swiper-slide-custom single-slide' 
                            : 'swiper-slide-custom multiple-slide'
                        }>
                        <img src={image} alt={`${currentProject.name} Slide ${index + 2}`} />
                      </SwiperSlide>
                    ))}
                  
                    {currentProject.id === 'samsung' && currentProject.images.slice(1, 6).map((image, index) => (
                      <SwiperSlide key={index} className={
                          currentProject.slidesPerView === 1 
                            ? 'swiper-slide-custom single-slide' 
                            : 'swiper-slide-custom multiple-slide'
                        }>
                        <img src={image} alt={`${currentProject.name} Slide ${index + 2}`} />
                      </SwiperSlide>
                    ))}
                  
                    {currentProject.id === 'sandbox' && currentProject.images.slice(1, 8).map((image, index) => (
                      <SwiperSlide key={index} className={
                          currentProject.slidesPerView === 1 
                            ? 'swiper-slide-custom single-slide' 
                            : 'swiper-slide-custom multiple-slide'
                        }>
                        <img src={image} alt={`${currentProject.name} Slide ${index + 2}`} />
                      </SwiperSlide>
                    ))}
                  
                    {currentProject.id === 'match' && currentProject.images.slice(1, 10).map((image, index) => (
                      <SwiperSlide key={index} className={
                          currentProject.slidesPerView === 1 
                            ? 'swiper-slide-custom single-slide' 
                            : 'swiper-slide-custom multiple-slide'
                        }>
                        <img src={image} alt={`${currentProject.name} Slide ${index + 2}`} />
                      </SwiperSlide>
                    ))}
                  
                    {currentProject.id === 'camfine' && currentProject.images.slice(1, 9).map((image, index) => (
                      <SwiperSlide key={index} className={
                          currentProject.slidesPerView === 1 
                            ? 'swiper-slide-custom single-slide' 
                            : 'swiper-slide-custom multiple-slide'
                        }>
                        <img src={image} alt={`${currentProject.name} Slide ${index + 2}`} />
                      </SwiperSlide>
                    ))}
                  <div className={`pagination-wrapper pagination-${currentProject.id}`}>
                    <div className="pagination"></div> {/* Swiper의 페이지네이션 위치 */}
                  </div>
                  <div className="swiper-button-prev">
                    <span className="material-symbols-rounded">
                      swipe_left
                    </span>
                  </div>
                  {/* 기본 prev 버튼 */}
                  <div className="swiper-button-next">
                    <span className="material-symbols-rounded">
                      swipe_right
                    </span>
                  </div>
                  </Swiper>

                </div>
                <div className="ProjectDetail_warp_center_sc3">
                  <div className="ProjectDetail_warp_center_sc3_tx_1">
                     <p>Website.</p>
                     
                      <Link  to={currentProject.ProjectDetail_warp_center_sc3_tx_1_box_inner.replace(/<br\s*\/?>/gi, '')} target='_blank' className='ProjectDetail_warp_center_sc3_tx_1_box'>
                        <div className="ProjectDetail_warp_center_sc3_tx_1_box_span">
                          <span className="material-symbols-rounded">
                            north_east
                          </span>
                          <span className="material-symbols-rounded">
                            north_east
                          </span>
                        </div>
                        <div className="ProjectDetail_warp_center_sc3_tx_1_box_inner"
                          dangerouslySetInnerHTML={{ __html: currentProject.ProjectDetail_warp_center_sc3_tx_1_box_inner }}
                        ></div>
                    
                      </Link>
                  </div>
                  <div className="ProjectDetail_warp_center_sc3_tx_2">
                     <p>Industry.</p>
                     
                      <div className='ProjectDetail_warp_center_sc3_tx_2_box'>
                        <div className="ProjectDetail_warp_center_sc3_tx_2_box_inner">
                          {currentProject.ProjectDetail_warp_center_sc3_tx_2_box_inner}
                        </div>
                    
                      </div>
                  </div>
                  <div className="ProjectDetail_warp_center_sc3_tx_3">
                     <p>Platform.</p>
                     
                      <div className='ProjectDetail_warp_center_sc3_tx_3_box'>
                        <div className="ProjectDetail_warp_center_sc3_tx_3_box_inner">
                          {currentProject.ProjectDetail_warp_center_sc3_tx_3_box_inner}
                        </div>
                    
                      </div>
                  </div>
                  <div className="ProjectDetail_warp_center_sc3_tx_4">
                     <p>UsedSkills.</p>
                     
                      <div className='ProjectDetail_warp_center_sc3_tx_4_box'>
                          {currentProject.skill_ic.map((icon, index) => (
                            <div key={index} className="skill">
                              <div className="ProjectDetail_warp_center_sc3_tx_4_skill_warp">
                                <img src={icon} alt={`${currentProject.skill_tx[index]} Icon`} className="skill_icon" />
                                <span>{currentProject.skill_tx[index]}</span>
                              </div>
                            </div>
                          ))}
                
                      </div>
                  </div>
                  <div className="ProjectDetail_warp_center_sc3_tx_5">
                     <p>explanation.</p>
                     
                      <div className='ProjectDetail_warp_center_sc3_tx_5_box' ref={ProjectDetail_warp_center_sc3_tx_5_box_txRef}
                        
                      >
                      </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="ProjectDetail_warp_rt">
              <div className="ProjectDetail_warp_rt_t">
                <Link to={currentProject.github_url} target='_blank' className="github_btn">
                  <FontAwesomeIcon icon={faGithub} />
                </Link>
              </div>
              <div className="ProjectDetail_warp_rt_bt">
                {nextProject && (
                  <Link to={`/project/${nextProject.id}`} className="ProjectDetail_next_btn">
                    <span className="material-symbols-rounded">arrow_forward</span>
                  </Link>
                )}
                {previousProject && (
                  <Link to={`/project/${previousProject.id}`} className="ProjectDetail_before_btn">
                    <span className="material-symbols-rounded">arrow_back</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>Project not found.</p>
      )}
    </div>
  );
}

export default ProjectDetail;
