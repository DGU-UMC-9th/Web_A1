import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";
import type { ResponseMyInfoDto } from "../types/auth";

const MyPage = () => {
  // ✅ data는 아직 서버에서 안 받아왔을 수도 있으므로 undefined 허용
  const [data, setData] = useState<ResponseMyInfoDto | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response: ResponseMyInfoDto = await getMyInfo();
        console.log("서버 응답:", response);
        setData(response);
      } catch (error) {
        console.error("데이터 불러오기 실패:", error);
      }
    };

    getData();
  }, []);

  // ✅ 로딩 상태 처리 (data가 아직 없을 때)
  if (!data) return <div>로딩 중...</div>;

  // ✅ 실제 사용자 정보는 data.data 안에 있음
  const user = data.data;

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <h2 className="text-2xl font-semibold">내 정보</h2>
      <div className="border p-4 rounded-lg shadow-md w-[300px] text-center">
        <p><strong>이름:</strong> {user.name}</p>
        <p><strong>이메일:</strong> {user.email}</p>
        {user.bio && <p><strong>소개:</strong> {user.bio}</p>}
        {user.avatar && (
          <img
            src={user.avatar}
            alt="프로필 이미지"
            className="w-24 h-24 mx-auto rounded-full mt-3"
          />
        )}
      </div>
    </div>
  );
};

export default MyPage;
