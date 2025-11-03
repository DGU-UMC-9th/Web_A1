import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-300 via-blue-400 to-blue-600 text-white">
      <h1 className="text-6xl font-extrabold mb-12 drop-shadow-md tracking-wide">
        Welcome Home 🏠
      </h1>

      <div className="flex flex-col gap-4 w-60">
        <button
          onClick={() => navigate("/login")}
          className="bg-white text-blue-600 font-semibold py-3 rounded-lg shadow-md hover:bg-blue-50 hover:scale-105 transition-all duration-200"
        >
          로그인
        </button>

        <button
          onClick={() => navigate("/signup")}
          className="bg-blue-800 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-blue-900 hover:scale-105 transition-all duration-200"
        >
          회원가입
        </button>
      </div>
    </div>
  );
};

export default Homepage;