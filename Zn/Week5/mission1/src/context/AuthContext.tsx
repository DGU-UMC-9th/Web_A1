import { createContext, useContext, useState, type PropsWithChildren } from "react";
import type { RequestSigninDto } from "../types/auth";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { postLogout, postSignin } from "../apis/auth";

// ✅ Context 타입 정의
interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  login: (signinData: RequestSigninDto) => Promise<void>;
  logout: () => Promise<void>;
}

// ✅ Context 생성 (초기값 안전하게)
const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren) => {

  // ✅ Access Token 관리
  const {
    getItem: getAccessTokenFromStorage,
    setItem: setAccessTokenInStorage,
    removeItem: removeAccessTokenFromStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);

  // ✅ Refresh Token 관리
  const {
    getItem: getRefreshTokenFromStorage,
    setItem: setRefreshTokenInStorage,
    removeItem: removeRefreshTokenFromStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

  // ✅ 초기 토큰값 로드
  const [accessToken, setAccessToken] = useState<string | null>(
    getAccessTokenFromStorage()
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(
    getRefreshTokenFromStorage()
  );

  // ✅ 로그인 함수
  const login = async (signinData: RequestSigninDto) => {
    try {
      const response = await postSignin(signinData);
      const data = response?.data;

      if (!data?.accessToken || !data?.refreshToken) {
        throw new Error("유효하지 않은 로그인 응답입니다.");
      }

      const { accessToken: newAccessToken, refreshToken: newRefreshToken } = data;

      setAccessTokenInStorage(newAccessToken);
      setRefreshTokenInStorage(newRefreshToken);
      setAccessToken(newAccessToken);
      setRefreshToken(newRefreshToken);

      alert("로그인 성공!");
      window.location.href = "/my"; // ✅ navigate() 대신 이거
    } catch (error) {
      console.error("로그인 오류:", error);
      alert("로그인 실패!");
    }
  };

  // ✅ 로그아웃 함수
  const logout = async () => {
    try {
      await postLogout();
      removeAccessTokenFromStorage();
      removeRefreshTokenFromStorage();
      setAccessToken(null);
      setRefreshToken(null);
      alert("로그아웃 완료!");
      window.location.href = "/login"; // ✅ navigate() 대신 이거
    } catch (error) {
      console.error("로그아웃 오류:", error);
    }
  };


  return (
    <AuthContext.Provider
      value={{
        accessToken,
        refreshToken,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ✅ 안전한 훅 (null 방지)
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("AuthContext를 찾을 수 없습니다.");
  return context;
};
