import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";

const Navbar = () => {
  const navigate = useNavigate();
  const { accessToken, logout } = useAuth();
  const { data: me, isError } = useGetMyInfo(accessToken);

  const isLoggedIn = !!accessToken && !!me?.data && !isError;

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-gray-900 text-white">
      <div
        className="font-bold text-xl cursor-pointer"
        onClick={() => navigate("/")}
      >
        SpinningSpinning Dolimpan
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
