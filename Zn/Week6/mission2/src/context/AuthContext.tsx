// src/context/AuthContext.tsx
import { useLocalStorage } from "../hooks/useLocalStorage";
import { createContext, useContext, useEffect, useState } from "react";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { postSignin, postLogout, getMyInfo } from "../apis/auth";
import type { RequestSigninDto, ResponseMyInfoDto } from "../types/auth";

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  userName: string | null;
  login: (signinData: RequestSigninDto) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    getItem: getAccessTokenFromStorage,
    setItem: setAccessTokenInStorage,
    removeItem: removeAccessTokenFromStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
  const {
    getItem: getRefreshTokenFromStorage,
    setItem: setRefreshTokenInStorage,
    removeItem: removeRefreshTokenFromStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

  const [accessToken, setAccessToken] = useState(getAccessTokenFromStorage());
  const [refreshToken, setRefreshToken] = useState(getRefreshTokenFromStorage());
  const [userName, setUserName] = useState<string | null>(null);

  // ✅ 새로고침 후에도 유저 정보 자동 복원
  useEffect(() => {
    const fetchUser = async () => {
      if (accessToken) {
        try {
          const res: ResponseMyInfoDto = await getMyInfo();
          setUserName(res.data.name);
        } catch (err) {
          console.log("유저 정보 불러오기 실패", err);
        }
      }
    };
    fetchUser();
  }, [accessToken]);

  // ✅ 로그인: 토큰 저장 + 사용자명 저장 (navigate는 LoginPage에서 처리)
  const login = async (signinData: RequestSigninDto) => {
    try {
      const { data } = await postSignin(signinData);

      setAccessTokenInStorage(data.accessToken);
      setRefreshTokenInStorage(data.refreshToken);
      setAccessToken(data.accessToken);
      setRefreshToken(data.refreshToken);
      setUserName(data.name || "사용자");

      // ❌ window.location.href 제거
      // ✅ LoginPage에서 navigate(from) 실행하게 맡김
      alert(`${data.name}님, 로그인에 성공했습니다!`);
    } catch (error) {
      console.log("로그인 오류", error);
      alert("로그인 실패. 다시 시도해주세요.");
    }
  };

  const logout = async () => {
    try {
      await postLogout();
      removeAccessTokenFromStorage();
      removeRefreshTokenFromStorage();
      setAccessToken(null);
      setRefreshToken(null);
      setUserName(null);
      alert("로그아웃 되었습니다.");
    } catch (error) {
      console.log("로그아웃 오류", error);
      alert("로그아웃 실패. 다시 시도해주세요.");
    }
  };

  return (
    <AuthContext.Provider
      value={{ accessToken, refreshToken, userName, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("AuthContext가 존재하지 않습니다.");
  return ctx;
};
