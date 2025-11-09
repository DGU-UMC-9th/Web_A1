import { useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { useNavigate } from "react-router-dom";

const GoogleLoginRedirectPage = () => {
  const { setItem: setAccessToken } = useLocalStorage(
    LOCAL_STORAGE_KEY.accessToken
  );
  const { setItem: setRefreshToken } = useLocalStorage(
    LOCAL_STORAGE_KEY.refreshToken
  );

  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get(LOCAL_STORAGE_KEY.accessToken);
    const refreshToken = urlParams.get(LOCAL_STORAGE_KEY.refreshToken);

    if (accessToken) {
      // ✅ 토큰 저장
      setAccessToken(accessToken);
      if (refreshToken) {
        setRefreshToken(refreshToken);
      }

      // ✅ 구글 로그인 전 저장해둔 경로 사용
      const redirectPath = localStorage.getItem("redirectPath") || "/";

      // 한 번 쓰고 제거
      localStorage.removeItem("redirectPath");

      // ✅ 해당 경로로 이동
      navigate(redirectPath, { replace: true });
    }
  }, [setAccessToken, setRefreshToken, navigate]);

  return <div>구글 로그인 Redirect 화면</div>;
};

export default GoogleLoginRedirectPage;
