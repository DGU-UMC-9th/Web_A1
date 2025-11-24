import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from "react";
import type { RequestSigninDto } from "../types/auth";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import useLoginMutation from "../hooks/mutations/useLoginMutation";
import useLogoutMutation from "../hooks/mutations/useLogoutMutation";

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  login: (signInData: RequestSigninDto) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  refreshToken: null,
  login: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
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

  const [accessToken, setAccessToken] = useState<string | null>(
    getAccessTokenFromStorage()
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(
    getRefreshTokenFromStorage()
  );

  const { mutateAsync: loginMutate } = useLoginMutation();
  const { mutateAsync: logoutMutate } = useLogoutMutation();

  const login = async (signinData: RequestSigninDto) => {
    try {
      const { data } = await loginMutate(signinData);

      if (data) {
        const newAccessToken = data.accessToken;
        const newRefreshToken = data.refreshToken;

        setAccessTokenInStorage(newAccessToken);
        setRefreshTokenInStorage(newRefreshToken);

        setAccessToken(newAccessToken);
        setRefreshToken(newRefreshToken);
        alert("로그인 성공");
        window.location.href = "/my";
      }
    } catch (error) {
      console.log("로그인 오류", error);
      alert("로그인 실패");
    }
  };

  const logout = async () => {
  try {
    // 서버에 로그아웃 요청
    await logoutMutate();
  } catch (error) {
    // 탈퇴 후에는 401이 나도 자연스러운 상태라, 여기서 막지 말고 그냥 로그만 남김
    console.log("로그아웃 오류(무시 가능):", error);
  } finally {
    // ✅ 서버 응답과 상관없이 클라이언트 상태는 무조건 정리
    removeAccessTokenFromStorage();
    removeRefreshTokenFromStorage();

    setAccessToken(null);
    setRefreshToken(null);
  }
};

  return (
    <AuthContext.Provider value={{ accessToken, refreshToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("AuthContext를 찾을 수 없습니다.");
  }

  return context;
};
