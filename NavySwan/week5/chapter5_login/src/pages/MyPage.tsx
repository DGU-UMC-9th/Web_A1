import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getMyInfo } from '../apis/auth.ts'
import { useAuth } from '../context/AuthContext';
import type { ResponseMyInfoDto } from '../types/auth.ts';

const MyPage = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const [data, setData] = useState<ResponseMyInfoDto | null>(null);

    useEffect(() => {
        const getData = async () => {
            const response = await getMyInfo();
            console.log(response);

            setData(response);
        };

        getData();
    }, []); // 의존성 배열을 추가하여 한 번만 실행되도록 설정


    const handleLogout = async () => {
        await logout();
        navigate("/"); // 로그아웃 후 홈으로 이동
    };


    return (
    <div>
    <h1>{data?.data?.name}님 환영합니다.</h1>
    {/* 알아서 예외처리 (사진 없을 때) */}
    <img src={data?.data?.avatar as string} alt="구글 로고" />

    <button className="cursor-pointer bg-blue-300 rounded-sm p-5 hover:scale-90" onClick={handleLogout}> 로그아웃 </button>

    </div>
    );
};

export default MyPage;