import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './ProjectDetail.scss';
import { camfine_sum, move_sum, match_sum, samsung_sum_hori, sandbox_sum, pr_dt_logo1, pr_dt_logo2, pr_dt_logo3, pr_dt_logo4, pr_dt_logo5 } from '../components/Image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

// 각 프로젝트별 이미지 및 로고를 설정
const projects = [
  { 
    id: 'camfine', 
    name: 'Camfine', 
    logo: pr_dt_logo1, 
    ProjectDetail_warp_center_sc1_h2: 'Camfine', 
    ProjectDetail_warp_center_sc1_p: '캠파인.', 
    slidesPerView: 2,
    images: [camfine_sum, '추가 이미지 1', '추가 이미지 2'],  // 이미지 배열 추가
  },
  { 
    id: 'match', 
    name: 'Match', 
    logo: pr_dt_logo2, 
    ProjectDetail_warp_center_sc1_h2: 'Match Point', 
    ProjectDetail_warp_center_sc1_p: '매치포인트.', 
    slidesPerView: 2,
    images: [match_sum, '추가 이미지 1', '추가 이미지 2'],  // 이미지 배열 추가
  },
  { 
    id: 'sandbox', 
    name: 'Sandbox', 
    logo: pr_dt_logo3, 
    ProjectDetail_warp_center_sc1_h2: 'Code Sandbox', 
    ProjectDetail_warp_center_sc1_p: '코드 샌드박스.', 
    slidesPerView: 1,
    images: [sandbox_sum, '추가 이미지 1'],  // 이미지 배열 추가
  },
  { 
    id: 'move', 
    name: 'Move', 
    logo: pr_dt_logo4, 
    ProjectDetail_warp_center_sc1_h2: 'Move', 
    ProjectDetail_warp_center_sc1_p: '무브.', 
    slidesPerView: 1,
    images: [move_sum, '추가 이미지 1'],  // 이미지 배열 추가
  },
  { 
    id: 'samsung', 
    name: 'Samsung', 
    logo: pr_dt_logo5, 
    ProjectDetail_warp_center_sc1_h2: 'Samsung\nElectro-Mechanics', 
    ProjectDetail_warp_center_sc1_p: '삼성전기.', 
    slidesPerView: 1,
    images: [samsung_sum_hori, '추가 이미지 1'],  // 이미지 배열 추가
  },
];

function ProjectDetail() {
  const { projectId } = useParams(); // URL에서 projectId 가져오기

  // 현재 프로젝트 정보 찾기
  const currentProject = projects.find(project => project.id === projectId);

  // 이전 및 다음 프로젝트 찾기
  const currentIndex = projects.findIndex(project => project.id === projectId);
  const previousProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  console.log("Current projectId:", projectId);
  console.log("Current Project:", currentProject);

  // 줄바꿈 적용을 위해 \n을 <br />로 변환
  const formatTextWithLineBreaks = (text) => {
    return text.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  // 프로젝트가 존재할 때만 렌더링
  return (
    <div id="ProjectDetail">
      {currentProject ? (
        <>
          {/* 배경 이미지 */}
          <img src={currentProject.images[0]} alt={`${currentProject.name} Background`} className="ProjectDetail_bg" />
          <div className="ProjectDetail_bg_ol"></div>
          <div className="ProjectDetail_warp">
            <div className="ProjectDetail_warp_lt">
              <Link to="/" className="ProjectDetail_home_btn">
                <span className="material-symbols-rounded">home</span>
              </Link>
            </div>
            <div className="ProjectDetail_warp_center content_box">
              <div className="ProjectDetail_warp_center_inner">
                <div className="ProjectDetail_warp_center_sc1">
                  <img src={currentProject.logo} alt={`${currentProject.name} Logo`} className="ProjectDetail_logo" />

                  <div className='ProjectDetail_warp_center_sc1_tx'>
                    {/* 줄바꿈을 적용하여 텍스트 출력 */}
                    <h2>{formatTextWithLineBreaks(currentProject.ProjectDetail_warp_center_sc1_h2)}</h2>
                    <p>{currentProject.ProjectDetail_warp_center_sc1_p}</p>
                  </div>
                  <div className="ProjectDetail_warp_center_sc1_ic">
                    <span className="material-symbols-rounded">
                      south
                    </span>
                    <span className="material-symbols-rounded">
                      south
                    </span>
                  </div>
                </div>

                {/* 스와이퍼 섹션 */}
                <div 
                    className={`ProjectDetail_warp_center_sc2 ${
                    currentProject.slidesPerView === 1 
                        ? 'sc2_single-swiper' // 1개씩 보여질 때 추가되는 클래스
                        : 'sc2_multiple-swiper' // 3개씩 보여질 때 추가되는 클래스
                    }`}
                >
                  <Swiper
                    spaceBetween={50}
                    slidesPerView={currentProject.slidesPerView}  // 각 프로젝트별 슬라이드 개수
                    modules={[Navigation, Pagination]}
                    navigation
                    pagination={{ clickable: true }}
                  >
                    {currentProject.images.map((image, index) => (
                      <SwiperSlide 
                        key={index} 
                        className={
                          currentProject.slidesPerView === 1 
                            ? 'swiper-slide-custom single-slide' // 1개씩 보여질 때 추가되는 클래스
                            : 'swiper-slide-custom multiple-slide' // 3개씩 보여질 때 추가되는 클래스
                        }
                      >
                        <img src={image} alt={`${currentProject.name} Slide ${index + 1}`} />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
            </div>
            <div className="ProjectDetail_warp_rt">
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
        </>
      ) : (
        <p>Project not found.</p>
      )}
    </div>
  );
}

export default ProjectDetail;
