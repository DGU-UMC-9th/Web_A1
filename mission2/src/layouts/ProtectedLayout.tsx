import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useRef } from "react";

const ProtectedLayout = () => {
  const { accessToken }: { accessToken: string | null } = useAuth();
  const location = useLocation();
  const alertedRef = useRef(false); // ✅ alert 중복 방지용 ref

  if (!accessToken) {
    // ✅ React.StrictMode로 인해 alert가 2번 뜨는 현상 방지
    if (!alertedRef.current) {
      alert("로그인이 필요한 서비스입니다. 로그인을 해주세요!");
      alertedRef.current = true;
    }

    // ✅ 현재 경로를 문자열로 넘겨서 정확히 복귀할 수 있도록 처리
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return (
    <div className="h-dvh flex flex-col">
      <Navbar />
      <main className="flex-1 mt-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default ProtectedLayout;
