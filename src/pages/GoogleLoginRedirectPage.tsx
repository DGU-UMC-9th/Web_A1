import { useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";

const GoogleLoginRedirectPage = () => {

    const {setItem: setAccessToken } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
    const {setItem: setRefreshToken } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

    useEffect (() => {
        const urlParams = new URLSearchParams(window.location.search); 
        const accessToken = urlParams.get(LOCAL_STORAGE_KEY.accessToken);
        const refreshToken = urlParams.get(LOCAL_STORAGE_KEY.refreshToken);

        if (accessToken) {
            setAccessToken(accessToken);
            setRefreshToken(refreshToken);
            window.location.href = "/my"; // 토큰 저장 후 마이페이지로 이동
        }

    }, [setAccessToken, setRefreshToken]);
    return (
        <div>
            구글 로그인 Redirect 화면
        </div>
    );
};


export default GoogleLoginRedirectPage;