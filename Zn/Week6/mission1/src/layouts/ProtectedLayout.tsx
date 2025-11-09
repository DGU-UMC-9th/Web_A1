import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ProtectedLayout = () => {
  const { accessToken }: { accessToken: string | null } = useAuth();
  const location = useLocation();

  if (!accessToken) {
    // ✅ 지금 가려던 경로 저장 (쿼리까지 포함)
    const currentPath = location.pathname + location.search;
    localStorage.setItem("redirectPath", currentPath);

    // ✅ LoginPage에서 alert를 띄울 수 있도록 state로 표시
    return (
      <Navigate
        to="/login"
        state={{ from: currentPath, needAlert: true }}
        replace
      />
    );
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
