import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Sidebar from "./Sidebar.tsx";

const Navbar = () => {
  const navigate = useNavigate();
  const { accessToken, userName, logout } = useAuth(); // ✅ userName만 사용

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      <header className="fixed top-0 left-0 right-0 bg-black text-white shadow-md z-50">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <button
              onClick={toggleSidebar}
              className="flex items-center justify-center p-2 rounded hover:bg-gray-800 transition"
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
                className="text-white"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="4"
                  d="M7.95 11.95h32m-32 12h32m-32 12h32"
                />
              </svg>
            </button>

            <Link to="/" className="text-lg font-bold text-[#ff4cc4]">
              돌려돌려LP판
            </Link>
          </div>

          <nav className="flex items-center gap-4 text-sm ml-auto">
            <Link to="/search" className="hover:text-pink-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5 inline-block align-middle"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18a7.5 7.5 0 006.15-3.35z"
                />
              </svg>
            </Link>

            {!accessToken ? (
              <>
                <Link to="/login" className="hover:text-pink-400 font-medium">
                  로그인
                </Link>
                <Link
                  to="/signup"
                  className="bg-[#ff4cc4] hover:bg-[#ff66c7] text-black px-3 py-1 rounded-md font-medium"
                >
                  회원가입
                </Link>
              </>
            ) : (
              <>
                <span className="text-gray-300">
                  {userName}님 반갑습니다.
                </span>
                <button
                  onClick={handleLogout}
                  className="hover:text-pink-400 font-medium"
                >
                  로그아웃
                </button>
              </>
            )}
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;