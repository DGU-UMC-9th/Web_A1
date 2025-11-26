import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyInfo } from "../apis/auth";
import { useAuth } from "../context/AuthContext";
import type { ResponseMyInfoDto } from "../types/auth";

const MyPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [data, setData] = useState<ResponseMyInfoDto>({} as ResponseMyInfoDto);

  useEffect(() => {
    const getData = async () => {
      const response = await getMyInfo();
      setData(response);
    };
    getData();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const user = data?.data;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f] text-white">
      <div className="w-[380px] bg-[#1a1a1a]/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 flex flex-col items-center gap-6 border border-gray-700">
        {/* ✅ 환영 문구 */}
        <h1 className="text-2xl font-semibold text-pink-400">
          {user?.name ? `${user.name}님 환영합니다` : "마이페이지"}
        </h1>

        {/* ✅ 프로필 */}
        {user?.avatar ? (
          <img
            src={user.avatar as string}
            alt="프로필 이미지"
            className="w-28 h-28 rounded-full border-2 border-pink-400 shadow-md object-cover"
          />
        ) : (
          <div className="w-28 h-28 flex items-center justify-center bg-pink-500 text-white text-3xl font-bold rounded-full shadow-md">
            {user?.name?.slice(-2) || "유저"}
          </div>
        )}

        {/* ✅ 이메일 */}
        <p className="text-gray-400 text-sm">{user?.email}</p>

        {/* ✅ 버튼 영역 */}
        <div className="flex flex-col w-full mt-4 gap-3">
          <button
            onClick={handleLogout}
            className="w-full py-2 rounded-lg bg-pink-500 text-white font-semibold hover:bg-pink-600 active:scale-95 transition"
          >
            로그아웃
          </button>
          <button
            onClick={() => navigate("/")}
            className="w-full py-2 rounded-lg bg-gray-700 text-gray-200 hover:bg-gray-600 active:scale-95 transition"
          >
            홈으로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
