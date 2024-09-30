import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Loading from './pages/Loading';
import NotFound from './pages/NotFound'; // 404 페이지 컴포넌트 가져오기
import './App.css';

// 각 페이지를 lazy 로딩으로 불러오기
const Home = lazy(() => import('./pages/Home'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));

function App() {
  return (
    <Router basename="/Portfolio">
      <div className="App">
        {/* Suspense로 페이지 로딩 시 로딩 화면 표시 */}
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* 동적 경로 추가 (projectId는 URL 파라미터로 사용) */}
            <Route path="/project/:projectId" element={<ProjectDetail />} />
            <Route path="/Loading" element={<Loading />} />
            {/* 404 페이지를 처리하는 경로 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;