// src/layouts/RootLayout.tsx
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import useSidebar from "../hooks/useSidebar";

const RootLayout = () => {
  const location = useLocation();
  const { isOpen, toggle, close } = useSidebar();

  const isDetailPage = location.pathname.startsWith("/lp/");

  return (
    <div className="h-dvh flex flex-col bg-gray-950 text-white">
      {/* 상단 네비바 */}
      <Navbar onMenuClick={toggle} />

      {/* 본문 영역 */}
      <div className="relative flex flex-1 overflow-hidden">
        {/* 사이드바 (오버레이 + 슬라이드) */}
        <Sidebar isOpen={isOpen} onClose={close} />

        {/* 메인 콘텐츠 */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {/* 상세 페이지에서만 푸터 숨기기 */}
      {!isDetailPage && <Footer />}
    </div>
  );
};

export default RootLayout;
