import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth.ts";
import type { ResponseMyInfoDto } from "../types/auth.ts";
import { useAuth } from "../context/AuthContext.tsx";
import { useNavigate } from "react-router-dom";
import type { NavigateFunction } from "react-router-dom";

const MyPage = () => {
  const navigate: NavigateFunction = useNavigate();
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
    navigate("/login");
  };

  return (
    <div>
      <h1>{data.data?.name}님 환영합니다.</h1>
      <img src={data.data?.avatar as string} alt="구글 로그인" />
      <h1>{data.data?.email}</h1>

      <button
        className="cursor-pointer bg-blue-300 rounded-sm p-5 hover:scale-90"
        onClick={handleLogout}
      >
        로그아웃
      </button>
    </div>
  );
};

export default MyPage;
