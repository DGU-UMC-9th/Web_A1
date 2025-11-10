import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyInfo } from "../apis/auth.ts";
import { useAuth } from "../context/AuthContext";
import type { ResponseMyInfoDto } from "../types/auth";

const MyPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [data, setData]: [
    ResponseMyInfoDto,
    React.Dispatch<React.SetStateAction<ResponseMyInfoDto>>
  ] = useState<ResponseMyInfoDto>({} as ResponseMyInfoDto);

  useEffect(() => {
    const getData = async () => {
      const response: ResponseMyInfoDto = await getMyInfo();
      console.log(response);
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-800">
      <div className="w-[360px] bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center gap-5">
        {/* ✅ 환영 문구 */}
        <h1 className="text-xl font-semibold">{user?.name}님 환영합니다.</h1>

        {/* ✅ 프로필 이미지 또는 이니셜 박스 */}
        {user?.avatar ? (
          <img
            src={user.avatar as string}
            alt="프로필 이미지"
            className="w-24 h-24 rounded-xl object-cover border-2 border-gray-300"
          />
        ) : (
          <div className="w-24 h-24 flex items-center justify-center bg-orange-500 text-white text-3xl font-bold rounded-xl">
            {user?.name?.slice(-2)} {/* 이름의 마지막 두 글자만 표시 */}
          </div>
        )}

        {/* ✅ 이메일 */}
        <p className="text-gray-600">{user?.email}</p>

        {/* ✅ 로그아웃 버튼 */}
        <button
          onClick={handleLogout}
          className="mt-4 bg-blue-400 text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-blue-500 active:scale-95 transition-transform"
        >
          로그아웃
        </button>
      </div>
    </div>
  );
};

export default MyPage;