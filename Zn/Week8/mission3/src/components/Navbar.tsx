// src/components/Navbar.tsx
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar = ({ onMenuClick }: NavbarProps) => {
  const navigate = useNavigate();
  const { accessToken, logout } = useAuth();
  const { data: me, isError } = useGetMyInfo(accessToken);

  const isLoggedIn = !!accessToken && !!me?.data && !isError;

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <header
      className="relative z-40 flex items-center justify-between px-6 py-4 bg-gray-900 text-white"
    >
      <div className="flex items-center gap-3">
        {/* 햄버거 아이콘 */}
        <button
          type="button"
          onClick={onMenuClick}
          className="p-2 rounded hover:bg-gray-800 cursor-pointer"
          aria-label="사이드바 열기"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.95 11.95h32m-32 12h32m-32 12h32"
            />
          </svg>
        </button>

        <div
          className="font-bold text-xl cursor-pointer"
          onClick={() => navigate("/")}
        >
          SpinningSpinning Dolimpan
        </div>
      </div>

      <nav className="flex items-center gap-4 text-sm">
        {isLoggedIn ? (
          <>
            <span>{me!.data.name} 님 반갑습니다.</span>
            <button
              type="button"
              onClick={handleLogout}
              className="hover:text-blue-400 cursor-pointer"
            >
              로그아웃
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="hover:text-blue-400 cursor-pointer"
            >
              로그인
            </button>
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="hover:text-blue-400 cursor-pointer"
            >
              회원가입
            </button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
